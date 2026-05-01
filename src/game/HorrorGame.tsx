import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'wouter-preact';
import Orb from './components/Orb';
import Typewriter from './components/Typewriter';
import GameHUD from './components/GameHUD';
import SignupScreen from '../shared/SignupScreen';
import PricingScreen from '../shared/PricingScreen';
import { HORROR_QUESTIONS, calculateHorrorProfile } from './data/horrorQuestions';
import { supabase } from '../lib/supabase';

function IconArrowRight(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>; }
function IconFilm(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="7" x2="7" y1="3" y2="21"/><line x1="17" x2="17" y1="3" y2="21"/><line x1="3" x2="7" y1="8" y2="8"/><line x1="17" x2="21" y1="8" y2="8"/><line x1="3" x2="7" y1="16" y2="16"/><line x1="17" x2="21" y1="16" y2="16"/></svg>; }
function IconBrain(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/></svg>; }
function IconHeart(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>; }
function IconTarget(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>; }
function IconZap(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>; }

type Screen = 'intro' | 'questions' | 'loading' | 'result' | 'signup' | 'pricing';

const IconMap: Record<string, any> = { Brain: IconBrain, Zap: IconZap, Target: IconTarget, Heart: IconHeart, ArrowRight: IconArrowRight };

const accentHorror = '#cc3333';
const bgHorror = '#0a0a0b';

