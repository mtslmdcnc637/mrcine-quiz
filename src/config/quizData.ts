export const QUIZ_PHASES = [
  { id: 1, label: 'PERFIL' },
  { id: 2, label: 'HÁBITOS' },
  { id: 3, label: 'DESAFIOS' },
  { id: 4, label: 'PERSONALIDADE' },
  { id: 5, label: 'CAPTURA' }
];

export const QUIZ_QUESTIONS = [
  // FASE 1: PERFIL
  {
    id: 'goal',
    phase: 1,
    title: 'Qual é o seu principal objetivo ao assistir algo?',
    type: 'single',
    options: [
      { id: 'relax', label: 'Relaxar e desligar a mente', icon: 'Coffee' },
      { id: 'learn', label: 'Aprender e expandir horizontes', icon: 'Brain' },
      { id: 'feel', label: 'Me emocionar profundamente', icon: 'Heart' },
      { id: 'distract', label: 'Pura adrenalina e diversão', icon: 'Zap' }
    ]
  },
  {
    id: 'genres',
    phase: 1,
    title: 'Quais são seus gêneros favoritos?',
    subtitle: 'Selecione pelo menos 2 opções',
    type: 'multiple',
    min: 2,
    options: [
      { id: 'action', label: 'Ação & Aventura' },
      { id: 'scifi', label: 'Ficção Científica' },
      { id: 'drama', label: 'Drama' },
      { id: 'comedy', label: 'Comédia' },
      { id: 'thriller', label: 'Suspense & Terror' },
      { id: 'doc', label: 'Documentários' },
      { id: 'romance', label: 'Romance' }
    ]
  },
  {
    id: 'era',
    phase: 1,
    title: 'Qual época de filmes mais te atrai?',
    type: 'single',
    options: [
      { id: 'new', label: 'Lançamentos (Últimos 3 anos)' },
      { id: '2000s', label: 'Anos 2000 a 2010' },
      { id: 'classics', label: 'Clássicos (Antes de 2000)' },
      { id: 'any', label: 'Sou eclético(a), a época não importa' }
    ]
  },
  {
    id: 'format',
    phase: 1,
    title: 'O que você prefere maratonar?',
    type: 'single',
    options: [
      { id: 'movies', label: 'Apenas Filmes (Início, meio e fim rápidos)' },
      { id: 'series', label: 'Apenas Séries (Histórias longas)' },
      { id: 'both', label: 'Ambos, depende do meu humor' }
    ]
  },

  // FASE 2: HÁBITOS
  {
    id: 'frequency',
    phase: 2,
    title: 'Com que frequência você assiste filmes ou séries?',
    type: 'single',
    options: [
      { id: 'daily', label: 'Todos os dias' },
      { id: 'weekends', label: 'Apenas nos finais de semana' },
      { id: 'rarely', label: 'Raramente, quando tenho tempo' }
    ]
  },
  {
    id: 'company',
    phase: 2,
    title: 'Com quem você costuma assistir?',
    type: 'single',
    options: [
      { id: 'alone', label: 'Sozinho(a) (Meu momento)' },
      { id: 'partner', label: 'Com meu parceiro(a)' },
      { id: 'family', label: 'Com a família/filhos' },
      { id: 'friends', label: 'Com amigos' }
    ]
  },
  {
    id: 'streamings',
    phase: 2,
    title: 'Quais streamings você assina?',
    subtitle: 'Selecione todos que você tem acesso',
    type: 'multiple',
    min: 1,
    options: [
      { id: 'netflix', label: 'Netflix' },
      { id: 'prime', label: 'Prime Video' },
      { id: 'max', label: 'Max (HBO)' },
      { id: 'disney', label: 'Disney+ / Star+' },
      { id: 'apple', label: 'Apple TV+' },
      { id: 'other', label: 'Outros / Alternativos' }
    ]
  },
  {
    id: 'time',
    phase: 2,
    title: 'Qual é o seu horário favorito para assistir?',
    type: 'single',
    options: [
      { id: 'morning', label: 'Manhã / Tarde' },
      { id: 'night', label: 'Noite (Após o trabalho)' },
      { id: 'latenight', label: 'Madrugada (Coruja)' }
    ]
  },

  // FASE 3: DESAFIOS
  {
    id: 'struggle',
    phase: 3,
    title: 'Qual é a sua maior frustração hoje?',
    type: 'single',
    options: [
      { id: 'time_lost', label: 'Perco 40 minutos escolhendo o que ver' },
      { id: 'where', label: 'Nunca sei em qual streaming o filme está' },
      { id: 'sleep', label: 'Durmo no meio porque escolhi um filme chato' },
      { id: 'forget', label: 'Esqueço os filmes que me recomendaram' }
    ]
  },
  {
    id: 'annoyance',
    phase: 3,
    title: 'O que mais te irrita em plataformas de streaming?',
    type: 'single',
    options: [
      { id: 'bad_algo', label: 'O algoritmo só me recomenda as mesmas coisas' },
      { id: 'interface', label: 'A interface é confusa e lenta' },
      { id: 'spoilers', label: 'Tomar spoilers antes de assistir' },
      { id: 'cancel', label: 'Cancelarem minhas séries favoritas' }
    ]
  },
  {
    id: 'decision',
    phase: 3,
    title: 'Quando você não sabe o que assistir, o que acontece?',
    type: 'single',
    options: [
      { id: 'paralyzed', label: 'Fico paralisado(a) rolando o catálogo por minutos' },
      { id: 'random', label: 'Escolho qualquer um e torço para ser bom' },
      { id: 'ask', label: 'Pergunto para alguém o que está assistindo' },
      { id: 'revisit', label: 'Acabo reassistindo algo que já vi' }
    ]
  },
  {
    id: 'decision_time',
    phase: 3,
    title: 'Quanto tempo você leva pra escolher um filme quando está em dúvida?',
    type: 'single',
    options: [
      { id: '10min', label: 'Até 10 minutos — sou rápido(a)' },
      { id: '30min', label: 'Uns 30 minutos — demoro um pouco' },
      { id: '1h', label: 'Cerca de 1 hora — é uma decisão difícil' },
      { id: '1h+', label: 'Mais de 1 hora — às vezes desisto' }
    ]
  },

  // FASE 4: PERSONALIDADE
  {
    id: 'recommendations',
    phase: 4,
    title: 'Como você lida com recomendações de amigos?',
    type: 'single',
    options: [
      { id: 'trust', label: 'Assisto de olhos fechados' },
      { id: 'research', label: 'Pesquiso a nota e o trailer antes' },
      { id: 'ignore', label: 'Anoto, mas acabo nunca assistindo' }
    ]
  },
  {
    id: 'plot_twists',
    phase: 4,
    title: 'Qual é a sua relação com "Plot Twists" (Finais Surpresa)?',
    type: 'single',
    options: [
      { id: 'love', label: 'Amo! Quanto mais confuso, melhor' },
      { id: 'hate', label: 'Odeio, prefiro histórias lineares e claras' },
      { id: 'depends', label: 'Gosto, desde que faça sentido na história' }
    ]
  },
  {
    id: 'rewatch',
    phase: 4,
    title: 'Como você se sente sobre reassistir filmes?',
    type: 'single',
    options: [
      { id: 'always', label: 'Adoro! Sempre descubro detalhes novos' },
      { id: 'never', label: 'Nunca reassisto, a vida é curta demais' },
      { id: 'comfort', label: 'Reassisto meus favoritos quando preciso de conforto' },
      { id: 'rarely', label: 'Raramente, só se passou muito tempo' }
    ]
  },
  {
    id: 'time_value',
    phase: 4,
    title: 'Se pudesse colocar um preço, quanto vale uma hora do seu tempo livre?',
    type: 'single',
    options: [
      { id: '10', label: 'R$ 10 — meu tempo é importante, mas nem tanto' },
      { id: '25', label: 'R$ 25 — valorizo bastante meu descanso' },
      { id: '50', label: 'R$ 50 — cada hora livre é preciosa' },
      { id: '100', label: 'R$ 100+ — meu tempo livre é inestimável' }
    ]
  },

  // FASE 5: CAPTURA
  {
    id: 'name',
    phase: 5,
    title: 'Como podemos te chamar?',
    subtitle: 'Para personalizarmos o seu Perfil Cinematográfico.',
    type: 'input',
    placeholder: 'Seu primeiro nome'
  },
  {
    id: 'email',
    phase: 5,
    title: 'Para onde devemos enviar o seu resultado?',
    subtitle: 'Fique tranquilo, odiamos spam tanto quanto você.',
    type: 'input',
    placeholder: 'seu.melhor@email.com'
  },
  {
    id: 'whatsapp',
    phase: 5,
    title: 'Qual seu WhatsApp?',
    subtitle: 'Opcional. Enviaremos novidades e dicas de filmes por lá.',
    type: 'input',
    placeholder: '(11) 99999-9999'
  }
];

