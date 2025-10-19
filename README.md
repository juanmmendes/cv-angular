# CV Angular – Portfólio de Juan Mendes

Aplicação Angular 17 concebida para apresentar currículo, trajetória e projetos de Juan Mendes de forma responsiva, multilíngue e com foco em performance. O projeto combina SSR/SSG, Theme Switcher, integrações com GitHub e uma camada de conteúdo separada por idioma.

---

## ✨ Destaques

- **Angular 17 Standalone** – componentes sem módulos, Signals e lazy routes.
- **SSR + SSG** – suporta renderização no servidor (`serve:ssr`) e pré-render estático (`build:ssg`) para GitHub Pages/Vercel.
- **i18n com ngx-translate** – conteúdo e dados em arquivos JSON (`pt` e `en`), com chaveamento em tempo de execução.
- **Design system próprio** – Tailwind + SCSS utilitário, modo claro/escuro sincronizado com `prefers-color-scheme`.
- **Conteúdo dinâmico** – services dedicados para perfil (`profile.json`), repositórios do GitHub (com fallback offline) e SEO (meta tags + JSON-LD).
- **Acessibilidade** – skip link, aria-labels, contraste e navegação por teclado revisadas.
- **Automação de deploy** – workflow GitHub Actions (`.github/workflows/deploy.yml`) que publica o build estático.

---

## 🧱 Arquitetura Geral

| Camada                | Descrição                                                                                                     |
|-----------------------|----------------------------------------------------------------------------------------------------------------|
| `src/app`             | Shell principal, rotas, páginas (About, Skills, Projects, Contact) e layout (header/footer).                  |
| `src/app/core`        | Serviços (conteúdo, GitHub, tema, SEO) e modelos tipados.                                                     |
| `src/app/shared`      | Componentes reutilizáveis (cards, tags, chips, ratings, botões, etc.).                                        |
| `src/assets/data`     | JSONs com dados do perfil (pt/en) consumidos pelo `ContentService`.                                           |
| `src/assets/i18n`     | Traduções chave-valor; `ngx-translate` carrega conforme idioma ativo.                                         |
| `src/assets/docs`     | Currículo PDF, certificados e evidências para exibição/Download.                                              |
| `src/assets/screenshots` | Placeholders para imagens de seções (trocar por screenshots reais).                                         |

---

## 🚀 Primeiros Passos

```bash
npm install
npm start        # http://localhost:4200
```

### Pré-requisitos
- Node 18.19+ (ver `package.json` → `engines`)
- npm 9+ (recomendado)

---

## 📦 Scripts Disponíveis

| Script                     | Descrição                                                                                   |
|----------------------------|---------------------------------------------------------------------------------------------|
| `npm start`                | Dev server SPA (`ng serve`).                                                                |
| `npm run build`            | Build de produção SPA.                                                                      |
| `npm run build:ssg`        | Build + prerender estático (`dist/portfolio/browser`).                                      |
| `npm run build:ssr`        | Build dual (browser + server) para SSR.                                                     |
| `npm run serve:ssr`        | Sobe `dist/portfolio/server/server.mjs` com Express.                                        |
| `npm run lint`             | ESLint Angular + @angular-eslint.                                                           |
| `npm test`                 | _Intencionalmente neutro_ (apenas log).                                                     |
| `npm run test:ci`          | Executa testes unitários headless (`ChromeHeadless`).                                       |

> ℹ️ Política anti-Jasmine: `npm test` não roda specs – use somente `npm run test:ci` se quiser executá-las.

---

## 🌐 Internacionalização

- Idioma padrão: **pt-BR**
- Idiomas suportados: pt-BR / en-US
- Troca de idioma via `LanguageSwitcherComponent`.
- Dados (`profile.pt.json` / `profile.en.json`) e traduções (`pt.json` / `en.json`) mantêm paridade de conteúdo.

---

## 🎨 Acessibilidade & UI

- Skip link (`Ir direto para o conteúdo`) habilita navegação por teclado.
- Componentes com aria-labels dinâmicos (chips, ratings, cards).
- Tema claro/escuro controlado pelo usuário e persistido (`localStorage`), com fallback para `prefers-color-scheme`.
- Layout responsivo, grids fluídas e CTA principal com foco visual.

---

## ☁️ Deploy

### GitHub Pages (estático)
1. `npm run build:ssg`
2. Publicar `dist/portfolio/browser` (workflow `deploy.yml` já automatiza para o branch `gh-pages`/Pages).

### SSR em Vercel / Render
1. `npm run build:ssr`
2. Executar `npm run serve:ssr` no ambiente com Node 18.
3. Ajustar rewrites para direcionar requisições ao servidor Express.

---

## 🧩 Próximos Incrementos

- Substituir placeholders de screenshots em `src/assets/screenshots`.
- Atualizar `src/assets/docs/juan-mendes-cv.pdf` e demais evidências antes do deploy.
- Acrescentar testes de componentes críticos (linhas temporais, formulários).
- Configurar monitoramento de uptime ou analytics se necessário.

---

## 📄 Licença & Créditos

Projeto proprietário de **Juan Mendes**. Uso pessoal/portfólio; entre em contato para discutir reutilização ou contribuições.

---

## 📬 Contato

- [LinkedIn](https://www.linkedin.com/in/juan-mendes-739084273/)
- [GitHub](https://github.com/juanmmendes)
- [Email](mailto:juan.zx016@gmail.com)

Sinta-se à vontade para abrir issues ou PRs com melhorias. Bons builds! 💻✨