export default function HorrorGame() {
  const [, navigate] = useLocation();
  const [screen, setScreen] = useState<Screen>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [glitch, setGlitch] = useState('');

  const questions = HORROR_QUESTIONS;
  const currentQ = questions[questionIndex];
  const currentAnswer = answers[currentQ?.id];
  const gameName = answers.horror_name || 'Sobrevivente';

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isNextDisabled = () => {
    if (!currentAnswer) return true;
    if (currentQ.type === 'input') {
      if (currentQ.id === 'horror_email') return !isValidEmail(currentAnswer);
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
        name: answers.horror_name || null,
        email: answers.horror_email || null,
        profile_type: completed ? (calculateHorrorProfile(answers) as any).name : null,
        answers: { ...answers, _source: 'game-horror' },
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
        setProfile(calculateHorrorProfile(answers));
        setTimeout(() => setScreen('result'), 400);
      }
    }, 40);
  };

  useEffect(() => { if (screen === 'questions') saveGameProgress(false); }, [questionIndex]);

  useEffect(() => {
    if (screen !== 'questions') return;
    const interval = setInterval(() => {
      setGlitch(Math.random() > 0.85 ? `translateX(${(Math.random() - 0.5) * 4}px) skewX(${(Math.random() - 0.5) * 0.5}deg)` : '');
      setTimeout(() => setGlitch(''), 80);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [screen]);

  if (screen === 'intro') {
    return (
      <div className="min-h-screen text-[var(--text)] font-sans overflow-x-hidden relative" style={{ background: bgHorror }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(204,51,51,0.06), transparent 70%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col items-center justify-center text-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 mb-6 sm:mb-8" style={{ filter: 'drop-shadow(0 0 20px rgba(204,51,51,0.4))' }}>
            <Orb variant="horror" />
          </div>
          <div className="rounded-[var(--radius)] p-5 sm:p-7 max-w-lg mb-6 sm:mb-8 w-full" style={{
            background: 'rgba(20,20,22,0.9)', border: '1px solid rgba(204,51,51,0.12)',
            boxShadow: '0 0 30px rgba(204,51,51,0.06), inset 0 0 60px rgba(0,0,0,0.3)',
          }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: accentHorror, animation: 'pulse 1s ease infinite' }} />
              <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: accentHorror }}>Entidade Falando</span>
            </div>
            <Typewriter
              text="Você ousa entrar no meu domínio... Curioso. Poucos têm coragem de encarar o que espreita nas sombras. Responda com sinceridade — ou as consequências serão... imprevisíveis. Vamos descobrir do que você realmente tem medo."
              speed={40}
              variant="horror"
              onComplete={() => {}}
            />
          </div>
          <button onClick={() => setScreen('questions')} className="cta-gold w-full max-w-sm py-4 sm:py-5 text-base sm:text-xl">
            Encarar o Medo <IconArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/game')} className="mt-3 text-sm text-[var(--text-muted)] hover:underline transition-colors" style={{ color: accentHorror }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#ff6666'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = accentHorror}>
            ← Fugir
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'loading') {
    return (
      <div className="min-h-screen text-[var(--text)] font-sans flex items-center justify-center" style={{ background: bgHorror }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(204,51,51,0.06), transparent 70%)' }} />
        <div className="text-center relative z-10">
          <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-5 sm:mb-8">
            <Orb variant="horror" />
          </div>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--surface-3)" strokeWidth="4" />
              <circle cx="50" cy="50" r="45" fill="none" stroke={accentHorror} strokeWidth="4"
                strokeDasharray="283" strokeDashoffset={283 - (283 * loadingProgress) / 100}
                className="transition-all duration-300 ease-out" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-display font-light">{loadingProgress}%</span>
            </div>
          </div>
          <p className="text-sm font-mono" style={{ color: accentHorror }}>Analisando seus medos...</p>
        </div>
      </div>
    );
  }

  if (screen === 'result' && profile) {
    return (
      <div className="min-h-screen text-[var(--text)] font-sans overflow-x-hidden" style={{ background: bgHorror }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(204,51,51,0.04), transparent 60%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col items-center justify-center text-center pb-6 sm:pb-10">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center text-3xl sm:text-4xl mb-4 sm:mb-6`} style={{ boxShadow: `0 0 40px rgba(204,51,51,0.3)` }}>
            {profile.icon}
          </div>
          <h2 className="font-display text-xl sm:text-3xl font-light mb-2">
            Você é o <span className="italic" style={{ color: accentHorror }}>{profile.name}</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-2 max-w-md leading-relaxed">{profile.desc}</p>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: accentHorror }}>Nível {level}</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: accentHorror }}>{xp} XP</span>
          </div>

          <div className="roi-card mb-6 sm:mb-8 w-full max-w-md text-left" style={{ borderColor: 'rgba(204,51,51,0.2)' }}>
            <div className="font-mono text-[0.68rem] tracking-[0.15em] uppercase mb-3" style={{ color: accentHorror }}>Análise Completa</div>
            <p className="font-display text-lg sm:text-xl font-light text-[var(--text)] mb-1">
              Seu perfil sombrio foi revelado, <span className="italic" style={{ color: accentHorror }}>{gameName}</span>
            </p>
            <p className="text-[var(--text-secondary)] text-sm">
              Desbloqueie recomendações de terror que vão testar seus limites.
            </p>
          </div>

          <button onClick={() => setScreen('signup')} className="cta-gold w-full max-w-sm py-4 sm:py-5 text-base sm:text-xl">
            Desbloquear Perfil Sombrio <IconArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'signup') {
    return (
      <div className="min-h-screen text-[var(--text)] font-sans overflow-x-hidden" style={{ background: bgHorror }}>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <IconFilm className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent)]" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">GAME</span></span>
            </div>
          </div>
          <SignupScreen
            email={answers.horror_email || ''}
            name={answers.horror_name}
            onSuccess={() => setScreen('pricing')}
            onBack={() => setScreen('result')}
          />
        </div>
      </div>
    );
  }

  if (screen === 'pricing') {
    return (
      <div className="min-h-screen text-[var(--text)] font-sans overflow-x-hidden" style={{ background: bgHorror }}>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <IconFilm className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent)]" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">PRO</span></span>
            </div>
          </div>
          <PricingScreen email={answers.horror_email || ''} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[var(--text)] font-sans overflow-x-hidden relative" style={{ background: bgHorror }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(204,51,51,0.04), transparent 60%)' }} />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">
        <div className="flex justify-center mb-3 sm:mb-5" style={{ transform: glitch }}>
          <div className="flex items-center gap-2">
            <IconFilm className="w-5 h-5 sm:w-7 sm:h-7 text-[var(--accent)]" />
            <span className="text-lg sm:text-xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">GAME</span></span>
          </div>
        </div>

        <div style={{ transform: glitch }}>
          <GameHUD playerName={gameName} xp={xp} level={level} step={questionIndex + 1} totalSteps={questions.length} variant="horror" />
        </div>

        <div className="question-card" style={{
          borderColor: 'rgba(204,51,51,0.1)',
          boxShadow: '0 0 20px rgba(204,51,51,0.04)',
        }}>
          <div className="font-mono text-[0.7rem] tracking-[0.15em] uppercase mb-4" style={{ color: accentHorror }}>
            PERFIL DE TERROR — Pergunta {String(questionIndex + 1).padStart(2, '0')}
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-normal leading-[1.35] mb-2">{currentQ.title}</h2>
          {currentQ.subtitle && <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-4 sm:mb-6">{currentQ.subtitle}</p>}

          <div className="mt-2 sm:mt-4">
            {currentQ.type === 'input' ? (
              <div>
                <input
                  type={currentQ.id === 'horror_email' ? 'email' : 'text'}
                  placeholder={currentQ.placeholder}
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswer(currentQ.id, (e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !isNextDisabled()) handleNext(); }}
                  autocomplete={currentQ.id === 'horror_email' ? 'email' : 'name'}
                  aria-label={currentQ.id}
                  className={`w-full bg-[var(--surface-2)] border rounded-[var(--radius-sm)] py-4 sm:py-5 px-6 text-lg sm:text-xl text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all ${
                    currentQ.id === 'horror_email' && currentAnswer
                      ? isValidEmail(currentAnswer) ? 'border-[var(--success)]' : 'border-[var(--accent)]'
                      : 'border-[var(--border)] focus:border-[var(--accent)]'
                  }`}
                  autoFocus
                />
                {currentQ.id === 'horror_email' && currentAnswer && (
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
                      style={isSelected ? { borderColor: accentHorror, background: 'rgba(204,51,51,0.08)' } : {}}
                    >
                      {Icon && <Icon className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 shrink-0 ${isSelected ? '' : 'text-[var(--text-muted)]'}`} style={isSelected ? { color: accentHorror } : {}} />}
                      <span className={`text-sm sm:text-base font-medium relative z-10 transition-colors ${isSelected ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'}`}>
                        {option.label}
                      </span>
                      <div className="option-radio ml-auto" style={isSelected ? { borderColor: accentHorror, background: accentHorror } : {}} />
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
                Continuar nas Sombras
              </button>
              {questionIndex > 0 && (
                <button
                  onClick={() => setQuestionIndex(prev => prev - 1)}
                  className="w-full mt-3 py-2 text-sm text-[var(--text-muted)] hover:underline transition-colors"
                  style={{ color: accentHorror }}
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
