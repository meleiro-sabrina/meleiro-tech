(() => {
  const COLORS = {
    lime: "#d7f300",
    cyan: "#5eead4",
    sky: "#7dd3fc",
    amber: "#fbbf24",
    rose: "#fb7185",
    mint: "#86efac",
    blue: "#60a5fa",
    violet: "#a5b4fc",
    orange: "#fdba74",
  };

  // Áreas = setores reais da empresa (não categorias de despesa)
  const AREAS = [
    {
      id: "comercial",
      title: "Comercial",
      subtitle: "Vendas e relacionamento com clientes",
      color: COLORS.lime,
      items: [
        { key: "folha", label: "Folha e encargos", color: COLORS.lime },
        { key: "comissoes", label: "Comissões", color: COLORS.amber },
        { key: "viagens", label: "Viagens e visitas", color: COLORS.sky },
        { key: "crm", label: "CRM e ferramentas", color: COLORS.cyan },
      ],
    },
    {
      id: "operacoes",
      title: "Operações",
      subtitle: "Produção, logística e manutenção",
      color: COLORS.blue,
      items: [
        { key: "folha", label: "Folha e encargos", color: COLORS.blue },
        { key: "almoxarifado", label: "Almoxarifado", color: COLORS.orange },
        { key: "frete", label: "Frete e logística", color: COLORS.sky },
        { key: "manutencao", label: "Manutenção", color: COLORS.violet },
      ],
    },
    {
      id: "tecnologia",
      title: "Tecnologia",
      subtitle: "Time de TI, sistemas e infraestrutura",
      color: COLORS.rose,
      items: [
        { key: "folha", label: "Folha e encargos", color: COLORS.rose },
        { key: "hardware", label: "Hardware", color: COLORS.orange },
        { key: "software", label: "Software e licenças", color: COLORS.lime },
        { key: "cloud", label: "Cloud e hosting", color: COLORS.cyan },
      ],
    },
    {
      id: "rh",
      title: "Recursos Humanos",
      subtitle: "Pessoas, benefícios e desenvolvimento",
      color: COLORS.violet,
      items: [
        { key: "folha", label: "Folha e encargos", color: COLORS.violet },
        { key: "beneficios", label: "Benefícios (VR/VA/saúde)", color: COLORS.mint },
        { key: "recrutamento", label: "Recrutamento", color: COLORS.amber },
        { key: "treinamentos", label: "Treinamentos", color: COLORS.sky },
      ],
    },
    {
      id: "marketing",
      title: "Marketing",
      subtitle: "Aquisição, marca e campanhas",
      color: COLORS.orange,
      items: [
        { key: "folha", label: "Folha e encargos", color: COLORS.orange },
        { key: "midia", label: "Mídia paga", color: COLORS.rose },
        { key: "agencia", label: "Agência e conteúdo", color: COLORS.cyan },
        { key: "eventos", label: "Eventos", color: COLORS.violet },
      ],
    },
    {
      id: "administrativo",
      title: "Administrativo",
      subtitle: "Instalações, utilidades e suporte geral",
      color: COLORS.amber,
      items: [
        { key: "folha", label: "Folha e encargos", color: COLORS.amber },
        { key: "aluguel", label: "Aluguel", color: COLORS.sky },
        { key: "utilidades", label: "Luz e água", color: COLORS.cyan },
        { key: "limpeza", label: "Limpeza", color: COLORS.mint },
        { key: "papelaria", label: "Papelaria", color: COLORS.orange },
        { key: "iptu", label: "IPTU", color: COLORS.violet },
      ],
    },
  ];

  // Dados fictícios por setor · 6 meses
  const HISTORY = [
    {
      key: "2026-05",
      label: "Mai",
      contratos: 78000,
      comercial: { folha: 42000, comissoes: 18000, viagens: 4200, crm: 2800 },
      operacoes: { folha: 56000, almoxarifado: 8800, frete: 6200, manutencao: 3100 },
      tecnologia: { folha: 48000, hardware: 5400, software: 4800, cloud: 6200 },
      rh: { folha: 18000, beneficios: 22000, recrutamento: 3500, treinamentos: 2800 },
      marketing: { folha: 16000, midia: 12000, agencia: 6500, eventos: 3000 },
      administrativo: { folha: 14000, aluguel: 22000, utilidades: 8000, limpeza: 2800, papelaria: 1600, iptu: 3200 },
    },
    {
      key: "2026-06",
      label: "Jun",
      contratos: 88000,
      comercial: { folha: 43000, comissoes: 19500, viagens: 4800, crm: 2800 },
      operacoes: { folha: 57000, almoxarifado: 9100, frete: 6400, manutencao: 2900 },
      tecnologia: { folha: 49000, hardware: 9200, software: 5000, cloud: 6400 },
      rh: { folha: 18500, beneficios: 22500, recrutamento: 5200, treinamentos: 3000 },
      marketing: { folha: 16500, midia: 14500, agencia: 7000, eventos: 4200 },
      administrativo: { folha: 14200, aluguel: 22000, utilidades: 8400, limpeza: 3000, papelaria: 1700, iptu: 3200 },
    },
    {
      key: "2026-07",
      label: "Jul",
      contratos: 101000,
      comercial: { folha: 44000, comissoes: 21000, viagens: 5100, crm: 2900 },
      operacoes: { folha: 58000, almoxarifado: 9300, frete: 7100, manutencao: 3400 },
      tecnologia: { folha: 50000, hardware: 11000, software: 5200, cloud: 6600 },
      rh: { folha: 19000, beneficios: 23000, recrutamento: 2800, treinamentos: 4500 },
      marketing: { folha: 17000, midia: 16000, agencia: 7200, eventos: 5500 },
      administrativo: { folha: 14500, aluguel: 22000, utilidades: 8650, limpeza: 3100, papelaria: 1750, iptu: 3200 },
    },
    {
      key: "2026-08",
      label: "Ago",
      contratos: 92000,
      comercial: { folha: 45000, comissoes: 17500, viagens: 3900, crm: 2900 },
      operacoes: { folha: 59000, almoxarifado: 9400, frete: 6800, manutencao: 4100 },
      tecnologia: { folha: 51000, hardware: 7800, software: 5400, cloud: 6800 },
      rh: { folha: 19200, beneficios: 24000, recrutamento: 4100, treinamentos: 3200 },
      marketing: { folha: 17200, midia: 11000, agencia: 6800, eventos: 2500 },
      administrativo: { folha: 14800, aluguel: 22000, utilidades: 8900, limpeza: 3200, papelaria: 1800, iptu: 3200 },
    },
    {
      key: "2026-09",
      label: "Set",
      contratos: 118000,
      comercial: { folha: 46000, comissoes: 23000, viagens: 5600, crm: 3000 },
      operacoes: { folha: 60000, almoxarifado: 10100, frete: 7500, manutencao: 3600 },
      tecnologia: { folha: 52000, hardware: 15200, software: 5600, cloud: 7100 },
      rh: { folha: 19500, beneficios: 25000, recrutamento: 6200, treinamentos: 3800 },
      marketing: { folha: 17500, midia: 18500, agencia: 8000, eventos: 4800 },
      administrativo: { folha: 15000, aluguel: 22000, utilidades: 9350, limpeza: 2900, papelaria: 2100, iptu: 3200 },
    },
    {
      key: "2026-10",
      label: "Out",
      contratos: 146000,
      comercial: { folha: 47000, comissoes: 26500, viagens: 6100, crm: 3100 },
      operacoes: { folha: 61500, almoxarifado: 11200, frete: 8200, manutencao: 3900 },
      tecnologia: { folha: 53500, hardware: 18600, software: 6200, cloud: 7800 },
      rh: { folha: 20000, beneficios: 26500, recrutamento: 4800, treinamentos: 5200 },
      marketing: { folha: 18000, midia: 21000, agencia: 8500, eventos: 6200 },
      administrativo: { folha: 15200, aluguel: 22000, utilidades: 9830, limpeza: 4100, papelaria: 1950, iptu: 3200 },
    },
  ];

  const BANKS = [
    { id: "bb", name: "Banco do Brasil", short: "BB", color: "#fbbf24", balance: 186420 },
    { id: "santander", name: "Santander", short: "SAN", color: "#fb7185", balance: 94210 },
    { id: "itau", name: "Itaú Empresas", short: "ITAU", color: "#60a5fa", balance: 61280 },
    { id: "ml", name: "Mercado Livre", short: "ML", color: "#5eead4", balance: 38750 },
  ];

  const AREA_BUDGET = {
    comercial: 78000,
    operacoes: 82000,
    tecnologia: 75000,
    rh: 52000,
    marketing: 48000,
    administrativo: 58000,
  };

  const TODAY = "2026-10-24";
  const CAIXA_MINIMO = 320000;

  // Custos recorrentes usados na previsão de caixa (média mensal)
  const RECURRING = [
    { label: "Folha de pagamento", day: 21, value: 118000 },
    { label: "Impostos / DAS", day: 20, value: 8700 },
    { label: "Aluguel + utilidades", day: 15, value: 26800 },
    { label: "Plano de saúde (apólice)", day: 10, value: 9600 },
    { label: "Internet / telefonia", day: 8, value: 1850 },
  ];

  // Margem por cliente (receita − custo direto no mês de referência)
  const CLIENTS = [
    { name: "Nordeste Alimentos", receita: 84000, custo: 31800 },
    { name: "Porto Tech", receita: 52000, custo: 21400 },
    { name: "TecnoSul", receita: 39000, custo: 16200 },
    { name: "Casa Verde", receita: 18500, custo: 9100 },
    { name: "Alfa Serviços", receita: 28000, custo: 9800 },
    { name: "Loja Aurora", receita: 12400, custo: 7600 },
    { name: "Clínica Horizonte", receita: 22600, custo: 8400 },
    { name: "Construtora Paraíba", receita: 67000, custo: 41200 },
    { name: "EduMais Cursos", receita: 15800, custo: 6200 },
    { name: "Farmácia Rede Sul", receita: 30400, custo: 18900 },
  ];

  // Lançamentos rastreados (NFSe / fornecedor / conta)
  const EXPENSES = [
    { date: "2026-10-24", area: "tecnologia", category: "Hardware", desc: "2 notebooks Dell Latitude", supplier: "Dell Brasil", nfse: "2026/10482", bank: "bb", value: 12800, paid: false },
    { date: "2026-10-23", area: "marketing", category: "Mídia paga", desc: "Campanha Meta Ads — outubro", supplier: "Meta Platforms", nfse: "2026/10471", bank: "ml", value: 8500, paid: true },
    { date: "2026-10-22", area: "administrativo", category: "Limpeza", desc: "Kit higiene e conservação", supplier: "CleanPro Distribuidora", nfse: "2026/10455", bank: "santander", value: 1860, paid: false },
    { date: "2026-10-21", area: "operacoes", category: "Frete e logística", desc: "Entregas regionais semana 42", supplier: "LogiSul Transportes", nfse: "2026/10440", bank: "bb", value: 4200, paid: true },
    { date: "2026-10-20", area: "rh", category: "Benefícios", desc: "VR/VA competência outubro", supplier: "Alelo", nfse: "2026/10428", bank: "bb", value: 14200, paid: true },
    { date: "2026-10-19", area: "comercial", category: "Comissões", desc: "Comissão equipe — fechamentos semana 42", supplier: "Folha comercial", nfse: "2026/10420", bank: "itau", value: 6800, paid: true },
    { date: "2026-10-18", area: "comercial", category: "Viagens", desc: "Passagens + hospedagem cliente João Pessoa", supplier: "Decolar Corporativo", nfse: "2026/10412", bank: "santander", value: 3100, paid: true },
    { date: "2026-10-17", area: "tecnologia", category: "Cloud", desc: "AWS — consumo outubro (parcial)", supplier: "Amazon Web Services", nfse: "2026/10398", bank: "bb", value: 3900, paid: true },
    { date: "2026-10-16", area: "marketing", category: "Mídia paga", desc: "Google Ads — search marca", supplier: "Google Cloud Brasil", nfse: "2026/10390", bank: "ml", value: 5200, paid: true },
    { date: "2026-10-15", area: "administrativo", category: "Aluguel", desc: "Aluguel sede — outubro/2026", supplier: "Imobiliária Horizonte", nfse: "2026/10380", bank: "bb", value: 22000, paid: true },
    { date: "2026-10-14", area: "operacoes", category: "Almoxarifado", desc: "Reposição de estoque operacional", supplier: "MegaSupply Atacado", nfse: "2026/10366", bank: "santander", value: 5600, paid: true },
    { date: "2026-10-13", area: "rh", category: "Plano de saúde", desc: "Mensalidade apólice colaboradores", supplier: "Unimed JP", nfse: "2026/10358", bank: "itau", value: 9600, paid: true },
    { date: "2026-10-12", area: "marketing", category: "Agência", desc: "Produção de conteúdo mensal", supplier: "Agência Norte Criativo", nfse: "2026/10351", bank: "ml", value: 4200, paid: false },
    { date: "2026-10-11", area: "tecnologia", category: "Software", desc: "Assinatura Notion + Figma (time)", supplier: "Notion / Figma", nfse: "2026/10342", bank: "bb", value: 1480, paid: true },
    { date: "2026-10-10", area: "rh", category: "Treinamentos", desc: "Workshop liderança (12 pessoas)", supplier: "EduCorp Treinamentos", nfse: "2026/10330", bank: "santander", value: 5200, paid: true },
    { date: "2026-10-09", area: "operacoes", category: "Manutenção", desc: "Troca de peça empilhadeira", supplier: "TechFix Industrial", nfse: "2026/10321", bank: "santander", value: 2300, paid: true },
    { date: "2026-10-08", area: "administrativo", category: "Luz e água", desc: "Energia + água sede", supplier: "Energisa / Cagepa", nfse: "2026/10312", bank: "bb", value: 4830, paid: true },
    { date: "2026-10-07", area: "comercial", category: "Viagens", desc: "Combustível frota comercial", supplier: "Shell Fleet", nfse: "2026/10301", bank: "itau", value: 1920, paid: true },
    { date: "2026-10-06", area: "tecnologia", category: "Software", desc: "Licenças Microsoft 365 + Slack", supplier: "Microsoft / Slack", nfse: "2026/10290", bank: "bb", value: 3100, paid: true },
    { date: "2026-10-04", area: "administrativo", category: "Internet", desc: "Link dedicado + telefonia", supplier: "Vivo Empresas", nfse: "2026/10278", bank: "santander", value: 1850, paid: true },
    { date: "2026-10-03", area: "comercial", category: "CRM", desc: "Assinatura HubSpot Starter", supplier: "HubSpot", nfse: "2026/10271", bank: "ml", value: 1550, paid: true },
    { date: "2026-10-02", area: "administrativo", category: "Papelaria", desc: "Material de escritório", supplier: "Kalunga Empresas", nfse: "2026/10255", bank: "santander", value: 980, paid: true },
    { date: "2026-10-01", area: "operacoes", category: "Frete e logística", desc: "Coletas urgentes início do mês", supplier: "LogiSul Transportes", nfse: "2026/10240", bank: "bb", value: 2750, paid: true },
    { date: "2026-09-30", area: "rh", category: "Benefícios", desc: "VR/VA competência setembro", supplier: "Alelo", nfse: "2026/09910", bank: "bb", value: 13800, paid: true },
    { date: "2026-09-28", area: "tecnologia", category: "Hardware", desc: "Monitores e periféricos", supplier: "Kabum B2B", nfse: "2026/09880", bank: "bb", value: 7400, paid: true },
    { date: "2026-09-26", area: "comercial", category: "Comissões", desc: "Comissão fechamento #C-218", supplier: "Folha comercial", nfse: "2026/09850", bank: "itau", value: 4200, paid: true },
    { date: "2026-09-24", area: "operacoes", category: "Almoxarifado", desc: "EPIs e insumos de segurança", supplier: "SafetyMax", nfse: "2026/09820", bank: "santander", value: 3100, paid: true },
    { date: "2026-09-22", area: "marketing", category: "Eventos", desc: "Stand feira local", supplier: "ExpoNordeste", nfse: "2026/09740", bank: "santander", value: 4800, paid: true },
    { date: "2026-09-20", area: "marketing", category: "Mídia paga", desc: "Meta Ads — setembro", supplier: "Meta Platforms", nfse: "2026/09710", bank: "ml", value: 7200, paid: true },
    { date: "2026-09-18", area: "tecnologia", category: "Cloud", desc: "AWS — setembro", supplier: "Amazon Web Services", nfse: "2026/09680", bank: "bb", value: 6100, paid: true },
    { date: "2026-09-15", area: "administrativo", category: "Aluguel", desc: "Aluguel sede — setembro/2026", supplier: "Imobiliária Horizonte", nfse: "2026/09610", bank: "bb", value: 22000, paid: true },
    { date: "2026-09-12", area: "rh", category: "Recrutamento", desc: "Vaga analista financeiro", supplier: "Gupy", nfse: "2026/09570", bank: "ml", value: 1800, paid: true },
    { date: "2026-09-08", area: "administrativo", category: "Luz e água", desc: "Energia + água — setembro", supplier: "Energisa / Cagepa", nfse: "2026/09520", bank: "bb", value: 4520, paid: true },
    { date: "2026-09-05", area: "comercial", category: "Viagens", desc: "Visita cliente Recife", supplier: "LATAM Corporativo", nfse: "2026/09480", bank: "santander", value: 2680, paid: true },
    { date: "2026-08-30", area: "operacoes", category: "Manutenção", desc: "Manutenção preventiva equipamentos", supplier: "TechFix Industrial", nfse: "2026/09120", bank: "santander", value: 4100, paid: true },
    { date: "2026-08-25", area: "marketing", category: "Agência", desc: "Pacote criativo agosto", supplier: "Agência Norte Criativo", nfse: "2026/09040", bank: "ml", value: 3800, paid: true },
    { date: "2026-08-20", area: "tecnologia", category: "Hardware", desc: "SSD e memória upgrade", supplier: "Kabum B2B", nfse: "2026/08960", bank: "bb", value: 3200, paid: true },
    { date: "2026-08-15", area: "administrativo", category: "Aluguel", desc: "Aluguel sede — agosto/2026", supplier: "Imobiliária Horizonte", nfse: "2026/08900", bank: "bb", value: 22000, paid: true },
    { date: "2026-08-12", area: "rh", category: "Recrutamento", desc: "Anúncios + testes seletivos", supplier: "Gupy", nfse: "2026/08840", bank: "ml", value: 2100, paid: true },
    { date: "2026-08-08", area: "operacoes", category: "Frete e logística", desc: "Fretes quinzena 1", supplier: "LogiSul Transportes", nfse: "2026/08790", bank: "bb", value: 3900, paid: true },
  ];

  const PAYABLES = [
    { due: "2026-10-18", supplier: "Unimed JP", desc: "Ajuste apólice saúde", area: "rh", value: 2100, status: "atrasado" },
    { due: "2026-10-20", supplier: "Dell Brasil", desc: "Notebooks — NFS-e 2026/10482", area: "tecnologia", value: 12800, status: "atrasado" },
    { due: "2026-10-25", supplier: "CleanPro Distribuidora", desc: "Limpeza — NFS-e 2026/10455", area: "administrativo", value: 1860, status: "vence" },
    { due: "2026-10-26", supplier: "Google Cloud Brasil", desc: "Google Ads — fatura parcial", area: "marketing", value: 3200, status: "vence" },
    { due: "2026-10-28", supplier: "Agência Norte Criativo", desc: "Conteúdo — NFS-e 2026/10351", area: "marketing", value: 4200, status: "aberto" },
    { due: "2026-10-30", supplier: "Imobiliária Horizonte", desc: "Aluguel novembro (antecipado)", area: "administrativo", value: 22000, status: "aberto" },
    { due: "2026-11-02", supplier: "Alelo", desc: "VR/VA novembro", area: "rh", value: 14500, status: "aberto" },
    { due: "2026-11-05", supplier: "Amazon Web Services", desc: "Cloud novembro", area: "tecnologia", value: 4100, status: "aberto" },
    { due: "2026-11-08", supplier: "LogiSul Transportes", desc: "Contrato frete mensal", area: "operacoes", value: 6500, status: "aberto" },
    { due: "2026-11-12", supplier: "HubSpot", desc: "CRM — renovação anual (parcela)", area: "comercial", value: 2800, status: "aberto" },
    { due: "2026-11-15", supplier: "Vivo Empresas", desc: "Telecom novembro", area: "administrativo", value: 1850, status: "aberto" },
    { due: "2026-11-20", supplier: "Meta Platforms", desc: "Pré-pago ads novembro", area: "marketing", value: 9000, status: "aberto" },
    { due: "2026-10-10", supplier: "LogiSul Transportes", desc: "Frete semana 41", area: "operacoes", value: 2800, status: "pago" },
    { due: "2026-10-08", supplier: "Shell Fleet", desc: "Combustível frota", area: "comercial", value: 1920, status: "pago" },
    { due: "2026-09-30", supplier: "EduCorp Treinamentos", desc: "Workshop liderança", area: "rh", value: 5200, status: "pago" },
    { due: "2026-09-22", supplier: "ExpoNordeste", desc: "Stand feira", area: "marketing", value: 4800, status: "pago" },
  ];

  const RECEIVABLES = [
    { due: "2026-10-16", client: "Farmácia Rede Sul", desc: "Pedido #9012 — saldo", value: 3800, status: "atrasado" },
    { due: "2026-10-18", client: "Cliente Casa Verde", desc: "Fatura #F-904 — restante", value: 4500, status: "atrasado" },
    { due: "2026-10-26", client: "Cliente Nordeste Alimentos", desc: "Parcela 2/3 contrato #C-221", value: 28000, status: "vence" },
    { due: "2026-10-27", client: "Clínica Horizonte", desc: "Mensalidade sistema", value: 4200, status: "vence" },
    { due: "2026-10-30", client: "Cliente TecnoSul", desc: "Manutenção mensal", value: 6500, status: "aberto" },
    { due: "2026-11-03", client: "EduMais Cursos", desc: "Implantação módulo 1", value: 9500, status: "aberto" },
    { due: "2026-11-08", client: "Construtora Paraíba", desc: "Parcela 1/4 obra digital", value: 22000, status: "aberto" },
    { due: "2026-11-10", client: "Cliente Porto Tech", desc: "Sinal projeto fase 2", value: 18000, status: "aberto" },
    { due: "2026-11-15", client: "Loja Aurora", desc: "Pedido #8920", value: 7400, status: "aberto" },
    { due: "2026-11-22", client: "Cliente Alfa Serviços", desc: "Renovação anual", value: 24000, status: "aberto" },
    { due: "2026-11-28", client: "Nordeste Alimentos", desc: "Parcela 3/3 contrato #C-221", value: 28000, status: "aberto" },
    { due: "2026-10-12", client: "Loja Aurora", desc: "Pedido #8841", value: 6200, status: "recebido" },
    { due: "2026-10-08", client: "Clínica Horizonte", desc: "Setup inicial", value: 8500, status: "recebido" },
    { due: "2026-10-05", client: "Cliente Alfa Serviços", desc: "Contrato #C-198", value: 18000, status: "recebido" },
    { due: "2026-09-28", client: "Porto Tech", desc: "Fatura #F-881", value: 22000, status: "recebido" },
  ];

  // Tesouraria: só fluxo de caixa (não repetir NFS-e / compras dos lançamentos)
  const BANK_MOVES = [
    { date: "2026-10-24", bank: "bb", type: "entrada", history: "Recebimento parcela contrato #C-221", party: "Cliente Nordeste Alimentos", value: 28000, balanceAfter: 186420 },
    { date: "2026-10-23", bank: "ml", type: "entrada", history: "Liquidação vendas marketplace", party: "Mercado Pago", value: 11400, balanceAfter: 38750 },
    { date: "2026-10-22", bank: "santander", type: "entrada", history: "PIX recebido — fatura #F-904", party: "Cliente Casa Verde", value: 9500, balanceAfter: 94210 },
    { date: "2026-10-22", bank: "itau", type: "entrada", history: "TED recebida — Clínica Horizonte", party: "Clínica Horizonte", value: 8500, balanceAfter: 61280 },
    { date: "2026-10-21", bank: "bb", type: "saida", history: "Folha de pagamento (lote)", party: "Folha / Banco pagador", value: 118000, balanceAfter: 158420 },
    { date: "2026-10-20", bank: "bb", type: "saida", history: "Transferência para Santander", party: "Conta Santander", value: 25000, balanceAfter: 276420 },
    { date: "2026-10-20", bank: "santander", type: "entrada", history: "Transferência recebida do BB", party: "Conta Banco do Brasil", value: 25000, balanceAfter: 84710 },
    { date: "2026-10-19", bank: "itau", type: "saida", history: "Pagamento comissões comerciais", party: "Folha comercial", value: 6800, balanceAfter: 52780 },
    { date: "2026-10-17", bank: "ml", type: "saida", history: "Tarifa / antecipação recebíveis", party: "Mercado Pago", value: 420, balanceAfter: 27350 },
    { date: "2026-10-16", bank: "bb", type: "entrada", history: "Recebimento Farmácia Rede Sul", party: "Farmácia Rede Sul", value: 12400, balanceAfter: 301420 },
    { date: "2026-10-15", bank: "bb", type: "entrada", history: "Recebimento contrato #C-204", party: "Cliente TecnoSul", value: 36000, balanceAfter: 289020 },
    { date: "2026-10-14", bank: "itau", type: "saida", history: "Plano de saúde Unimed", party: "Unimed JP", value: 9600, balanceAfter: 59580 },
    { date: "2026-10-12", bank: "santander", type: "saida", history: "Aplicação CDB (resgate automático)", party: "Santander Investimentos", value: 15000, balanceAfter: 59710 },
    { date: "2026-10-10", bank: "ml", type: "entrada", history: "Repasse checkout semanal", party: "Mercado Pago", value: 8900, balanceAfter: 27770 },
    { date: "2026-10-08", bank: "bb", type: "saida", history: "Impostos DAS / retenções", party: "Receita Federal", value: 8700, balanceAfter: 265420 },
    { date: "2026-10-07", bank: "santander", type: "entrada", history: "PIX EduMais — sinal", party: "EduMais Cursos", value: 4750, balanceAfter: 74710 },
    { date: "2026-10-05", bank: "ml", type: "entrada", history: "Vendas do dia — checkout", party: "Clientes ML", value: 6200, balanceAfter: 18870 },
    { date: "2026-10-03", bank: "itau", type: "entrada", history: "Recebimento Loja Aurora", party: "Loja Aurora", value: 6200, balanceAfter: 69180 },
    { date: "2026-10-01", bank: "bb", type: "entrada", history: "Rendimento aplicação automática", party: "BB Rende Fácil", value: 890, balanceAfter: 274120 },
    { date: "2026-09-28", bank: "bb", type: "entrada", history: "Recebimento fatura #F-881", party: "Cliente Porto Tech", value: 22000, balanceAfter: 273230 },
    { date: "2026-09-25", bank: "itau", type: "saida", history: "Transferência para BB (caixa)", party: "Conta Banco do Brasil", value: 20000, balanceAfter: 62980 },
    { date: "2026-09-25", bank: "bb", type: "entrada", history: "Transferência recebida do Itaú", party: "Conta Itaú", value: 20000, balanceAfter: 251230 },
    { date: "2026-09-22", bank: "santander", type: "entrada", history: "Estorno / crédito em conta", party: "Santander", value: 1800, balanceAfter: 69960 },
    { date: "2026-09-20", bank: "ml", type: "saida", history: "Antecipação taxa marketplace", party: "Mercado Pago", value: 380, balanceAfter: 12670 },
    { date: "2026-09-18", bank: "ml", type: "entrada", history: "Repasse semanal ML", party: "Mercado Pago", value: 15800, balanceAfter: 13050 },
    { date: "2026-09-15", bank: "bb", type: "saida", history: "Folha de pagamento (lote)", party: "Folha / Banco pagador", value: 112000, balanceAfter: 231230 },
    { date: "2026-09-10", bank: "santander", type: "saida", history: "Pagamento fornecedor logística", party: "LogiSul Transportes", value: 5400, balanceAfter: 68160 },
    { date: "2026-09-05", bank: "itau", type: "entrada", history: "Sinal Construtora Paraíba", party: "Construtora Paraíba", value: 15000, balanceAfter: 82980 },
    { date: "2026-08-30", bank: "santander", type: "saida", history: "Tarifas pacote empresarial", party: "Santander", value: 189, balanceAfter: 73560 },
    { date: "2026-08-28", bank: "ml", type: "entrada", history: "Liquidação quinzena ML", party: "Mercado Pago", value: 10200, balanceAfter: 9800 },
    { date: "2026-08-20", bank: "bb", type: "entrada", history: "Sinal contrato #C-198", party: "Cliente Alfa Serviços", value: 18000, balanceAfter: 343230 },
    { date: "2026-08-15", bank: "bb", type: "saida", history: "Folha de pagamento (lote)", party: "Folha / Banco pagador", value: 109000, balanceAfter: 325230 },
  ];

  // Amplia listagens para demonstrar paginação (dados fictícios)
  (function seedExtraRows() {
    const areaIds = AREAS.map((a) => a.id);
    const bankIds = BANKS.map((b) => b.id);
    const suppliers = [
      "Dell Brasil",
      "CleanPro Distribuidora",
      "LogiSul Transportes",
      "MegaSupply Atacado",
      "Kabum B2B",
      "Kalunga Empresas",
      "TechFix Industrial",
      "Agência Norte Criativo",
      "Meta Platforms",
      "Amazon Web Services",
      "HubSpot",
      "Alelo",
      "Unimed JP",
      "Vivo Empresas",
      "Shell Fleet",
      "SafetyMax",
      "LATAM Corporativo",
      "Decolar Corporativo",
      "Google Cloud Brasil",
      "Microsoft / Slack",
    ];
    const clients = [
      "Nordeste Alimentos",
      "Porto Tech",
      "TecnoSul",
      "Casa Verde",
      "Alfa Serviços",
      "Loja Aurora",
      "Clínica Horizonte",
      "Construtora Paraíba",
      "EduMais Cursos",
      "Farmácia Rede Sul",
      "Ateliê Costa",
      "Mercado Bom Preço",
      "Oficina Veloz",
      "Studio Pixel",
      "Padaria Sol Nascente",
    ];
    const categories = {
      comercial: ["Comissões", "Viagens", "CRM", "Brindes"],
      operacoes: ["Frete e logística", "Almoxarifado", "Manutenção", "EPIs"],
      tecnologia: ["Hardware", "Software", "Cloud", "Suporte"],
      rh: ["Benefícios", "Treinamentos", "Recrutamento", "Plano de saúde"],
      marketing: ["Mídia paga", "Agência", "Eventos", "Branding"],
      administrativo: ["Aluguel", "Luz e água", "Limpeza", "Papelaria", "Internet"],
    };
    const pad = (n) => String(n).padStart(2, "0");
    const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

    let nf = 11000;
    for (const [month, days] of [
      [10, 28],
      [9, 26],
      [8, 24],
    ]) {
      for (let i = 0; i < days; i++) {
        const day = 1 + (i % 27);
        const area = areaIds[i % areaIds.length];
        const cats = categories[area];
        const cat = cats[i % cats.length];
        const supplier = suppliers[i % suppliers.length];
        EXPENSES.push({
          date: iso(2026, month, day),
          area,
          category: cat,
          desc: `${cat} — lançamento #${month}${pad(i + 1)}`,
          supplier,
          nfse: `2026/${nf++}`,
          bank: bankIds[i % bankIds.length],
          value: 650 + ((i * 137) % 9800),
          paid: i % 7 !== 0,
        });
      }
    }

    const payStatuses = ["atrasado", "vence", "aberto", "aberto", "aberto", "pago", "pago"];
    for (let i = 0; i < 42; i++) {
      const day = 1 + (i % 28);
      const month = i < 18 ? 10 : i < 30 ? 11 : 9;
      const status = payStatuses[i % payStatuses.length];
      PAYABLES.push({
        due: iso(2026, month, Math.min(day, 28)),
        supplier: suppliers[i % suppliers.length],
        desc: `Título a pagar #AP-${1200 + i}`,
        area: areaIds[i % areaIds.length],
        value: 900 + ((i * 211) % 16000),
        status,
      });
    }

    const recvStatuses = ["atrasado", "vence", "aberto", "aberto", "aberto", "recebido", "recebido"];
    for (let i = 0; i < 40; i++) {
      const day = 1 + (i % 28);
      const month = i < 16 ? 10 : i < 28 ? 11 : 9;
      RECEIVABLES.push({
        due: iso(2026, month, Math.min(day, 28)),
        client: clients[i % clients.length],
        desc: `Fatura #F-${2000 + i}`,
        value: 1200 + ((i * 307) % 32000),
        status: recvStatuses[i % recvStatuses.length],
      });
    }

    let bal = 180000;
    for (let i = 0; i < 55; i++) {
      const day = 1 + (i % 27);
      const month = i < 22 ? 10 : i < 40 ? 9 : 8;
      const type = i % 3 === 0 ? "saida" : "entrada";
      const value = 800 + ((i * 173) % 24000);
      bal += type === "entrada" ? value : -Math.min(value, bal - 5000);
      BANK_MOVES.push({
        date: iso(2026, month, day),
        bank: bankIds[i % bankIds.length],
        type,
        history: type === "entrada" ? `Recebimento operacional #${300 + i}` : `Pagamento operacional #${300 + i}`,
        party: type === "entrada" ? clients[i % clients.length] : suppliers[i % suppliers.length],
        value,
        balanceAfter: Math.max(4200, Math.round(bal)),
      });
    }

    const extraClients = [
      "Ateliê Costa",
      "Mercado Bom Preço",
      "Oficina Veloz",
      "Studio Pixel",
      "Padaria Sol Nascente",
      "Auto Peças Norte",
      "Hotel Maré Alta",
      "Escola Crescer",
      "Pet Vida",
      "Lab Diagnóstico PB",
      "Contábil Mais",
      "Agro Vale Verde",
      "Moda Urban",
      "Delivery Rápido JP",
    ];
    extraClients.forEach((name, i) => {
      CLIENTS.push({
        name,
        receita: 8000 + ((i * 1900) % 72000),
        custo: 3500 + ((i * 1100) % 38000),
      });
    });
  })();

  const CONTRATOS_META = 160000;

  const money = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  const moneySigned = (n, type) => {
    const abs = money(Math.abs(n));
    return type === "entrada" ? `+ ${abs}` : `− ${abs}`;
  };

  const formatDate = (iso) => {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const bankById = (id) => BANKS.find((b) => b.id === id);
  const areaById = (id) => AREAS.find((a) => a.id === id);

  // Visão executiva: ads × retorno × contratos × clientes
  const GROWTH = [
    {
      key: "2026-05",
      adsInvest: 12000,
      adsRevenue: 31000,
      contratosValor: 78000,
      contratosQtd: 4,
      receitaTotal: 142000,
      clientesNovos: 6,
      clientesFieis: 38,
      churn: 2,
      ticketMedio: 19500,
    },
    {
      key: "2026-06",
      adsInvest: 14500,
      adsRevenue: 38500,
      contratosValor: 88000,
      contratosQtd: 5,
      receitaTotal: 156000,
      clientesNovos: 7,
      clientesFieis: 41,
      churn: 1,
      ticketMedio: 17600,
    },
    {
      key: "2026-07",
      adsInvest: 16000,
      adsRevenue: 45200,
      contratosValor: 101000,
      contratosQtd: 6,
      receitaTotal: 171000,
      clientesNovos: 8,
      clientesFieis: 45,
      churn: 2,
      ticketMedio: 16800,
    },
    {
      key: "2026-08",
      adsInvest: 11000,
      adsRevenue: 29800,
      contratosValor: 92000,
      contratosQtd: 4,
      receitaTotal: 164000,
      clientesNovos: 5,
      clientesFieis: 47,
      churn: 1,
      ticketMedio: 23000,
    },
    {
      key: "2026-09",
      adsInvest: 18500,
      adsRevenue: 54200,
      contratosValor: 118000,
      contratosQtd: 7,
      receitaTotal: 189000,
      clientesNovos: 9,
      clientesFieis: 52,
      churn: 2,
      ticketMedio: 16850,
    },
    {
      key: "2026-10",
      adsInvest: 21000,
      adsRevenue: 67800,
      contratosValor: 146000,
      contratosQtd: 8,
      receitaTotal: 214000,
      clientesNovos: 11,
      clientesFieis: 58,
      churn: 1,
      ticketMedio: 18250,
    },
  ];

  const els = {
    period: document.getElementById("period"),
    exec: document.getElementById("executivo"),
    areas: document.getElementById("areasCards"),
    expenseArea: document.getElementById("expenseArea"),
    expenseSearch: document.getElementById("expenseSearch"),
    bankFilter: document.getElementById("bankFilter"),
    pageTitle: document.querySelector(".topbar__title h1"),
    banner: document.querySelector(".banner"),
  };

  const VIEWS = {
    executivo: {
      title: "Crescimento e retorno",
      banner:
        "<strong>Executivo</strong> — crescimento e DRE: ads, contratos, clientes e resultado do mês.",
    },
    tesouraria: {
      title: "Tesouraria e fluxo",
      banner:
        "<strong>Tesouraria</strong> — só caixa: saldos, recebimentos, transferências e tarifas. Sem repetir compras/NFS-e.",
    },
    contas: {
      title: "Contas a pagar e receber",
      banner:
        "<strong>Contas</strong> — vencimentos, atrasos e status. Sem misturar com gráficos de gasto ou extrato.",
    },
    planejamento: {
      title: "Planejamento financeiro",
      banner:
        "<strong>Planejamento</strong> — previsão de caixa, metas por setor e margem por cliente.",
    },
    areas: {
      title: "Gastos por setor",
      banner:
        "<strong>Por área</strong> — única visão analítica dos gastos por setor (pizza + evolução).",
    },
    lancamentos: {
      title: "Lançamentos rastreados",
      banner:
        "<strong>Lançamentos</strong> — só documentos e rastreio (NFS-e, fornecedor, data). Sem gráficos de gasto.",
    },
  };

  let activeView = "executivo";
  let contasFilter = "all";
  const PAGE_SIZE = 10;
  const pages = {
    expenses: 1,
    bank: 1,
    pay: 1,
    recv: 1,
    clients: 1,
  };

  function paginate(rows, page) {
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const current = Math.min(Math.max(1, page), totalPages);
    const start = (current - 1) * PAGE_SIZE;
    return {
      rows: rows.slice(start, start + PAGE_SIZE),
      page: current,
      totalPages,
      total,
      from: total ? start + 1 : 0,
      to: Math.min(start + PAGE_SIZE, total),
    };
  }

  function renderPager(elId, key, pageInfo, onChange) {
    const el = document.getElementById(elId);
    if (!el) return;
    if (pageInfo.totalPages <= 1) {
      el.innerHTML = pageInfo.total
        ? `<span class="pager__meta">${pageInfo.total} registro${pageInfo.total > 1 ? "s" : ""}</span>`
        : "";
      return;
    }
    const nums = [];
    const maxBtns = 5;
    let start = Math.max(1, pageInfo.page - 2);
    let end = Math.min(pageInfo.totalPages, start + maxBtns - 1);
    start = Math.max(1, end - maxBtns + 1);
    for (let i = start; i <= end; i++) nums.push(i);
    el.innerHTML = `
      <span class="pager__meta">${pageInfo.from}–${pageInfo.to} de ${pageInfo.total}</span>
      <div class="pager__controls">
        <button type="button" class="pager__btn" data-page="${pageInfo.page - 1}" ${pageInfo.page <= 1 ? "disabled" : ""}>Anterior</button>
        ${nums
          .map(
            (n) =>
              `<button type="button" class="pager__btn ${n === pageInfo.page ? "is-active" : ""}" data-page="${n}">${n}</button>`,
          )
          .join("")}
        <button type="button" class="pager__btn" data-page="${pageInfo.page + 1}" ${pageInfo.page >= pageInfo.totalPages ? "disabled" : ""}>Próxima</button>
      </div>
    `;
    el.querySelectorAll(".pager__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = Number(btn.dataset.page);
        if (!next || next < 1 || next > pageInfo.totalPages) return;
        pages[key] = next;
        onChange();
      });
    });
  }

  function showView(viewId) {
    activeView = viewId;
    document.querySelectorAll(".view-panel").forEach((panel) => {
      panel.hidden = panel.dataset.view !== viewId;
    });
    document.querySelectorAll(".nav__item").forEach((n) => {
      n.classList.toggle("is-active", n.getAttribute("href") === `#${viewId}`);
    });
    const meta = VIEWS[viewId] || VIEWS.executivo;
    if (els.pageTitle) els.pageTitle.textContent = meta.title;
    if (els.banner) els.banner.innerHTML = meta.banner;
  }

  function areaTotal(row, areaId) {
    return Object.values(row[areaId]).reduce((a, b) => a + b, 0);
  }

  function monthTotal(row) {
    return AREAS.reduce((acc, area) => acc + areaTotal(row, area.id), 0);
  }

  function deltaClass(d) {
    if (d > 1) return "up";
    if (d < -1) return "down";
    return "flat";
  }

  function deltaLabel(d) {
    const sign = d > 0 ? "+" : "";
    return `${sign}${d.toFixed(1).replace(".", ",")}% vs mês anterior`;
  }

  const tipEl = document.getElementById("chartTip");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const chartCleanups = [];

  function showTip(x, y, html) {
    tipEl.hidden = false;
    tipEl.innerHTML = html;
    const pad = 8;
    const tw = tipEl.offsetWidth || 160;
    const th = tipEl.offsetHeight || 60;
    const left = Math.min(Math.max(x, tw / 2 + pad), window.innerWidth - tw / 2 - pad);
    const top = Math.max(y - 8, th + pad);
    tipEl.style.left = `${left}px`;
    tipEl.style.top = `${top}px`;
  }

  function hideTip() {
    tipEl.hidden = true;
  }

  function clearCharts() {
    while (chartCleanups.length) chartCleanups.pop()();
    hideTip();
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function hexAlpha(hex, a) {
    const n = hex.replace("#", "");
    const r = parseInt(n.slice(0, 2), 16);
    const g = parseInt(n.slice(2, 4), 16);
    const b = parseInt(n.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function bindCanvas(canvas, onMove, onLeave) {
    const move = (e) => {
      const rect = canvas.getBoundingClientRect();
      onMove(e.clientX - rect.left, e.clientY - rect.top, e.clientX, e.clientY);
    };
    const leave = () => onLeave();
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    chartCleanups.push(() => {
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    });
  }

  function animate(drawFrame, duration = 700) {
    if (reduceMotion) {
      drawFrame(1);
      return { cancel() {} };
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      drawFrame(easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const handle = {
      cancel() {
        cancelAnimationFrame(raf);
      },
    };
    chartCleanups.push(() => handle.cancel());
    return handle;
  }

  function mountSparkline(canvas, series, labels, color, title) {
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(canvas.clientWidth || 420, 120);
    const cssH = 110;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext("2d");
    let hover = -1;

    const pad = { t: 12, r: 10, b: 10, l: 10 };
    const w = cssW - pad.l - pad.r;
    const h = cssH - pad.t - pad.b;
    const min = Math.min(...series) * 0.92;
    const max = Math.max(...series) * 1.08;
    const span = max - min || 1;
    const lastIdx = Math.max(series.length - 1, 1);
    const step = w / lastIdx;
    const points = series.map((v, i) => ({
      x: pad.l + i * step,
      y: pad.t + h - ((v - min) / span) * h,
      value: v,
      label: labels[i],
    }));

    function paint(progress) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        const y = pad.t + (h * i) / 2;
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(pad.l + w, y);
        ctx.stroke();
      }

      const threshold = lastIdx * Math.max(0, Math.min(progress, 1));
      const clipped = [];
      for (let i = 0; i < points.length; i++) {
        if (i <= threshold) {
          clipped.push(points[i]);
          continue;
        }
        if (i > 0 && i - 1 <= threshold) {
          const t = threshold - (i - 1);
          const prev = points[i - 1];
          const p = points[i];
          clipped.push({
            x: prev.x + (p.x - prev.x) * t,
            y: prev.y + (p.y - prev.y) * t,
            value: p.value,
            label: p.label,
          });
        }
        break;
      }

      if (clipped.length >= 1) {
        const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + h);
        grad.addColorStop(0, hexAlpha(color, 0.32 * progress));
        grad.addColorStop(1, hexAlpha(color, 0));
        ctx.beginPath();
        clipped.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        const end = clipped[clipped.length - 1];
        ctx.lineTo(end.x, pad.t + h);
        ctx.lineTo(clipped[0].x, pad.t + h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        clipped.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      points.forEach((p, i) => {
        if (i > threshold) return;
        const active = hover === i;
        ctx.beginPath();
        ctx.arc(p.x, p.y, active ? 6 : i === points.length - 1 ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = "#01102f";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = active ? 2.5 : 2;
        ctx.stroke();
        if (active) {
          ctx.beginPath();
          ctx.moveTo(p.x, pad.t);
          ctx.lineTo(p.x, pad.t + h);
          ctx.strokeStyle = hexAlpha(color, 0.35);
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    }

    animate(paint, 800);
    bindCanvas(
      canvas,
      (x, y, cx, cy) => {
        let best = -1;
        let bestDist = 22;
        points.forEach((p, i) => {
          const d = Math.hypot(p.x - x, p.y - y);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        if (best < 0) {
          let bx = Infinity;
          points.forEach((p, i) => {
            const d = Math.abs(p.x - x);
            if (d < bx && d < Math.max(step * 0.55, 20)) {
              bx = d;
              best = i;
            }
          });
        }
        hover = best;
        paint(1);
        if (best >= 0) {
          const p = points[best];
          const prevVal = best > 0 ? points[best - 1].value : p.value;
          const dlt = ((p.value - prevVal) / (prevVal || 1)) * 100;
          showTip(
            cx,
            cy,
            `<strong>${title}</strong>${p.label}: <b>${money(p.value)}</b><br/><span>${best === 0 ? "primeiro mês da série" : deltaLabel(dlt)}</span>`,
          );
        } else hideTip();
      },
      () => {
        hover = -1;
        paint(1);
        hideTip();
      },
    );
  }

  function mountDonut(canvas, slices, opts = {}) {
    const size = opts.size || 280;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    const total = slices.reduce((a, s) => a + s.value, 0) || 1;
    const cx = size / 2;
    const cy = size / 2;
    const baseOuter = opts.outer || size * 0.38;
    const inner = opts.inner || size * 0.22;
    let hover = -1;

    const meta = [];
    let angle = -Math.PI / 2;
    for (const slice of slices) {
      const sweep = (slice.value / total) * Math.PI * 2;
      meta.push({ ...slice, start: angle, sweep, pct: (slice.value / total) * 100 });
      angle += sweep;
    }

    function paint(progress) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const reveal = progress * Math.PI * 2;
      let drawn = 0;

      for (let i = 0; i < meta.length; i++) {
        const slice = meta[i];
        const remain = reveal - drawn;
        if (remain <= 0) break;
        const sweep = Math.min(slice.sweep, remain);
        const active = hover === i;
        const outer = baseOuter + (active ? 8 : 0);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, outer, slice.start, slice.start + sweep);
        ctx.closePath();
        ctx.globalAlpha = active ? 1 : hover >= 0 ? 0.45 : 1;
        ctx.fillStyle = slice.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        drawn += slice.sweep;
      }

      ctx.beginPath();
      ctx.arc(cx, cy, inner, 0, Math.PI * 2);
      ctx.fillStyle = opts.hole || "#0a1a3d";
      ctx.fill();

      const focus = hover >= 0 ? meta[hover] : meta[0];
      if (opts.center || focus) {
        const label = hover >= 0 ? `${focus.pct.toFixed(0)}%` : opts.center || `${focus.pct.toFixed(0)}%`;
        const sub = hover >= 0 ? (focus.title || focus.label || "").split(" ")[0] : opts.sub || "";
        ctx.fillStyle = "#f8fafc";
        ctx.font = `700 ${opts.centerSize || 22}px Segoe UI, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, cx, cy - (sub ? 8 : 0));
        if (sub) {
          ctx.fillStyle = "#94a3b8";
          ctx.font = "12px Segoe UI, sans-serif";
          ctx.fillText(sub, cx, cy + 14);
        }
      }
    }

    animate(paint, 900);
    bindCanvas(
      canvas,
      (x, y, clientX, clientY) => {
        const scaleX = size / (canvas.clientWidth || size);
        const scaleY = size / (canvas.clientHeight || size);
        const lx = x * scaleX - cx;
        const ly = y * scaleY - cy;
        const dist = Math.hypot(lx, ly);
        if (dist < inner - 2 || dist > baseOuter + 14) {
          hover = -1;
          paint(1);
          hideTip();
          return;
        }
        const ang = Math.atan2(ly, lx);
        let rel = ang - -Math.PI / 2;
        if (rel < 0) rel += Math.PI * 2;
        let acc = 0;
        let found = -1;
        for (let i = 0; i < meta.length; i++) {
          acc += meta[i].sweep;
          if (rel <= acc) {
            found = i;
            break;
          }
        }
        hover = found;
        paint(1);
        if (found >= 0) {
          const s = meta[found];
          const name = s.title || s.label || "Item";
          showTip(
            clientX,
            clientY,
            `<strong>${name}</strong>${money(s.value)} · <b>${s.pct.toFixed(1).replace(".", ",")}%</b><br/><span>${opts.tipHint || "do total desta visão"}</span>`,
          );
        } else hideTip();
      },
      () => {
        hover = -1;
        paint(1);
        hideTip();
      },
    );
  }

  function render() {
    clearCharts();
    const period = els.period.value;
    const caixa = BANKS.reduce((a, b) => a + b.balance, 0);
    renderAlertStrip(period);

    // Cada visão renderiza só o próprio tema (sem repetir gastos em tudo)
    if (activeView === "executivo") {
      renderExecutive(period);
      return;
    }
    if (activeView === "tesouraria") {
      renderTreasury(period, caixa);
      renderBankMoves(period);
      return;
    }
    if (activeView === "contas") {
      renderContas();
      return;
    }
    if (activeView === "planejamento") {
      renderPlanejamento(period, caixa);
      return;
    }
    if (activeView === "areas") {
      renderAreas(period);
      return;
    }
    if (activeView === "lancamentos") {
      renderExpenses(period);
    }
  }

  function renderAlertStrip(period) {
    const strip = document.getElementById("alertStrip");
    if (!strip) return;
    const alerts = buildAlerts(period).filter((a) => a.level !== "ok");
    if (!alerts.length) {
      strip.hidden = true;
      strip.innerHTML = "";
      return;
    }
    const crit = alerts.filter((a) => a.level === "crit").length;
    const top = alerts.slice(0, 3);
    strip.hidden = false;
    strip.innerHTML = `
      <div class="alert-strip__head">
        <strong>${alerts.length} alerta${alerts.length > 1 ? "s" : ""}</strong>
        <span>${crit ? `${crit} crítico${crit > 1 ? "s" : ""}` : "atenção"}</span>
      </div>
      <div class="alert-strip__list">
        ${top
          .map(
            (a) => {
              const go =
                a.tag === "Caixa"
                  ? "tesouraria"
                  : a.tag === "Orçamento"
                    ? "planejamento"
                    : a.tag === "NFS-e"
                      ? "lancamentos"
                      : "contas";
              return `<button type="button" class="alert-strip__item alert-strip__item--${a.level}" data-go="${go}">
              <em>${a.tag}</em>
              <span>${a.title}</span>
            </button>`;
            },
          )
          .join("")}
      </div>
      ${
        alerts.length > 3
          ? `<button type="button" class="alert-strip__more" data-go="contas">+${alerts.length - 3} ver contas</button>`
          : ""
      }
    `;
    strip.querySelectorAll("[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => {
        showView(btn.dataset.go);
        requestAnimationFrame(() => render());
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function renderAreas(period) {
    const idx = HISTORY.findIndex((h) => h.key === period);
    const current = HISTORY[idx];
    const previous = HISTORY[Math.max(0, idx - 1)];
    const despesas = monthTotal(current);

    const areaSlices = AREAS.map((area) => ({
      title: area.title,
      color: area.color,
      value: areaTotal(current, area.id),
    })).sort((a, b) => b.value - a.value);

    const top = areaSlices[0];
    const topPct = (top.value / despesas) * 100;

    document.getElementById("topSlice").textContent = `${top.title} · ${topPct.toFixed(0)}%`;
    mountDonut(document.getElementById("pieAreas"), areaSlices, {
      size: 280,
      center: `${topPct.toFixed(0)}%`,
      sub: top.title.split(" ")[0],
      centerSize: 28,
      tipHint: "das despesas do mês",
    });
    document.getElementById("pieLegend").innerHTML = areaSlices
      .map((s, i) => {
        const pct = (s.value / despesas) * 100;
        return `<li class="${i === 0 ? "is-top" : ""}">
          <i style="background:${s.color}"></i>
          <span>${s.title}</span>
          <em>${money(s.value)}</em>
          <strong>${pct.toFixed(1).replace(".", ",")}%</strong>
        </li>`;
      })
      .join("");

    els.areas.innerHTML = AREAS.map((area, i) => {
      const total = areaTotal(current, area.id);
      const prev = areaTotal(previous, area.id);
      const d = ((total - prev) / prev) * 100;
      const data = current[area.id];
      const items = area.items
        .map((item) => {
          const value = data[item.key];
          const share = (value / total) * 100;
          return `<div class="item">
            <i style="background:${item.color}"></i>
            <span class="item__name">${item.label}</span>
            <span class="item__val">${money(value)}</span>
            <span class="item__share">${share.toFixed(0)}%</span>
          </div>`;
        })
        .join("");

      return `<article class="card area" data-area="${area.id}">
        <div class="area__top">
          <div>
            <h2>${area.title}</h2>
            <p>${area.subtitle}</p>
          </div>
          <div class="area__total">
            <strong>${money(total)}</strong>
            <span class="${deltaClass(d)}">${deltaLabel(d)}</span>
          </div>
        </div>
        <div class="area__viz">
          <div class="area__chart">
            <canvas id="spark-${i}" width="420" height="110" aria-label="Evolução de ${area.title}"></canvas>
            <div class="area__chart-label"><span>Mai</span><span>Evolução 6 meses</span><span>Out</span></div>
          </div>
          <div class="area__pie-wrap">
            <canvas id="pie-${i}" width="120" height="120" aria-label="Composição de ${area.title}"></canvas>
            <span>Composição</span>
          </div>
        </div>
        <div class="area__items">${items}</div>
      </article>`;
    }).join("");

    const monthLabels = HISTORY.map((h) => h.label);
    AREAS.forEach((area, i) => {
      const series = HISTORY.map((h) => areaTotal(h, area.id));
      mountSparkline(document.getElementById(`spark-${i}`), series, monthLabels, area.color, area.title);
      const data = current[area.id];
      const slices = area.items.map((item) => ({
        color: item.color,
        value: data[item.key],
        title: item.label,
        label: item.label,
      }));
      mountDonut(document.getElementById(`pie-${i}`), slices, {
        size: 120,
        outer: 48,
        inner: 28,
        hole: "#0a1a3d",
        tipHint: `do setor ${area.title}`,
      });
    });
  }

  function renderExecutive(period) {
    const idx = GROWTH.findIndex((g) => g.key === period);
    const g = GROWTH[idx];
    const prev = GROWTH[Math.max(0, idx - 1)];
    const ytd = GROWTH.slice(0, idx + 1);
    const receitaYtd = ytd.reduce((a, x) => a + x.receitaTotal, 0);
    const adsInvestYtd = ytd.reduce((a, x) => a + x.adsInvest, 0);
    const adsRevenueYtd = ytd.reduce((a, x) => a + x.adsRevenue, 0);
    const contratosYtd = ytd.reduce((a, x) => a + x.contratosValor, 0);
    const maisMes = g.receitaTotal - prev.receitaTotal;
    const primeiro = GROWTH[0];
    const maisAno = g.receitaTotal - primeiro.receitaTotal;
    const roi = ((g.adsRevenue - g.adsInvest) / g.adsInvest) * 100;
    const roiYtd = ((adsRevenueYtd - adsInvestYtd) / adsInvestYtd) * 100;
    const cac = g.adsInvest / Math.max(g.clientesNovos, 1);
    const maxBar = Math.max(g.adsInvest, g.adsRevenue, g.contratosValor);
    const dre = buildDre(period);

    els.exec.innerHTML = `
      <div class="exec__head">
        <div>
          <h2>Crescimento · propaganda, contratos e clientes</h2>
          <p>Comparativo do que você investe e do que retorna — visão só do executivo</p>
        </div>
        <span class="pill">ROI ads ${roi.toFixed(0)}%</span>
      </div>

      <div class="exec__grid">
        <article class="exec-compare">
          <div class="exec-compare__title">
            <h3>Investimento × retorno no mês</h3>
            <span>Propaganda paga vs receita atribuída</span>
          </div>
          <div class="exec-bars">
            <div class="exec-bar-row">
              <div class="exec-bar-row__top"><span>Investido em ads</span><strong>${money(g.adsInvest)}</strong></div>
              <div class="exec-bar-track"><i style="width:${(g.adsInvest / maxBar) * 100}%;background:${COLORS.rose}"></i></div>
            </div>
            <div class="exec-bar-row">
              <div class="exec-bar-row__top"><span>Retorno atribuído aos ads</span><strong>${money(g.adsRevenue)}</strong></div>
              <div class="exec-bar-track"><i style="width:${(g.adsRevenue / maxBar) * 100}%;background:${COLORS.lime}"></i></div>
            </div>
            <div class="exec-bar-row">
              <div class="exec-bar-row__top"><span>Contratos novos</span><strong>${money(g.contratosValor)}</strong></div>
              <div class="exec-bar-track"><i style="width:${(g.contratosValor / maxBar) * 100}%;background:${COLORS.cyan}"></i></div>
            </div>
          </div>
          <div class="exec-roi">
            <span>Lucro líquido dos ads neste mês</span>
            <strong>${money(g.adsRevenue - g.adsInvest)}</strong>
          </div>
        </article>

        <article class="exec-chart-card">
          <h3>Evolução ads · 6 meses</h3>
          <p>Linha verde = retorno · linha rosa = investimento</p>
          <canvas id="execCompareChart" width="520" height="220" aria-label="Comparativo ads"></canvas>
          <div class="exec-legend">
            <span><i style="background:${COLORS.lime}"></i> Retorno ads</span>
            <span><i style="background:${COLORS.rose}"></i> Investimento</span>
          </div>
        </article>
      </div>

      <div class="exec__metrics">
        <article class="exec-metric">
          <div class="exec-metric__label">Recebendo a mais / mês</div>
          <div class="exec-metric__value ${maisMes >= 0 ? "mint" : "rose"}">${maisMes >= 0 ? "+" : "−"}${money(Math.abs(maisMes))}</div>
          <div class="exec-metric__meta">vs mês anterior · receita total ${money(g.receitaTotal)}</div>
        </article>
        <article class="exec-metric">
          <div class="exec-metric__label">Recebendo a mais / ano</div>
          <div class="exec-metric__value lime">${maisAno >= 0 ? "+" : "−"}${money(Math.abs(maisAno))}</div>
          <div class="exec-metric__meta">vs maio/2026 · YTD ${money(receitaYtd)}</div>
        </article>
        <article class="exec-metric">
          <div class="exec-metric__label">Contratos novos</div>
          <div class="exec-metric__value lime">${money(g.contratosValor)}</div>
          <div class="exec-metric__meta">${g.contratosQtd} contratos · ${((g.contratosValor / CONTRATOS_META) * 100).toFixed(0)}% da meta</div>
        </article>
        <article class="exec-metric">
          <div class="exec-metric__label">ROI propaganda (mês)</div>
          <div class="exec-metric__value lime">${roi.toFixed(0)}%</div>
          <div class="exec-metric__meta">YTD ${roiYtd.toFixed(0)}% · investido ${money(adsInvestYtd)}</div>
        </article>
        <article class="exec-metric">
          <div class="exec-metric__label">Retorno ads no ano</div>
          <div class="exec-metric__value">${money(adsRevenueYtd)}</div>
          <div class="exec-metric__meta">sobre ${money(adsInvestYtd)} investidos</div>
        </article>
        <article class="exec-metric">
          <div class="exec-metric__label">Contratos no ano</div>
          <div class="exec-metric__value">${money(contratosYtd)}</div>
          <div class="exec-metric__meta">${ytd.reduce((a, x) => a + x.contratosQtd, 0)} fechados no período</div>
        </article>
      </div>

      <div class="exec-clients">
        <article class="exec-client">
          <span>Clientes fidelizados</span>
          <strong>${g.clientesFieis}</strong>
        </article>
        <article class="exec-client">
          <span>Novos clientes no mês</span>
          <strong>${g.clientesNovos}</strong>
        </article>
        <article class="exec-client">
          <span>Ticket médio contrato</span>
          <strong>${money(g.ticketMedio)}</strong>
        </article>
        <article class="exec-client">
          <span>CAC (custo por cliente)</span>
          <strong>${money(cac)}</strong>
        </article>
        <article class="exec-client">
          <span>Churn no mês</span>
          <strong>${g.churn}</strong>
        </article>
        <article class="exec-client">
          <span>Retenção estimada</span>
          <strong>${(100 - (g.churn / (g.clientesFieis + g.churn)) * 100).toFixed(0)}%</strong>
        </article>
        <article class="exec-client">
          <span>Payback ads (dias)</span>
          <strong>${Math.round((g.adsInvest / (g.adsRevenue / 30)))}</strong>
        </article>
        <article class="exec-client">
          <span>Receita / ads investido</span>
          <strong>${(g.adsRevenue / g.adsInvest).toFixed(1).replace(".", ",")}x</strong>
        </article>
      </div>

      <article class="card card--wide">
        <header class="card__head">
          <div>
            <h2>DRE do mês</h2>
            <p>Receita × custos × resultado — visão de lucro, não de caixa</p>
          </div>
          <span class="pill">${dre.margem.toFixed(1).replace(".", ",")}% margem</span>
        </header>
        <div class="dre dre--wide">
          <div class="dre-row"><span>Receita operacional</span><strong>${money(dre.receita)}</strong></div>
          <div class="dre-row"><span>Custos e despesas <span class="muted">(setores)</span></span><strong>− ${money(dre.custo)}</strong></div>
          <div class="dre-row dre-row--total"><span>Resultado do mês</span><strong>${dre.resultado >= 0 ? "" : "− "}${money(Math.abs(dre.resultado))}</strong></div>
          <div class="dre-row"><span>Investimento em ads <span class="muted">(destaque · incluso em Marketing)</span></span><strong>${money(dre.ads)}</strong></div>
        </div>
      </article>
    `;

    requestAnimationFrame(() => {
      const canvas = document.getElementById("execCompareChart");
      if (canvas) mountExecCompareChart(canvas);
    });
  }

  function buildAlerts(period) {
    const row = HISTORY.find((h) => h.key === period);
    const caixa = BANKS.reduce((a, b) => a + b.balance, 0);
    const list = [];

    for (const area of AREAS) {
      const spent = areaTotal(row, area.id);
      const budget = AREA_BUDGET[area.id];
      if (spent > budget) {
        list.push({
          level: "crit",
          tag: "Orçamento",
          title: `${area.title} estourou o orçamento`,
          detail: `${money(spent)} gastos · teto ${money(budget)} (${(((spent - budget) / budget) * 100).toFixed(0)}% acima)`,
        });
      }
    }

    const unpaid = EXPENSES.filter((e) => e.date.startsWith(period) && e.paid === false);
    unpaid.forEach((e) => {
      list.push({
        level: "warn",
        tag: "NFS-e",
        title: `NFS-e ${e.nfse} sem pagamento`,
        detail: `${e.supplier} · ${money(e.value)} · ${e.desc}`,
      });
    });

    PAYABLES.filter((p) => p.status === "atrasado").forEach((p) => {
      list.push({
        level: "crit",
        tag: "A pagar",
        title: `Conta atrasada — ${p.supplier}`,
        detail: `Venceu em ${formatDate(p.due)} · ${money(p.value)}`,
      });
    });

    PAYABLES.filter((p) => p.status === "vence").forEach((p) => {
      list.push({
        level: "warn",
        tag: "A pagar",
        title: `Vence em breve — ${p.supplier}`,
        detail: `Vencimento ${formatDate(p.due)} · ${money(p.value)}`,
      });
    });

    RECEIVABLES.filter((r) => r.status === "atrasado").forEach((r) => {
      list.push({
        level: "crit",
        tag: "A receber",
        title: `Recebível atrasado — ${r.client}`,
        detail: `Venceu em ${formatDate(r.due)} · ${money(r.value)}`,
      });
    });

    if (caixa < CAIXA_MINIMO) {
      list.push({
        level: "warn",
        tag: "Caixa",
        title: "Caixa abaixo do mínimo",
        detail: `${money(caixa)} disponível · meta mínima ${money(CAIXA_MINIMO)}`,
      });
    }

    if (!list.length) {
      list.push({
        level: "ok",
        tag: "Ok",
        title: "Nenhum alerta crítico",
        detail: "Orçamentos, NFS-e e vencimentos sob controle neste recorte.",
      });
    }

    return list;
  }

  function buildDre(period) {
    const g = GROWTH.find((x) => x.key === period);
    const row = HISTORY.find((h) => h.key === period);
    const custo = monthTotal(row);
    // evita contar ads duas vezes se já estiver em marketing.midia: DRE usa receita − custo setores
    // e mostra ads como destaque informativo do GROWTH
    const receita = g.receitaTotal;
    const ads = g.adsInvest;
    const resultado = receita - custo;
    const margem = receita ? (resultado / receita) * 100 : 0;
    return { receita, custo, ads, resultado, margem };
  }

  function daysFromToday(iso) {
    const today = new Date(`${TODAY}T12:00:00`);
    const d = new Date(`${iso}T12:00:00`);
    return Math.round((d - today) / 86400000);
  }

  function addMonthsIso(iso, months) {
    const d = new Date(`${iso}T12:00:00`);
    d.setMonth(d.getMonth() + months);
    return d.toISOString().slice(0, 10);
  }

  function buildCashForecast(caixa) {
    const events = [];
    PAYABLES.filter((p) => p.status !== "pago").forEach((p) => {
      events.push({ day: daysFromToday(p.due), value: -p.value });
    });
    RECEIVABLES.filter((r) => r.status !== "recebido").forEach((r) => {
      events.push({ day: daysFromToday(r.due), value: r.value });
    });
    for (let m = 0; m < 3; m++) {
      const base = addMonthsIso(`${TODAY.slice(0, 8)}01`, m);
      RECURRING.forEach((r) => {
        const due = `${base.slice(0, 8)}${String(r.day).padStart(2, "0")}`;
        const day = daysFromToday(due);
        if (day >= 0 && day <= 90) events.push({ day, value: -r.value });
      });
    }
    events.sort((a, b) => a.day - b.day);

    let bal = caixa;
    events.filter((e) => e.day <= 0).forEach((e) => {
      bal += e.value;
    });
    const future = events.filter((e) => e.day > 0);
    const horizons = [30, 60, 90];
    const at = {};
    const series = [{ day: 0, balance: bal }];
    let fi = 0;
    for (let day = 1; day <= 90; day++) {
      while (fi < future.length && future[fi].day === day) {
        bal += future[fi].value;
        fi++;
      }
      if (horizons.includes(day)) at[day] = bal;
      if (day % 5 === 0 || horizons.includes(day)) series.push({ day, balance: bal });
    }
    return { series, at, start: caixa, min: Math.min(...series.map((p) => p.balance)) };
  }

  function renderPlanejamento(period, caixa) {
    const row = HISTORY.find((h) => h.key === period);
    const forecast = buildCashForecast(caixa);
    const goals = AREAS.map((area) => {
      const spent = areaTotal(row, area.id);
      const budget = AREA_BUDGET[area.id];
      const pct = budget ? (spent / budget) * 100 : 0;
      return { area, spent, budget, pct, delta: budget - spent };
    }).sort((a, b) => b.pct - a.pct);

    const overBudget = goals.filter((g) => g.spent > g.budget).length;
    const clients = CLIENTS.map((c) => {
      const margem = c.receita - c.custo;
      const pct = c.receita ? (margem / c.receita) * 100 : 0;
      return { ...c, margem, pct };
    }).sort((a, b) => b.margem - a.margem);
    const margemMedia = clients.reduce((a, c) => a + c.pct, 0) / clients.length;

    document.getElementById("planKpis").innerHTML = `
      <div class="pay-kpi pay-kpi--hero">
        <div class="pay-kpi__label">Caixa em 30 dias</div>
        <div class="pay-kpi__value ${forecast.at[30] >= CAIXA_MINIMO ? "lime" : "out"}">${money(forecast.at[30])}</div>
        <div class="pay-kpi__meta">hoje ${money(caixa)} · mínimo ${money(CAIXA_MINIMO)}</div>
      </div>
      <div class="pay-kpi">
        <div class="pay-kpi__label">Caixa em 60 dias</div>
        <div class="pay-kpi__value ${forecast.at[60] >= 0 ? "in" : "out"}">${money(forecast.at[60])}</div>
        <div class="pay-kpi__meta">após folha e vencimentos</div>
      </div>
      <div class="pay-kpi">
        <div class="pay-kpi__label">Caixa em 90 dias</div>
        <div class="pay-kpi__value ${forecast.at[90] >= 0 ? "in" : "out"}">${money(forecast.at[90])}</div>
        <div class="pay-kpi__meta">ponto baixo da série: ${money(forecast.min)}</div>
      </div>
      <div class="pay-kpi">
        <div class="pay-kpi__label">Orçamentos no vermelho</div>
        <div class="pay-kpi__value ${overBudget ? "out" : "in"}">${overBudget}</div>
        <div class="pay-kpi__meta">de ${goals.length} setores · margem média clientes ${margemMedia.toFixed(0)}%</div>
      </div>
    `;

    document.getElementById("planCashPill").textContent =
      forecast.min < CAIXA_MINIMO ? "Atenção ao mínimo" : "Dentro do mínimo";

    document.getElementById("planCash").innerHTML = [30, 60, 90]
      .map((d) => {
        const v = forecast.at[d];
        const delta = v - caixa;
        return `<div class="plan-cash__card">
          <span>${d} dias</span>
          <strong class="${v >= CAIXA_MINIMO ? "ok" : "risk"}">${money(v)}</strong>
          <em class="${delta >= 0 ? "in" : "out"}">${delta >= 0 ? "+" : "−"}${money(Math.abs(delta))} vs hoje</em>
        </div>`;
      })
      .join("");

    document.getElementById("planGoals").innerHTML = goals
      .map((g) => {
        const over = g.spent > g.budget;
        const width = Math.min(g.pct, 100);
        return `<div class="plan-goal ${over ? "is-over" : ""}">
          <div class="plan-goal__top">
            <span class="tag-soft"><i style="background:${g.area.color}"></i>${g.area.title}</span>
            <strong>${g.pct.toFixed(0)}%</strong>
          </div>
          <div class="plan-goal__track"><i style="width:${width}%;background:${over ? "var(--rose)" : g.area.color}"></i></div>
          <div class="plan-goal__meta">
            <span>Realizado ${money(g.spent)}</span>
            <span>Meta ${money(g.budget)}</span>
            <span class="${over ? "out" : "in"}">${over ? "estourou " : "sobra "}${money(Math.abs(g.delta))}</span>
          </div>
        </div>`;
      })
      .join("");

    const clientsPage = paginate(clients, pages.clients);
    pages.clients = clientsPage.page;
    document.getElementById("planClientsBody").innerHTML = clientsPage.rows
      .map(
        (c) => `<tr>
          <td><strong>${c.name}</strong></td>
          <td class="num">${money(c.receita)}</td>
          <td class="num">${money(c.custo)}</td>
          <td class="num ${c.margem >= 0 ? "" : "out"}">${money(c.margem)}</td>
          <td class="num"><span class="status ${c.pct >= 40 ? "status--recebido" : c.pct >= 25 ? "status--aberto" : "status--vence"}">${c.pct.toFixed(0)}%</span></td>
        </tr>`,
      )
      .join("");
    renderPager("clientsPager", "clients", clientsPage, () =>
      renderPlanejamento(period, caixa),
    );

    requestAnimationFrame(() => {
      const canvas = document.getElementById("planCashChart");
      if (canvas) mountCashForecastChart(canvas, forecast.series);
    });
  }

  function mountCashForecastChart(canvas, series) {
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(canvas.clientWidth || 720, 280);
    const cssH = 220;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext("2d");
    const pad = { t: 16, r: 12, b: 28, l: 52 };
    const w = cssW - pad.l - pad.r;
    const h = cssH - pad.t - pad.b;
    const vals = series.map((p) => p.balance);
    const min = Math.min(...vals, CAIXA_MINIMO) * 0.92;
    const max = Math.max(...vals) * 1.08;
    const range = max - min || 1;

    const points = series.map((p) => ({
      x: pad.l + (p.day / 90) * w,
      y: pad.t + h - ((p.balance - min) / range) * h,
      ...p,
    }));

    let hover = -1;

    function draw(progress) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const y = pad.t + (h / 3) * i;
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(pad.l + w, y);
        ctx.stroke();
      }

      const minY = pad.t + h - ((CAIXA_MINIMO - min) / range) * h;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(251,191,36,0.55)";
      ctx.beginPath();
      ctx.moveTo(pad.l, minY);
      ctx.lineTo(pad.l + w, minY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(251,191,36,0.85)";
      ctx.font = "11px Segoe UI, sans-serif";
      ctx.fillText("mínimo", pad.l + 4, minY - 4);

      const threshold = (points.length - 1) * progress;
      const clipped = [];
      for (let i = 0; i < points.length; i++) {
        if (i <= threshold) clipped.push(points[i]);
        else if (i > 0 && i - 1 <= threshold) {
          const t = threshold - (i - 1);
          const a = points[i - 1];
          const b = points[i];
          clipped.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
          break;
        } else break;
      }

      if (clipped.length > 1) {
        ctx.beginPath();
        clipped.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.strokeStyle = COLORS.lime;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(148,163,184,0.9)";
      ctx.font = "11px Segoe UI, sans-serif";
      [0, 30, 60, 90].forEach((d) => {
        const x = pad.l + (d / 90) * w;
        ctx.fillText(`${d}d`, x - 8, cssH - 8);
      });

      if (hover >= 0 && hover < points.length) {
        const p = points[hover];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.lime;
        ctx.fill();
      }
    }

    animate(draw, 700);
    bindCanvas(
      canvas,
      (mx, my, clientX, clientY) => {
        let best = -1;
        let bestDist = 28;
        points.forEach((p, i) => {
          const d = Math.hypot(p.x - mx, p.y - my);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        hover = best;
        draw(1);
        if (best >= 0) {
          const p = points[best];
          showTip(clientX, clientY, `<strong>Dia ${p.day}</strong><br/>Saldo ${money(p.balance)}`);
        } else hideTip();
      },
      () => {
        hover = -1;
        draw(1);
        hideTip();
      },
    );
  }

  function mountExecCompareChart(canvas) {
    const invest = GROWTH.map((g) => g.adsInvest);
    const revenue = GROWTH.map((g) => g.adsRevenue);
    const labels = GROWTH.map((g) => HISTORY.find((h) => h.key === g.key)?.label || g.key.slice(5));
    const dpr = window.devicePixelRatio || 1;
    const cssW = Math.max(canvas.clientWidth || 520, 280);
    const cssH = 220;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext("2d");
    const pad = { t: 16, r: 12, b: 28, l: 44 };
    const w = cssW - pad.l - pad.r;
    const h = cssH - pad.t - pad.b;
    const max = Math.max(...invest, ...revenue) * 1.15;
    const step = w / (labels.length - 1);

    const toPoints = (series) =>
      series.map((v, i) => ({
        x: pad.l + i * step,
        y: pad.t + h - (v / max) * h,
        value: v,
        label: labels[i],
      }));

    const pInvest = toPoints(invest);
    const pRevenue = toPoints(revenue);
    let hover = -1;

    function drawLine(points, color, progress) {
      const threshold = (points.length - 1) * progress;
      const clipped = [];
      for (let i = 0; i < points.length; i++) {
        if (i <= threshold) clipped.push(points[i]);
        else if (i > 0 && i - 1 <= threshold) {
          const t = threshold - (i - 1);
          const a = points[i - 1];
          const b = points[i];
          clipped.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
          break;
        } else break;
      }
      if (!clipped.length) return;
      ctx.beginPath();
      clipped.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      points.forEach((p, i) => {
        if (i > threshold) return;
        const active = hover === i;
        ctx.beginPath();
        ctx.arc(p.x, p.y, active ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#01102f";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    function paint(progress) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.fillStyle = "#64748b";
      ctx.font = "11px Segoe UI, sans-serif";
      for (let i = 0; i <= 4; i++) {
        const y = pad.t + (h * i) / 4;
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(pad.l + w, y);
        ctx.stroke();
        ctx.textAlign = "right";
        ctx.fillText(`${Math.round((max * (1 - i / 4)) / 1000)}k`, pad.l - 6, y + 3);
      }
      labels.forEach((lab, i) => {
        ctx.textAlign = "center";
        ctx.fillText(lab, pad.l + i * step, cssH - 8);
      });
      if (hover >= 0) {
        const x = pRevenue[hover].x;
        ctx.beginPath();
        ctx.moveTo(x, pad.t);
        ctx.lineTo(x, pad.t + h);
        ctx.strokeStyle = "rgba(215,243,0,0.3)";
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      drawLine(pInvest, COLORS.rose, progress);
      drawLine(pRevenue, COLORS.lime, progress);
    }

    animate(paint, 850);
    bindCanvas(
      canvas,
      (x, y, cx, cy) => {
        let best = -1;
        let bestD = 24;
        pRevenue.forEach((p, i) => {
          const d = Math.abs(p.x - x);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        hover = best;
        paint(1);
        if (best >= 0) {
          showTip(
            cx,
            cy,
            `<strong>${labels[best]}</strong>Investido: <b>${money(invest[best])}</b><br/>Retorno: <b>${money(revenue[best])}</b><br/><span>ROI ${(((revenue[best] - invest[best]) / invest[best]) * 100).toFixed(0)}%</span>`,
          );
        } else hideTip();
      },
      () => {
        hover = -1;
        paint(1);
        hideTip();
      },
    );
  }

  function statusLabel(s) {
    const map = {
      atrasado: "Atrasado",
      vence: "Vence logo",
      aberto: "Em aberto",
      pago: "Pago",
      recebido: "Recebido",
    };
    return map[s] || s;
  }

  function statusRank(s) {
    if (s === "atrasado") return 0;
    if (s === "vence") return 1;
    if (s === "aberto") return 2;
    return 3;
  }

  function dueMeta(iso) {
    const today = new Date(`${TODAY}T12:00:00`);
    const due = new Date(`${iso}T12:00:00`);
    const days = Math.round((due - today) / 86400000);
    if (days < 0) {
      const n = Math.abs(days);
      return { days, tone: "late", label: n === 1 ? "há 1 dia" : `há ${n} dias` };
    }
    if (days === 0) return { days, tone: "soon", label: "vence hoje" };
    if (days === 1) return { days, tone: "soon", label: "amanhã" };
    if (days <= 7) return { days, tone: "soon", label: `em ${days} dias` };
    return { days, tone: "ok", label: `em ${days} dias` };
  }

  function matchContasFilter(status) {
    if (contasFilter === "all") return true;
    if (contasFilter === "aberto") return status === "aberto" || status === "vence";
    if (contasFilter === "feitos") return status === "pago" || status === "recebido";
    return status === contasFilter;
  }

  function sortContas(a, b) {
    const ra = statusRank(a.status);
    const rb = statusRank(b.status);
    if (ra !== rb) return ra - rb;
    return a.due.localeCompare(b.due);
  }

  function renderContas() {
    const openPay = PAYABLES.filter((p) => p.status !== "pago");
    const openRecv = RECEIVABLES.filter((r) => r.status !== "recebido");
    const atrasadoPay = PAYABLES.filter((p) => p.status === "atrasado");
    const atrasadoRecv = RECEIVABLES.filter((r) => r.status === "atrasado");
    const aPagar = openPay.reduce((a, p) => a + p.value, 0);
    const aReceber = openRecv.reduce((a, r) => a + r.value, 0);
    const atrasadoPayVal = atrasadoPay.reduce((a, p) => a + p.value, 0);
    const atrasadoRecvVal = atrasadoRecv.reduce((a, r) => a + r.value, 0);
    const saldo = aReceber - aPagar;
    const urgentes =
      atrasadoPay.length +
      atrasadoRecv.length +
      PAYABLES.filter((p) => p.status === "vence").length +
      RECEIVABLES.filter((r) => r.status === "vence").length;
    const mixTotal = aPagar + aReceber || 1;

    document.getElementById("paySummary").innerHTML = `
      <div class="pay-kpi pay-kpi--hero">
        <div class="pay-kpi__label">Posição líquida prevista</div>
        <div class="pay-kpi__value ${saldo >= 0 ? "lime" : "out"}">${saldo >= 0 ? "+" : "−"}${money(Math.abs(saldo))}</div>
        <div class="pay-kpi__meta">A receber − a pagar (em aberto)</div>
        <div class="pay-kpi__bar" aria-hidden="true">
          <i class="out" style="width:${(aPagar / mixTotal) * 100}%"></i>
          <i class="in" style="width:${(aReceber / mixTotal) * 100}%"></i>
        </div>
      </div>
      <div class="pay-kpi">
        <div class="pay-kpi__label">A pagar</div>
        <div class="pay-kpi__value out">${money(aPagar)}</div>
        <div class="pay-kpi__meta">${openPay.length} títulos · ${atrasadoPay.length} atrasado(s)</div>
      </div>
      <div class="pay-kpi">
        <div class="pay-kpi__label">A receber</div>
        <div class="pay-kpi__value in">${money(aReceber)}</div>
        <div class="pay-kpi__meta">${openRecv.length} títulos · ${atrasadoRecv.length} atrasado(s)</div>
      </div>
      <div class="pay-kpi">
        <div class="pay-kpi__label">Atenção agora</div>
        <div class="pay-kpi__value ${urgentes ? "out" : "in"}">${urgentes}</div>
        <div class="pay-kpi__meta">Atrasados + vencem logo · ${money(atrasadoPayVal + atrasadoRecvVal)} em atraso</div>
      </div>
    `;

    const horizonEnd = new Date(`${TODAY}T12:00:00`);
    horizonEnd.setDate(horizonEnd.getDate() + 14);
    const agendaItems = [
      ...PAYABLES.filter((p) => p.status !== "pago").map((p) => ({
        due: p.due,
        type: "out",
        name: p.supplier,
        value: p.value,
        status: p.status,
      })),
      ...RECEIVABLES.filter((r) => r.status !== "recebido").map((r) => ({
        due: r.due,
        type: "in",
        name: r.client,
        value: r.value,
        status: r.status,
      })),
    ].filter((item) => {
      const d = new Date(`${item.due}T12:00:00`);
      const start = new Date(`${TODAY}T12:00:00`);
      start.setDate(start.getDate() - 7);
      return d >= start && d <= horizonEnd;
    });

    const byDay = new Map();
    for (let i = -3; i <= 14; i++) {
      const d = new Date(`${TODAY}T12:00:00`);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      byDay.set(key, []);
    }
    agendaItems.forEach((item) => {
      if (!byDay.has(item.due)) byDay.set(item.due, []);
      byDay.get(item.due).push(item);
    });

    const activeDays = [...byDay.entries()].filter(([key, items]) => items.length || key === TODAY);
    document.getElementById("payAgendaPill").textContent = `${agendaItems.length} títulos na janela`;
    document.getElementById("payTimeline").innerHTML = activeDays
      .map(([key, items]) => {
        const meta = dueMeta(key);
        const hot = items.some((i) => i.status === "atrasado" || i.status === "vence");
        const weekday = new Date(`${key}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "short" });
        const chips = items
          .sort((a, b) => statusRank(a.status) - statusRank(b.status) || b.value - a.value)
          .map(
            (i) => `<div class="pay-chip pay-chip--${i.type}">
              <strong>${i.type === "in" ? "+" : "−"} ${money(i.value)}</strong>
              <span>${i.name}</span>
            </div>`,
          )
          .join("");
        return `<div class="pay-day ${key === TODAY ? "pay-day--today" : ""} ${hot ? "pay-day--hot" : ""}">
          <div class="pay-day__date">${weekday} · ${formatDate(key)}${key === TODAY ? " · hoje" : meta.tone === "late" ? " · atraso" : ""}</div>
          <div class="pay-day__items">${chips || `<span class="muted" style="font-size:0.75rem">Sem títulos</span>`}</div>
        </div>`;
      })
      .join("");

    const filterDefs = [
      { id: "all", label: "Todos" },
      { id: "atrasado", label: "Atrasados" },
      { id: "vence", label: "Vence logo" },
      { id: "aberto", label: "Em aberto" },
      { id: "feitos", label: "Pagos / recebidos" },
    ];
    const counts = {};
    const saved = contasFilter;
    for (const f of filterDefs) {
      contasFilter = f.id;
      counts[f.id] =
        PAYABLES.filter((p) => matchContasFilter(p.status)).length +
        RECEIVABLES.filter((r) => matchContasFilter(r.status)).length;
    }
    contasFilter = saved;

    document.getElementById("payFilters").innerHTML = filterDefs
      .map(
        (f) => `<button type="button" class="pay-filter ${contasFilter === f.id ? "is-active" : ""}" data-filter="${f.id}">
          ${f.label}<span class="pay-filter__count">${counts[f.id]}</span>
        </button>`,
      )
      .join("");

    document.querySelectorAll(".pay-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        contasFilter = btn.dataset.filter;
        pages.pay = 1;
        pages.recv = 1;
        renderContas();
      });
    });

    const payRows = PAYABLES.filter((p) => matchContasFilter(p.status)).slice().sort(sortContas);
    const recvRows = RECEIVABLES.filter((r) => matchContasFilter(r.status)).slice().sort(sortContas);
    const payPage = paginate(payRows, pages.pay);
    const recvPage = paginate(recvRows, pages.recv);
    pages.pay = payPage.page;
    pages.recv = recvPage.page;

    document.getElementById("payHeadTotal").textContent = money(
      payRows.filter((p) => p.status !== "pago").reduce((a, p) => a + p.value, 0),
    );
    document.getElementById("recvHeadTotal").textContent = money(
      recvRows.filter((r) => r.status !== "recebido").reduce((a, r) => a + r.value, 0),
    );
    document.getElementById("payHeadMeta").textContent = `${payRows.length} título(s) no filtro`;
    document.getElementById("recvHeadMeta").textContent = `${recvRows.length} título(s) no filtro`;

    document.getElementById("payBody").innerHTML = payPage.rows.length
      ? payPage.rows
          .map((p) => {
            const area = areaById(p.area);
            const due = dueMeta(p.due);
            const rowClass =
              p.status === "atrasado" ? "is-late" : p.status === "vence" ? "is-soon" : p.status === "pago" ? "is-done" : "";
            return `<tr class="${rowClass}">
              <td>
                <div class="due-cell">
                  <strong>${formatDate(p.due)}</strong>
                  <span class="${due.tone}">${due.label}</span>
                </div>
              </td>
              <td><strong>${p.supplier}</strong></td>
              <td>${p.desc}</td>
              <td><span class="tag-soft"><i style="background:${area.color}"></i>${area.title}</span></td>
              <td><span class="status status--${p.status}">${statusLabel(p.status)}</span></td>
              <td class="num">${money(p.value)}</td>
            </tr>`;
          })
          .join("")
      : `<tr><td colspan="6" class="muted">Nenhum título neste filtro.</td></tr>`;

    document.getElementById("recvBody").innerHTML = recvPage.rows.length
      ? recvPage.rows
          .map((r) => {
            const due = dueMeta(r.due);
            const rowClass =
              r.status === "atrasado"
                ? "is-late"
                : r.status === "vence"
                  ? "is-soon"
                  : r.status === "recebido"
                    ? "is-done"
                    : "";
            return `<tr class="${rowClass}">
              <td>
                <div class="due-cell">
                  <strong>${formatDate(r.due)}</strong>
                  <span class="${due.tone}">${due.label}</span>
                </div>
              </td>
              <td><strong>${r.client}</strong></td>
              <td>${r.desc}</td>
              <td><span class="status status--${r.status}">${statusLabel(r.status)}</span></td>
              <td class="num">${money(r.value)}</td>
            </tr>`;
          })
          .join("")
      : `<tr><td colspan="5" class="muted">Nenhum título neste filtro.</td></tr>`;

    renderPager("payPager", "pay", payPage, renderContas);
    renderPager("recvPager", "recv", recvPage, renderContas);
  }

  function downloadCsv(filename, rows) {
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function exportPdf(title, headers, rows) {
    const w = window.open("", "_blank");
    if (!w) return;
    const body = rows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("");
    w.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8" />
      <title>${title}</title>
      <style>
        body{font-family:Segoe UI,sans-serif;padding:24px;color:#01102f}
        h1{font-size:18px;margin:0 0 4px}
        p{color:#64748b;margin:0 0 16px;font-size:13px}
        table{width:100%;border-collapse:collapse;font-size:12px}
        th,td{border-bottom:1px solid #e2e8f0;padding:8px;text-align:left}
        th{color:#64748b;font-size:11px;text-transform:uppercase}
        .num{text-align:right}
        @media print{button{display:none}}
      </style></head><body>
      <h1>${title}</h1>
      <p>Vista · Meleiro Tech · gerado em ${formatDate(TODAY)}</p>
      <table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${body}</tbody></table>
      <p style="margin-top:20px"><button onclick="window.print()">Imprimir / salvar PDF</button></p>
      </body></html>`);
    w.document.close();
  }

  function currentExpenseRows() {
    const period = els.period.value;
    const areaFilter = els.expenseArea.value;
    const q = els.expenseSearch.value.trim().toLowerCase();
    return EXPENSES.filter((e) => {
      const monthOk = e.date.startsWith(period);
      const areaOk = areaFilter === "all" || e.area === areaFilter;
      const searchOk =
        !q ||
        e.nfse.toLowerCase().includes(q) ||
        e.supplier.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);
      return monthOk && areaOk && searchOk;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }

  function currentBankRows() {
    const period = els.period.value;
    const bankFilter = els.bankFilter.value;
    return BANK_MOVES.filter((m) => {
      const monthOk = m.date.startsWith(period);
      const bankOk = bankFilter === "all" || m.bank === bankFilter;
      return monthOk && bankOk;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }

  function renderTreasury(period, caixa) {
    const moves = BANK_MOVES.filter((m) => m.date.startsWith(period));
    document.getElementById("bankTotal").textContent = money(caixa);
    document.getElementById("bankList").innerHTML = BANKS.map((b) => {
      const inSum = moves.filter((m) => m.bank === b.id && m.type === "entrada").reduce((a, m) => a + m.value, 0);
      const outSum = moves.filter((m) => m.bank === b.id && m.type === "saida").reduce((a, m) => a + m.value, 0);
      return `<div class="bank">
        <div class="bank__head">
          <div class="bank__logo" style="background:${b.color}">${b.short}</div>
          <div><strong>${b.name}</strong><span>${((b.balance / caixa) * 100).toFixed(0)}% do caixa</span></div>
        </div>
        <div class="bank__val">${money(b.balance)}</div>
        <div class="bank__flow">
          <span>Entradas <b class="in">${money(inSum)}</b></span>
          <span>Saídas <b class="out">${money(outSum)}</b></span>
        </div>
      </div>`;
    }).join("");
  }

  function renderExpenses(period) {
    const areaFilter = els.expenseArea.value;
    const q = els.expenseSearch.value.trim().toLowerCase();
    const rows = EXPENSES.filter((e) => {
      const monthOk = e.date.startsWith(period);
      const areaOk = areaFilter === "all" || e.area === areaFilter;
      const searchOk =
        !q ||
        e.nfse.toLowerCase().includes(q) ||
        e.supplier.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);
      return monthOk && areaOk && searchOk;
    }).sort((a, b) => b.date.localeCompare(a.date));

    const pageInfo = paginate(rows, pages.expenses);
    pages.expenses = pageInfo.page;

    document.getElementById("expenseBody").innerHTML = pageInfo.rows.length
      ? pageInfo.rows
          .map((e) => {
            const area = areaById(e.area);
            const bank = bankById(e.bank);
            return `<tr>
              <td>${formatDate(e.date)}</td>
              <td><span class="tag-soft"><i style="background:${area.color}"></i>${area.title}</span></td>
              <td>${e.category}</td>
              <td>${e.desc}</td>
              <td>${e.supplier}</td>
              <td><code>${e.nfse}</code></td>
              <td class="muted">${bank.short}</td>
              <td class="num">${money(e.value)}</td>
            </tr>`;
          })
          .join("")
      : `<tr><td colspan="8">Nenhum lançamento neste filtro.</td></tr>`;

    renderPager("expensePager", "expenses", pageInfo, () => renderExpenses(els.period.value));
  }

  function renderBankMoves(period) {
    const bankFilter = els.bankFilter.value;
    const rows = BANK_MOVES.filter((m) => {
      const monthOk = m.date.startsWith(period);
      const bankOk = bankFilter === "all" || m.bank === bankFilter;
      return monthOk && bankOk;
    }).sort((a, b) => b.date.localeCompare(a.date));

    const entradas = rows.filter((m) => m.type === "entrada").reduce((a, m) => a + m.value, 0);
    const saidas = rows.filter((m) => m.type === "saida").reduce((a, m) => a + m.value, 0);
    document.getElementById("flowKpis").innerHTML = `
      <div class="flow-kpi"><span>Entradas no período</span><strong class="in">${money(entradas)}</strong></div>
      <div class="flow-kpi"><span>Saídas no período</span><strong class="out">${money(saidas)}</strong></div>
      <div class="flow-kpi"><span>Fluxo líquido</span><strong class="${entradas - saidas >= 0 ? "in" : "out"}">${moneySigned(Math.abs(entradas - saidas), entradas - saidas >= 0 ? "entrada" : "saida")}</strong></div>
    `;

    const pageInfo = paginate(rows, pages.bank);
    pages.bank = pageInfo.page;

    document.getElementById("bankMoveBody").innerHTML = pageInfo.rows.length
      ? pageInfo.rows
          .map((m) => {
            const bank = bankById(m.bank);
            return `<tr>
              <td>${formatDate(m.date)}</td>
              <td><span class="tag-soft"><i style="background:${bank.color}"></i>${bank.short}</span></td>
              <td><span class="badge ${m.type === "entrada" ? "badge--in" : "badge--out"}">${m.type === "entrada" ? "Entrada" : "Saída"}</span></td>
              <td>${m.history}</td>
              <td class="muted">${m.party}</td>
              <td class="num">${moneySigned(m.value, m.type)}</td>
              <td class="num muted">${money(m.balanceAfter)}</td>
            </tr>`;
          })
          .join("")
      : `<tr><td colspan="7">Nenhuma movimentação neste filtro.</td></tr>`;

    renderPager("bankPager", "bank", pageInfo, () => renderBankMoves(els.period.value));
  }

  function fillFiltersOnce() {
    if (els.expenseArea.options.length > 1) return;
    for (const area of AREAS) {
      const opt = document.createElement("option");
      opt.value = area.id;
      opt.textContent = area.title;
      els.expenseArea.appendChild(opt);
    }
    for (const bank of BANKS) {
      const opt = document.createElement("option");
      opt.value = bank.id;
      opt.textContent = bank.name;
      els.bankFilter.appendChild(opt);
    }
  }

  document.querySelectorAll(".nav__item").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const viewId = link.getAttribute("href").slice(1);
      showView(viewId);
      requestAnimationFrame(() => render());
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  fillFiltersOnce();
  els.period.addEventListener("change", () => {
    pages.expenses = 1;
    pages.bank = 1;
    pages.pay = 1;
    pages.recv = 1;
    pages.clients = 1;
    render();
  });
  els.expenseArea.addEventListener("change", () => {
    pages.expenses = 1;
    if (activeView === "lancamentos") renderExpenses(els.period.value);
  });
  els.expenseSearch.addEventListener("input", () => {
    pages.expenses = 1;
    if (activeView === "lancamentos") renderExpenses(els.period.value);
  });
  els.bankFilter.addEventListener("change", () => {
    pages.bank = 1;
    if (activeView === "tesouraria") renderBankMoves(els.period.value);
  });
  document.getElementById("exportExpensesCsv")?.addEventListener("click", () => {
    const rows = currentExpenseRows();
    downloadCsv(`lancamentos-${els.period.value}.csv`, [
      ["Data", "Setor", "Categoria", "Descrição", "Fornecedor", "NFS-e", "Conta", "Valor", "Pago"],
      ...rows.map((e) => [
        formatDate(e.date),
        areaById(e.area).title,
        e.category,
        e.desc,
        e.supplier,
        e.nfse,
        bankById(e.bank).short,
        e.value,
        e.paid ? "Sim" : "Não",
      ]),
    ]);
  });
  document.getElementById("exportExpensesPdf")?.addEventListener("click", () => {
    const rows = currentExpenseRows();
    exportPdf(
      `Lançamentos ${els.period.value}`,
      ["Data", "Setor", "Categoria", "Fornecedor", "NFS-e", "Valor"],
      rows.map((e) => [
        formatDate(e.date),
        areaById(e.area).title,
        e.category,
        e.supplier,
        e.nfse,
        money(e.value),
      ]),
    );
  });
  document.getElementById("exportBankCsv")?.addEventListener("click", () => {
    const rows = currentBankRows();
    downloadCsv(`extrato-${els.period.value}.csv`, [
      ["Data", "Banco", "Tipo", "Histórico", "Origem/Destino", "Valor", "Saldo após"],
      ...rows.map((m) => [
        formatDate(m.date),
        bankById(m.bank).name,
        m.type,
        m.history,
        m.party,
        m.type === "entrada" ? m.value : -m.value,
        m.balanceAfter,
      ]),
    ]);
  });
  document.getElementById("exportBankPdf")?.addEventListener("click", () => {
    const rows = currentBankRows();
    exportPdf(
      `Extrato bancário ${els.period.value}`,
      ["Data", "Banco", "Tipo", "Histórico", "Valor", "Saldo"],
      rows.map((m) => [
        formatDate(m.date),
        bankById(m.bank).short,
        m.type === "entrada" ? "Entrada" : "Saída",
        m.history,
        moneySigned(m.value, m.type),
        money(m.balanceAfter),
      ]),
    );
  });
  window.addEventListener("resize", render);
  showView("executivo");
  render();
})();
