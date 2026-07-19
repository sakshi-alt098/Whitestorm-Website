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

          {/* Hologram scanline laser */}
          {isGlassVisible && <div className="hologram-scanline"></div>}

          {/* Floating Specimen / Hologram */}
          <div className={`floating-entity ${isEntityVisible ? 'entity-visible' : 'entity-hidden'}`}>
            <div className="hologram-graphic">
              {productName === 'Shramico' && (
                <div className="holo-planetary-system">
                  <div className="holo-sphere">
                    <img
                      src="https://shramico.com/Shramico_logo.jpeg"
                      alt="Shramico Logo"
                      className="shramico-logo"
                    />
                  </div>
                  <div className="holo-orbit orbit-1"></div>
                  <div className="holo-orbit orbit-2"></div>
                </div>
              )}
              {productName === 'Project Nova' && (
                <div className="holo-star-prism">
                  <div className="star-pane pane-1">
                    <svg viewBox="0 0 24 24" className="hologram-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="star-pane pane-2">
                    <svg viewBox="0 0 24 24" className="hologram-svg-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="star-ring ring-1"></div>
                  <div className="star-ring ring-2"></div>
                </div>
              )}
              {productName === 'Project Aegis' && (
                <div className="holo-cube">
                  <div className="cube-face front"><div className="face-grid"></div></div>
                  <div className="cube-face back"><div className="face-grid"></div></div>
                  <div className="cube-face left"><div className="face-grid"></div></div>
                  <div className="cube-face right"><div className="face-grid"></div></div>
                  <div className="cube-face top"><div className="face-grid"></div></div>
                  <div className="cube-face bottom"><div className="face-grid"></div></div>
                </div>
              )}
              {productName === 'Project Titan' && (
                <div className="holo-gyroscope">
                  <div className="gyro-ring ring-x"></div>
                  <div className="gyro-ring ring-y"></div>
                  <div className="gyro-ring ring-z"></div>
                  <div className="gyro-core"></div>
                </div>
              )}
            </div>
            <div className="hologram-text" style={{ marginTop: '18px' }}>
              <div className="hologram-title">{productName}</div>
              <div className="hologram-status">{status}</div>
            </div>
          </div>

          {/* Liquid fill */}
          <div
            className="pod-liquid"
            style={{
              height: `${fill}%`,
              background: `linear-gradient(to top, ${liquidColor}99 0%, ${liquidColor}11 75%, transparent 100%)`,
            }}
          >
            <div className="liquid-surface" style={{ background: '#ffffff', boxShadow: `0 0 15px ${liquidColor}` }}></div>
          </div>

          {/* Photorealistic canvas bubbles */}
          {fill > 0 && (
            <BubbleCanvas liquidColor={liquidColor} fillLevel={fill} width={260} />
          )}

          {/* Glass specular highlights */}
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
  if (hexColor === '#22c55e') return '#16a34a'; /* Luminous green */
  if (hexColor === '#3b82f6') return '#2563eb'; /* Luminous blue */
  if (hexColor === '#a855f7') return '#9333ea'; /* Luminous purple */
  if (hexColor === '#ef4444') return '#dc2626'; /* Luminous red */
  return hexColor;
}

export default TestTube;
