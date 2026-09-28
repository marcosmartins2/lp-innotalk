# Pipeline de CI/CD — lp-innotalk

Documento de apoio para apresentar a pipeline definida em
[`.github/workflows/ci-cd.yml`](../.github/workflows/ci-cd.yml).

## 1. A aplicação

| Item | Valor |
| --- | --- |
| Projeto | `lp-innotalk` — landing page da Innotalk |
| Stack | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| Comandos | `npm run dev`, `npm run build`, `npm start`, `npm run lint` |
| Produção | https://innotalk.com.br |

## 2. Quando a pipeline roda (gatilhos)

```yaml
on:
  push:            # a cada push na master -> caminho completo, até produção
    branches: [master]
  pull_request:    # a cada PR -> valida e vai só até homologação
    branches: [master]
  workflow_dispatch: # botão "Run workflow" na aba Actions
```

## 3. Desenho da pipeline

```
  ┌──────────────────────┐
  │ 1. Análise estática  │ ESLint + tsc --noEmit + npm audit + Dependency Review
  └──────────┬───────────┘
             │        (rodam em paralelo)
  ┌──────────┴───────────┐
  │ 2. SAST — CodeQL     │ análise de segurança do código
  └──────────┬───────────┘
             ▼
  ┌──────────────────────┐
  │ 3. Build             │ next build -> build.tar.gz (artefato)
  └──────────┬───────────┘
             ▼
  ┌──────────────────────────────────────┐
  │ 4. Deploy homologação  [ staging ]   │  AMBIENTE 1
  └──────────┬───────────────────────────┘
             ▼
  ┌──────────────────────┐
  │ 5. Testes dinâmicos  │ smoke tests HTTP + Lighthouse CI (app rodando)
  └──────────┬───────────┘
             ▼
  ┌──────────────────────────────────────┐
  │ 6. Deploy produção   [ production ]  │  AMBIENTE 2 — exige aprovação manual
  └──────────┬───────────────────────────┘
             ▼
  ┌──────────────────────┐
  │ 7. Resumo            │ tabela de status no Summary da execução
  └──────────────────────┘
```

Princípio aplicado: **build once, deploy many**. O `next build` acontece
uma única vez (job 3) e gera um artefato. Homologação e produção baixam
**exatamente o mesmo artefato**, então o que foi testado é o que vai ao ar.

## 4. Jobs e comandos

### Job 1 — `analise-estatica` (verificação estática)

| Comando / Action | O que verifica |
| --- | --- |
| `npm ci` | instalação limpa, fiel ao `package-lock.json` |
| `npm run lint` | ESLint com as regras `next/core-web-vitals` e `next/typescript` |
| `npx tsc --noEmit` | erros de tipo em TypeScript, sem gerar build |
| `npm audit --audit-level=high` | CVEs conhecidas nas dependências (não bloqueante) |
| `actions/dependency-review-action@v4` | bloqueia PR que introduz dependência vulnerável |

### Job 2 — `sast-codeql` (verificação estática de segurança)

| Action | O que faz |
| --- | --- |
| `github/codeql-action/init@v3` | prepara a análise para `javascript-typescript` com o pacote `security-and-quality` |
| `github/codeql-action/analyze@v3` | roda as queries e publica os alertas em **Security > Code scanning** |

Precisa da permissão `security-events: write`.

### Job 3 — `build`

```bash
npm ci
npm run build
tar -czf build.tar.gz --exclude=".next/cache" .next public package.json package-lock.json next.config.ts
```
O artefato é publicado com `actions/upload-artifact@v4` sob o nome
`build-${{ github.sha }}` e fica retido por 7 dias.

### Job 4 — `deploy-homologacao` → ambiente `staging`

```bash
tar -xzf build.tar.gz
vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
vercel build --token=$VERCEL_TOKEN
vercel deploy --prebuilt --token=$VERCEL_TOKEN
```
Os segredos (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) ficam
guardados **no ambiente `staging`**, não no repositório. Enquanto eles não
estiverem cadastrados, o job entra em *modo demonstração*: registra os comandos
que seriam executados e valida o artefato.

### Job 5 — `testes-dinamicos` (verificação dinâmica)

Aqui a aplicação é **executada** e testada pelo comportamento observável:

