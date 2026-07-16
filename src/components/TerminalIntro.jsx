import React, { useState, useEffect } from 'react';
import './TerminalIntro.css';

const TerminalIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 0: Black screen + cursor (0 - 1s)
    // 1: INITIALIZING... (1s - 2.5s)
    // 2: Research Facility (2.5s - 4s)
    // 3: ONLINE (4s - 5.5s)
    // 4: Lights turn on / fade out (5.5s - 7s)
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t3 = setTimeout(() => setPhase(3), 4000);
    const t4 = setTimeout(() => setPhase(4), 5500);
    const t5 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div className={`terminal-overlay phase-${phase}`}>
      <div className="terminal-text">
        <div className="terminal-line">
          {phase >= 1 && <span>&gt; INITIALIZING...</span>}
        </div>
        <div className="terminal-line">
          {phase >= 2 && <span>&gt; Research Facility</span>}
        </div>
        <div className="terminal-line text-online">
          {phase >= 3 && <span>&gt; ONLINE</span>}
        </div>
        {phase < 4 && <div className="cursor"></div>}
      </div>
    </div>
  );
};

export default TerminalIntro;
