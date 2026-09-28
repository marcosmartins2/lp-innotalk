#!/usr/bin/env node
/**
 * Testes de fumaça (smoke tests) — VERIFICAÇÃO DINÂMICA.
 *
 * Diferente do lint/tsc (que leem o código sem executá-lo), este script faz
 * requisições HTTP reais contra a aplicação JÁ RODANDO e valida o comportamento
 * observável: status, conteúdo, cabeçalhos e tempo de resposta.
 *
 * Uso:
 *   node tests/smoke.mjs                      # usa http://localhost:3000
 *   node tests/smoke.mjs https://exemplo.com  # usa a URL informada
 *   BASE_URL=https://exemplo.com node tests/smoke.mjs
 *
 * Sai com código 1 se qualquer verificação falhar (o que quebra o job no CI).
 */

const BASE = (process.argv[2] || process.env.BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS || 15000);

const resultados = [];

function registrar(nome, ok, detalhe) {
  resultados.push({ nome, ok, detalhe });
  console.log(`${ok ? "✅" : "❌"} ${nome}${detalhe ? ` — ${detalhe}` : ""}`);
}

async function buscar(caminho) {
  const controlador = new AbortController();
  const t = setTimeout(() => controlador.abort(), TIMEOUT_MS);
  const inicio = Date.now();
  try {
    const resposta = await fetch(`${BASE}${caminho}`, {
      signal: controlador.signal,
      redirect: "follow",
      headers: { "user-agent": "smoke-test-ci" },
    });
    const corpo = await resposta.text();
    return { resposta, corpo, ms: Date.now() - inicio };
  } finally {
    clearTimeout(t);
  }
}

async function verificar(nome, fn) {
  try {
    const detalhe = await fn();
    registrar(nome, true, detalhe);
  } catch (erro) {
    registrar(nome, false, erro.message);
  }
}

console.log(`\n🔎 Smoke tests contra: ${BASE}\n`);

// 1. A home precisa responder 200 e devolver HTML.
await verificar("GET / responde 200 em HTML", async () => {
  const { resposta, ms } = await buscar("/");
  if (resposta.status !== 200) throw new Error(`status ${resposta.status}`);
  const tipo = resposta.headers.get("content-type") || "";
  if (!tipo.includes("text/html")) throw new Error(`content-type inesperado: ${tipo}`);
  return `${ms}ms`;
});

// 2. O conteúdo esperado da landing page precisa estar presente.
await verificar("A home contém o conteúdo da marca", async () => {
  const { corpo } = await buscar("/");
  if (!/innotalk/i.test(corpo)) throw new Error("texto 'Innotalk' não encontrado no HTML");
  if (!/<title[^>]*>/i.test(corpo)) throw new Error("tag <title> ausente");
  return "marca e <title> presentes";
});

// 3. A home precisa declarar o idioma (requisito de acessibilidade/SEO).
await verificar("A home declara <html lang>", async () => {
  const { corpo } = await buscar("/");
  const achado = corpo.match(/<html[^>]*\slang="([^"]+)"/i);
  if (!achado) throw new Error("atributo lang ausente na tag <html>");
  return `lang="${achado[1]}"`;
});

// 4. Páginas legais obrigatórias precisam estar publicadas.
for (const rota of ["/politica-privacidade", "/termos-uso"]) {
  await verificar(`GET ${rota} responde 200`, async () => {
    const { resposta } = await buscar(rota);
    if (resposta.status !== 200) throw new Error(`status ${resposta.status}`);
    return "ok";
  });
}

// 5. Rota inexistente precisa devolver 404 (e não 200 nem erro 5xx).
await verificar("Rota inexistente responde 404", async () => {
  const { resposta } = await buscar("/rota-que-nao-existe-123");
  if (resposta.status !== 404) throw new Error(`esperado 404, veio ${resposta.status}`);
  return "404 correto";
});

// 6. Orçamento de tempo de resposta da home.
await verificar("Home responde em menos de 5s", async () => {
  const { ms } = await buscar("/");
  if (ms > 5000) throw new Error(`levou ${ms}ms`);
  return `${ms}ms`;
});

const falhas = resultados.filter((r) => !r.ok);
console.log(`\n${resultados.length - falhas.length}/${resultados.length} verificações passaram.`);

// Publica o resumo no painel do GitHub Actions, quando disponível.
if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFileSync } = await import("node:fs");
  const linhas = [
    `### 🔎 Smoke tests — \`${BASE}\``,
    "",
    "| Verificação | Resultado | Detalhe |",
    "| --- | --- | --- |",
    ...resultados.map((r) => `| ${r.nome} | ${r.ok ? "✅ passou" : "❌ falhou"} | ${r.detalhe || "-"} |`),
    "",
  ];
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, linhas.join("\n"));
}

if (falhas.length > 0) {
  console.error(`\n💥 ${falhas.length} verificação(ões) falharam.`);
  process.exit(1);
}
console.log("\n🎉 Todos os smoke tests passaram.");
