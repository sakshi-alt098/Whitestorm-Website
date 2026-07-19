import React, { useState, useEffect } from 'react';
import './TerminalIntro.css';

const TerminalIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 0: Initial storm brewing (0 - 1s)
    // 1: HUD panels activate (1s - 2.5s)
    // 2: System analysis online (2.5s - 4s)
    // 3: Central brand core resolves (4s - 5.5s)
    // 4: Flash transition into main site (5.5s - 7s)
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
      {/* Dynamic Background Storm Clouds & Lightning */}
      <div className="storm-background">
        <div className="cloud-layer-1"></div>
        <div className="cloud-layer-2"></div>
        <div className="lightning-flash-overlay"></div>
      </div>

      {/* Floating Octagonal HUD Panels */}
      {phase >= 1 && (
        <div className="hud-container">
          {/* Panel 1: Wind Speeds Waveform */}
          <div className="hud-panel octagonal top-left">
            <div className="panel-content">
              <span className="panel-header">WIND ANALYSIS [ACTIVE]</span>
              <svg viewBox="0 0 100 30" className="waveform-svg">
                <path d="M 0 15 Q 10 5, 20 15 T 40 15 T 60 15 T 80 15 T 100 15" fill="none" stroke="#06b6d4" strokeWidth="1" />
                <path d="M 0 15 Q 15 25, 30 15 T 60 15 T 90 15 T 100 15" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.7" />
              </svg>
              <div className="metric-row">
                <span>VELOCITY:</span>
                <span className="value">340 km/h</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Supercell Radar Dial */}
          <div className="hud-panel octagonal top-right">
            <div className="panel-content">
              <span className="panel-header">RADAR SENSORS [SCAN]</span>
              <div className="radar-dial-wrap">
                <div className="radar-sweep"></div>
                <div className="radar-grid"></div>
              </div>
              <span className="panel-footer">GRID SECTOR: 4-WS</span>
            </div>
          </div>

          {/* Panel 3: Terminal Console Output (Keeps selector compatibility) */}
          <div className="hud-panel octagonal bottom-left">
            <div className="panel-content terminal-text">
              <span className="panel-header">CORE TELEMETRY LOG</span>
              <div className="terminal-log-lines">
                <div className="terminal-line">
                  {phase >= 1 && <span>&gt; INITIALIZING...</span>}
                </div>
                <div className="terminal-line">
                  {phase >= 2 && <span>&gt; Research Facility</span>}
                </div>
                <div className="terminal-line text-online">
                  {phase >= 3 && <span>&gt; ONLINE</span>}
                </div>
              </div>
              {phase < 4 && <div className="cursor"></div>}
            </div>
          </div>

          {/* Panel 4: Ionization Metrics */}
          <div className="hud-panel octagonal bottom-right">
            <div className="panel-content">
              <span className="panel-header">ATMOSPHERE CORE</span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: phase >= 2 ? '94%' : '40%' }}></div>
              </div>
              <div className="metric-row">
                <span>IONIZATION:</span>
                <span className="value">{phase >= 2 ? '94%' : '32%'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Central Brand Core & Niceframe Logo */}
      <div className={`central-brand-core ${phase >= 3 ? 'resolved' : 'hidden'}`}>
        <div className="brand-niceframe">
          <div className="hud-ring outer"></div>
          <div className="hud-ring middle"></div>
          <div className="hud-ring inner"></div>
          <div className="logo-circular-frame">
            <svg viewBox="0 0 24 24" className="logo-lightning-svg" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>
        <h1 className="logo-name-text">WHITESTORMM</h1>
      </div>
    </div>
  );
};

export default TerminalIntro;