```bash
node tests/smoke.mjs "<URL do ambiente>"   # 7 verificações HTTP
```
| Verificação do smoke test | Por quê |
| --- | --- |
| `GET /` responde 200 em HTML | a aplicação subiu |
| a home contém a marca e `<title>` | a renderização funcionou |
| a home declara `<html lang>` | acessibilidade / SEO |
| `/politica-privacidade` responde 200 | página legal obrigatória no ar |
| `/termos-uso` responde 200 | página legal obrigatória no ar |
| rota inexistente responde 404 | roteamento correto (não 200, não 5xx) |
| home responde em menos de 5s | orçamento de tempo de resposta |

Em seguida roda o **Lighthouse CI** (`treosh/lighthouse-ci-action@v12`) medindo
performance, acessibilidade, boas práticas e SEO, com os limites definidos em
[`lighthouserc.json`](../lighthouserc.json).

O job escolhe o alvo automaticamente: se a URL de homologação estiver
respondendo, testa nela; se não, sobe o mesmo artefato no próprio runner
(`npm ci --omit=dev && npm start`) e testa esse ambiente efêmero.

### Job 6 — `deploy-producao` → ambiente `production`

Só executa quando `github.ref == 'refs/heads/master'` e o evento não é um PR.
Por causa da regra de proteção do ambiente, a execução **para e espera
aprovação manual** antes de rodar:

```bash
vercel pull --yes --environment=production --token=$VERCEL_TOKEN
vercel build --prod --token=$VERCEL_TOKEN
vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
node tests/smoke.mjs "<URL de produção>"   # smoke test pós-deploy
```

### Job 7 — `resumo`

Roda com `if: always()` e monta uma tabela com o status de todos os jobs no
**Summary** da execução — inclusive quando algo falhou.

## 5. Os dois ambientes

| | `staging` | `production` |
| --- | --- | --- |
| Quando | todo push na master e todo PR | só push na master |
| Aprovação manual | não | **sim** (required reviewer) |
| Variável de URL | `STAGING_URL` | `PRODUCTION_URL` |
| Segredos | do ambiente `staging` | do ambiente `production` |
| Comando de deploy | `vercel deploy --prebuilt` | `vercel deploy --prebuilt --prod` |

Configuração em **Settings > Environments**. Ambientes dão três coisas que um
job comum não dá: segredos isolados por ambiente, regra de aprovação e o
histórico de deploys visível na aba **Deployments** do repositório.

## 6. Ferramentas do GitHub Actions usadas

| Ferramenta | Tipo | Papel |
| --- | --- | --- |
| `actions/checkout@v4` | oficial | baixa o código |
| `actions/setup-node@v4` | oficial | instala o Node e cacheia o `~/.npm` |
| `actions/upload-artifact@v4` / `download-artifact@v4` | oficial | promove o mesmo build entre os ambientes |
| `github/codeql-action` | oficial | **SAST** (estática de segurança) |
| `actions/dependency-review-action@v4` | oficial | **SCA** em Pull Requests |
| `treosh/lighthouse-ci-action@v12` | comunidade | **auditoria dinâmica** da app rodando |
| GitHub Environments | plataforma | staging + production com aprovação |
| `concurrency` | plataforma | cancela execução anterior da mesma branch |
| `permissions` | plataforma | privilégio mínimo por job |

## 7. Como ativar o deploy real

1. **Settings > Environments > staging** (e depois `production`)
2. Em *Environment secrets*, adicionar `VERCEL_TOKEN`, `VERCEL_ORG_ID` e `VERCEL_PROJECT_ID`
3. Em *Environment variables*, ajustar `STAGING_URL` / `PRODUCTION_URL`
4. Rodar a pipeline em **Actions > CI/CD Pipeline > Run workflow**

Sem esses segredos a pipeline roda inteira e fica verde — os dois jobs de deploy
apenas registram os comandos em vez de publicar.

## 8. Perguntas prováveis na apresentação

**Por que lint e CodeQL em jobs separados?** Rodam em paralelo, então o
feedback rápido (lint, ~1 min) não espera o CodeQL (~3 min). E cada job pede só
a permissão de que precisa.

**O que é estática e o que é dinâmica aqui?** Estática = ESLint, `tsc`,
`npm audit`, Dependency Review e CodeQL — leem o código-fonte sem executá-lo.
Dinâmica = smoke tests HTTP e Lighthouse — a aplicação está de pé respondendo
requisições de verdade.

**Por que não buildar de novo na produção?** Porque um segundo build pode gerar
um resultado diferente do que foi testado. O artefato do job 3 é o mesmo em
homologação e em produção.

**E se produção quebrar?** O smoke test pós-deploy acusa. O rollback é
reexecutar (`Re-run jobs`) a pipeline do commit anterior, que ainda tem o
artefato retido, ou `vercel rollback` no provedor.
