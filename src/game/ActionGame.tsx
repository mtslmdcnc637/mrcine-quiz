import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import Orb from './components/Orb';
import Typewriter from './components/Typewriter';
import GameHUD from './components/GameHUD';
import SignupScreen from '../shared/SignupScreen';
import PricingScreen from '../shared/PricingScreen';
import { ACTION_QUESTIONS, calculateActionProfile } from './data/actionQuestions';
import { supabase } from '../lib/supabase';

function IconArrowRight(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>; }
function IconFilm(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="7" x2="7" y1="3" y2="21"/><line x1="17" x2="17" y1="3" y2="21"/><line x1="3" x2="7" y1="8" y2="8"/><line x1="17" x2="21" y1="8" y2="8"/><line x1="3" x2="7" y1="16" y2="16"/><line x1="17" x2="21" y1="16" y2="16"/></svg>; }
function IconZap(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>; }

type Screen = 'intro' | 'questions' | 'loading' | 'result' | 'signup' | 'pricing';

const IconMap: Record<string, any> = { Zap: IconZap, Target: IconFilm, Star: IconZap, Brain: IconZap, Heart: IconZap, ArrowRight: IconArrowRight };

export default function ActionGame() {
  const [, navigate] = useLocation();
  const [screen, setScreen] = useState<Screen>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [profile, setProfile] = useState<any>(null);

  const questions = ACTION_QUESTIONS;
  const currentQ = questions[questionIndex];
  const currentAnswer = answers[currentQ?.id];
  const gameName = answers.action_name || 'Agente';

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isNextDisabled = () => {
    if (!currentAnswer) return true;
    if (currentQ.type === 'input') {
      if (currentQ.id === 'action_email') return !isValidEmail(currentAnswer);
      return currentAnswer.trim().length < 2;
    }
    return false;
  };

  const handleAnswer = (id: string, value: any) => setAnswers(prev => ({ ...prev, [id]: value }));

  const handleNext = () => {
    setXp(prev => prev + 15);
    if (xp + 15 >= (level * 50)) setLevel(prev => prev + 1);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else {
      startLoading();
    }
  };

  const saveGameProgress = async (completed: boolean) => {
    try {
      if (!supabase) return;
      const sid = sessionStorage.getItem('mrcine_submission') || crypto.randomUUID();
      sessionStorage.setItem('mrcine_submission', sid);
      await supabase.from('quiz_responses').upsert({
        submission_id: sid,
        name: answers.action_name || null,
        email: answers.action_email || null,
        profile_type: completed ? (calculateActionProfile(answers) as any).name : null,
        answers: { ...answers, _source: 'game-action' },
        last_step: questionIndex,
        completed,
      }, { onConflict: 'submission_id' });
    } catch { /* analytics */ }
  };

  const startLoading = async () => {
    setScreen('loading');
    saveGameProgress(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 3;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setProfile(calculateActionProfile(answers));
        setTimeout(() => setScreen('result'), 400);
      }
    }, 40);
  };

  useEffect(() => { if (screen === 'questions') saveGameProgress(false); }, [questionIndex]);

  if (screen === 'intro') {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden relative">
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col items-center justify-center text-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 mb-6 sm:mb-8">
            <Orb variant="action" />
          </div>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-5 sm:p-7 max-w-lg mb-6 sm:mb-8 w-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)]" style={{ animation: 'pulse 1.5s ease infinite' }} />
              <span className="font-mono text-[0.65rem] text-[var(--accent)] tracking-[0.18em] uppercase">Oráculo Falando</span>
            </div>
            <Typewriter
              text="Agente, eu sou o Oráculo. Seu perfil de ação está prestes a ser decodificado. Responda às perguntas com sinceridade — não existe resposta errada, apenas o reflexo do seu instinto. Cada escolha revela um pedaço da sua identidade tática. Prepare-se para a missão."
              speed={30}
              variant="action"
              onComplete={() => {}}
            />
          </div>
          <button onClick={() => setScreen('questions')} className="cta-gold w-full max-w-sm py-4 sm:py-5 text-base sm:text-xl">
            Iniciar Missão <IconArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/game')} className="mt-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-5 sm:mb-8">
            <Orb variant="action" />
          </div>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--surface-3)" strokeWidth="4" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="4"
                strokeDasharray="283" strokeDashoffset={283 - (283 * loadingProgress) / 100}
                className="transition-all duration-300 ease-out" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-display font-light">{loadingProgress}%</span>
            </div>
          </div>
          <p className="text-[var(--accent)] text-sm font-mono">Decodificando perfil tático...</p>
        </div>
      </div>
    );
  }

  if (screen === 'result' && profile) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col items-center justify-center text-center pb-6 sm:pb-10">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6 shadow-[0_0_40px_var(--accent-glow)]`}>
            {profile.icon}
          </div>
          <h2 className="font-display text-xl sm:text-3xl font-light mb-2">
            Você é o <span className="italic" style={{ color: 'var(--accent)' }}>{profile.name}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-2 max-w-md leading-relaxed">{profile.desc}</p>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-[0.65rem] text-[var(--accent)] tracking-[0.15em] uppercase">Nível {level}</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="font-mono text-[0.65rem] text-[var(--accent)] tracking-[0.15em] uppercase">{xp} XP</span>
          </div>

          <div className="roi-card mb-6 sm:mb-8 w-full max-w-md text-left">
            <div className="font-mono text-[0.68rem] text-[var(--success)] tracking-[0.15em] uppercase mb-3">Missão Cumprida</div>
            <p className="font-display text-lg sm:text-xl font-light text-[var(--text)] mb-1">
              Seu perfil tático está completo, <span className="italic" style={{ color: 'var(--accent)' }}>{gameName}</span>
            </p>
            <p className="text-[var(--text-secondary)] text-sm">
              Desbloqueie recomendações de ação baseadas no seu DNA cinematográfico.
            </p>
          </div>

          <button onClick={() => setScreen('signup')} className="cta-gold w-full max-w-sm py-4 sm:py-5 text-base sm:text-xl">
            Desbloquear Perfil Tático <IconArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'signup') {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <IconFilm className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent)]" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">GAME</span></span>
            </div>
          </div>
          <SignupScreen
            email={answers.action_email || ''}
            name={answers.action_name}
            onSuccess={() => setScreen('pricing')}
            onBack={() => setScreen('result')}
          />
        </div>
      </div>
    );
  }

  if (screen === 'pricing') {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <IconFilm className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent)]" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">PRO</span></span>
            </div>
          </div>
          <PricingScreen email={answers.action_email || ''} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden relative">
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">
        <div className="flex justify-center mb-3 sm:mb-5">
          <div className="flex items-center gap-2">
            <IconFilm className="w-5 h-5 sm:w-7 sm:h-7 text-[var(--accent)]" />
            <span className="text-lg sm:text-xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">GAME</span></span>
          </div>
        </div>

        <GameHUD playerName={gameName} xp={xp} level={level} step={questionIndex + 1} totalSteps={questions.length} variant="action" />

        <div className="question-card">
          <div className="font-mono text-[0.7rem] text-[var(--accent)] tracking-[0.15em] uppercase mb-4">
            PERFIL DE AÇÃO — Pergunta {String(questionIndex + 1).padStart(2, '0')}
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-normal leading-[1.35] mb-2">{currentQ.title}</h2>
          {currentQ.subtitle && <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-4 sm:mb-6">{currentQ.subtitle}</p>}

          <div className="mt-2 sm:mt-4">
            {currentQ.type === 'input' ? (
              <div>
                <input
                  type={currentQ.id === 'action_email' ? 'email' : 'text'}
                  placeholder={currentQ.placeholder}
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswer(currentQ.id, (e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !isNextDisabled()) handleNext(); }}
                  autocomplete={currentQ.id === 'action_email' ? 'email' : 'name'}
                  aria-label={currentQ.id}
                  className={`w-full bg-[var(--surface-2)] border rounded-[var(--radius-sm)] py-4 sm:py-5 px-6 text-lg sm:text-xl text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all ${
                    currentQ.id === 'action_email' && currentAnswer
                      ? isValidEmail(currentAnswer) ? 'border-[var(--success)]' : 'border-[var(--accent)]'
                      : 'border-[var(--border)] focus:border-[var(--accent)]'
                  }`}
                  autoFocus
                />
                {currentQ.id === 'action_email' && currentAnswer && (
                  isValidEmail(currentAnswer)
                    ? <p className="text-[var(--success)] text-xs mt-2 ml-1">E-mail válido!</p>
                    : <p className="text-[var(--text-muted)] text-xs mt-2 ml-1">Digite um e-mail válido para continuar</p>
                )}
              </div>
            ) : (
              <div className="grid gap-2.5 sm:gap-3">
                {(currentQ as any).options?.map((option: any) => {
                  const isSelected = currentAnswer === option.id;
                  const Icon = option.icon ? IconMap[option.icon] : null;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        handleAnswer(currentQ.id, option.id);
                        setTimeout(handleNext, 250);
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

          {currentQ.type !== 'single' && (
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[var(--border)]">
              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`cta-gold w-full py-3.5 sm:py-4 text-base sm:text-lg transition-all duration-300 ${isNextDisabled() ? 'opacity-40 cursor-not-allowed !transform-none !shadow-none !background-none' : 'opacity-100'}`}
              >
                Próxima Pergunta
              </button>
              {questionIndex > 0 && (
                <button
                  onClick={() => setQuestionIndex(prev => prev - 1)}
                  className="w-full mt-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label="Voltar para pergunta anterior"
                >
                  ← Voltar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
