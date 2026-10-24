<div align="center">

<img src="assets/img/logo-horizontal.png" alt="Meleiro Tech" height="64" />

### Transformamos ideias em software.

Site institucional da **Meleiro Tech** — websites, landing pages e sistemas personalizados.

[**meleiro.tech**](https://meleiro.tech) · [Instagram](https://instagram.com/meleiro.tech) · [WhatsApp](https://wa.me/5583993041956)

</div>

<br />

![Prévia do site em desktop](docs/preview-desktop.jpg)

<table>
  <tr>
    <td width="70%"><img src="docs/preview-portfolio.jpg" alt="Seção de projetos" /></td>
    <td width="30%"><img src="docs/preview-mobile.jpg" alt="Versão mobile" /></td>
  </tr>
</table>

## Destaques

- **Bilíngue** — PT-BR (padrão) e EN-US com troca instantânea e preferência salva no navegador.
- **Homepage imersiva** — scroll suave (Lenis), serviços em painéis horizontais no desktop e reveal com GSAP. No celular o toque continua nativo. Tudo respeita `prefers-reduced-motion`, e o texto fica visível sem JavaScript.
- **Leve e rápido** — a lógica da página é empacotada com [esbuild](https://esbuild.github.io). GSAP, ScrollTrigger e Lenis ficam em `assets/js/vendor/` (scripts clássicos, como no protótipo aprovado) para não inflar o bundle da aplicação.
- **Formulário funcional** — envio para o e-mail via [FormSubmit](https://formsubmit.co), campo anti-spam e alternativa de envio pelo WhatsApp com a mensagem já preenchida.
- **Responsivo** — painéis horizontais só a partir de 1024px; no celular as seções empilham.
- **SEO** — páginas dedicadas por serviço, dados estruturados (Schema.org), Open Graph, `sitemap.xml` e `robots.txt`.

### Prova social

Depoimentos e logos de clientes **não** entram no ar enquanto forem placeholder. O HTML está comentado em `index.html` (seção `#prova`) e o interruptor `SHOW_SOCIAL_PROOF` em [`assets/js/social-proof.js`](assets/js/social-proof.js) continua `false`. Para publicar, troque os textos entre colchetes por conteúdo real, descomente a seção e mude a flag para `true`. Não inventar clientes, números ou logos.

## Estrutura

```text
.
├── index.html                 # Homepage imersiva
├── criacao-de-sites/          # Páginas de serviço (geradas por scripts/)
├── landing-pages/
├── sistemas-personalizados/
├── assets/
│   ├── css/
│   │   ├── main.css           # CSS autossuficiente da homepage
│   │   ├── page.css           # Entrada das páginas de serviço (layout anterior)
│   │   ├── fonts.css          # Fontes usadas pelas páginas de serviço
│   │   ├── base.css           # Tokens da marca, reset e utilitários
│   │   ├── components.css     # Botões e peças das páginas de serviço
│   │   ├── layout.css         # Header, navegação e footer das páginas de serviço
│   │   ├── sections/          # CTA compartilhado pelas páginas de serviço
│   │   ├── pages/             # Estilos das páginas de serviço
│   │   └── animations.css     # Reveal das páginas de serviço
│   ├── js/
│   │   ├── main.js            # Entrada da homepage (i18n, formulário, scroll)
│   │   ├── page.js            # Entrada das páginas de serviço
│   │   ├── social-proof.js    # Flag para religar depoimentos reais
│   │   ├── vendor/            # GSAP, ScrollTrigger e Lenis (não editar)
│   │   ├── config.js          # Contatos, endpoint do formulário e idioma padrão
│   │   ├── core/              # DOM helpers, i18n, scroll e toast
│   │   ├── modules/           # Comportamento da homepage e das páginas de serviço
│   │   └── locales/           # Textos em pt e en
│   ├── dist/                  # Arquivos gerados pelo build (não editar)
│   ├── fonts/                 # Chakra Petch, Inter e JetBrains Mono (woff2)
│   └── img/                   # Imagens otimizadas para a web
├── brand/                     # Arquivos originais da identidade visual
├── scripts/                   # Gerador das páginas de serviço
└── docs/                      # Imagens usadas neste README
```

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse <http://localhost:5173>. O servidor de desenvolvimento recompila CSS e JS a cada recarregamento.

## Build

Os arquivos editáveis ficam em `assets/css` e `assets/js`. O site publicado usa os pacotes minificados em `assets/dist/`, que precisam ser gerados antes do commit:

```bash
npm run build   # gera as páginas de serviço e os pacotes em assets/dist/
```

A CI do GitHub falha se `assets/dist/` ou as páginas de serviço estiverem desatualizados.

## Configuração

Os dados de contato ficam centralizados em [`assets/js/config.js`](assets/js/config.js):

```js
export const CONTACT = { email: "meleiro.tech@gmail.com", whatsapp: "5583993041956" };
```

Os textos do site ficam em [`assets/js/locales/`](assets/js/locales). Para editar um texto, altere a mesma chave em `pt.js` e `en.js`.

O conteúdo das páginas de serviço fica em [`scripts/build-service-pages.py`](scripts/build-service-pages.py). Depois de editar, gere as páginas novamente:

```bash
npm run build
```

## Padrões de código

```bash
npm run format        # formata CSS, JS, JSON e Markdown com Prettier
npm run format:check  # verifica a formatação
```

As convenções de editor estão em [`.editorconfig`](.editorconfig).

## Deploy

Publicado automaticamente pelo **GitHub Pages** a partir da branch `main`, com domínio personalizado definido em [`CNAME`](CNAME) e HTTPS obrigatório.

## Identidade visual

| Token | Cor       |
| ----- | --------- |
| Navy  | `#01102F` |
| Lime  | `#D7F300` |

Tipografia: **Chakra Petch** (títulos), **Inter** (texto) e **JetBrains Mono** (detalhes técnicos).

---

<div align="center">
  <sub>© Meleiro Tech. Todos os direitos reservados.</sub>
</div>
