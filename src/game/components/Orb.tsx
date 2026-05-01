import { useRef, useEffect } from 'preact/hooks';

interface OrbProps {
  variant: 'action' | 'horror';
}

export default function Orb({ variant }: OrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAction = variant === 'action';
  const accentColor = isAction ? '#d4a853' : '#cc3333';
  const glowColor = isAction ? 'rgba(212,168,83,0.25)' : 'rgba(204,51,51,0.3)';
  const innerColor = isAction ? 'rgba(107,76,255,0.4)' : 'rgba(139,0,0,0.5)';

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'orb-particle';
      p.style.cssText = `--fx:${Math.random() * 2 - 1};--fy:${Math.random() * 2 - 1};--tx:${Math.random() * 2 - 1};--ty:${Math.random() * 2 - 1};left:50%;top:50%;width:${2 + Math.random() * 3}px;height:${2 + Math.random() * 3}px;animation-delay:${Math.random() * 7}s;animation-duration:${5 + Math.random() * 7}s;background:${accentColor};${isAction ? '' : 'box-shadow:0 0 6px ' + glowColor + ';'}`;
      c.appendChild(p);
    }
  }, []);

  return (
    <div ref={containerRef} className={`orb-container ${variant}`} style={{ '--orb-glow': glowColor, '--orb-inner': innerColor, '--orb-accent': accentColor } as any}>
      <div className={`orb-halo ${variant}`} style={{ boxShadow: `0 0 60px ${glowColor}, 0 0 120px ${innerColor}` }} />
      <div className={`orb-ring ${variant}`} style={{ borderColor: accentColor }} />
      <div className={`orb-core ${variant}`} style={{
        background: isAction
          ? `radial-gradient(circle, ${accentColor}, ${innerColor}, transparent)`
          : `radial-gradient(circle, ${accentColor}, ${innerColor}, #1a0000)`,
      }} />
      <div className={`orb-pulse ${variant}`} style={{ boxShadow: `0 0 30px ${glowColor}` }} />
    </div>
  );
}
