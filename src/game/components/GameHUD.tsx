interface GameHUDProps {
  playerName: string;
  xp: number;
  level: number;
  step: number;
  totalSteps: number;
  variant: 'action' | 'horror';
}

export default function GameHUD({ playerName, xp, level, step, totalSteps, variant }: GameHUDProps) {
  const isAction = variant === 'action';
  const hudAccent = isAction ? 'var(--accent)' : '#cc3333';
  const hudGlow = isAction ? 'var(--accent-glow)' : 'rgba(204,51,51,0.25)';
  const pct = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full mb-4 sm:mb-6">
      <div className="flex justify-between items-center mb-2.5 px-1">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="font-mono text-[0.6rem] sm:text-[0.68rem] tracking-[0.2em] uppercase" style={{ color: hudAccent }}>
            JOGADOR
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[var(--text)] truncate max-w-[100px] sm:max-w-[160px]">{playerName || 'Recruta'}</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <div className="font-mono text-[0.6rem] sm:text-[0.68rem] tracking-[0.2em] uppercase text-[var(--text-muted)]">NÍVEL</div>
            <div className="text-xs sm:text-sm font-bold" style={{ color: hudAccent }}>{level}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[0.6rem] sm:text-[0.68rem] tracking-[0.2em] uppercase text-[var(--text-muted)]">XP</div>
            <div className="text-xs sm:text-sm font-bold" style={{ color: hudAccent }}>{xp}</div>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-[var(--surface-3)] rounded-full overflow-hidden"
        role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
        aria-label="Progresso da missão"
      >
        <div
          className="h-full transition-all duration-500 rounded-full"
          style={{
            width: `${pct}%`,
            background: isAction ? 'linear-gradient(90deg, var(--accent), #e8c46e)' : 'linear-gradient(90deg, #cc3333, #ff4444)',
            boxShadow: `0 0 14px ${hudGlow}`,
          }}
        />
      </div>
      <div className="flex justify-between text-[0.6rem] sm:text-[0.68rem] text-[var(--text-muted)] mt-1.5 font-mono tracking-[0.15em]">
        <span>MISSÃO {String(step).padStart(2, '0')}/{String(totalSteps).padStart(2, '0')}</span>
        <span>{pct}%</span>
      </div>
    </div>
  );
}
