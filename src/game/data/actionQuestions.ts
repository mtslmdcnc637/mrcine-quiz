export const ACTION_QUESTIONS = [
  {
    id: 'action_subgenre',
    title: 'Qual estilo de ação te acelera?',
    subtitle: 'Escolha o que mais combina com seu perfil',
    type: 'single' as const,
    options: [
      { id: 'tactical', label: 'Tático e Estratégico', icon: 'Target' },
      { id: 'martial', label: 'Artes Marciais e Lutas', icon: 'Zap' },
      { id: 'explosive', label: 'Explosões e Perseguições', icon: 'Zap' },
      { id: 'heroic', label: 'Herói Solitário', icon: 'Star' },
    ],
  },
  {
    id: 'action_hero',
    title: 'Que tipo de herói de ação você seria?',
    type: 'single' as const,
    options: [
      { id: 'lone', label: 'O lobo solitário — resolve tudo sozinho' },
      { id: 'team', label: 'O estrategista — lidera a equipe' },
      { id: 'anti', label: 'O anti-herói — faz o que precisa ser feito' },
      { id: 'comic', label: 'O carismático — resolve com humor e estilo' },
    ],
  },
  {
    id: 'action_pace',
    title: 'Qual o ritmo ideal de um filme de ação pra você?',
    type: 'single' as const,
    options: [
      { id: 'nonstop', label: 'Sem pausas — ação do início ao fim' },
      { id: 'buildup', label: 'Construção lenta com clímax explosivo' },
      { id: 'balanced', label: 'Equilibrado — ação e momentos de respiro' },
    ],
  },
  {
    id: 'action_weapon',
    title: 'Escolha sua arma:',
    type: 'single' as const,
    options: [
      { id: 'fists', label: 'Punhos e corpo — luta limpa' },
      { id: 'guns', label: 'Armas de fogo — precisão e estilo' },
      { id: 'blades', label: 'Lâminas — silêncio e letalidade' },
      { id: 'mind', label: 'Inteligência — vencer sem atirar um tiro' },
    ],
  },
  {
    id: 'action_violence',
    title: 'Qual seu nível de tolerância a violência na tela?',
    type: 'single' as const,
    options: [
      { id: 'max', label: 'Quanto mais intenso, melhor — sem limites' },
      { id: 'moderate', label: 'Moderado — ação estilizada, sem excesso de sangue' },
      { id: 'min', label: 'Leve — prefiro ação mais limpa, blockbuster' },
    ],
  },
  {
    id: 'action_name',
    title: 'Qual seu codinome de agente?',
    subtitle: 'Para personalizarmos seu perfil de ação.',
    type: 'input' as const,
    placeholder: 'Ex: Agente Shadow, Capitão Trovão...',
  },
  {
    id: 'action_email',
    title: 'Onde devemos enviar sua ficha de agente?',
    subtitle: 'Seu resultado completo com recomendações de ação.',
    type: 'input' as const,
    placeholder: 'seu.melhor@email.com',
  },
];

export const ACTION_PROFILES = {
  tactical: { name: 'Estrategista Tático', icon: '🎯', color: 'from-sky-700 to-sky-500', desc: 'Você prefere ação calculada. Cada movimento é pensado. Filmes com estratégia militar, espionagem e operações especiais são seu terreno.' },
  martial: { name: 'Guerreiro das Artes Marciais', icon: '🥋', color: 'from-red-700 to-orange-500', desc: 'Seu espírito de luta vem de dentro. Coreografias de luta, honra e disciplina definem seu gosto cinematográfico.' },
  explosive: { name: 'Demolidor Explosivo', icon: '💥', color: 'from-amber-600 to-yellow-500', desc: 'Você vive pela adrenalina. Quanto mais explosões, perseguições e destruição, melhor. Blockbusters de ação são sua casa.' },
  heroic: { name: 'Herói Implacável', icon: '🦸', color: 'from-indigo-700 to-blue-500', desc: 'Um herói contra o mundo. Você se identifica com protagonistas que enfrentam tudo sozinhos por uma causa maior.' },
};

function calculateActionProfile(answers: Record<string, any>) {
  const id = answers.action_hero || 'lone';
  const map: Record<string, string> = {
    lone: 'heroic', team: 'tactical', anti: 'explosive', comic: 'heroic',
  };
  const profId = answers.action_subgenre || map[id] || 'heroic';
  return ACTION_PROFILES[profId] || ACTION_PROFILES.heroic;
}

export { calculateActionProfile };