export const LOADING_TEXTS = [
  "Analisando suas preferências de gênero...",
  "Cruzando dados com milhares de filmes...",
  "Mapeando seus hábitos de consumo...",
  "Calculando seu Perfil Cinematográfico...",
  "Gerando seu algoritmo personalizado..."
];

export const RESULT_BENEFITS = [
  {
    title: "Economize Tempo",
    desc: "Pare de rolar catálogos por 40 minutos. Receba a indicação certa em 5 segundos.",
    icon: "Clock"
  },
  {
    title: "Match Perfeito",
    desc: "Recomendações baseadas no seu humor e companhia do dia.",
    icon: "Target"
  },
  {
    title: "Onde Assistir",
    desc: "Saiba instantaneamente em qual dos seus streamings o filme está.",
    icon: "Tv"
  },
  {
    title: "Sem Frustrações",
    desc: "Chega de filmes ruins. Assista apenas o que tem alta probabilidade de você amar.",
    icon: "Star"
  }
];

export const PRICING_PLANS = [
  {
    id: 'monthly',
    name: 'Mensal',
    price: 'R$ 9,00',
    period: '/mês',
    popular: false,
    savings: ''
  },
  {
    id: 'quarterly',
    name: 'Trimestral',
    price: 'R$ 24,00',
    period: '/3 meses',
    popular: true,
    savings: 'Mais Popular'
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 'R$ 69,00',
    period: '/ano',
    popular: false,
    savings: 'Melhor Custo-Benefício'
  }
];
