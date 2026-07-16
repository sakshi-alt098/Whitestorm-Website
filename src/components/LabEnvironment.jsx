import React, { useState, useEffect, useRef, useCallback } from 'react';
import TestTube from './TestTube';
import CentralReactor from './CentralReactor';

const PRODUCTS = [
  { id: 0, name: 'Shramico',      status: 'Flagship Platform',  color: '#22c55e', fillLevel: 85, isFlagship: true  },
  { id: 1, name: 'Project Nova',  status: 'In Development',     color: '#3b82f6', fillLevel: 45, isFlagship: false },
  { id: 2, name: 'Project Aegis', status: 'Conceptual Phase',   color: '#a855f7', fillLevel: 25, isFlagship: false },
  { id: 3, name: 'Project Titan', status: 'Researching',        color: '#ef4444', fillLevel: 10, isFlagship: false },
];

const N = PRODUCTS.length;
const ANGLE = 360 / N;
const RADIUS = 420;

const LabEnvironment = ({ startAssembly = true }) => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [assemblyPhase, setAssemblyPhase] = useState(startAssembly ? 0 : -1);
  
  // Handle the physical assembly sequence when startAssembly flips to true
  useEffect(() => {
    if (startAssembly) {
      setAssemblyPhase(0); // 0: Empty platform
      const t1 = setTimeout(() => setAssemblyPhase(1), 1000); // Glass rises
      const t2 = setTimeout(() => setAssemblyPhase(2), 2500); // Cap locks
      const t3 = setTimeout(() => setAssemblyPhase(3), 3500); // Liquid fills
      const t4 = setTimeout(() => setAssemblyPhase(4), 5500); // Shramico appears / Interactive
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [startAssembly]);

  const carouselRef = useRef(null);
  const cellsRef = useRef([]);
  const reqRef = useRef(null);

  // High-performance physics state
  const physics = useRef({
    rotation: 0,
    targetRotation: 0,
    velocity: 0,
    isDragging: false,
    lastX: 0,
    lastTime: 0,
    forceUpdate: true // Force first render
  });

  // 60FPS Hardware-accelerated physics loop
  const updatePhysics = useCallback(() => {
    const p = physics.current;
    let needsUpdate = false;
    
    if (p.isDragging) {
      needsUpdate = true;
    } else {
      // High-performance critically damped spring
      const diff = p.targetRotation - p.rotation;
      if (Math.abs(diff) > 0.001 || Math.abs(p.velocity) > 0.001) {
        p.velocity += diff * 0.15; // Increased stiffness for faster snap
        p.velocity *= 0.75;        // Tuned friction to prevent bouncing
        p.rotation += p.velocity;
        needsUpdate = true;
      } else {
        // Snap perfectly and rest
        p.rotation = p.targetRotation;
        p.velocity = 0;
      }
    }

    if (needsUpdate || p.forceUpdate) {
      // Force GPU layer with translate3d
      if (carouselRef.current) {
        carouselRef.current.style.transform = `translate3d(0, 0, -${RADIUS}px) rotateY(${p.rotation}deg)`;
      }

    // Billboarding & Scale for each tube
    cellsRef.current.forEach((cell, i) => {
      if (!cell) return;
      const cellAngle = ANGLE * i;
      
      // Counter-rotation so they always face the camera
      const counterRot = -(p.rotation + cellAngle);
      
      // Calculate normalized absolute rotation (0 = front, 180 = back)
      let absRot = (p.rotation + cellAngle) % 360;
      if (absRot < 0) absRot += 360;
      if (absRot > 180) absRot = 360 - absRot;
      
      const ratio = absRot / 180; // 0 (front) to 1 (back)
      const scale = 1.05 - (ratio * 0.25);
      
      // Removed dynamic blur() which forces expensive rasterization every frame and causes jitter.
      // Brightness is cheaper to animate on the GPU.
      const brightness = 1 - (ratio * 0.7);

      // 3D positioning using translate3d
      cell.style.transform = `rotateY(${cellAngle}deg) translate3d(0, 0, ${RADIUS}px)`;
      
      // Apply scale, brightness, and billboarding
      const inner = cell.firstElementChild;
      if (inner) {
        inner.style.transform = `translate3d(0,0,0) rotateY(${counterRot}deg) scale(${scale})`;
        inner.style.filter = `brightness(${brightness})`;
      }
    });
    
      p.forceUpdate = false;
    }

    reqRef.current = requestAnimationFrame(updatePhysics);
  }, []);

  useEffect(() => {
    reqRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(reqRef.current);
  }, [updatePhysics]);

  // Sync UI state (dots, active label) based on current snapped rotation
  useEffect(() => {
    const snapInterval = setInterval(() => {
      if (!physics.current.isDragging && Math.abs(physics.current.velocity) < 0.1) {
        let i = Math.round(-physics.current.targetRotation / ANGLE) % N;
        if (i < 0) i += N;
        if (activeIndex !== i) setActiveIndex(i);
      }
    }, 100);
    return () => clearInterval(snapInterval);
  }, [activeIndex]);

  const snapTo = (index) => {
    const p = physics.current;
    const currentI = -p.targetRotation / ANGLE;
    const diff = index - currentI;
    
    let shortest = diff % N;
    if (shortest > N/2) shortest -= N;
    if (shortest < -N/2) shortest += N;

    p.targetRotation = p.targetRotation - shortest * ANGLE;
  };

  const next = () => snapTo(activeIndex + 1);
  const prev = () => snapTo(activeIndex - 1);

  const onWheel = (e) => {
    if (e.deltaY > 0) next();
    else prev();
  };

  // ── Drag Interaction ──
  const onPointerDown = (e) => {
    if (assemblyPhase < 4) return; // Prevent interaction during assembly
    const p = physics.current;
    p.isDragging = true;
    p.lastX = e.clientX || (e.touches && e.touches[0].clientX);
    p.lastTime = performance.now();
    p.velocity = 0;
    e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const p = physics.current;
    if (!p.isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    const currentTime = performance.now();
    const dt = currentTime - p.lastTime;
    
    const dx = currentX - p.lastX;
    // 2x responsiveness
    const sensitivity = 0.8;
    p.rotation += dx * sensitivity;
    p.targetRotation = p.rotation;
    
    if (dt > 0) {
      p.velocity = (dx * sensitivity) / dt * 16;
    }
    
    p.lastX = currentX;
    p.lastTime = currentTime;
  };

  const onPointerUp = (e) => {
    const p = physics.current;
    if (!p.isDragging) return;
    p.isDragging = false;
    e.target.releasePointerCapture && e.target.releasePointerCapture(e.pointerId);
    
    // Apply inertia/momentum
    p.targetRotation = p.rotation + p.velocity * 18;
    // Snap to nearest slot
    p.targetRotation = Math.round(p.targetRotation / ANGLE) * ANGLE;
  };

  const activeColor = PRODUCTS[activeIndex].color;

  return (
    <div
      className="lab-environment"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      style={{ touchAction: 'none' }} 
    >
      <div
        className="floor-ambient"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${activeColor}2a 0%, transparent 70%)` }}
      />

      <main className="scene" aria-label="Product carousel">
        {/* STATIC LAB FLOOR */}
        <div className="lab-floor" />

        {/* BLURRED BACKGROUND EQUIPMENT */}
        <div className="bg-equipment server-rack-left">
          <div className="equipment-screen"></div>
          <div className="equipment-screen"></div>
          <div className="equipment-screen"></div>
        </div>
        <div className="bg-equipment medical-cart-right">
          <div className="cart-monitor"></div>
        </div>

        <div className="carousel" ref={carouselRef}>
          
          {/* CENTRAL DNA REACTOR */}
          <CentralReactor />

          {/* PREMIUM PHYSICAL BASE (150px thick via 30 layers) */}
          <div className="carousel-base">
            {/* The Solid 3D Extrusion (Side walls) */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={`slice-${i}`} 
                className="base-slice" 
                style={{ transform: `translateZ(${-i * 5}px)` }}
              />
            ))}

            {/* The Top Surface */}
            <div className="base-surface">
              
              {/* Radial Connectors (SVG Curves) */}
              <svg className="base-connections" viewBox="-550 -550 1100 1100">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {PRODUCTS.map((p, i) => {
                  // Draw a curved pipe from center to the socket
                  const angle = (i * ANGLE - 90) * (Math.PI / 180);
                  const radius = RADIUS - 20; // stop near socket
                  const ex = Math.cos(angle) * radius;
                  const ey = Math.sin(angle) * radius;
                  const cx1 = Math.cos(angle) * (radius * 0.5);
                  const cy1 = Math.sin(angle) * (radius * 0.1);
                  const path = `M 0,0 C ${cx1},${cy1} ${ex * 0.8},${ey * 0.8} ${ex},${ey}`;
                  
                  return (
                    <g key={`pipe-${i}`}>
                      <path d={path} className="pipe-outer" />
                      {/* Removed expensive SVG blur filter here to fix layout thrashing */}
                      <path d={path} className="pipe-inner" stroke={p.color} />
                      <circle cx={ex} cy={ey} r="8" fill="#333" stroke="#555" strokeWidth="2" />
                    </g>
                  );
                })}
              </svg>

              {PRODUCTS.map((product, i) => (
                <div 
                  key={`socket-${i}`} 
                  className="base-socket" 
                  style={{ transform: `rotateZ(${i * ANGLE}deg) translateY(-${RADIUS}px)` }}
                >
                  <div className="socket-grip"></div>
                  <div className="socket-brackets">
                    <div className="bracket left"></div>
                    <div className="bracket right"></div>
                  </div>
                  <div className="socket-number">0{i+1}</div>
                  <div className="socket-ambient-shadow"></div>
                </div>
              ))}
            </div>
            <div className="base-edge"></div>
          </div>

          {/* TEST TUBES */}
          {PRODUCTS.map((product, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={product.id}
                className="carousel-cell"
                ref={el => cellsRef.current[index] = el}
              >
                <div className="billboard-wrapper" style={{ transformOrigin: 'center center' }}>
                  <TestTube
                    productName={product.name}
                    status={product.status}
                    liquidColor={product.color}
                    fillLevel={product.fillLevel}
                    delay={index * 150}
                    isFlagship={product.isFlagship}
                    isActive={isActive}
                    assemblyPhase={assemblyPhase}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Hide UI controls until assembly finishes */}
      {assemblyPhase >= 4 && (
        <>
          <div className="dot-indicators">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                className={`dot ${i === activeIndex ? 'dot-active' : ''}`}
                style={{ '--dot-color': p.color }}
                onClick={(e) => { e.stopPropagation(); snapTo(i); }}
                aria-label={`Go to ${p.name}`}
              />
            ))}
          </div>

          <div className="controls">
            <button id="btn-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>&#8592; PREV</button>
            <div className="active-label" style={{ color: activeColor }}>
              {PRODUCTS[activeIndex].name}
            </div>
            <button id="btn-next" onClick={(e) => { e.stopPropagation(); next(); }}>NEXT &#8594;</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LabEnvironment;
