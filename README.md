# lp_jesseld

Portfólio pessoal de **Jessé Oliveira** — Full Stack & Mobile Developer.

Landing page estática, multilíngue, com foco em apresentação cinematográfica: loader, cursor customizado, animações GSAP/ScrollTrigger, efeito typed e skills categorizadas.

🔗 **Live:** [jesseld.com.br](https://jesseld.com.br) <!-- ajuste se o domínio for outro -->

## Idiomas

- 🇧🇷 Português — [`index.html`](index.html)
- 🇺🇸 English — [`en/index.html`](en/index.html)
- 🇪🇸 Español — [`es/index.html`](es/index.html)

## Stack

- HTML estático puro — **sem build system**
- CSS customizado (`assets/css/style.css`)
- JavaScript vanilla modular (`assets/js/`)
- [GSAP](https://gsap.com/) + ScrollTrigger — animações de scroll
- [Typed.js](https://github.com/mattboldt/typed.js/) — efeito de digitação
- [Lucide](https://lucide.dev/) + [Devicon](https://devicon.dev/) — ícones
- Fontes: Bricolage Grotesque, DM Sans, Instrument Serif (Google Fonts)

## Deploy

Otimizado para [Vercel](https://vercel.com/) via `vercel.json`:
- `/assets/*` com cache `immutable` (1 ano)
- HTML com `must-revalidate`
- `cleanUrls: true` — `/en/index.html` → `/en`

## Estrutura

```
.
├── index.html                  # PT (raiz)
├── en/index.html               # EN
├── es/index.html               # ES
├── assets/
│   ├── css/style.css
│   ├── js/                     # main, anim, menu, data, particle, actions
│   ├── img/                    # hero, dividers, fotos, logos, favicon
│   └── static/                 # 3 PDFs de currículo (PT/EN/ES)
├── llms.txt                    # sumário para LLMs / SEO
├── vercel.json                 # cache headers + clean URLs
├── LICENSE
└── README.md
```

## Rodar localmente

Nenhum build é necessário. Basta servir a pasta com qualquer servidor estático:

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

Abra `http://localhost:8000`.

## Currículos

- PT — [`assets/static/Curriculo_Jesse_Oliveira_PT.pdf`](assets/static/Curriculo_Jesse_Oliveira_PT.pdf)
- EN — [`assets/static/Resume_Jesse_Oliveira_EN.pdf`](assets/static/Resume_Jesse_Oliveira_EN.pdf)
- ES — [`assets/static/CV_Jesse_Oliveira_ES.pdf`](assets/static/CV_Jesse_Oliveira_ES.pdf)

## Contato

- **Email:** dev.jesseoliveira@gmail.com
- **GitHub:** [@jesseld](https://github.com/jesseld)
- **LinkedIn:** [jesseoliveira10](https://www.linkedin.com/in/jesseoliveira10/)
- **WhatsApp:** [+55 75 98828-7627](https://wa.me/5575988287627)

## Licença

MIT — veja [LICENSE](LICENSE).
