import { useState, useEffect, useRef } from 'preact/hooks';

// Inline SVG icons — replaces lucide-react (~38KB savings)
function IconFilm(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="7" x2="7" y1="3" y2="21"/><line x1="17" x2="17" y1="3" y2="21"/><line x1="3" x2="7" y1="8" y2="8"/><line x1="17" x2="21" y1="8" y2="8"/><line x1="3" x2="7" y1="16" y2="16"/><line x1="17" x2="21" y1="16" y2="16"/></svg>}
function IconStar(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
function IconArrowRight(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>}
function IconCheckCircle(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>}
function IconLock(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
function IconCrown(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>}
function IconPhone(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
function IconShieldCheck(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>}
function IconSparkles(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>}
function IconBrain(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>}
function IconTarget(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>}
function IconZap(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>}
function IconHeart(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>}
function IconClock(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
function IconTv(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>}
function IconCoffee(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>}
function IconTrendingUp(p:any){return<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>}

import { QUIZ_PHASES, QUIZ_QUESTIONS, LOADING_TEXTS, RESULT_BENEFITS, PRICING_PLANS } from './config/quizData';
import { toast } from './lib/toast';
import { getReferralCode } from './lib/referral';

// Deferred lazy imports
let _supabasePromise: Promise<any> | null = null;
let _edgeFunctionPromise: Promise<any> | null = null;
function getSupabase() {
  if (!_supabasePromise) _supabasePromise = import('./lib/supabase').then(m => m.supabase);
  return _supabasePromise;
}
function getEdgeFunction() {
  if (!_edgeFunctionPromise) _edgeFunctionPromise = import('./lib/edgeFunction').then(m => m.invokeEdgeFunction);
  return _edgeFunctionPromise;
}

const IconMap: Record<string, any> = {
  Brain: IconBrain, Target: IconTarget, Zap: IconZap, Heart: IconHeart, Clock: IconClock, Star: IconStar, Film: IconFilm, Tv: IconTv, Coffee: IconCoffee, TrendingUp: IconTrendingUp, ShieldCheck: IconShieldCheck
};

// ──────── PROFILE SCORING ALGORITHM ────────

interface CinematographicProfile {
  name: string;
  description: string;
  icon: string;
  color: string;
  genreIds: number[];
  discoverParams: Record<string, string>;
}

const PROFILES: Record<string, CinematographicProfile> = {
  'aventureiro-noturno': {
    name: 'Aventureiro Noturno',
    description: 'Você busca adrenalina e emoção nas madrugadas. Filmes de ação, ficção científica e suspense são seu combustível. Quanto mais intenso, melhor!',
    icon: '🌙',
    color: 'from-amber-700 to-amber-500',
    genreIds: [28, 878, 53],
    discoverParams: { with_genres: '28,878', sort_by: 'popularity.desc' },
  },
  'cinefilo-contemplativo': {
    name: 'Cinéfilo Contemplativo',
    description: 'Você aprecia a sétima arte em sua forma mais pura. Dramas profundos, roteiros elaborados e atuações marcantes fazem seu coração bater mais forte.',
    icon: '🎬',
    color: 'from-amber-600 to-orange-500',
    genreIds: [18, 99, 14],
    discoverParams: { with_genres: '18', sort_by: 'vote_average.desc', 'vote_count.gte': '100' },
  },
  'romantico-serial': {
    name: 'Romântico Serial',
    description: 'Seu coração bate mais forte com histórias de amor. Comédias românticas, dramas emocionais e narrativas que aquecem a alma são seu refúgio.',
    icon: '💕',
    color: 'from-rose-600 to-pink-500',
    genreIds: [10749, 35, 18],
    discoverParams: { with_genres: '10749,35', sort_by: 'popularity.desc' },
  },
  'explorador-criativo': {
    name: 'Explorador Criativo',
    description: 'Você adora sair da zona de conforto. Animações, fantasia e ficção científica te levam a mundos impossíveis. Sua imaginação não tem limites!',
    icon: '✨',
    color: 'from-emerald-600 to-teal-500',
    genreIds: [16, 14, 878],
    discoverParams: { with_genres: '16,14', sort_by: 'popularity.desc' },
  },
  'critico-de-sofa': {
    name: 'Crítico de Sofá',
    description: 'Você assiste com olhar analítico. Suspense, terror e documentários são seus favoritos. Nada escapa ao seu julgamento afiado!',
    icon: '🧐',
    color: 'from-red-700 to-red-500',
    genreIds: [53, 27, 99],
    discoverParams: { with_genres: '53,27', sort_by: 'vote_average.desc', 'vote_count.gte': '100' },
  },
  'maratonador-felipe': {
    name: 'Maratonador Universal',
    description: 'Você é eclético e assiste de tudo um pouco! Comédias, ação, drama — contanto que seja bom, você está dentro. A variedade é sua marca registrada.',
    icon: '🍿',
    color: 'from-yellow-700 to-amber-500',
    genreIds: [35, 28, 18, 878],
    discoverParams: { sort_by: 'popularity.desc' },
  },
};

function calculateProfile(answers: Record<string, any>): CinematographicProfile {
  const scores: Record<string, number> = {};

  const goalMap: Record<string, string> = {
    relax: 'maratonador-felipe',
    learn: 'cinefilo-contemplativo',
    feel: 'romantico-serial',
    distract: 'aventureiro-noturno',
  };
  if (answers.goal && goalMap[answers.goal]) {
    scores[goalMap[answers.goal]] = (scores[goalMap[answers.goal]] || 0) + 3;
  }

  const genreMap: Record<string, string[]> = {
    action: ['aventureiro-noturno'],
    scifi: ['aventureiro-noturno', 'explorador-criativo'],
    drama: ['cinefilo-contemplativo', 'romantico-serial'],
    comedy: ['maratonador-felipe'],
    thriller: ['critico-de-sofa'],
    doc: ['cinefilo-contemplativo', 'critico-de-sofa'],
    romance: ['romantico-serial'],
  };
  const selectedGenres = answers.genres || [];
  selectedGenres.forEach((g: string) => {
    (genreMap[g] || []).forEach(p => {
      scores[p] = (scores[p] || 0) + 2;
    });
  });

  if (answers.era === 'classics') scores['cinefilo-contemplativo'] = (scores['cinefilo-contemplativo'] || 0) + 2;
  if (answers.format === 'series') scores['maratonador-felipe'] = (scores['maratonador-felipe'] || 0) + 1;
  if (answers.time === 'latenight') scores['aventureiro-noturno'] = (scores['aventureiro-noturno'] || 0) + 2;
  if (answers.struggle === 'time_lost') scores['maratonador-felipe'] = (scores['maratonador-felipe'] || 0) + 1;
  if (answers.struggle === 'where') scores['critico-de-sofa'] = (scores['critico-de-sofa'] || 0) + 1;
  if (answers.plot_twists === 'love') {
    scores['aventureiro-noturno'] = (scores['aventureiro-noturno'] || 0) + 1;
    scores['critico-de-sofa'] = (scores['critico-de-sofa'] || 0) + 1;
  }
  if (answers.recommendations === 'research') {
    scores['critico-de-sofa'] = (scores['critico-de-sofa'] || 0) + 1;
    scores['cinefilo-contemplativo'] = (scores['cinefilo-contemplativo'] || 0) + 1;
  }

  let maxScore = 0;
  let bestProfile = 'maratonador-felipe';
  for (const [profile, score] of Object.entries(scores)) {
    if (score > maxScore) { maxScore = score; bestProfile = profile; }
  }
  return PROFILES[bestProfile];
}

// ──────── ROI CALCULATION ────────

interface ROIData {
  decisionMinutes: number;
  timeValueBRL: number;
  monthlyWasteBRL: number;
  mrcineMonthlyBRL: number;
  daysToPayOff: number;
  monthlySavingsBRL: number;
}

function calculateROI(answers: Record<string, any>): ROIData | null {
  const timeMap: Record<string, number> = { '10min': 10, '30min': 30, '1h': 60, '1h+': 90 };
  const valueMap: Record<string, number> = { '10': 10, '25': 25, '50': 50, '100': 100 };
  const decisionMinutes = timeMap[answers.decision_time];
  const timeValueBRL = valueMap[answers.time_value];
  if (!decisionMinutes || !timeValueBRL) return null;
  const freqMultiplier = answers.frequency === 'daily' ? 7 : answers.frequency === 'weekends' ? 3 : 2;
  const decisionsPerMonth = freqMultiplier * 4;
  const totalHoursPerMonth = (decisionMinutes * decisionsPerMonth) / 60;
  const monthlyWasteBRL = Math.round(totalHoursPerMonth * timeValueBRL);
  const mrcineMonthlyBRL = 9;
  const dailyWasteBRL = monthlyWasteBRL / 30;
  const daysToPayOff = dailyWasteBRL > 0 ? Math.max(1, Math.ceil(mrcineMonthlyBRL / dailyWasteBRL)) : 30;
  const monthlySavingsBRL = monthlyWasteBRL - mrcineMonthlyBRL;
  return { decisionMinutes, timeValueBRL, monthlyWasteBRL, mrcineMonthlyBRL, daysToPayOff, monthlySavingsBRL };
}

// ──────── SATISFACTION SCORE ────────

function calculateSatisfactionScore(answers: Record<string, any>): number {
  let score = 70; // base
  if (answers.struggle === 'time_lost') score -= 20;
  if (answers.struggle === 'where') score -= 15;
  if (answers.struggle === 'sleep') score -= 18;
  if (answers.struggle === 'forget') score -= 10;
  if (answers.decision === 'paralyzed') score -= 15;
  if (answers.decision === 'random') score -= 10;
  if (answers.annoyance === 'bad_algo') score -= 12;
  if (answers.annoyance === 'interface') score -= 8;
  if (answers.frequency === 'daily') score -= 5;
  const timeMap: Record<string, number> = { '10min': -2, '30min': -8, '1h': -15, '1h+': -20 };
  if (answers.decision_time && timeMap[answers.decision_time]) score += timeMap[answers.decision_time];
  return Math.max(15, Math.min(85, score));
}

// ──────── PAIN POINTS ────────

interface PainPoint {
  icon: string;
  title: string;
  description: string;
  severity: 'high' | 'med' | 'low';
  condition: (answers: Record<string, any>) => boolean;
}

const PAIN_POINTS: PainPoint[] = [
  {
    icon: '⏱️',
    title: 'Tempo perdido em escolhas',
    description: 'Você estima perder mais de 30 minutos por sessão apenas decidindo o que assistir. Isso soma mais de 20 horas por mês — o equivalente a um meio expediente de trabalho.',
    severity: 'high',
    condition: (a) => ['30min', '1h', '1h+'].includes(a.decision_time),
  },
  {
    icon: '😔',
    title: 'Baixa satisfação com conteúdo',
    description: 'Seu índice de satisfação ficou baixo. A maioria das suas sessões recentes não entregou o que você esperava — você sente que está desperdiçando seu tempo livre.',
    severity: 'high',
    condition: (a) => a.struggle === 'sleep' || a.struggle === 'time_lost',
  },
  {
    icon: '🔄',
    title: 'Paralisia de decisão crônica',
    description: 'Quase toda vez você acaba desistindo de assistir algo por não encontrar nada bom. Esse ciclo de procurar → desistir → repetir se tornou um hábito frustrante.',
    severity: 'high',
    condition: (a) => a.decision === 'paralyzed',
  },
  {
    icon: '💸',
    title: 'Investimento mal aproveitado',
    description: 'Você gasta em streaming, mas o retorno em entretenimento de qualidade está muito abaixo do esperado para esse valor investido.',
    severity: 'med',
    condition: (a) => (a.streamings || []).length >= 3,
  },
  {
    icon: '🎯',
    title: 'Recomendações genéricas',
    description: 'As plataformas usam algoritmos que não entendem seu perfil real. Você recebe sugestões que não combinam com seus gostos específicos.',
    severity: 'med',
    condition: (a) => a.annoyance === 'bad_algo',
  },
];

// ──────── WHATSAPP VALIDATION (BR) ────────
function formatWhatsApp(value: string): { formatted: string; digits: string; isValid: boolean } {
  const digits = value.replace(/\D/g, '');
  const national = digits.startsWith('55') ? digits.slice(2) : digits;
  let formatted = '';
  if (national.length === 0) formatted = '';
  else if (national.length <= 2) formatted = `(${national}`;
  else if (national.length <= 7) formatted = `(${national.slice(0, 2)}) ${national.slice(2)}`;
  else formatted = `(${national.slice(0, 2)}) ${national.slice(2, 7)}-${national.slice(7, 11)}`;
  const isValid = national.length === 11 && /^[1-9]{2}9\d{8}$/.test(national);
  return { formatted, digits: national, isValid };
}

// TMDB fetch via Supabase Edge Function
async function fetchProfileMovies(params: Record<string, string>): Promise<any[]> {
  try {
    const [supabase, invokeEdgeFunction] = await Promise.all([getSupabase(), getEdgeFunction()]);
    if (!supabase) return [];
    const data = (await invokeEdgeFunction('tmdb-proxy', {
      endpoint: 'discover/movie',
      params: { language: 'pt-BR', ...params },
    })) as { results?: any[] };
    return data?.results || [];
  } catch { return []; }
}

// Save quiz progress to Supabase
async function saveQuizProgress(answers: Record<string, any>, currentStep: number, completed: boolean) {
  try {
    const supabase = await getSupabase();
    if (!supabase) return;
    await supabase.from('quiz_responses').insert({
      name: answers.name || null,
      email: answers.email || null,
      whatsapp: answers.whatsapp || null,
      profile_type: completed ? calculateProfile(answers).name : null,
      answers, last_step: currentStep, completed,
    });
  } catch { /* analytics only */ }
}

// ──────── SCORE RING COMPONENT ────────

function ScoreRing({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);
  const fillRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (score / 100 * circumference);

    // Delay ring animation slightly
    const timer = setTimeout(() => {
      if (fillRef.current) {
        fillRef.current.style.strokeDashoffset = String(offset);
        if (score > 60) fillRef.current.classList.add('good');
        else if (score > 40) fillRef.current.classList.add('warn');
      }
    }, 800);

    // Animate number
    const start = performance.now() + 800;
    const duration = 1800;
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      if (t < 0) { requestAnimationFrame(tick); return; }
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedScore(Math.round(eased * score));
      if (t < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => setShowVerdict(true), 200);
      }
    }
    requestAnimationFrame(tick);

    return () => clearTimeout(timer);
  }, [score]);

  const verdict = score < 40 ? 'Abaixo do ideal' : score < 60 ? 'Precisa melhorar' : 'Bom, mas pode melhorar';
  const verdictColor = score < 40 ? 'var(--danger)' : score < 60 ? 'var(--accent)' : 'var(--success)';

  return (
    <div className="flex justify-center my-5 sm:my-10">
      <div className="score-ring">
        <svg viewBox="0 0 180 180">
          <circle className="bg" cx="90" cy="90" r="80" />
          <circle className="fill" ref={fillRef} cx="90" cy="90" r="80" />
        </svg>
        <div className="text-center relative z-10">
          <div className="font-display text-[2.8rem] sm:text-[3.5rem] font-light leading-none">{animatedScore}</div>
          <div className="font-mono text-[0.72rem] text-[var(--text-muted)] tracking-[0.12em] uppercase mt-1.5">Índice de Satisfação</div>
          {showVerdict && (
            <div className="text-sm font-medium mt-2 transition-opacity duration-500" style={{ color: verdictColor }}>
              {verdict}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────── PAIN POINTS COMPONENT ────────

function PainPointsList({ answers }: { answers: Record<string, any> }) {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const activePains = PAIN_POINTS.filter(p => p.condition(answers)).slice(0, 5);

  useEffect(() => {
    activePains.forEach((_, i) => {
      setTimeout(() => {
        setVisibleIndices(prev => new Set([...prev, i]));
      }, 1200 + i * 250);
    });
  }, []);

  if (activePains.length === 0) return null;

  return (
    <div className="mb-8 sm:mb-10">
      <div className="font-mono text-[0.68rem] text-[var(--accent)] tracking-[0.18em] uppercase mb-4">Problemas identificados</div>
      <div className="flex flex-col gap-3">
        {activePains.map((pain, i) => (
          <div
            key={i}
            className={`pain-point ${visibleIndices.has(i) ? 'visible' : ''}`}
          >
            <div className={`pain-icon ${pain.severity}`}>{pain.icon}</div>
            <div className="flex-1 min-w-0">
              <strong className="block text-[0.92rem] mb-1 leading-snug">{pain.title}</strong>
              <p className="text-[0.82rem] text-[var(--text-secondary)] leading-relaxed m-0">{pain.description}</p>
            </div>
            <div className={`pain-badge ${pain.severity}`}>
              {pain.severity === 'high' ? 'Alto' : pain.severity === 'med' ? 'Médio' : 'Baixo'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────── PARTICLES COMPONENT ────────

function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (10 + Math.random() * 15) + 's';
      p.style.animationDelay = Math.random() * 12 + 's';
      const size = (1 + Math.random() * 2.5) + 'px';
      p.style.width = size;
      p.style.height = size;
      c.appendChild(p);
    }
  }, []);

  return <div ref={containerRef} className="particles" />;
}

type QuizStep = 'start' | 'question' | 'loading' | 'result' | 'signup' | 'pricing';

export default function QuizApp() {
  const [step, setStep] = useState<QuizStep>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('quarterly');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [signupPassword, setSignupPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [profileResult, setProfileResult] = useState<CinematographicProfile | null>(null);
  const [profileMovies, setProfileMovies] = useState<any[]>([]);
  const [urgencySlots, setUrgencySlots] = useState(23);

  const handleStart = () => setStep('question');
  const handleAnswer = (questionId: string, value: any) => setAnswers(prev => ({ ...prev, [questionId]: value }));

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      saveQuizProgress(answers, nextIndex, false);
    } else { startLoading(); }
  };

  const startLoading = async () => {
    setStep('loading');
    saveQuizProgress(answers, QUIZ_QUESTIONS.length, true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setLoadingProgress(progress);
      if (progress % 20 === 0) setLoadingTextIndex(prev => Math.min(prev + 1, LOADING_TEXTS.length - 1));
      if (progress >= 100) {
        clearInterval(interval);
        const profile = calculateProfile(answers);
        setProfileResult(profile);
        fetchProfileMovies(profile.discoverParams).then(movies => setProfileMovies(movies.slice(0, 6)));
        setTimeout(() => setStep('result'), 500);
      }
    }, 60);
  };

  const handleSignUp = async () => {
    if (!answers.email) { toast.error('E-mail não encontrado. Refaça o quiz.'); return; }
    if (signupPassword.length < 6) { toast.error('A senha deve ter pelo menos 6 caracteres.'); return; }
    setIsSigningUp(true);
    try {
      const supabase = await getSupabase();
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: answers.email, password: signupPassword,
        options: { data: { username: answers.name || 'Usuário' } }
      });
      if (signUpError) throw signUpError;
      if (signUpData.user) {
        await supabase.from('profiles').upsert({ id: signUpData.user.id, username: answers.name || 'Usuário', xp: 0, level: 1 });
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        toast.success('Conta criada com sucesso!');
        setStep('pricing');
      } else {
        try {
          await supabase.auth.signInWithPassword({ email: answers.email, password: signupPassword });
          await new Promise(resolve => setTimeout(resolve, 1000));
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (retrySession) { toast.success('Login realizado!'); setStep('pricing'); }
          else { toast.error('Não foi possível fazer login. Tente novamente.'); }
        } catch {
          toast.error('Este e-mail já está cadastrado com outra senha. Faça login manualmente.');
          window.location.href = 'https://mrcine.pro/login?redirect=/pricing';
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao criar conta';
      toast.error(message);
    } finally { setIsSigningUp(false); }
  };

  const handleSubscribe = async (planId: string) => {
    setIsSubscribing(true);
    try {
      const ttq = (window as any).ttq;
      if (ttq && typeof ttq.track === 'function') {
        ttq.track('InitiateCheckout');
      }
    } catch {}
    try {
      const [supabase, invokeEdgeFunction] = await Promise.all([getSupabase(), getEdgeFunction()]);
      try { await supabase.auth.refreshSession(); } catch { /* ignore */ }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sessão expirada. Faça login novamente.');
        window.location.href = 'https://mrcine.pro/login?redirect=/pricing';
        setIsSubscribing(false); return;
      }
      const data = (await invokeEdgeFunction('stripe-checkout', {
        plan_id: planId, user_id: session.user.id,
        user_email: session.user.email || answers.email,
        ref_code: getReferralCode() || undefined,
      })) as { url?: string };
      if (data?.url) { window.location.href = data.url; }
      else { throw new Error('URL de checkout não retornada'); }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro ao processar assinatura';
      if (message.includes('401') || message.includes('Authentication failed') || message.includes('Session expired')) {
        toast.error('Sessão expirada. Faça login novamente.');
        window.location.href = 'https://mrcine.pro/login?redirect=/pricing';
      } else { toast.error(message); }
    } finally { setIsSubscribing(false); }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  const isNextDisabled = () => {
    if (!currentAnswer) return true;
    if (currentQuestion.type === 'multiple' && currentQuestion.min) return currentAnswer.length < currentQuestion.min;
    if (currentQuestion.type === 'input') {
      if (currentQuestion.id === 'whatsapp') {
        if (!currentAnswer || currentAnswer.replace(/\D/g, '').length === 0) return false;
        return !formatWhatsApp(currentAnswer).isValid;
      }
      return currentAnswer.trim().length < 2;
    }
    return false;
  };

  const [whatsappDisplay, setWhatsappDisplay] = useState('');
  const handleWhatsAppChange = (value: string) => {
    const { formatted, digits } = formatWhatsApp(value);
    setWhatsappDisplay(formatted);
    handleAnswer('whatsapp', digits.length > 0 ? digits : '');
  };

  // Urgency counter
  useEffect(() => {
    if (step !== 'pricing') return;
    const interval = setInterval(() => {
      setUrgencySlots(prev => {
        if (prev > 4 && Math.random() > 0.6) return prev - 1;
        return prev;
      });
    }, 15000 + Math.random() * 20000);
    return () => clearInterval(interval);
  }, [step]);

  // Get current phase label
  const currentPhase = QUIZ_PHASES.find(p => p.id === currentQuestion?.phase);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden relative selection:bg-[var(--accent-dim)]">
      <Particles />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">

        {/* Header / Logo */}
        <div className="flex justify-center mb-4 sm:mb-8">
          <div className="flex items-center gap-2">
            <IconFilm className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent)]" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">PRO</span></span>
          </div>
        </div>

          {/* START SCREEN */}
          {step === 'start' && (
            <div key="start" className="animate-fade-in-up flex-1 flex flex-col items-center justify-start text-center mt-2 sm:mt-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-[rgba(212,168,83,0.2)] font-mono tracking-[0.15em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" style={{animation:'pulse 2s ease infinite'}} />
                Diagnóstico Gratuito
              </div>

              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-light leading-[1.1] mb-4 sm:mb-6">
                Descubra o que está<br />segurando o seu<br /><em className="italic font-normal" style={{background:'linear-gradient(135deg, var(--accent), #e8c46e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>potencial cinematográfico</em>
              </h1>

              <p className="text-[var(--text-secondary)] text-sm sm:text-lg mb-4 sm:mb-6 max-w-md leading-relaxed">
                Responda a este quiz rápido para gerar um algoritmo 100% focado no seu gosto pessoal.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] bg-[var(--success-dim)] border border-[rgba(90,173,110,0.2)] text-[var(--success)] text-sm font-medium mb-8 sm:mb-12">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Este diagnóstico é 100% gratuito — sem pegadinhas
              </div>

              <div className="flex gap-6 mb-8 sm:mb-12 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-2">
                  <IconClock className="w-4 h-4 text-[var(--accent)]" style={{strokeWidth:1.5}} />
                  ~3 minutos
                </span>
                <span className="flex items-center gap-2">
                  <IconShieldCheck className="w-4 h-4 text-[var(--accent)]" style={{strokeWidth:1.5}} />
                  Sem cadastro
                </span>
              </div>

              {/* Testimonials */}
              <div className="mt-4 sm:mt-8 w-full max-w-md text-left">
                <p className="text-xs sm:text-sm text-[var(--text-muted)] uppercase tracking-wider font-bold mb-3 sm:mb-4 text-center">O que dizem nossos usuários</p>
                <div className="bg-[var(--surface)] border border-[var(--border)] p-4 sm:p-5 rounded-[var(--radius)] mb-3 sm:mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/avatar-mariana.png" alt="Mariana S." className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[var(--text)]">Mariana S.</p>
                      <div className="flex text-[var(--accent)]">
                        {[1,2,3,4,5].map(i => <IconStar key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm italic">"Finalmente parei de brigar com meu namorado pra escolher filme. O app sempre acerta o que a gente quer ver!"</p>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--border)] p-4 sm:p-5 rounded-[var(--radius)] mb-3 sm:mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/avatar-rafael.jpeg" alt="Camila R." className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[var(--text)]">Camila R.</p>
                      <div className="flex text-[var(--accent)]">
                        {[1,2,3,4,5].map(i => <IconStar key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm italic">"A função de mostrar em qual streaming o filme está salvou minha vida. Vale cada centavo do plano PRO."</p>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--border)] p-4 sm:p-5 rounded-[var(--radius)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/avatar-lucas.png" alt="Lucas M." className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[var(--text)]">Lucas M.</p>
                      <div className="flex text-[var(--accent)]">
                        {[1,2,3,4,5].map(i => <IconStar key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm italic">"O Oráculo de IA me recomendou 3 filmes perfeitos em 5 segundos. Eu demoraria 40 minutos pra achar um desses."</p>
                </div>
              </div>

              {/* CTA below testimonials */}
              <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center w-full max-w-sm">
                <button
                  onClick={handleStart}
                  className="cta-gold w-full text-base sm:text-lg py-4 sm:py-5"
                >
                  Começar Agora <IconArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* QUESTION SCREEN */}
          {step === 'question' && (
            <div key={`q-${currentQuestionIndex}`} className="animate-fade-in-right flex-1 flex flex-col">
              {/* Progress Bar */}
              <div className="mb-4 sm:mb-8">
                <div className="flex justify-between text-[10px] sm:text-xs font-medium text-[var(--text-muted)] mb-2 sm:mb-3 font-mono tracking-[0.1em] uppercase">
                  {QUIZ_PHASES.map(phase => (
                    <span key={phase.id} className={currentQuestion.phase >= phase.id ? 'text-[var(--accent)]' : ''}>
                      {phase.label}
                    </span>
                  ))}
                </div>
                <div className="h-1 w-full bg-[var(--surface-3)] rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                      background: 'linear-gradient(90deg, var(--accent), #e8c46e)',
                      boxShadow: '0 0 20px var(--accent-glow)',
                    }}
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mt-1 sm:mt-2 text-right font-mono tracking-[0.1em]">
                  {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(QUIZ_QUESTIONS.length).padStart(2, '0')}
                </p>
              </div>

              {/* Question Card */}
              <div className="question-card">
                <div className="font-mono text-[0.7rem] text-[var(--accent)] tracking-[0.15em] uppercase mb-4">
                  {currentPhase?.label || 'PERGUNTA'} — Pergunta {String(currentQuestionIndex + 1).padStart(2, '0')}
                </div>

                <h2 className="font-display text-xl sm:text-2xl md:text-[1.8rem] font-normal leading-[1.35] mb-2">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-6 sm:mb-8">{currentQuestion.subtitle}</p>
                )}

                <div className="mt-3 sm:mt-6">
                  {currentQuestion.type === 'input' ? (
                    currentQuestion.id === 'whatsapp' ? (
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                          <IconPhone className="w-5 h-5" />
                        </div>
                        <input
                          type="tel"
                          placeholder={currentQuestion.placeholder}
                          value={whatsappDisplay}
                          onChange={(e) => handleWhatsAppChange((e.target as HTMLInputElement).value)}
                          className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] py-4 sm:py-5 pl-12 pr-6 text-lg sm:text-xl text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                          autoFocus
                        />
                        {answers.whatsapp && answers.whatsapp.length > 0 && !formatWhatsApp(answers.whatsapp).isValid && (
                          <p className="text-[var(--accent)] text-xs mt-2 ml-1">Digite um número válido: DDD + 9 + 8 dígitos</p>
                        )}
                        {answers.whatsapp && formatWhatsApp(answers.whatsapp).isValid && (
                          <p className="text-[var(--success)] text-xs mt-2 ml-1">Número válido!</p>
                        )}
                      </div>
                    ) : (
                      <input
                        type={currentQuestion.id === 'email' ? 'email' : 'text'}
                        placeholder={currentQuestion.placeholder}
                        value={currentAnswer || ''}
                        onChange={(e) => handleAnswer(currentQuestion.id, (e.target as HTMLInputElement).value)}
                        className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] py-4 sm:py-5 px-6 text-lg sm:text-xl text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                        autoFocus
                      />
                    )
                  ) : (
                    <div className="grid gap-2.5 sm:gap-3">
                      {currentQuestion.options?.map(option => {
                        const isSelected = currentQuestion.type === 'multiple'
                          ? (currentAnswer || []).includes(option.id)
                          : currentAnswer === option.id;
                        const Icon = option.icon ? IconMap[option.icon] : null;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              if (currentQuestion.type === 'single') {
                                handleAnswer(currentQuestion.id, option.id);
                                setTimeout(handleNextQuestion, 300);
                              } else {
                                const curr = currentAnswer || [];
                                const next = curr.includes(option.id)
                                  ? curr.filter((id: string) => id !== option.id)
                                  : [...curr, option.id];
                                handleAnswer(currentQuestion.id, next);
                              }
                            }}
                            className={`option-card w-full text-left ${isSelected ? 'selected' : ''}`}
                          >
                            {Icon && <Icon className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 shrink-0 ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />}
                            <span className={`text-sm sm:text-base font-medium relative z-10 transition-colors ${isSelected ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'}`}>
                              {option.label}
                            </span>
                            <div className="option-radio ml-auto" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Navigation */}
                {currentQuestion.type !== 'single' && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[var(--border)]">
                    <button
                      onClick={handleNextQuestion}
                      disabled={isNextDisabled()}
                      className={`cta-gold w-full py-3.5 sm:py-4 text-base sm:text-lg ${isNextDisabled() ? 'opacity-40 cursor-not-allowed !transform-none !shadow-none' : ''}`}
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LOADING SCREEN */}
          {step === 'loading' && (
            <div key="loading" className="animate-fade-in flex-1 flex flex-col items-center justify-center text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--surface-3)" strokeWidth="4" />
                  <circle
                    cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="4"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * loadingProgress) / 100}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-display font-light text-[var(--text)]">{loadingProgress}%</span>
                </div>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-light mb-3 sm:mb-4">Criando seu perfil sob medida</h2>
              <p key={loadingTextIndex} className="animate-fade-in-up text-[var(--accent)] text-sm sm:text-base font-mono">
                {LOADING_TEXTS[loadingTextIndex]}
              </p>
            </div>
          )}

          {/* RESULT SCREEN */}
          {step === 'result' && profileResult && (
            <div key="result" className="animate-scale-in flex-1 flex flex-col pb-6 sm:pb-10">
              {/* Results Header */}
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--danger-dim)] border border-[rgba(199,80,80,0.2)] text-[var(--danger)] text-xs font-mono tracking-[0.1em] uppercase mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--danger)]" style={{animation:'pulse 1s ease infinite'}} />
                  Diagnóstico Completo
                </div>

                <h2 className="font-display text-xl sm:text-3xl font-light leading-tight mb-2">
                  Seu perfil revela <em className="italic" style={{background:'linear-gradient(135deg, var(--accent), #e8c46e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>pontos críticos</em> que exigem atenção
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                  Baseado nas suas respostas, identificamos padrões que estão impactando negativamente sua experiência com entretenimento.
                </p>
              </div>

              {/* Satisfaction Score Ring */}
              <ScoreRing score={calculateSatisfactionScore(answers)} />

              {/* Profile Card */}
              <div className="text-center mb-6 sm:mb-8">
                <div
                  className={`animate-bounce-in w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br ${profileResult.color} flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4`}
                >
                  {profileResult.icon}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-normal mb-1">
                  Você é o <span className="italic" style={{color:'var(--accent)'}}>{profileResult.name}</span>
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mx-auto">{profileResult.description}</p>
              </div>

              {/* Pain Points */}
              <PainPointsList answers={answers} />

              {/* Movie Grid */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-mono text-[0.68rem] text-[var(--accent)] tracking-[0.18em] uppercase mb-3 sm:mb-4 flex items-center gap-2">
                  <IconFilm className="w-4 h-4 sm:w-5 sm:h-5" />
                  Filmes selecionados para você
                </h3>
                {profileMovies.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {profileMovies.map((movie: any) => (
                      <div key={movie.id} className="relative aspect-[2/3] rounded-xl overflow-hidden group bg-[var(--surface)]">
                        <img
                          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                          alt={movie.title}
                          width="300"
                          height="450"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                          <p className="text-xs font-medium text-white leading-tight">{movie.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {Array.from({length:6}).map((_,i) => (
                      <div key={i} className="aspect-[2/3] rounded-xl bg-[var(--surface-2)] animate-pulse flex items-center justify-center">
                        <IconFilm className="w-5 h-5 text-[var(--text-muted)]" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ROI Card */}
              {calculateROI(answers) && (
                <div className="roi-card mb-6 sm:mb-8">
                  <div className="font-mono text-[0.68rem] text-[var(--success)] tracking-[0.15em] uppercase mb-3">Retorno sobre investimento</div>
                  {(() => {
                    const roi = calculateROI(answers)!;
                    return (
                      <>
                        <p className="font-display text-xl sm:text-2xl font-light text-[var(--text)] mb-2">
                          MrCine se paga em <span className="italic font-normal" style={{color:'var(--success)'}}>{roi.daysToPayOff} dias</span> de uso
                        </p>
                        <p className="text-[var(--text-secondary)] text-sm">
                          Economia líquida de <strong className="text-[var(--success)]">R$ {roi.monthlySavingsBRL}/mês</strong>
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Benefits */}
              <div className="grid gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                {RESULT_BENEFITS.map((benefit, i) => {
                  const Icon = IconMap[benefit.icon];
                  return (
                    <div
                      key={i}
                      className="animate-slide-in-left bg-[var(--surface)] border border-[var(--border)] p-3 sm:p-4 rounded-[var(--radius-sm)] flex gap-3"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="bg-[var(--accent-dim)] p-2 sm:p-2.5 rounded-lg h-fit">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base mb-0.5">{benefit.title}</h3>
                        <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setStep('signup')}
                className="cta-gold w-full py-4 sm:py-5 text-base sm:text-xl"
              >
                Desbloquear Meu Perfil Completo
              </button>
            </div>
          )}

          {/* SIGNUP SCREEN */}
          {step === 'signup' && (
            <div key="signup" className="animate-fade-in-up flex-1 flex flex-col items-center justify-center text-center pb-6 sm:pb-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--accent)] to-[#c49a3e] flex items-center justify-center text-3xl sm:text-4xl shadow-[0_0_40px_var(--accent-glow)] mb-4 sm:mb-6">
                <IconLock className="w-7 h-7 sm:w-9 sm:h-9 text-[var(--bg)]" />
              </div>

              <h2 className="font-display text-xl sm:text-3xl font-light mb-2">Crie sua conta</h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-6 sm:mb-8 max-w-md">
                Quase lá! Crie uma senha para acessar seu perfil cinematográfico completo, dicas diárias de filmes e muito mais.
              </p>

              <div className="w-full max-w-sm space-y-4 text-left">
                <div>
                  <label className="text-xs sm:text-sm text-[var(--text-muted)] mb-1 block font-mono tracking-wider uppercase">E-mail</label>
                  <input type="email" value={answers.email || ''} readOnly className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] py-3 sm:py-4 px-4 sm:px-5 text-[var(--text)] text-base sm:text-lg opacity-60 cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm text-[var(--text-muted)] mb-1 block font-mono tracking-wider uppercase">Crie sua senha</label>
                  <input
                    type="password" placeholder="Mínimo 6 caracteres" value={signupPassword}
                    onChange={(e) => setSignupPassword((e.target as HTMLInputElement).value)}
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] py-3 sm:py-4 px-4 sm:px-5 text-[var(--text)] text-base sm:text-lg placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
                    autoFocus minLength={6}
                    onKeyDown={(e) => { if (e.key === 'Enter' && signupPassword.length >= 6) handleSignUp(); }}
                  />
                </div>
                <button
                  onClick={handleSignUp}
                  disabled={isSigningUp || signupPassword.length < 6}
                  className={`cta-gold w-full py-3.5 sm:py-4 text-base sm:text-lg ${isSigningUp || signupPassword.length < 6 ? 'opacity-50 cursor-not-allowed !transform-none !shadow-none' : ''}`}
                >
                  {isSigningUp ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      Criando conta...
                    </>
                  ) : (
                    <>Criar Conta e Continuar <IconArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </div>
              <p className="mt-6 sm:mt-8 text-[var(--text-muted)] text-xs max-w-xs">
                Seus dados estão seguros conosco. Criamos essa conta para que você possa acessar seu perfil a qualquer momento.
              </p>
            </div>
          )}

          {/* PRICING SCREEN */}
          {step === 'pricing' && (
            <div key="pricing" className="animate-fade-in-up flex-1 flex flex-col pb-6 sm:pb-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="font-display text-xl sm:text-3xl font-light mb-3 sm:mb-4">Escolha seu acesso Pro</h2>
                <div className="inline-flex items-center gap-2 bg-[var(--accent-dim)] border border-[rgba(212,168,83,0.2)] text-[var(--accent)] px-4 py-2 rounded-full font-mono text-xs sm:text-sm tracking-[0.1em] uppercase">
                  <IconCrown className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  Preço de lançamento — vagas limitadas
                </div>
              </div>

              <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-8">
                {PRICING_PLANS.map(plan => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-4 sm:p-6 rounded-[var(--radius)] border cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? 'bg-[var(--accent-dim)] border-[var(--accent)]'
                        : 'bg-[var(--surface)] border-[var(--border)] hover:border-[rgba(212,168,83,0.3)]'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[#c49a3e] text-[var(--bg)] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Mais Popular
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base sm:text-xl font-bold mb-0.5 sm:mb-1">{plan.name}</h3>
                        {plan.savings && <span className="text-[var(--success)] text-xs sm:text-sm font-medium">{plan.savings}</span>}
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg sm:text-2xl font-semibold text-[var(--accent)]">{plan.price}</div>
                        <div className="text-[var(--text-muted)] text-xs sm:text-sm">{plan.period}</div>
                      </div>
                    </div>
                    <div className={`absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedPlan === plan.id ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--text-muted)]'
                    }`}>
                      {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-[var(--bg)]" />}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(selectedPlan)}
                disabled={isSubscribing}
                className={`cta-gold w-full py-4 sm:py-5 text-base sm:text-xl mb-3 sm:mb-4 ${isSubscribing ? 'opacity-50 cursor-not-allowed !transform-none !shadow-none' : ''}`}
              >
                {isSubscribing ? 'Processando...' : 'Assinar Agora'}
              </button>

              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                <IconShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--success)] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">Garantia de 7 Dias</h4>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">
                    Se você não sentir que economizou tempo e encontrou filmes melhores na primeira semana, devolvemos 100% do seu dinheiro. Sem perguntas.
                  </p>
                </div>
              </div>

              {/* Urgency Bar */}
              <div className="urgency-bar mt-5">
                <span className="urgency-dot" />
                Oferta de lançamento — <strong>{urgencySlots} {urgencySlots === 1 ? 'vaga' : 'vagas'}</strong> restantes com esse preço
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center items-center gap-2 text-[var(--text-muted)] text-xs sm:text-sm">
                <IconLock className="w-3 h-3 sm:w-4 sm:h-4" /> Pagamento 100% Seguro via Stripe
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
