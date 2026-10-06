"""Generates the static service pages (/criacao-de-sites/, /landing-pages/, /sistemas-personalizados/).

Edit the PAGES content below and run:  npm run build:pages
"""

import json, os, html
from urllib.parse import quote

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))

SITE = "https://meleiro.tech"
WA = "5583993041956"

ICONS = {
    "layout": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>',
    "phone": '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    "search": '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    "bolt": '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    "chat": '<path d="M4 20l1.3-3.9A8 8 0 1112 20a8 8 0 01-4.1-1.1z"/>',
    "shield": '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    "edit": '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
    "chart": '<path d="M4 20V14M10 20V9M16 20V4M2 20h20"/>',
    "target": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    "plug": '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a4 4 0 014 4v5.5M15.5 18H10a4 4 0 01-4-4V8.5"/>',
    "db": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    "users": '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 7M18 14a6 6 0 013.5 6"/>',
    "cloud": '<path d="M7 18a5 5 0 01-.6-9.96A6 6 0 0118 9a4.5 4.5 0 01-.5 9z"/>',
    "flask": '<path d="M9 3h6M10 3v6L4.5 19A1.5 1.5 0 006 21h12a1.5 1.5 0 001.5-2L14 9V3"/>',
}

PAGES = [
    {
        "slug": "criacao-de-sites",
        "name": "Criação de Sites",
        "title": "Criação de Sites Profissionais para Empresas | Meleiro Tech",
        "desc": "Criação de sites profissionais, rápidos e otimizados para o Google. Sites institucionais e corporativos sob medida para empresas de todo o Brasil. Orçamento grátis.",
        "h1": 'Criação de sites profissionais <span class="hl">que vendem pela sua empresa.</span>',
        "lead": "Desenvolvemos sites institucionais e corporativos sob medida, com design moderno, carregamento rápido e estrutura pensada para aparecer no Google. Atendimento remoto para empresas de todo o Brasil.",
        "wa": "Olá, Meleiro Tech! Vim pelo site e quero um orçamento de criação de site.",
        "facts": ["Design exclusivo", "100% responsivo", "Otimizado para o Google", "Atendimento em todo o Brasil"],
        "features_title": 'O que está incluso no <span class="hl">seu site</span>',
        "features": [
            ("layout", "Design exclusivo", "Layout criado para a sua marca, sem templates genéricos. Seu site com a cara do seu negócio."),
            ("phone", "Responsivo de verdade", "Experiência impecável no celular, tablet e computador, onde a maioria dos seus clientes está."),
            ("search", "SEO desde o início", "Estrutura, títulos, metadados e dados estruturados para o Google entender e indexar seu site."),
            ("bolt", "Carregamento rápido", "Código leve e imagens otimizadas. Site rápido melhora a experiência e o posicionamento."),
            ("chat", "Contato fácil", "Formulário, botão de WhatsApp e mapa para transformar visitas em conversas."),
            ("shield", "Seguro e publicado", "HTTPS, domínio próprio e publicação inclusos. Entregamos o site no ar, pronto para uso."),
        ],
        "types_title": 'Sites para cada <span class="hl">tipo de negócio</span>',
        "types_lead": "Seja para apresentar sua empresa, gerar contatos ou passar credibilidade, criamos o site certo para o seu objetivo.",
        "types": [
            ("Site institucional", "Apresente sua empresa, serviços e diferenciais."),
            ("Site corporativo", "Estrutura completa para empresas com várias áreas."),
            ("Site para profissionais", "Advogados, médicos, consultores e prestadores de serviço."),
            ("Portfólio", "Mostre seus trabalhos de forma visual e profissional."),
            ("Site com blog", "Conteúdo que atrai visitas do Google o ano todo."),
            ("Site bilíngue", "Português e inglês para alcançar clientes de fora."),
        ],
        "steps": [
            ("Briefing", "Entendemos seu negócio, público e objetivos do site."),
            ("Design", "Criamos o layout e você aprova antes do desenvolvimento."),
            ("Desenvolvimento", "Programamos o site com foco em velocidade e SEO."),
            ("Publicação", "Colocamos no ar com domínio, HTTPS e Google Search Console."),
        ],
        "faq": [
            ("Quanto custa a criação de um site?", "O valor depende do número de páginas, funcionalidades e conteúdo. Enviamos um orçamento gratuito e sem compromisso em até 1 dia útil depois de entender o seu projeto."),
            ("Quanto tempo leva para o site ficar pronto?", "Um site institucional costuma levar de 2 a 4 semanas, dependendo do conteúdo e da quantidade de páginas. O prazo exato é definido no orçamento."),
            ("O site vai aparecer no Google?", "Sim. Todo site é entregue com a estrutura técnica de SEO, cadastrado no Google Search Console e com sitemap. O posicionamento depende também da concorrência e de ações contínuas, que podemos orientar."),
            ("Vocês atendem empresas de outras cidades?", "Sim. Somos de João Pessoa (PB) e atendemos empresas de todo o Brasil de forma remota, com reuniões online e acompanhamento pelo WhatsApp."),
            ("Eu consigo atualizar o site depois?", "Sim. Combinamos no projeto a melhor forma: ajustes sob demanda com a nossa equipe ou uma área para você editar conteúdos."),
            ("O domínio e a hospedagem estão inclusos?", "Ajudamos você a registrar o domínio e cuidamos da publicação. Os custos de domínio e hospedagem, quando houver, são informados de forma transparente no orçamento."),
        ],
    },
    {
        "slug": "landing-pages",
        "name": "Landing Pages",
        "title": "Criação de Landing Pages de Alta Conversão | Meleiro Tech",
        "desc": "Criação de landing pages de alta conversão para campanhas, lançamentos, produtos e serviços. Páginas rápidas, persuasivas e prontas para anúncios. Orçamento grátis.",
        "h1": 'Landing pages criadas para <span class="hl">transformar visitas em clientes.</span>',
        "lead": "Páginas de alta conversão para campanhas, lançamentos, produtos e serviços. Copy estratégica, design persuasivo e carregamento rápido para você aproveitar cada clique dos seus anúncios.",
        "wa": "Olá, Meleiro Tech! Vim pelo site e quero um orçamento de landing page.",
        "facts": ["Foco em conversão", "Pronta para anúncios", "Carregamento rápido", "Atendimento em todo o Brasil"],
        "features_title": 'O que torna uma landing page <span class="hl">eficiente</span>',
        "features": [
            ("target", "Estrutura de conversão", "Seções organizadas para conduzir o visitante até a ação: comprar, cadastrar ou chamar no WhatsApp."),
            ("edit", "Copy estratégica", "Textos claros e persuasivos, focados nos benefícios e nas objeções do seu público."),
            ("bolt", "Velocidade máxima", "Página leve que carrega rápido mesmo no 4G. Cada segundo a menos aumenta a conversão."),
            ("chart", "Pronta para métricas", "Integração com Google Analytics, Meta Pixel e Google Ads para medir cada resultado."),
            ("phone", "Mobile first", "Pensada primeiro para o celular, de onde vem a maior parte do tráfego de anúncios."),
            ("plug", "Integrações", "Formulários conectados ao seu e-mail, CRM, planilha ou WhatsApp."),
        ],
        "types_title": 'Landing pages para <span class="hl">cada objetivo</span>',
        "types_lead": "Uma página focada em uma única ação converte muito mais do que um site genérico. Criamos a página certa para cada campanha.",
        "types": [
            ("Captura de leads", "Formulários para gerar contatos qualificados."),
            ("Lançamentos", "Páginas de pré-lançamento, vendas e lista de espera."),
            ("Venda de produto", "Apresentação completa com prova social e oferta."),
            ("Serviços", "Página para gerar orçamentos e agendamentos."),
            ("Eventos e cursos", "Inscrições, programação e informações do evento."),
            ("Campanhas de anúncios", "Páginas alinhadas aos anúncios do Google e Meta."),
        ],
        "steps": [
            ("Estratégia", "Definimos o público, a oferta e a ação principal da página."),
            ("Copy e design", "Escrevemos a estrutura e criamos o layout para aprovação."),
            ("Desenvolvimento", "Página rápida, responsiva e integrada às suas ferramentas."),
            ("Lançamento", "Publicamos, configuramos as métricas e acompanhamos os resultados."),
        ],
        "faq": [
            ("Qual a diferença entre landing page e site?", "O site apresenta a empresa como um todo, com várias páginas. A landing page é uma página única e focada em um objetivo, como gerar contatos ou vender um produto, por isso converte mais em campanhas."),
            ("Quanto custa uma landing page?", "Depende da quantidade de seções, da produção de textos e das integrações. Enviamos um orçamento gratuito em até 1 dia útil."),
            ("Em quanto tempo a landing page fica pronta?", "Uma landing page costuma ficar pronta entre 1 e 2 semanas após a aprovação do conteúdo. Para lançamentos com data marcada, planejamos o cronograma junto com você."),
            ("Vocês escrevem os textos da página?", "Sim. Podemos criar a copy a partir do briefing ou adaptar os textos que você já tem para uma estrutura que converte melhor."),
            ("A página funciona com Google Ads e Meta Ads?", "Sim. Configuramos Google Analytics, Meta Pixel e as tags de conversão para você medir o retorno de cada campanha."),
        ],
    },
    {
        "slug": "sistemas-personalizados",
        "name": "Sistemas Personalizados",
        "title": "Desenvolvimento de Sistemas Personalizados | Meleiro Tech",
        "desc": "Desenvolvimento de sistemas web sob medida: sistemas de gestão, dashboards, plataformas, APIs, integrações e automações para empresas de todo o Brasil. Orçamento grátis.",
        "h1": 'Sistemas personalizados <span class="hl">feitos para o seu processo.</span>',
        "lead": "Desenvolvemos software sob medida para resolver problemas reais do seu negócio: sistemas de gestão, dashboards, plataformas, APIs, integrações e automações. Menos planilha, mais controle.",
        "wa": "Olá, Meleiro Tech! Vim pelo site e quero um orçamento de sistema personalizado.",
        "facts": ["Sob medida", "Levantamento de requisitos", "Escalável", "Atendimento em todo o Brasil"],
        "features_title": 'Como construímos o <span class="hl">seu sistema</span>',
        "features": [
            ("users", "Requisitos bem definidos", "Mapeamos seu processo com quem usa no dia a dia antes de escrever qualquer linha de código."),
            ("layout", "Interface fácil de usar", "Telas pensadas para a rotina da sua equipe, com protótipo validado antes do desenvolvimento."),
            ("db", "Dados organizados", "Banco de dados estruturado, relatórios e dashboards para decisões baseadas em números."),
            ("plug", "Integrações e APIs", "Conectamos o sistema a ERPs, gateways de pagamento, WhatsApp e outras ferramentas."),
            ("flask", "Qualidade e testes", "Validação funcional em cada entrega para o sistema chegar estável às mãos da sua equipe."),
            ("cloud", "Na nuvem e escalável", "Sistema web acessível de qualquer lugar e preparado para crescer com o negócio."),
        ],
        "types_title": 'O que podemos <span class="hl">desenvolver</span>',
        "types_lead": "Se o seu processo ainda depende de planilhas, papel ou ferramentas que não conversam entre si, existe uma solução sob medida.",
        "types": [
            ("Sistemas de gestão", "Clientes, pedidos, estoque, financeiro e equipe."),
            ("Dashboards", "Indicadores do negócio em tempo real."),
            ("Plataformas web", "Portais de clientes, áreas de membros e marketplaces."),
            ("APIs", "Serviços para integrar aplicações e parceiros."),
            ("Integrações", "Sistemas, planilhas e ferramentas conectados."),
            ("Automações", "Tarefas repetitivas executadas automaticamente."),
        ],
        "steps": [
            ("Descoberta", "Levantamento de requisitos e mapeamento do seu processo."),
            ("Protótipo", "Telas e fluxos validados com você antes de programar."),
            ("Desenvolvimento ágil", "Entregas em ciclos curtos, com acompanhamento constante."),
            ("Implantação", "Publicação, treinamento da equipe e suporte evolutivo."),
        ],
        "faq": [
            ("Quanto custa desenvolver um sistema personalizado?", "Cada sistema é único, então o investimento depende das funcionalidades, integrações e do número de usuários. Começamos com uma conversa sem custo para entender o processo e enviar uma proposta."),
            ("Quanto tempo leva o desenvolvimento?", "Trabalhamos com entregas em etapas. Uma primeira versão funcional costuma ficar pronta em algumas semanas, e o sistema evolui a partir do uso real."),
            ("Por que um sistema sob medida em vez de um pronto?", "Sistemas prontos obrigam sua empresa a se adaptar a eles. Um sistema sob medida segue o seu processo, elimina retrabalho e cresce junto com o negócio."),
            ("O sistema pode se integrar com as ferramentas que já uso?", "Sim. Integramos com ERPs, planilhas, gateways de pagamento, WhatsApp e outros serviços que ofereçam API."),
            ("Vocês dão suporte depois da entrega?", "Sim. Oferecemos suporte e evolução contínua, com novas funcionalidades e ajustes conforme a necessidade da sua empresa."),
        ],
    },
]

ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1112 20a8 8 0 01-4.1-1.1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/></svg>'


