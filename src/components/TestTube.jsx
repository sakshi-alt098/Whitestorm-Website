import React, { useEffect, useState } from 'react';
import BubbleCanvas from './BubbleCanvas';

const TestTube = ({ 
  productName, 
  status, 
  liquidColor = '#22c55e', 
  fillLevel = 60,
  delay = 0,
  isFlagship = false,
  isActive = false,
  assemblyPhase = 4 // Default to fully assembled if not specified
}) => {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    // Only fill liquid when assembly reaches phase 3
    if (assemblyPhase >= 3) {
      const timer = setTimeout(() => {
        setFill(fillLevel);
      }, 500 + delay);
      return () => clearTimeout(timer);
    } else {
      setFill(0); // Reset fill if assembly goes backwards
    }
  }, [fillLevel, delay, assemblyPhase]);

  const darkerColor = getDarkerColor(liquidColor);

  const isGlassVisible = assemblyPhase >= 1;
  const isCapLocked = assemblyPhase >= 2;
  const isEntityVisible = assemblyPhase >= 4;

  return (
    <div
      className={`pod-wrapper ${isActive ? 'pod-wrapper--active' : ''}`}
      style={{ '--liquid-color': liquidColor }}
    >
      
      {/* ── TOP PIPE ── */}
      <div className="pipe-wrap">
        <div className="pipe-flange"></div>
        <div className="pipe top-pipe"></div>
      </div>

      <div className="incubation-pod">

        {/* ── TOP CAP ── */}
        <div className={`pod-cap top ${isCapLocked ? 'cap-locked' : 'cap-unlocked'}`}>
          <div className="cap-body">
            <div className="cap-face">
              <div className="cap-led"></div>
              <div className="cap-led-2"></div>
            </div>
          </div>
          <div className="cap-collar"></div>
        </div>

        {/* ── CYLINDRICAL GLASS BODY ── */}
        <div className={`pod-glass ${isGlassVisible ? 'glass-risen' : 'glass-hidden'}`}>

          {/* Floating Specimen / Hologram */}
          <div className={`floating-entity ${isEntityVisible ? 'entity-visible' : 'entity-hidden'}`}>
            {isFlagship ? (
              <>
                <img
                  src="https://shramico.com/Shramico_logo.jpeg"
                  alt="Shramico Logo"
                  className="shramico-logo"
                />
                <div className="hologram-text" style={{ marginTop: '18px' }}>
                  <div className="hologram-title">{productName}</div>
                  <div className="hologram-status">{status}</div>
                </div>
              </>
            ) : (
              <div className="hologram-text">
                <div className="hologram-title">{productName}</div>
                <div className="hologram-status">{status}</div>
              </div>
            )}
          </div>

          {/* Liquid fill */}
          <div
            className="pod-liquid"
            style={{
              height: `${fill}%`,
              background: `linear-gradient(to bottom, ${liquidColor}dd 0%, ${darkerColor} 100%)`,
            }}
          >
            <div className="liquid-surface" style={{ background: liquidColor }}></div>
          </div>

          {/* Photorealistic canvas bubbles */}
          {fill > 0 && (
            <BubbleCanvas liquidColor={liquidColor} fillLevel={fill} width={260} />
          )}

          {/* Glass specular streaks */}
          <div className="glass-highlight"></div>
          <div className="glass-highlight-2"></div>
        </div>

        {/* ── BOTTOM CAP ── */}
        <div className="pod-cap bottom">
          <div className="cap-collar"></div>
          <div className="cap-body">
            <div className="cap-face">
              <div className="cap-led"></div>
              <div className="cap-led-2"></div>
            </div>
          </div>
        </div>

      </div>

      {/* ── BOTTOM PIPE ── */}
      <div className="pipe-wrap">
        <div className="pipe bottom-pipe"></div>
        <div className="pipe-flange"></div>
      </div>

      <div className="floor-reflection"></div>
    </div>
  );
};

function getDarkerColor(hexColor) {
  if (hexColor === '#22c55e') return '#052e16';
  if (hexColor === '#3b82f6') return '#1e3a8a';
  if (hexColor === '#a855f7') return '#3b0764';
  if (hexColor === '#ef4444') return '#450a0a';
  return hexColor;
}

export default TestTube;
