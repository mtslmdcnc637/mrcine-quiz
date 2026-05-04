import { useLocation } from 'wouter-preact';
import Orb from './components/Orb';

function IconArrowRight(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>; }
function IconFilm(p: any) { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="18" x="3" y="3" rx="2"/><line x1="7" x2="7" y1="3" y2="21"/><line x1="17" x2="17" y1="3" y2="21"/><line x1="3" x2="7" y1="8" y2="8"/><line x1="17" x2="21" y1="8" y2="8"/><line x1="3" x2="7" y1="16" y2="16"/><line x1="17" x2="21" y1="16" y2="16"/></svg>; }

export default function GenreSelect() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans overflow-x-hidden relative">
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-8 min-h-screen flex flex-col">
        <div className="flex justify-center mb-6 sm:mb-10">
          <div className="flex items-center gap-2">
            <IconFilm className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent)]" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight font-sans">MrCine<span className="text-[var(--accent)]">GAME</span></span>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-10">
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-light leading-[1.15] mb-3 sm:mb-4">
            Escolha seu<br />cenário de <em className="italic font-normal" style={{ background: 'linear-gradient(135deg, var(--accent), #e8c46e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>sobrevivência</em>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-md mx-auto">
            Cada gênero revela um perfil diferente. O Oráculo vai decodificar seus instintos mais profundos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 flex-1 items-start">
          <button
            onClick={() => navigate('/game-action')}
            onTouchEnd={(e) => { e.preventDefault(); navigate('/game-action'); }}
            className="group relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:border-[rgba(212,168,83,0.4)] transition-all duration-300 cursor-pointer text-left flex flex-col items-center p-5 sm:p-8"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.1), transparent 70%)' }} />
            <div className="w-20 h-20 sm:w-28 sm:h-28 mb-3 sm:mb-5 relative z-10">
              <Orb variant="action" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-light mb-1.5 relative z-10">💥 Ação</h2>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm text-center leading-relaxed mb-4 relative z-10 max-w-[200px]">
              Descubra seu perfil de ação. Tiroteios, artes marciais, explosões.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[var(--accent)] text-xs sm:text-sm font-medium relative z-10 group-hover:gap-2.5 transition-all">
              Iniciar Missão <IconArrowRight className="w-4 h-4" />
            </span>
          </button>

          <button
            onClick={() => navigate('/game-horror')}
            onTouchEnd={(e) => { e.preventDefault(); navigate('/game-horror'); }}
            className="group relative overflow-hidden rounded-[var(--radius)] border border-[rgba(204,51,51,0.15)] bg-[var(--surface)] hover:border-[rgba(204,51,51,0.5)] transition-all duration-300 cursor-pointer text-left flex flex-col items-center p-5 sm:p-8"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(ellipse at center, rgba(204,51,51,0.08), transparent 70%)' }} />
            <div className="w-20 h-20 sm:w-28 sm:h-28 mb-3 sm:mb-5 relative z-10">
              <Orb variant="horror" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-light mb-1.5 relative z-10" style={{ color: '#e0e0e0' }}>🩸 Terror</h2>
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm text-center leading-relaxed mb-4 relative z-10 max-w-[200px]">
              Explore seu lado sombrio. Horror psicológico, slasher, sobrenatural.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium relative z-10 group-hover:gap-2.5 transition-all" style={{ color: '#cc3333' }}>
              Entrar nas Sombras <IconArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
