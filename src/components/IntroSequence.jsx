import React, { useEffect, useState } from 'react';
import './IntroSequence.css';

const IntroSequence = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 0: Pure black (0s - 1s)
    // Phase 1: Draw LEDs (1s - 3s)
    const t1 = setTimeout(() => setPhase(1), 1000);
    
    // Phase 2: Unlock and open doors (3s - 5.5s)
    const t2 = setTimeout(() => setPhase(2), 3000);
    
    // Phase 3: Camera moves forward (scale up) & fade out overlay (5s - 7s)
    const t3 = setTimeout(() => setPhase(3), 5000);

    // Phase 4: Complete, remove from DOM
    const t4 = setTimeout(() => {
      setPhase(4);
      if (onComplete) onComplete();
    }, 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (phase === 4) return null;

  return (
    <div className={`intro-overlay phase-${phase}`}>
      
      {/* The solid walls covering the rest of the screen outside the door frame */}
      <div className="intro-wall left-wall"></div>
      
      {/* The Premium Door Frame */}
      <div className="intro-door-frame">
        {/* LED lines drawing container */}
        <div className="door-led-track left-track">
           <div className="door-led-glow"></div>
        </div>
        <div className="door-led-track right-track">
           <div className="door-led-glow"></div>
        </div>
        <div className="door-led-track top-track">
           <div className="door-led-glow horizontal"></div>
        </div>

        {/* The Doors */}
        <div className="intro-door left-door">
          <div className="door-panel">
            <div className="door-detail"></div>
          </div>
        </div>
        
        <div className="intro-door right-door">
          <div className="door-panel">
            <div className="door-detail"></div>
          </div>
        </div>
        
        {/* Center seam lock */}
        <div className="door-lock"></div>
      </div>

      <div className="intro-wall right-wall"></div>
      
    </div>
  );
};

export default IntroSequence;
