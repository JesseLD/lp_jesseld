# lp_jesseld

Portfólio pessoal de **Jessé Oliveira** — Full Stack & Mobile Developer.

Landing page multilíngue (PT/EN/ES) construída em [Astro](https://astro.build/) com foco em apresentação cinematográfica: loader, cursor customizado, animações GSAP/ScrollTrigger, efeito typed e skills categorizadas.

🔗 **Live:** [jesseoliveira.com.br](https://www.jesseoliveira.com.br)

## Idiomas

- 🇧🇷 Português — `/`
- 🇺🇸 English — `/en/`
- 🇪🇸 Español — `/es/`

## Stack

- [Astro 5](https://astro.build/) — static site generator
- CSS vanilla customizado (`public/assets/css/style.css`)
- JavaScript vanilla (`public/assets/js/`)
- [GSAP](https://gsap.com/) + ScrollTrigger — animações de scroll
- [Typed.js](https://github.com/mattboldt/typed.js/) — efeito de digitação
- [Lucide](https://lucide.dev/) + [Devicon](https://devicon.dev/) — ícones
- Fontes: Bricolage Grotesque, DM Sans, Instrument Serif (Google Fonts)

## Estrutura

```
.
├── public/                         # servido em /
│   ├── assets/{css,js,img,static}  # CSS, JS, imagens e PDFs (inalteráveis)
│   ├── favicon.png
│   └── llms.txt
├── src/
│   ├── data/i18n.ts                # dicionário de traduções (PT/EN/ES)
│   ├── layouts/BaseLayout.astro    # head + scripts + chrome compartilhado
│   ├── components/                 # Navbar, Hero, About, Skills, ... (orientados por locale)
│   └── pages/
│       ├── index.astro             # PT (raiz)
│       ├── en/index.astro
│       └── es/index.astro
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── vercel.json                     # cache headers
└── README.md
```

## Scripts

```bash
npm install      # instala dependências
npm run dev      # dev server com HMR em http://localhost:4321
npm run build    # gera site estático em dist/
npm run preview  # serve o dist/ localmente
```

## Deploy

Vercel detecta o projeto Astro automaticamente via `package.json` e builda para `dist/`.

`vercel.json` define:
- `/assets/*` e `/_astro/*` com cache `immutable` (1 ano)
- `llms.txt` com `Content-Type: text/plain`

## Adicionar/editar conteúdo

- **Strings traduzíveis** → `src/data/i18n.ts` (os 3 objetos `pt`, `en`, `es`)
- **Estrutura de uma seção** → componente correspondente em `src/components/`
- **Novos assets** → `public/assets/...` (sem rebuild necessário no dev)

## Currículos

- PT — [`/assets/static/Curriculo_Jesse_Oliveira_PT.pdf`](public/assets/static/Curriculo_Jesse_Oliveira_PT.pdf)
- EN — [`/assets/static/Resume_Jesse_Oliveira_EN.pdf`](public/assets/static/Resume_Jesse_Oliveira_EN.pdf)
- ES — [`/assets/static/CV_Jesse_Oliveira_ES.pdf`](public/assets/static/CV_Jesse_Oliveira_ES.pdf)

## Contato

- **Email:** dev.jesseoliveira@gmail.com
- **GitHub:** [@jesseld](https://github.com/jesseld)
- **LinkedIn:** [jesseoliveira10](https://www.linkedin.com/in/jesseoliveira10/)
- **WhatsApp:** [+55 75 98828-7627](https://wa.me/5575988287627)

## Licença

MIT — veja [LICENSE](LICENSE).
