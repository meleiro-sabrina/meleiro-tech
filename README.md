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
- **Leve e rápido** — HTML, CSS e JavaScript puros, empacotados com [esbuild](https://esbuild.github.io) em um CSS e um JS minificados, com fontes hospedadas no próprio site.
- **Formulário funcional** — envio para o e-mail via [FormSubmit](https://formsubmit.co) e alternativa de envio pelo WhatsApp com a mensagem já preenchida.
- **Animações com propósito** — reveal on scroll, parallax, partículas e constelação de tecnologias, todas respeitando `prefers-reduced-motion`.
- **Responsivo** — layouts dedicados para desktop, tablet e celular.
- **SEO** — páginas dedicadas por serviço, dados estruturados (Schema.org), Open Graph, `sitemap.xml` e `robots.txt`.

## Estrutura

```text
.
├── index.html                 # Página inicial com todas as seções
├── criacao-de-sites/          # Páginas de serviço (geradas por scripts/)
├── landing-pages/
├── sistemas-personalizados/
├── assets/
│   ├── css/
│   │   ├── main.css           # Entrada da página inicial (importa os demais na ordem certa)
│   │   ├── page.css           # Entrada das páginas de serviço
│   │   ├── fonts.css          # Fontes da marca hospedadas localmente
│   │   ├── base.css           # Tokens da marca, reset e utilitários
│   │   ├── components.css     # Botões, toast e peças reutilizáveis
│   │   ├── layout.css         # Header, navegação, seções e footer
│   │   ├── sections/          # Um arquivo por seção da página inicial
│   │   ├── pages/             # Estilos das páginas de serviço
│   │   └── animations.css     # Reveal, keyframes e reduced motion (carregar por último)
│   ├── js/
│   │   ├── main.js            # Ponto de entrada da página inicial
│   │   ├── page.js            # Ponto de entrada das páginas de serviço
│   │   ├── config.js          # Contatos, endpoint do formulário e idioma padrão
│   │   ├── core/              # DOM helpers, i18n, scroll e toast
│   │   ├── modules/           # Um módulo por funcionalidade da página
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