def strip_tags(s):
    import re
    return re.sub(r"<[^>]+>", "", s)


def json_ld(page, url):
    data = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": page["name"],
            "serviceType": page["name"],
            "description": page["desc"],
            "url": url,
            "areaServed": {"@type": "Country", "name": "Brasil"},
            "provider": {"@id": f"{SITE}/#organization"},
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Início", "item": f"{SITE}/"},
                {"@type": "ListItem", "position": 2, "name": "Serviços", "item": f"{SITE}/#servicos"},
                {"@type": "ListItem", "position": 3, "name": page["name"], "item": url},
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                for q, a in page["faq"]
            ],
        },
    ]
    return "\n".join(
        f'  <script type="application/ld+json">{json.dumps(d, ensure_ascii=False)}</script>' for d in data
    )


def render(page):
    url = f"{SITE}/{page['slug']}/"
    wa = f"https://wa.me/{WA}?text={quote(page['wa'])}"
    e = html.escape
    others = [p for p in PAGES if p is not page]

    features = "\n".join(
        f'''          <article class="svc-card reveal" data-delay="{i % 3 + 1}">
            <div class="svc-card__icon"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[ic]}</svg></div>
            <h3>{e(t)}</h3>
            <p>{e(d)}</p>
          </article>'''
        for i, (ic, t, d) in enumerate(page["features"])
    )
    types = "\n".join(f"            <li><b>{e(t)}</b><span>{e(d)}</span></li>" for t, d in page["types"])
    steps = "\n".join(f"          <li><h3>{e(t)}</h3><p>{e(d)}</p></li>" for t, d in page["steps"])
    faq = "\n".join(
        f"          <details{' open' if i == 0 else ''}><summary>{e(q)}</summary><p>{e(a)}</p></details>"
        for i, (q, a) in enumerate(page["faq"])
    )
    facts = "\n".join(f"          <li>{e(f)}</li>" for f in page["facts"])
    related = "\n".join(
        f'''          <a href="/{p['slug']}/"><span><small>Serviço</small><b>{e(p['name'])}</b></span>{ARROW}</a>'''
        for p in others
    )

    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{e(page["title"])}</title>
  <meta name="description" content="{e(page["desc"])}" />
  <meta name="theme-color" content="#01102F" />
  <link rel="canonical" href="{url}" />
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/icons/icon-96.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/img/icons/icon-192.png" />
  <link rel="apple-touch-icon" href="/assets/img/icons/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Meleiro Tech" />
  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{e(page["title"])}" />
  <meta property="og:description" content="{e(page["desc"])}" />
  <meta property="og:image" content="{SITE}/assets/img/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="pt_BR" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="preload" href="/assets/fonts/chakra-petch-700.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/assets/dist/css/page.css" />
  <script type="module" src="/assets/dist/js/page.js"></script>
{json_ld(page, url)}
</head>
<body>
  <div class="noise" aria-hidden="true"></div>

  <!-- ================= HEADER ================= -->
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="/" class="header__logo" aria-label="Meleiro Tech">
        <img src="/assets/img/logo-horizontal.webp" srcset="/assets/img/logo-horizontal-130.webp 129w, /assets/img/logo-horizontal-260.webp 259w, /assets/img/logo-horizontal.webp 377w" sizes="97px" alt="Meleiro Tech" width="377" height="140" />
      </a>

      <nav class="nav" id="nav" aria-label="Principal">
        <ul class="nav__list">
          <li><a href="/" class="nav__link">Início</a></li>
          <li><a href="/#servicos" class="nav__link is-active">Serviços</a></li>
          <li><a href="/#projetos" class="nav__link">Projetos</a></li>
          <li><a href="/#sobre" class="nav__link">Sobre</a></li>
          <li><a href="/#contato" class="nav__link">Contato</a></li>
        </ul>
        <div class="nav__mobile-extra">
          <a href="{e(wa)}" target="_blank" rel="noopener" class="btn btn--primary btn--block">Solicitar orçamento</a>
        </div>
      </nav>

      <div class="header__actions">
        <a href="{e(wa)}" target="_blank" rel="noopener" class="btn btn--primary btn--sm">Solicitar orçamento</a>
        <button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav">
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- ================= HERO ================= -->
    <section class="svc-hero">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumb reveal">
            <li><a href="/">Início</a></li>
            <li><a href="/#servicos">Serviços</a></li>
            <li aria-current="page">{e(page["name"])}</li>
          </ol>
        </nav>
        <h1 class="svc-hero__title reveal" data-delay="1">{page["h1"]}</h1>
        <p class="svc-hero__lead reveal" data-delay="2">{e(page["lead"])}</p>
        <div class="svc-hero__ctas reveal" data-delay="3">
          <a href="{e(wa)}" target="_blank" rel="noopener" class="btn btn--primary magnetic">{WA_ICON}<span>Pedir orçamento no WhatsApp</span></a>
          <a href="/#projetos" class="btn btn--ghost"><span>Ver projetos</span></a>
        </div>
        <ul class="svc-hero__facts reveal" data-delay="4">
{facts}
        </ul>
      </div>
    </section>

    <!-- ================= INCLUSO ================= -->
    <section class="svc-section">
      <div class="container">
        <header class="section__head">
          <span class="kicker reveal"><b>//</b> <span>{e(page["name"])}</span></span>
          <h2 class="section__title reveal" data-delay="1">{page["features_title"]}</h2>
        </header>
        <div class="svc-grid">
{features}
        </div>
      </div>
    </section>

    <!-- ================= TIPOS ================= -->
    <section class="svc-section svc-section--alt">
      <div class="container svc-split">
        <header class="section__head">
          <span class="kicker reveal"><b>//</b> <span>Soluções</span></span>
          <h2 class="section__title reveal" data-delay="1">{page["types_title"]}</h2>
          <p class="section__lead reveal" data-delay="2">{e(page["types_lead"])}</p>
        </header>
        <ul class="svc-types reveal" data-delay="2">
{types}
        </ul>
      </div>
    </section>

    <!-- ================= PROCESSO ================= -->
    <section class="svc-section">
      <div class="container">
        <header class="section__head">
          <span class="kicker reveal"><b>//</b> <span>Como funciona</span></span>
          <h2 class="section__title reveal" data-delay="1">Do briefing ao <span class="hl">projeto no ar.</span></h2>
        </header>
        <ol class="svc-steps reveal" data-delay="2">
{steps}
        </ol>
      </div>
    </section>

    <!-- ================= FAQ ================= -->
    <section class="svc-section svc-section--alt">
      <div class="container">
        <header class="section__head">
          <span class="kicker reveal"><b>//</b> <span>Dúvidas frequentes</span></span>
          <h2 class="section__title reveal" data-delay="1">Perguntas sobre <span class="hl">{e(page["name"].lower())}</span></h2>
        </header>
        <div class="faq reveal" data-delay="2">
{faq}
        </div>
      </div>
    </section>

    <!-- ================= OUTROS SERVIÇOS ================= -->
    <section class="svc-section">
      <div class="container">
        <header class="section__head">
          <span class="kicker reveal"><b>//</b> <span>Outros serviços</span></span>
        </header>
        <div class="svc-related reveal" data-delay="1">
{related}
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-panel reveal">
          <div class="cta-panel__mascot" aria-hidden="true"></div>
          <div class="cta-panel__grid" aria-hidden="true"></div>
          <div class="cta-panel__content">
            <span class="kicker"><b>//</b> <span>Próximo passo</span></span>
            <h2 class="cta-panel__title">
              <span>Vamos tirar seu projeto</span>
              <span class="hl">do papel?</span>
            </h2>
            <p class="cta-panel__text">Conte o que você precisa e receba um orçamento gratuito em até 1 dia útil. Atendemos empresas de todo o Brasil.</p>
            <a href="{e(wa)}" target="_blank" rel="noopener" class="btn btn--primary btn--lg magnetic">
              <span>Falar no WhatsApp</span>
              <svg class="btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <img src="/assets/img/logo-horizontal.webp" srcset="/assets/img/logo-horizontal-130.webp 129w, /assets/img/logo-horizontal-260.webp 259w, /assets/img/logo-horizontal.webp 377w" sizes="124px" alt="Meleiro Tech" class="footer__logo" width="377" height="140" loading="lazy" />
          <p>Software, design e tecnologia para transformar ideias em soluções.</p>
        </div>

        <nav class="footer__nav" aria-label="Footer">
          <a href="/criacao-de-sites/">Criação de sites</a>
          <a href="/landing-pages/">Landing pages</a>
          <a href="/sistemas-personalizados/">Sistemas</a>
          <a href="/#contato">Contato</a>
        </nav>

        <div class="footer__side">
          <div class="socials">
            <a href="https://www.instagram.com/meleiro.tech/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg></a>
            <a href="https://www.linkedin.com/in/sabrina-meleiro-195940142/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.5v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.5 2.3-2.5S16 11.4 16 13v3"/></svg></a>
            <a href="mailto:meleiro.tech@gmail.com" aria-label="E-mail"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>
            <a href="https://wa.me/{WA}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1112 20a8 8 0 01-4.1-1.1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/></svg></a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© <span id="year">2026</span> Meleiro Tech. Todos os direitos reservados.</span>
        <span class="footer__mono">João Pessoa, PB · Atendimento em todo o Brasil</span>
      </div>
    </div>
    <div class="footer__mascot mascot-dots" aria-hidden="true"></div>
  </footer>
</body>
</html>
'''


for p in PAGES:
    os.makedirs(p["slug"], exist_ok=True)
    with open(os.path.join(p["slug"], "index.html"), "w") as f:
        f.write(render(p))
    print("wrote", p["slug"])
