# lp-innotalk

[![CI/CD Pipeline](https://github.com/marcosmartins2/lp-innotalk/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/marcosmartins2/lp-innotalk/actions/workflows/ci-cd.yml)

Landing page da Innotalk (Next.js 16 + TypeScript + Tailwind CSS 4).

## CI/CD

A pipeline de entrega esta definida em [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml)
e documentada em [`docs/PIPELINE.md`](docs/PIPELINE.md).

```
1. Analise estatica (ESLint + tsc + npm audit)  ┐
                                                ├─> 3. Build ─> 4. Deploy staging ─> 5. Testes dinamicos ─> 6. Deploy production ─> 7. Resumo
2. SAST CodeQL                                  ┘
```

| Etapa | Ferramentas | Tipo de verificacao |
| --- | --- | --- |
| Analise estatica | ESLint, `tsc --noEmit`, `npm audit`, Dependency Review | estatica |
| SAST | CodeQL (`github/codeql-action`) | estatica de seguranca |
| Build | `next build` + `actions/upload-artifact` | empacotamento |
| Testes dinamicos | smoke tests HTTP (`tests/smoke.mjs`) + Lighthouse CI | dinamica |
| Deploy | Vercel CLI, ambientes `staging` e `production` | entrega |

Ambientes configurados em **Settings > Environments**: `staging` (automatico) e
`production` (exige aprovacao manual).

Para rodar os smoke tests localmente:

```bash
npm run build
npm start &
node tests/smoke.mjs http://localhost:3000
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
