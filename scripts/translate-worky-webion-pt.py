#!/usr/bin/env python3
"""Traduz texto visível em inglês para pt-BR nos demos Worky e Webion."""
from __future__ import annotations

import re
from pathlib import Path

DEMOS = [
    Path("/home/usuario/meleiro/projetos/worky"),
    Path("/home/usuario/meleiro/projetos/webion"),
]

# Ordem: strings mais longas primeiro (evita substituições parciais)
TRANSLATIONS: list[tuple[str, str]] = [
    # Titles & meta
    ("Worky Lite &#8211; Just another WordPress site", "Worky Lite &#8211; Site demonstrativo"),
    ("Webion Lite &#8211; Just another WordPress site", "Webion Lite &#8211; Site demonstrativo"),
    ("ABOUT &#8211; Worky Lite", "SOBRE &#8211; Worky Lite"),
    ("ABOUT &#8211; Webion Lite", "SOBRE &#8211; Webion Lite"),
    ("SERVICES &#8211; Worky Lite", "SERVIÇOS &#8211; Worky Lite"),
    ("CONTACTS &#8211; Webion Lite", "CONTATO &#8211; Webion Lite"),
    ("BLOG &#8211; Worky Lite", "BLOG &#8211; Worky Lite"),
    ("BLOG &#8211; Webion Lite", "BLOG &#8211; Webion Lite"),
    ("2019 &#8211; Worky Lite", "2019 &#8211; Worky Lite"),
    ("2019 &#8211; Webion Lite", "2019 &#8211; Webion Lite"),
    ("April 2019 &#8211; Worky Lite", "Abril de 2019 &#8211; Worky Lite"),
    ("April 2019 &#8211; Webion Lite", "Abril de 2019 &#8211; Webion Lite"),
    ("Uncategorized &#8211; Worky Lite", "Sem categoria &#8211; Worky Lite"),
    ("Uncategorized &#8211; Webion Lite", "Sem categoria &#8211; Webion Lite"),
    ("admin &#8211; Worky Lite", "admin &#8211; Worky Lite"),
    ("admin &#8211; Webion Lite", "admin &#8211; Webion Lite"),
    ("Tips on Buying a Fixer Upper &#8211; Worky Lite", "Dicas para comprar imóvel para reformar &#8211; Worky Lite"),
    ("Tips on Buying a Fixer Upper-2 &#8211; Worky Lite", "Dicas para comprar imóvel para reformar 2 &#8211; Worky Lite"),
    ("Fitting a Square Building &#8211; Worky Lite", "Adequando um edifício quadrado &#8211; Worky Lite"),
    ("Modern Extension to Brick House &#8211; Worky Lite", "Extensão moderna em casa de tijolos &#8211; Worky Lite"),
    ("Groundbreaking Women in Construction &#8211; Worky Lite", "Mulheres pioneiras na construção &#8211; Worky Lite"),
    ("24/7 Effective And Friendly Support. &#8211; Webion Lite", "Suporte eficiente e amigável 24/7 &#8211; Webion Lite"),
    ("100% Satisfaction Guaranteed. &#8211; Webion Lite", "100% de satisfação garantida &#8211; Webion Lite"),
    ("Flexible And Multipurpose &#8211; Webion Lite", "Flexível e multipropósito &#8211; Webion Lite"),
    ("GPL3 License Advantages &#8211; Webion Lite", "Vantagens da licença GPL3 &#8211; Webion Lite"),
    ("Is Time To Coffee &#8211; Webion Lite", "Hora do café &#8211; Webion Lite"),
    ("We Love Photography &#8211; Webion Lite", "Amamos fotografia &#8211; Webion Lite"),
    ("Woman Enjoying Ride &#8211; Webion Lite", "Mulher aproveitando o passeio &#8211; Webion Lite"),
    # Parágrafos longos
    (
        "All our team collaborates with our clients, across all of our 3 offices, which are located throughout the US. Our mission is to implement the outstanding design ideas and solutions for any project we’re working on… During that process we carefully combine client’s guidelines, technical possibilities, as well as the environmental issues. Engineering and interior design solutions that we deliver are usually born after a collaborative process.",
        "Toda a nossa equipe colabora com os clientes em nossos três escritórios espalhados pelo país. Nossa missão é implementar ideias e soluções de design excepcionais em cada projeto em que trabalhamos. Nesse processo, combinamos cuidadosamente as orientações do cliente, as possibilidades técnicas e as questões ambientais. As soluções de engenharia e design de interiores que entregamos geralmente nascem de um trabalho colaborativo.",
    ),
    (
        "We apply innovative design solutions to enhance people’s residential wellbeing and to help workplaces succeed! All our team collaborates with our clients!",
        "Aplicamos soluções de design inovadoras para melhorar o bem-estar residencial das pessoas e ajudar ambientes de trabalho a prosperar! Toda a nossa equipe colabora com os clientes!",
    ),
    (
        "Designing sustainable, high-performance buildings requires an integration of architectural and engineered systems into a balanced design of sustainability and cost-effectiveness. Archus merges these practices with the unique requirements and guidelines necessary for advanced technology facilities.",
        "Projetar edifícios sustentáveis e de alto desempenho exige integrar sistemas arquitetônicos e de engenharia em um equilíbrio entre sustentabilidade e custo-benefício. Unimos essas práticas aos requisitos e diretrizes necessários para instalações de tecnologia avançada.",
    ),
    (
        "Designing sustainable, high-performance buildings requires an integration of architectural and engineered systems into a balanced design of sustainability…",
        "Projetar edifícios sustentáveis e de alto desempenho exige integrar sistemas arquitetônicos e de engenharia em um equilíbrio entre sustentabilidade…",
    ),
    (
        "It is not every construction company that can build a building from ground up and complete 80,000 sq. ft. of first class office improvement space in 13 months.",
        "Poucas construtoras conseguem erguer um edifício do zero e concluir 7.400 m² de retrofit de escritórios de primeira classe em 13 meses.",
    ),
    (
        "We specialize in author’s projects which represent your individuality. Our award-winning designers know how to create a perfect space for your. We stand for durable materials, qualitative work and innovative technologies. Enjoy our unique architectural solution and design projects! Archivolt.",
        "Somos especializados em projetos autorais que expressam sua individualidade. Nossos designers premiados sabem criar o espaço ideal para você. Defendemos materiais duráveis, trabalho de qualidade e tecnologias inovadoras. Aproveite nossas soluções arquitetônicas e projetos de design exclusivos!",
    ),
    (
        "Phone: <a href=\"tel:+5551234567\">(555)123-4567</a><br />E-mail: <a href=\"mailto:info@demolink.org\">info@demolink.org</a><br />Address: Alexandria, 32 Washingtorn str, 22303<br />Opening hours:<br />Monday — Thursday 10:00 &#8211; 23:00<br />Friday — Sunday 10:00 &#8211; 19:00",
        "Telefone: <a href=\"tel:+5551234567\">(555)123-4567</a><br />E-mail: <a href=\"mailto:info@demolink.org\">info@demolink.org</a><br />Endereço: Alexandria, 32 Washingtorn str, 22303<br />Horário de funcionamento:<br />Segunda a quinta, 10:00 &#8211; 23:00<br />Sexta a domingo, 10:00 &#8211; 19:00",
    ),
    (
        "© 2026. Worky Lite | Multipurpose Theme design by",
        "© 2026. Worky Lite | Tema multipropósito por",
    ),
    (
        "© 2026. WebionLite | Multipurpose Theme design by",
        "© 2026. WebionLite | Tema multipropósito por",
    ),
    (
        "&nbsp;We recommend focusing on 4 most essential characteristics, each vital for your company’s to have an efficient and long-standing online presence!",
        "&nbsp;Recomendamos focar em quatro características essenciais, cada uma vital para que sua empresa tenha uma presença online eficiente e duradoura!",
    ),
    (
        "We recommend focusing on 4 most essential characteristics, each vital for your company’s to have an efficient and long-standing online presence!",
        "Recomendamos focar em quatro características essenciais, cada uma vital para que sua empresa tenha uma presença online eficiente e duradoura!",
    ),
    (
        "Each business niche may require a unique functionality of its own. With that notion in mind, our team of professional WordPress coders has been working day and night to roll out a definitive collection of built-in WordPress plugins, that come with each of our WordPress themes… Due to the fact...",
        "Cada nicho de negócio pode exigir funcionalidades próprias. Pensando nisso, nossa equipe de desenvolvedores WordPress trabalhou para oferecer uma coleção de plugins integrados que acompanham nossos temas…",
    ),
    (
        "Tips on Buying a Fixer Upper There are many people that are opting to purchase a home that, in it’s current state, would make Bob Vila cry. For starters, fixer uppers could be purchased for a price so low it’ll make you giddy, while other benefits include being able to...",
        "Dicas para comprar imóvel para reformar: muitas pessoas optam por comprar uma casa que, no estado atual, precisaria de muita obra. Para começar, imóveis para reformar podem ser adquiridos por preços baixos, além de permitir personalizar o espaço…",
    ),
    (
        "There are many people that are opting to purchase a home that, in it’s current state, would make Bob Vila cry.",
        "Muitas pessoas optam por comprar uma casa que, no estado atual, precisaria de uma reforma completa.",
    ),
    (
        "Before you start scouring around for the perfect fixer upper, here are a few things to keep in mind",
        "Antes de sair em busca do imóvel ideal para reformar, vale lembrar alguns pontos",
    ),
    (
        "Before you start scouring around for the perfect fixer upper, here are a few things to keep in mind.",
        "Antes de sair em busca do imóvel ideal para reformar, vale lembrar alguns pontos.",
    ),
    (
        " For starters, fixer uppers could be purchased for a price so low it’ll make you giddy, while other benefits include being able to create a uniquely designed home suited to your own taste and potentially making a handsome profit if/when it comes time to resell. ",
        " Para começar, imóveis para reformar podem ser comprados por preços muito baixos; além disso, você pode personalizar a casa ao seu gosto e, na hora de revender, obter um bom lucro. ",
    ),
    (
        "For starters, fixer uppers could be purchased for a price so low it’ll make you giddy, while other benefits include being able to create a uniquely designed home suited to your own taste and potentially making a handsome profit if/when it comes time to resell.",
        "Para começar, imóveis para reformar podem ser comprados por preços muito baixos; além disso, você pode personalizar a casa ao seu gosto e, na hora de revender, obter um bom lucro.",
    ),
    (
        " The ideal fixer upper is the one that has mostly cosmetic issues.  Remodeling tv shows everywhere make us think that turning a home from a dilapidated mess into a space befitting a king is as easy as building a LEGO set, but, in reality one should be honest about what they can actually do themselves.  Em the end, a bad DIY job could become a serious financial, physical and emotional burden. ",
        " O imóvel ideal para reformar é aquele com problemas sobretudo estéticos. Programas de reforma na TV nos fazem achar que transformar uma casa abandonada em um palácio é fácil como montar LEGO, mas convém ser honesto sobre o que você realmente consegue fazer sozinho. No fim, um mau trabalho de DIY pode virar um peso financeiro, físico e emocional. ",
    ),
    (
        " The ideal fixer upper is the one that has mostly cosmetic issues. &nbsp;Remodeling tv shows everywhere make us think that turning a home from a dilapidated mess into a space befitting a king is as easy as building a LEGO set, but, in reality one should be honest about what they can actually do themselves. &nbsp;Em the end, a bad DIY job could become a serious financial, physical and emotional burden. ",
        " O imóvel ideal para reformar é aquele com problemas sobretudo estéticos. Programas de reforma na TV nos fazem achar que transformar uma casa abandonada em um palácio é fácil como montar LEGO, mas convém ser honesto sobre o que você realmente consegue fazer sozinho. No fim, um mau trabalho de DIY pode virar um peso financeiro, físico e emocional. ",
    ),
    (
        " Before you buy, have a certified and experienced home inspector evaluate the property.  You want to avoid getting yourself into a money pit so deep, you’ll forget what daylight looks like. There are many different types of inspections and professionals to help you create an accurate assessment of the property you’re eyeing. ",
        " Antes de comprar, contrate um inspetor residencial certificado e experiente. Evite cair num buraco negro de gastos tão profundo que você esqueça como é a luz do dia. Existem vários tipos de vistoria e profissionais que ajudam a avaliar corretamente o imóvel que você quer. ",
    ),
    (
        " Before you buy, have a certified and experienced home inspector evaluate the property. &nbsp;You want to avoid getting yourself into a money pit so deep, you’ll forget what daylight looks like. There are many different types of inspections and professionals to help you create an accurate assessment of the property you’re eyeing. ",
        " Antes de comprar, contrate um inspetor residencial certificado e experiente. Evite cair num buraco negro de gastos tão profundo que você esqueça como é a luz do dia. Existem vários tipos de vistoria e profissionais que ajudam a avaliar corretamente o imóvel que você quer. ",
    ),
    (
        "When you are ready to put an offer on the fixer upper property of your dreams, you should consider the fair market value less any upgrade/repair costs. &nbsp;Consider if you can negotiate on the purchase price. &nbsp;Some buyers are eager to sell and will possibly be flexible.",
        "Na hora de fazer uma oferta pelo imóvel para reformar dos seus sonhos, considere o valor de mercado menos os custos de reforma e reparos. Veja se dá para negociar o preço de compra — alguns vendedores estão com pressa e podem ceder.",
    ),
    (
        "When you need your company to have a new website or if you venture on updating your old webpage with a new look and functionality, the choices are versatile. Assuming that you will go the easy way and choose a theme for your WordPress website, the overall number of characteristics that you will need to keep in mind narrows down significantly.",
        "Quando sua empresa precisa de um site novo ou você decide atualizar a página antiga com visual e funcionalidades novas, as opções são muitas. Se você optar pelo caminho mais simples e escolher um tema WordPress, o número de critérios a considerar diminui bastante.",
    ),
    (
        "When you need your company to have a new website or if you venture on updating your old webpage with a new look and functionality, the choices are versatile. Assuming that you will go the easy way and choose a theme for your WordPress website, the overall number of characteristics...</p>",
        "Quando sua empresa precisa de um site novo ou você decide atualizar a página antiga com visual e funcionalidades novas, as opções são muitas. Se você optar pelo caminho mais simples e escolher um tema WordPress, o número de critérios a considerar diminui bastante…</p>",
    ),
    (
        " When you need your company to have a new website or if you venture on updating your old webpage with a new look and functionality, the choices are versatile. Assuming that you will go the easy way and choose a theme for your WordPress website, the overall number of characteristics that you will need to keep in mind narrows down significantly. <em>Como manter o foco no tipo de template que você precisa e no que espera dele?</em> Recomendamos focar em quatro características essenciais, cada uma vital para que sua empresa tenha uma presença online eficiente e duradoura! ",
        " Quando sua empresa precisa de um site novo ou você decide atualizar a página antiga com visual e funcionalidades novas, as opções são muitas. Se você optar pelo caminho mais simples e escolher um tema WordPress, o número de critérios a considerar diminui bastante. <em>Como manter o foco no tipo de template que você precisa e no que espera dele?</em> Recomendamos focar em quatro características essenciais, cada uma vital para que sua empresa tenha uma presença online eficiente e duradoura! ",
    ),
    (
        "When you need your company to have a new website or if you venture on updating your old webpage with a new look and functionality, the choices are versatile.&nbsp;Assuming that you will go the easy way and choose a theme for your WordPress website, the overall number of characteristics that you will need to keep in mind narrows down significantly.&nbsp;<em>Como manter o foco no tipo de template que você precisa e no que espera dele?</em>&nbsp;Recomendamos focar em quatro características essenciais, cada uma vital para que sua empresa tenha uma presença online eficiente e duradoura!",
        "Quando sua empresa precisa de um site novo ou você decide atualizar a página antiga com visual e funcionalidades novas, as opções são muitas. Se você optar pelo caminho mais simples e escolher um tema WordPress, o número de critérios a considerar diminui bastante. <em>Como manter o foco no tipo de template que você precisa e no que espera dele?</em> Recomendamos focar em quatro características essenciais, cada uma vital para que sua empresa tenha uma presença online eficiente e duradoura!",
    ),
    (
        "Muitas pessoas optam por comprar uma casa que, no estado atual, precisaria de uma reforma completa. For starters, fixer uppers could be purchased for a price so low it’ll make you giddy, while other benefits include being able to create a uniquely designed home suited...</p>",
        "Muitas pessoas optam por comprar uma casa que, no estado atual, precisaria de uma reforma completa. Imóveis para reformar podem sair por preços baixos e ainda permitir personalizar o lar ao seu gosto…</p>",
    ),
    (
        " Each business niche may require a unique functionality of its own. With that notion in mind, our team of professional WordPress coders has been working day and night to roll out a definitive collection of built-in WordPress plugins, that come with each of our WordPress themes… Due to the fact that this is a WordPress theme, the process of installing it and using it is truly as easy as it gets! Read our documentation to understand how fast you can go from purchasing a JetImpex WordPress theme to actually using it as a live skin for your company’s webpage. Also, the WordPress CMS (Content Management System) allows you to easily change the content (text; multimedia; blocks; pages) of any part of your new theme! ",
        " Cada nicho de negócio pode exigir funcionalidades próprias. Pensando nisso, nossa equipe de desenvolvedores WordPress preparou uma coleção de plugins integrados que acompanham nossos temas. Como se trata de um tema WordPress, instalar e usar é realmente simples! Leia nossa documentação para ver como é rápido ir da compra de um tema JetImpex WordPress até colocá-lo no ar como vitrine da sua empresa. O CMS WordPress também permite alterar facilmente textos, mídia, blocos e páginas do seu novo tema! ",
    ),
    (
        "Each business niche may require a unique functionality of its own. With that notion in mind, our team of professional WordPress coders has been working day and night to roll out a definitive collection of built-in WordPress plugins, that come with each of our WordPress themes… Due to the fact that this is a WordPress theme, the process of installing it and using it is truly as easy as it gets! Read our documentation to understand how fast you can go from purchasing a JetImpex WordPress theme to actually using it as a live skin for your company’s webpage. Also, the WordPress CMS (Content Management System) allows you to easily change the content (text; multimedia; blocks; pages) of any part of your new theme! ",
        "Cada nicho de negócio pode exigir funcionalidades próprias. Pensando nisso, nossa equipe de desenvolvedores WordPress preparou uma coleção de plugins integrados que acompanham nossos temas. Como se trata de um tema WordPress, instalar e usar é realmente simples! Leia nossa documentação para ver como é rápido ir da compra de um tema JetImpex WordPress até colocá-lo no ar como vitrine da sua empresa. O CMS WordPress também permite alterar facilmente textos, mídia, blocos e páginas do seu novo tema! ",
    ),
    (
        "Each business niche may require a unique functionality of its own.&nbsp;With that notion in mind, our team of professional WordPress coders has been working day and night to roll out a definitive collection of built-in WordPress plugins, that come with each of our WordPress themes…&nbsp;Due to the fact that this is a WordPress theme, the process of installing it and using it is truly as easy as it gets!&nbsp;Read our documentation to understand how fast you can go from purchasing a JetImpex WordPress theme to actually using it as a live skin for your company’s webpage.&nbsp;Also, the WordPress CMS (Content Management System) allows you to easily change the content (text; multimedia; blocks; pages) of any part of your new theme!",
        "Cada nicho de negócio pode exigir funcionalidades próprias. Pensando nisso, nossa equipe de desenvolvedores WordPress preparou uma coleção de plugins integrados que acompanham nossos temas. Como se trata de um tema WordPress, instalar e usar é realmente simples! Leia nossa documentação para ver como é rápido ir da compra de um tema JetImpex WordPress até colocá-lo no ar como vitrine da sua empresa. O CMS WordPress também permite alterar facilmente textos, mídia, blocos e páginas do seu novo tema!",
    ),
    (
        "All the WordPress themes that we have here have had a vast team of professional designers sketching, working and executing the ultimate visual look for it. With such a wide range of choices at hand, we strongly advise you to stick to the <a href=\"https://wordpress.org/\">Tema WordPress</a> that is based on your business’ or a closely related field. Either way, thanks to all the diversity here you will be able to choose a <em>Tema que pode ser esquema de cores formal com tons claros ou mais vibrante, com texturas e matizes marcantes!</em> ",
        "Todos os temas WordPress que oferecemos passaram por uma grande equipe de designers que desenhou e executou o visual final. Com tantas opções, recomendamos escolher um <a href=\"https://wordpress.org/\">tema WordPress</a> alinhado ao seu segmento ou a um campo próximo. De qualquer forma, você poderá optar por um <em>tema com paleta formal e tons claros ou algo mais vibrante, com texturas e matizes marcantes!</em> ",
    ),
    (
        " All the WordPress themes that we have here have had a vast team of professional designers sketching, working and executing the ultimate visual look for it. With such a wide range of choices at hand, we strongly advise you to stick to the <a href=\"https://wordpress.org/\">Tema WordPress</a> that is based on your business’ or a closely related field. Either way, thanks to all the diversity here you will be able to choose a <em>Tema que pode ser esquema de cores formal com tons claros ou mais vibrante, com texturas e matizes marcantes!</em></p>",
        " Todos os temas WordPress que oferecemos passaram por uma grande equipe de designers que desenhou e executou o visual final. Recomendamos escolher um <a href=\"https://wordpress.org/\">tema WordPress</a> alinhado ao seu segmento ou a um campo próximo. De qualquer forma, você poderá optar por um <em>tema com paleta formal e tons claros ou algo mais vibrante, com texturas e matizes marcantes!</em></p>",
    ),
    (
        " Em the modern days of a very tight online business competition, ranking high in such search engines as Google, Bing or Yahoo is critical. With the help of our heavy customizations, each of our Business Tema WordPresss is enhanced with an optimized features. Believe us, Google will just love crawling your new website! All in all, feel free to browse our Business Tema WordPresss category and you will definitely find a new look for your company’s website! ",
        " Nos dias de hoje, com concorrência online acirrada, ranquear bem no Google, Bing ou Yahoo é essencial. Com nossas personalizações, cada um dos nossos temas WordPress corporativos ganha recursos otimizados. O Google vai adorar indexar seu novo site! Explore a categoria de temas corporativos e encontre um visual novo para a página da sua empresa! ",
    ),
    (
        "Em the modern days of a very tight online business competition, ranking high in such search engines as Google, Bing or Yahoo is critical. With the help of our heavy customizations, each of our Business Tema WordPresss is enhanced with an optimized features.&nbsp;Believe us, Google will just love crawling your new website!&nbsp;All in all, feel free to browse our Business Tema WordPresss category and you will definitely find a new look for your company’s website!",
        "Nos dias de hoje, com concorrência online acirrada, ranquear bem no Google, Bing ou Yahoo é essencial. Com nossas personalizações, cada um dos nossos temas WordPress corporativos ganha recursos otimizados. O Google vai adorar indexar seu novo site! Explore a categoria de temas corporativos e encontre um visual novo para a página da sua empresa!",
    ),
    (
        " Em the modern days of a very tight online business competition, ranking high in such search engines as Google, Bing or Yahoo is critical.&nbsp;With the help of our heavy customizations, each of our Business Tema WordPresss is enhanced with an optimized features.&nbsp;Believe us, Google will just love crawling your new website!&nbsp;All in all, feel free to browse our Business Tema WordPresss category and you will definitely find a new look for your company’s website!",
        " Nos dias de hoje, com concorrência online acirrada, ranquear bem no Google, Bing ou Yahoo é essencial. Com nossas personalizações, cada um dos nossos temas WordPress corporativos ganha recursos otimizados. O Google vai adorar indexar seu novo site! Explore a categoria de temas corporativos e encontre um visual novo para a página da sua empresa!",
    ),
    # Webion home & about snippets
    (
        "A MINIMALIST WORDPRESS THEME",
        "UM TEMA WORDPRESS MINIMALISTA",
    ),
    ("WELCOME TO WEBION", "BEM-VINDO À WEBION"),
    ("Great theme with great features!", "Ótimo tema com recursos incríveis!"),
    (
        "Through this experience Warmhouse  has acquired a high level of expertise in the design and realisation of high-profile and luxury schemes, always reducing the complexity.",
        "Com essa experiência, adquirimos alto nível de expertise no design e na realização de projetos de alto padrão e luxo, sempre reduzindo a complexidade.",
    ),
    (
        "Through this experience Warmhouse \u00a0has acquired a high level of expertise in the design and realisation of high-profile and luxury schemes, always reducing the complexity.",
        "Com essa experiência, adquirimos alto nível de expertise no design e na realização de projetos de alto padrão e luxo, sempre reduzindo a complexidade.",
    ),
    (
        "Through this experience Warmhouse &nbsp;has acquired a high level of expertise in the design and realisation of high-profile and luxury schemes, always reducing the complexity.",
        "Com essa experiência, adquirimos alto nível de expertise no design e na realização de projetos de alto padrão e luxo, sempre reduzindo a complexidade.",
    ),
    # Headings & UI
    ("Skip to content", "Ir para o conteúdo"),
    ("Best Ideas – Best Solution – Best Result", "Melhores ideias – Melhor solução – Melhor resultado"),
    ("We Build the Future", "Construímos o futuro"),
    ("About company", "Sobre a empresa"),
    ("We Create\n<br>and Turn Into Reality", "Criamos\n<br>e transformamos em realidade"),
    ("We Create\n<br>\nand Turn Into Reality", "Criamos\n<br>\ne transformamos em realidade"),
    ("and Turn Into Reality", "e transformamos em realidade"),
    ("view more", "ver mais"),
    ("about us", "sobre nós"),
    ("more about us", "saiba mais sobre nós"),
    ("Working On <br>\nExclusive Projects", "Trabalhando em <br>\nprojetos exclusivos"),
    ("Working On <br>Exclusive Projects", "Trabalhando em <br>projetos exclusivos"),
    ("What our <br>\nclients say", "O que nossos <br>\nclientes dizem"),
    ("What our <br>clients say", "O que nossos <br>clientes dizem"),
    ("clients say", "clientes dizem"),
    ("our Latest<br>\nProjects", "Nossos projetos<br>\nmais recentes"),
    ("our Latest<br>Projects", "Nossos projetos<br>mais recentes"),
    ("OUR CLIENTS &amp;\nPARTNERS", "NOSSOS CLIENTES E<br>\nPARCEIROS"),
    ("OUR CLIENTS &amp; PARTNERS", "NOSSOS CLIENTES E PARCEIROS"),
    ("Let’s Get in Touch", "Entre em contato"),
    ("Contact details", "Dados de contato"),
    ("posted on Everywhere", "publicado em todo lugar"),
    ("publicado em Everywhere", "publicado em todo lugar"),
    ("look our<br>\nBest services", "Conheça nossos<br>\nmelhores serviços"),
    ("look our<br>Best services", "Conheça nossos<br>melhores serviços"),
    ("our services", "nossos serviços"),
    ("GET IN TOUCH WITH US", "ENTRE EM CONTATO CONOSCO"),
    ("GET IN TOUCH", "FALE CONOSCO"),
    ("FIND US ON THE MAP", "ENCONTRE-NOS NO MAPA"),
    ("join our newsletter", "assine nossa newsletter"),
    ("LET’S CREATE SOMETHING TOGETHER!", "VAMOS CRIAR ALGO JUNTOS!"),
    ("INTERESTED ON OUR SERVICES?", "INTERESSADO NOS NOSSOS SERVIÇOS?"),
    ("OUR AWESOME TEAM", "NOSSA EQUIPE INCRÍVEL"),
    ("Showcase your team with style! 19 Effects available.", "Apresente sua equipe com estilo! 19 efeitos disponíveis."),
    ("OUR SKILLS", "NOSSAS HABILIDADES"),
    ("OUR VALUES", "NOSSOS VALORES"),
    ("OUR MISSION", "NOSSA MISSÃO"),
    ("OUR SERVICES", "NOSSOS SERVIÇOS"),
    ("Our Mission", "Nossa missão"),
    ("Our Vision", "Nossa visão"),
    ("our mission", "nossa missão"),
    ("our vision", "nossa visão"),
    ("our values", "nossos valores"),
    ("our pricing", "nossos planos"),
    ("our Amazing<br>\nteam", "Nossa equipe<br>\nincrível"),
    ("our Amazing<br>team", "Nossa equipe<br>incrível"),
    ("What we", "O que"),
    ("What we do", "O que fazemos"),
    ("Top insights on the", "Principais insights sobre"),
    ("current industry", "o setor atual"),
    ("A Variety of", "Uma variedade de"),
    ("Best services", "Melhores serviços"),
    ("OUTSTANDING FEATURES", "RECURSOS DE DESTAQUE"),
    ("PREMIUM RESOURCES", "RECURSOS PREMIUM"),
    ("COOL PORTFOLIOS", "PORTFÓLIOS IMPRESSIONANTES"),
    ("UNLIMITED PORTFOLIOS", "PORTFÓLIOS ILIMITADOS"),
    ("RESPONSIVE LAYOUT", "LAYOUT RESPONSIVO"),
    ("RESPONSIVE DESIGN", "DESIGN RESPONSIVO"),
    ("UNLIMITED COLORS", "CORES ILIMITADAS"),
    ("WOOCOMMERCE READY", "PRONTO PARA WOOCOMMERCE"),
    ("POWERFULL ADMIN", "PAINEL ADMINISTRATIVO PODEROSO"),
    ("FREE SUPPORT", "SUPORTE GRATUITO"),
    ("EASY TO WORK", "FÁCIL DE USAR"),
    ("CLEAN DESIGN", "DESIGN LIMPO"),
    ("UNIQUE DESIGN", "DESIGN ÚNICO"),
    ("STYLE SELECTION", "ESCOLHA DE ESTILO"),
    ("LATEST NEWS", "ÚLTIMAS NOTÍCIAS"),
    ("IMPORTANT MILESTONES", "MARCOS IMPORTANTES"),
    ("AGENCY ACHIEVEMENTS", "CONQUISTAS DA AGÊNCIA"),
    ("FINISHED PROJECTS", "PROJETOS CONCLUÍDOS"),
    ("FINISHED WORKS", "TRABALHOS CONCLUÍDOS"),
    ("HAPPY CLIENTS", "CLIENTES SATISFEITOS"),
    ("HOURS OF WORK", "HORAS DE TRABALHO"),
    ("Years in industry", "Anos no mercado"),
    ("People are our ultimate resource", "Pessoas são nosso maior recurso"),
    ("Premium quality. We always get the best people", "Qualidade premium. Sempre reunimos os melhores profissionais"),
    ("Each case for us is unique", "Cada caso é único para nós"),
    ("Non-standard approaches and the most complicated", "Abordagens não convencionais e os casos mais complexos"),
    ("Cost effective, to secure construction process", "Custo-benefício para garantir o processo construtivo"),
    ("Based on your project, get only what&#8217;s needed", "Com base no seu projeto, receba só o que precisa"),
    ("Based on your project, get only what's needed", "Com base no seu projeto, receba só o que precisa"),
    ("Good news &amp; event details as well straight to your incoming mail!", "Novidades e detalhes de eventos direto no seu e-mail!"),
    ("subscribe", "inscrever-se"),
    ("yes", "sim"),
    ("CONTACT FORM", "FORMULÁRIO DE CONTATO"),
    ("Contact form", "Formulário de contato"),
    ("Leave a Reply", "Deixe um comentário"),
    ("Cancel reply", "Cancelar resposta"),
    ("Submit Comment", "Enviar comentário"),
    ("Required fields are marked", "Campos obrigatórios estão marcados"),
    ("Your email address will not be published.", "Seu e-mail não será publicado."),
    ("Save my name, email, and website in this browser for the next time I comment.", "Salvar meu nome, e-mail e site neste navegador para a próxima vez que eu comentar."),
    ("Comments *", "Comentários *"),
    ('placeholder="Your name:"', 'placeholder="Seu nome:"'),
    ("Name *", "Nome *"),
    ("E-mail *", "E-mail *"),
    ("Website", "Site"),
    ("Log in", "Entrar"),
    ("0 Comment(s)", "0 comentário(s)"),
    ("Search for:", "Buscar:"),
    ("Enter keyword search", "Digite palavras-chave"),
    ("Recent Posts", "Posts recentes"),
    ("Recent Comments", "Comentários recentes"),
    ("Comments feed", "Feed de comentários"),
    ("Entries feed", "Feed de entradas"),
    ("WordPress.org", "WordPress.org"),
    ("Meta", "Meta"),
    ("Archives", "Arquivos"),
    ("Categories", "Categorias"),
    ("Posts", "Posts"),
    ("Post navigation", "Navegação de posts"),
    ('<div class="screen-reader-text">Previous</div>', '<div class="screen-reader-text">Anterior</div>'),
    ('<div class="nav-text">Previous</div>', '<div class="nav-text">Anterior</div>'),
    ('<div class="screen-reader-text">Next</div>', '<div class="screen-reader-text">Próximo</div>'),
    ('<div class="nav-text">Next</div>', '<div class="nav-text">Próximo</div>'),
    ("Author:", "Autor:"),
    ("Category:", "Categoria:"),
    ("Month:", "Mês:"),
    ("Year:", "Ano:"),
    ("April", "Abril"),
    ("April 2019", "Abril de 2019"),
    ("April 15, 2019", "15 de abril de 2019"),
    ("April 9, 2019", "9 de abril de 2019"),
    ("Posted", "Publicado"),
    ("By ", "Por "),
    ("In ", "Em "),
    ("More", "Saiba mais"),
    ("Uncategorized", "Sem categoria"),
    # Nav & breadcrumbs (uppercase labels)
    ('title="HOME">HOME', 'title="INÍCIO">INÍCIO'),
    (">HOME</a>", ">INÍCIO</a>"),
    (">ABOUT</a>", ">SOBRE</a>"),
    (">SERVICES</a>", ">SERVIÇOS</a>"),
    (">CONTACTS</a>", ">CONTATO</a>"),
    ('<span class="breadcrumbs_item_target">ABOUT</span>', '<span class="breadcrumbs_item_target">SOBRE</span>'),
    ('<span class="breadcrumbs_item_target">SERVICES</span>', '<span class="breadcrumbs_item_target">SERVIÇOS</span>'),
    ('<span class="breadcrumbs_item_target">CONTACTS</span>', '<span class="breadcrumbs_item_target">CONTATO</span>'),
    ('<h1 class="elementor-heading-title elementor-size-default">ABOUT</h1>', '<h1 class="elementor-heading-title elementor-size-default">SOBRE</h1>'),
    # Services / roles
    ("ARCHITECTURE", "ARQUITETURA"),
    ("ENGINEERING", "ENGENHARIA"),
    ("INTERIOR DESIGN", "DESIGN DE INTERIORES"),
    ("INTERIOR PLANING", "PLANEJAMENTO DE INTERIORES"),
    ("LANDSPACING", "PAISAGISMO"),
    ("DECORATION", "DECORAÇÃO"),
    ("ARCHITECT", "ARQUITETO"),
    ("DESIGNER", "DESIGNER"),
    ("MANAGING PARTNER", "SÓCIO-DIRETOR"),
    ("Sustainable Building Design", "Design de edifícios sustentáveis"),
    ("Interior Architecture", "Arquitetura de interiores"),
    ("Interior Design", "Design de interiores"),
    ("Landscape Design", "Design paisagístico"),
    ("Exterior Design", "Design de fachadas"),
    ("Space Planning", "Planejamento de espaços"),
    ("Lighting Installation", "Instalação de iluminação"),
    ("Decorating Service", "Serviço de decoração"),
    ("Renovation Service", "Serviço de reforma"),
    ("Custom Furniture", "Móveis sob medida"),
    ("Project Management", "Gestão de projetos"),
    ("Inspection", "Inspeção"),
    ("Consulting", "Consultoria"),
    ("Development", "Desenvolvimento"),
    ("Commercial", "Comercial"),
    ("Education &amp; Campus", "Educação e campus"),
    ("Healthcare &amp; Life Sciences", "Saúde e ciências da vida"),
    ("Planning &amp; Development", "Planejamento e desenvolvimento"),
    ("Refurbishing", "Retrofit"),
    ("Do-It-Yourself", "Faça você mesmo"),
    ("Marketing", "Marketing"),
    ("Design", "Design"),
    ("Design awards", "Prêmios de design"),
    ("Projects", "Projetos"),
    ("Standard", "Padrão"),
    ("Premium", "Premium"),
    ("PREMIUM", "PREMIUM"),
    ("basic", "básico"),
    ("Cost", "Custo"),
    ("Options", "Opções"),
    ("advantages", "vantagens"),
    ("Testimonials", "Depoimentos"),
    ("PORTFOLIO", "PORTFÓLIO"),
    ("TEAM", "EQUIPE"),
    ("CLIENTS", "CLIENTES"),
    ("INNOVATION", "INOVAÇÃO"),
    ("WE WORK HARD", "TRABALHAMOS COM DEDICAÇÃO"),
    ("Our philosophy", "Nossa filosofia"),
    ("accomplished", "realizado"),
    # Post titles
    ("Tips on Buying a Fixer Upper", "Dicas para comprar imóvel para reformar"),
    ("Fitting a Square Building", "Adequando um edifício quadrado"),
    ("Modern Extension to Brick House", "Extensão moderna em casa de tijolos"),
    ("Groundbreaking Women in Construction", "Mulheres pioneiras na construção"),
    ("24/7 Effective And Friendly Support.", "Suporte eficiente e amigável 24/7"),
    ("100% Satisfaction Guaranteed.", "100% de satisfação garantida"),
    ("Flexible And Multipurpose", "Flexível e multipropósito"),
    ("GPL3 License Advantages", "Vantagens da licença GPL3"),
    ("Is Time To Coffee", "Hora do café"),
    ("We Love Photography", "Amamos fotografia"),
    ("Woman Enjoying Ride", "Mulher aproveitando o passeio"),
    ("MODERN EXTENSION TO BRICK HOUSE", "EXTENSÃO MODERNA EM CASA DE TIJOLOS"),
    # Forms
    ('placeholder="Your Name"', 'placeholder="Seu nome"'),
    ('placeholder="Your E-mail"', 'placeholder="Seu e-mail"'),
    ('placeholder="Your Message"', 'placeholder="Sua mensagem"'),
    ('value="Send"', 'value="Enviar"'),
    ('aria-label="Contact form"', 'aria-label="Formulário de contato"'),
    # Contact page
    ("London Eye, London, United Kingdom", "London Eye, Londres, Reino Unido"),
    ("PO Box 16122 Collins Street West Victoria 8007 Australia", "PO Box 16122 Collins Street West Victoria 8007 Austrália"),
    ("Address: Alexandria, 32 Washingtorn str, 22303", "Endereço: Alexandria, 32 Washingtorn str, 22303"),
    ("Your Name:", "Seu nome:"),
    ("Your Email:", "Seu e-mail:"),
    ("Your Message:", "Sua mensagem:"),
    ("Your Address:", "Seu endereço:"),
    ("E-mail:", "E-mail:"),
    ("Phone:", "Telefone:"),
    ("Opening hours:", "Horário de funcionamento:"),
    ("Monday — Thursday 10:00 &#8211; 23:00", "Segunda a quinta, 10:00 &#8211; 23:00"),
    ("Friday — Sunday 10:00 &#8211; 19:00", "Sexta a domingo, 10:00 &#8211; 19:00"),
    # Quotes / lorem partial
    (
        "“ WHAT SEPARATES DESIGN FROM ART IS THAT DESIGN IS MEANT TO BE… FUNCTIONAL”",
        "“ O QUE SEPARA DESIGN DE ARTE É QUE DESIGN DEVE SER… FUNCIONAL”",
    ),
    ("– Cameron Moll", "– Cameron Moll"),
    (
        "Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia",
        "Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia",
    ),
    # Misc webion icon boxes (short descriptions often lorem - translate key ones)
    (
        "Theme that can be either of a formal color scheme with some light colors in it or a more vivid one, featuring bold textures and hues!",
        "Tema que pode ser esquema de cores formal com tons claros ou mais vibrante, com texturas e matizes marcantes!",
    ),
    (
        "But how do you stay focused on what kind of a template you need and what do you want to get from that template?",
        "Como manter o foco no tipo de template que você precisa e no que espera dele?",
    ),
    (
        "&nbsp;that is based on your business’ or a closely related field.&nbsp;Either way, thanks to all the diversity here you will be able to choose a&nbsp;",
        "&nbsp;com base no seu negócio ou em um campo relacionado.&nbsp;De qualquer forma, com tanta variedade, você poderá escolher&nbsp;",
    ),
    (
        "that is based on your business’ or a closely related field. Either way, thanks to all the diversity here you will be able to choose a",
        "com base no seu negócio ou em um campo relacionado. De qualquer forma, com tanta variedade, você poderá escolher",
    ),
    (
        "We take Visa, MasterCard, Discover and American Express",
        "Aceitamos Visa, MasterCard, Discover e American Express",
    ),
    (
        "We understand that most homeowners don’t undertake major exterior replacements and redesign projects more than once, and that’s why our goal.",
        "Sabemos que a maioria dos proprietários não faz grandes reformas externas mais de uma vez — por isso nosso objetivo é acertar de primeira.",
    ),
    (
        "A relaxing bathroom helps you start and end your day in good spirits. It’s beneficial to have well designed storage to keep an open, clean feel.",
        "Um banheiro relaxante ajuda a começar e terminar o dia bem. Armários bem planejados mantêm o ambiente aberto e limpo.",
    ),
    (
        "We all are living busy lives, giving time to family, friends, and work, hence our bedroom is oftentimes the place where we go to relax and escape everyday life struggles.",
        "Vivemos corridas, dividindo tempo entre família, amigos e trabalho; por isso o quarto costuma ser o refúgio para relaxar.",
    ),
    (
        "For improving entire appeal of the house homeowners can opt for the renovation projects. Unique renovation can completely.",
        "Para valorizar a casa, proprietários podem investir em reformas. Uma renovação bem pensada transforma completamente o espaço.",
    ),
    (
        "It’s perfect to display the members of your staff, team or working force. Within Logiciel theme you",
        "Ideal para exibir colaboradores, equipe ou prestadores. No tema Logiciel você encontra opções versáteis",
    ),
    (
        "It’s perfect to display the members of your staff, team or working force. Within Logiciel theme you.",
        "Ideal para exibir colaboradores, equipe ou prestadores. No tema Logiciel você encontra opções versáteis.",
    ),
    (
        "Ideal para exibir membros da equipe. No tema Logiciel você.",
        "Ideal para exibir colaboradores, equipe ou prestadores. No tema Logiciel você encontra opções versáteis.",
    ),
    (
        "Ideal para exibir membros da equipe. No tema Logiciel você ",
        "Ideal para exibir colaboradores, equipe ou prestadores. No tema Logiciel você encontra opções versáteis. ",
    ),
    (
        "We offer dozens of custom options - from special finishes to hand-applied gilding to a choice of leg styles on some pieces, and even more choices.",
        "Oferecemos dezenas de opções personalizadas — acabamentos especiais, douração manual, estilos de pés e muito mais.",
    ),
    (
        "We combine decades of design projecting experience with an unrelenting dedication to setting new benchmarks in the lighting marketplace.",
        "Combinamos décadas de experiência em projetos de design com dedicação em estabelecer novos padrões no mercado de iluminação.",
    ),
    (
        "We develop an understanding of all the different inputs that",
        "Desenvolvemos compreensão de todas as variáveis que",
    ),
    (
        "Energy service contracting can provide a cost-effective route to overcoming",
        "Contratos de serviço energético podem ser uma rota econômica para superar",
    ),
    (
        "Regulatory laundering and other compliance checks on clients originating from",
        "Verificações regulatórias e de conformidade em clientes originários de",
    ),
    (
        "We validate your products, processes, and operations to provide assurance",
        "Validamos produtos, processos e operações para oferecer garantia",
    ),
    (
        "With the impact of the financial crisis and resulting changes",
        "Com o impacto da crise financeira e as mudanças resultantes",
    ),
    (
        "With an abundance of tools at their disposal to research",
        "Com muitas ferramentas à disposição para pesquisar",
    ),
    (
        "Appropriately create future-proof solutions whereas extensible strategic theme areas. Objectively fabricate impactful networks vis-a-vis error-free deliverables",
        "Criamos soluções preparadas para o futuro em áreas estratégicas extensíveis, com entregas consistentes e redes de impacto.",
    ),
    (
        "Appropriately target granular experiences before sustainable technology",
        "Focamos experiências detalhadas aliadas a tecnologia sustentável",
    ),
    (
        "Intrinsicly engineer one-to-one partnerships with error-free customer service. Competently optimize goal-oriented technology via low-risk high-yield materials engage.",
        "Construímos parcerias diretas com atendimento confiável e otimizamos tecnologia orientada a resultados.",
    ),
    (
        "Intrinsicly engineer one-to-one parceiroships with error-free customer service. Competently optimize goal-oriented technology via low-risk high-yield materials engage.",
        "Construímos parcerias diretas com atendimento confiável e otimizamos tecnologia orientada a resultados.",
    ),
    (
        " Quickly create intuitive deliverables rather than cross-media customer service",
        "",
    ),
    (
        ".. Quickly create intuitive deliverables rather than cross-media customer service",
        ".",
    ),
    (
        "Explore the history of the classic Lorem Ipsum passage and generate your own text using any number of characters, words, sentences or paragraphs. Commonly used as placeholder text in the graphic and print industries, Lorem Ipsum&#8217;s origins extend far back to a scrambled Latin passage.",
        "Conheça a história do clássico texto Lorem Ipsum e gere variantes com quantos caracteres, palavras, frases ou parágrafos quiser. Muito usado como placeholder no design gráfico e editorial, o Lorem Ipsum remonta a um trecho latino embaralhado.",
    ),
    (
        "Transform your everyday environment with these 3 different sets of architecture serviços offered at affordable price. Every pricing package can be customized according to your wishes.",
        "Transforme seu ambiente do dia a dia com estes três pacotes de serviços de arquitetura a preços acessíveis. Cada plano pode ser personalizado conforme sua necessidade.",
    ),
    (
        "Transform your everyday environment with these 3 different sets of architecture services offered at affordable price. Every pricing package can be customized according to your wishes.",
        "Transforme seu ambiente do dia a dia com estes três pacotes de serviços de arquitetura a preços acessíveis. Cada plano pode ser personalizado conforme sua necessidade.",
    ),
    (
        "Like many older U.S. cities, our nation’s capital infrastructure dates back to the early 1800s and their storm and wastewater treatment system is no longer able to accommodate heavy rain events, causing overflows of untreated waste into nearby rivers and…",
        "Como muitas cidades históricas, a infraestrutura local remonta ao início do século XIX e a rede de águas pluviais e esgoto já não absorve bem chuvas fortes, provocando transbordamentos para rios próximos…",
    ),
    (
        "We are here to meet your demand and resolve architecture issues the most beneficial way for you. Our skilled experts are able to resolve complex and unusual cases in the shortest time.",
        "Estamos aqui para atender sua demanda e resolver questões de arquitetura da forma mais vantajosa. Nossos especialistas resolvem casos complexos e incomuns no menor prazo possível.",
    ),
    (
        "Archivolt is the place where you can be sure for your house and interior. We have a team of professionals who work on providing you with the best service and creative solutions. e are happy to complete the most complex projects and to provide you with the interior of your dream!",
        "Somos referência em projetos para casa e interiores. Nossa equipe oferece o melhor atendimento e soluções criativas. Temos prazer em concluir os projetos mais complexos e entregar o interior dos seus sonhos!",
    ),
    (
        "All the WordPress themes that we have here have had a vast team of professional designers sketching, working and executing the ultimate visual look for it. With such a wide range of choices at hand, we strongly advise you to stick to the Tema WordPress that is based on your business’...</p>",
        "Todos os temas WordPress que oferecemos passaram por designers profissionais que definiram o visual final. Com tantas opções, recomendamos um tema WordPress alinhado ao seu segmento…</p>",
    ),
    (
        "All the WordPress themes that we have here have had a vast team of professional designers sketching, working and executing the ultimate visual look for it.&nbsp;With such a wide range of choices at hand, we strongly advise you to stick to the&nbsp;<a href=\"https://wordpress.org/\">Tema WordPress</a>&nbsp;com base no seu negócio ou em um campo relacionado.&nbsp;De qualquer forma, com tanta variedade, você poderá escolher&nbsp;<em>Tema que pode ser esquema de cores formal com tons claros ou mais vibrante, com texturas e matizes marcantes!</em></p>",
        "Todos os temas WordPress que oferecemos passaram por designers profissionais que definiram o visual final. Recomendamos um <a href=\"https://wordpress.org/\">tema WordPress</a> alinhado ao seu segmento ou a um campo próximo. Com tanta variedade, você pode escolher um <em>tema formal com tons claros ou algo mais vibrante, com texturas e matizes marcantes!</em></p>",
    ),
    (
        "\n\nEm the modern days of a very tight online business competition, ranking high in such search engines as Google, Bing or Yahoo is critical.&nbsp;With the help of our heavy customizations, each of our Business Tema WordPresss is enhanced with an optimized features.&nbsp;Believe us, Google will just love crawling your new website!&nbsp;All in all, feel free to browse our Business Tema WordPresss category and you will definitely find a new look for your company’s website!\n\n",
        "\n\nNos dias de hoje, com concorrência online acirrada, ranquear bem no Google, Bing ou Yahoo é essencial. Com nossas personalizações, cada um dos nossos temas WordPress corporativos ganha recursos otimizados. O Google vai adorar indexar seu novo site! Explore a categoria de temas corporativos e encontre um visual novo para a página da sua empresa!\n\n",
    ),
    (
        "Energistically develop client-centered web services without focused data. Conveniently syndicate leveraged scenarios.",
        "Desenvolvemos serviços web centrados no cliente e cenários integrados de forma prática.",
    ),
    (
        "Professionally repurpose premium rather than magnetic bandwidth.",
        "Reaproveitamos recursos premium de forma profissional e eficiente.",
    ),
    ("WordPress Theme", "Tema WordPress"),
    ("Multipurpose Theme design by", "Tema multipropósito por"),
]

LANG_REPLACEMENTS = [
    ('lang="en-US"', 'lang="pt-BR"'),
    ('lang="en-US" dir="ltr"', 'lang="pt-BR" dir="ltr"'),
]


def iter_html_files(root: Path):
    for p in root.rglob("*.html"):
        parts = p.parts
        if "wp-content" in parts or "wp-includes" in parts:
            continue
        yield p


def translate_content(text: str) -> str:
    for old, new in LANG_REPLACEMENTS:
        text = text.replace(old, new)
    for old, new in TRANSLATIONS:
        text = text.replace(old, new)
    return text


def main() -> None:
    changed: list[str] = []
    for demo in DEMOS:
        if not demo.is_dir():
            continue
        for path in iter_html_files(demo):
            original = path.read_text(encoding="utf-8")
            updated = translate_content(original)
            if updated != original:
                path.write_text(updated, encoding="utf-8")
                changed.append(str(path.relative_to(demo.parent)))
    print(f"Alterados: {len(changed)} arquivos")
    for c in sorted(changed):
        print(c)


if __name__ == "__main__":
    main()
