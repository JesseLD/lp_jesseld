export type Category = 'app' | 'site' | 'sistema';

export type Product = {
  slug: string;
  name: string;
  category: Category;
  /** 'demo' = montado aqui no site pra pessoa testar; 'real' = projeto no ar de um cliente */
  kind: 'demo' | 'real';
  /** Uma frase: o que é e pra quem */
  headline: string;
  audience: string;
  summary: string;
  features: string[];
  /** Link aberto no botão "Abrir": demo interna ou site real */
  url: string;
  device: 'phone' | 'desktop';
  /** Cor de fundo da vitrine desse produto */
  tint: string;
};

export const categories: { id: Category; label: string; plural: string; blurb: string }[] = [
  {
    id: 'app',
    label: 'Aplicativo',
    plural: 'Aplicativos',
    blurb: 'Pro seu cliente marcar, pagar e acompanhar pelo celular.',
  },
  {
    id: 'site',
    label: 'Site',
    plural: 'Sites',
    blurb: 'Pra ser encontrado no Google e vender pelo WhatsApp.',
  },
  {
    id: 'sistema',
    label: 'Sistema',
    plural: 'Sistemas',
    blurb: 'Pra tirar a operação do caderno e da planilha.',
  },
];

export const products: Product[] = [
  {
    slug: 'barbearia',
    name: 'Navalha',
    category: 'app',
    kind: 'demo',
    headline: 'App de agendamento para barbearia',
    audience: 'Barbearias e salões com 1 a 6 cadeiras',
    summary:
      'O cliente escolhe o barbeiro, o serviço e o horário livre sem precisar mandar mensagem. Você vê a agenda do dia e para de perder horário com quem esquece.',
    features: [
      'Agenda por barbeiro com horários livres em tempo real',
      'Cliente escolhe serviço, profissional e horário em 3 toques',
      'Lembrete pelo WhatsApp antes do horário',
      'Histórico do cliente: último corte, preferências e frequência',
    ],
    url: '/demos/barbearia',
    device: 'phone',
    tint: '#1B1B1F',
  },
  {
    slug: 'escolinha',
    name: 'Chamada',
    category: 'app',
    kind: 'demo',
    headline: 'Mini app de gestão para escolinhas',
    audience: 'Escolinhas de esporte, dança, música e reforço',
    summary:
      'Presença, turmas e mensalidades num app só. O professor faz a chamada no celular e você sabe na hora quem está em dia.',
    features: [
      'Chamada da turma em poucos toques',
      'Mensalidades com status de pago, pendente e atrasado',
      'Cadastro de alunos e responsáveis',
      'Aviso para os pais pelo WhatsApp',
    ],
    url: '/demos/escolinha',
    device: 'phone',
    tint: '#0E6B4F',
  },
  {
    slug: 'site-agro',
    name: 'Verde Vale Agro',
    category: 'site',
    kind: 'demo',
    headline: 'Site institucional para empresa de agricultura',
    audience: 'Empresas, fazendas e cooperativas que precisam passar confiança',
    summary:
      'Um site que apresenta a empresa, mostra os produtos e leva o contato direto pro comercial. Feito pra aparecer no Google quando alguém procura pelo serviço na região.',
    features: [
      'Páginas de empresa, produtos e contato',
      'Otimizado pro Google e pra leitura por IA',
      'Botão de WhatsApp em todas as páginas',
      'Rápido até em internet fraca do interior',
    ],
    url: '/demos/site-agro',
    device: 'desktop',
    tint: '#E9F1DF',
  },
  {
    slug: 'loja-online',
    name: 'Feirão',
    category: 'site',
    kind: 'demo',
    headline: 'Loja online estilo marketplace',
    audience: 'Lojas que querem vender pela internet com a própria marca',
    summary:
      'Vitrine com busca, categorias, ofertas e carrinho, no estilo das grandes lojas. O pedido pode fechar no Pix ou cair direto no seu WhatsApp.',
    features: [
      'Busca, categorias e página de oferta',
      'Carrinho com frete e cupom',
      'Pedido fechado no Pix ou enviado pro WhatsApp',
      'Painel para cadastrar produtos e acompanhar pedidos',
    ],
    url: '/demos/loja-online',
    device: 'phone',
    tint: '#FF5A1F',
  },
  {
    slug: 'conectando-noticias',
    name: 'Conectando Notícias',
    category: 'site',
    kind: 'real',
    headline: 'Portal de notícias de Valença e do Baixo Sul',
    audience: 'Portais, blogs e veículos de comunicação regionais',
    summary:
      'Portal no ar com plantão de notícias, editorias locais, mais lidas, newsletter e clima. A redação publica sozinha, sem depender de mim.',
    features: [
      'Plantão com as últimas notícias',
      'Editorias: Valença, Baixo Sul, Polícia, Futebol, Emprego e mais',
      'Mais lidas, busca e newsletter diária',
      'Painel de publicação para a redação',
    ],
    url: 'https://www.conectandonoticias.com.br',
    device: 'desktop',
    tint: '#B3121B',
  },
  {
    slug: 'sistema-garcom',
    name: 'Comanda',
    category: 'sistema',
    kind: 'demo',
    headline: 'Sistema de garçom para bares e restaurantes',
    audience: 'Bares, restaurantes e lanchonetes com atendimento na mesa',
    summary:
      'O garçom lança o pedido no celular, a cozinha recebe na hora e a conta da mesa fecha sem erro de soma.',
    features: [
      'Mapa de mesas com status livre, ocupada e fechando',
      'Pedido lançado no celular e enviado pra cozinha',
      'Conta dividida por pessoa',
      'Fechamento do caixa no fim do dia',
    ],
    url: '/demos/sistema-garcom',
    device: 'phone',
    tint: '#2A1A12',
  },
  {
    slug: 'akadu',
    name: 'Akadu',
    category: 'sistema',
    kind: 'real',
    headline: 'Sistema de gestão para escolinhas de futebol',
    audience: 'Escolinhas e projetos de futebol de base',
    summary:
      'Sistema no ar que organiza alunos, categorias, treinos e mensalidades das escolinhas de futebol.',
    features: [
      'Alunos organizados por categoria',
      'Controle de mensalidades',
      'Presença nos treinos',
      'Acesso pela web, no computador e no celular',
    ],
    url: 'https://app.akadu.com.br',
    device: 'desktop',
    tint: '#1D5FD8',
  },
];

export function productsBy(category: Category) {
  return products.filter((p) => p.category === category);
}

export function categoryOf(id: Category) {
  return categories.find((c) => c.id === id)!;
}
