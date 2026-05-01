import { useState, useEffect, useRef } from 'preact/hooks';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  variant?: 'action' | 'horror';
}

export default function Typewriter({ text, speed = 35, onComplete, className = '', variant = 'action' }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const completeRef = useRef(false);

  useEffect(() => {
    setDisplayed('');
    completeRef.current = false;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        completeRef.current = true;
        setTimeout(() => setShowCursor(false), 2000);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  const cursorColor = variant === 'horror' ? '#cc3333' : '#d4a853';
  const cursorAnim = variant === 'horror' ? 'crt-flicker 0.1s infinite' : 'pulse 0.8s ease infinite';
  const textStyle = variant === 'horror' ? { letterSpacing: '0.05em', textShadow: '0 0 4px rgba(204,51,51,0.4)' } : {};

  return (
    <span className={className} style={textStyle}>
      {displayed}
      {showCursor && (
        <span style={{
          display: 'inline-block', width: '2px', height: '1em', marginLeft: '1px',
          background: cursorColor, verticalAlign: 'text-bottom',
          animation: cursorAnim,
        }} />
      )}
    </span>
  );
}
