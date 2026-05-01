export const HORROR_QUESTIONS = [
  {
    id: 'horror_subgenre',
    title: 'Que tipo de terror te tira o sono?',
    subtitle: 'Escolha o que mais te perturba',
    type: 'single' as const,
    options: [
      { id: 'psycho', label: 'Psicológico — o medo que vem da mente', icon: 'Brain' },
      { id: 'supernatural', label: 'Sobrenatural — forças além da compreensão', icon: 'Zap' },
      { id: 'slasher', label: 'Slasher — perseguição e sobrevivência', icon: 'Target' },
      { id: 'creature', label: 'Criaturas e Monstros', icon: 'Heart' },
    ],
  },
  {
    id: 'horror_fear',
    title: 'Qual é o seu maior medo?',
    type: 'single' as const,
    options: [
      { id: 'dark', label: 'Escuridão e o desconhecido' },
      { id: 'alone', label: 'Estar sozinho e vulnerável' },
      { id: 'loss', label: 'Perder quem você ama' },
      { id: 'madness', label: 'Perder a sanidade' },
    ],
  },
  {
    id: 'horror_gore',
    title: 'Qual sua tolerância a sangue e gore?',
    type: 'single' as const,
    options: [
      { id: 'max', label: 'Extremo — quanto mais visceral, melhor' },
      { id: 'moderate', label: 'Moderado — sustos, mas sem exageros gráficos' },
      { id: 'min', label: 'Pouco — prefiro terror atmosférico e sugestivo' },
    ],
  },
  {
    id: 'horror_watch',
    title: 'Como você assiste filmes de terror?',
    type: 'single' as const,
    options: [
      { id: 'alone_dark', label: 'Sozinho no escuro — experiência imersiva total' },
      { id: 'alone_light', label: 'Sozinho com as luzes acesas — vai que...' },
      { id: 'group', label: 'Em grupo — dividir o medo é mais divertido' },
      { id: 'hide', label: 'Por trás do travesseiro — mas não perco uma cena' },
    ],
  },
  {
    id: 'horror_villain',
    title: 'Qual tipo de vilão te assusta mais?',
    type: 'single' as const,
    options: [
      { id: 'human', label: 'Humano — porque pessoas reais são mais assustadoras' },
      { id: 'entity', label: 'Entidade invisível — o que você não pode ver' },
      { id: 'monster', label: 'Criatura — algo que não deveria existir' },
      { id: 'cursed', label: 'Maldição — um destino inevitável' },
    ],
  },
  {
    id: 'horror_name',
    title: 'Qual seu nome de sobrevivente?',
    subtitle: 'Para identificarmos você na ficha de horror.',
    type: 'input' as const,
    placeholder: 'Seu nome ou apelido',
  },
  {
    id: 'horror_email',
    title: 'Onde enviaremos seu perfil de horror?',
    subtitle: 'Se tiver coragem de ver o resultado.',
    type: 'input' as const,
    placeholder: 'seu.melhor@email.com',
  },
];

export const HORROR_PROFILES = {
  psycho: { name: 'Mente Perturbada', icon: '🧠', color: 'from-purple-900 to-red-800', desc: 'O verdadeiro terror está na sua cabeça. Filmes que brincam com a percepção, realidade distorcida e horror psicológico definem seu perfil.' },
  supernatural: { name: 'Caçador do Oculto', icon: '👁️', color: 'from-indigo-900 to-purple-800', desc: 'Você é atraído pelo inexplicável. Espíritos, maldições e portais para outras dimensões são seu território.' },
  slasher: { name: 'Presas Fáceis', icon: '🔪', color: 'from-red-900 to-rose-700', desc: 'A adrenalina da perseguição te move. Você vibra com a tensão de ser caçado e a satisfação de ver alguém sobreviver — ou não.' },
  creature: { name: 'Criatura das Sombras', icon: '🖤', color: 'from-gray-900 to-stone-700', desc: 'Monstros são seu fascínio. De vampiros a criaturas lovecraftianas, você busca o horror que questiona o que é ser humano.' },
};

function calculateHorrorProfile(answers: Record<string, any>) {
  const id = answers.horror_subgenre || 'psycho';
  const map: Record<string, string> = {
    psycho: 'psycho', supernatural: 'supernatural', slasher: 'slasher', creature: 'creature',
  };
  const profId = map[id] || 'psycho';
  return HORROR_PROFILES[profId] || HORROR_PROFILES.psycho;
}

export { calculateHorrorProfile };
