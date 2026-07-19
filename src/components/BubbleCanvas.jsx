import React, { useEffect, useRef } from 'react';

const BubbleCanvas = ({ liquidColor, fillLevel, width = 320 }) => {
  const canvasRef = useRef(null);
  const bubblesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.width;
    const H = canvas.height;

    // Parse the liquid color into rgb for reuse
    const parseHex = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb = parseHex(liquidColor);
    const tintR = rgb.r;
    const tintG = rgb.g;
    const tintB = rgb.b;

    // ---------------------------------
    // Spark/Particle class with real physics
    // ---------------------------------
    class Bubble {
      constructor() {
        this.reset();
      }

      reset() {
        this.r = Math.random() * 2 + 1; // small spark radius 1–3px
        this.x = Math.random() * (W - this.r * 2) + this.r;
        this.y = H + this.r; // start below canvas
        this.speedY = Math.random() * 1.5 + 1.0; // rise faster
        this.wobbleSpeed = Math.random() * 0.08 + 0.04;
        this.wobbleAmp = Math.random() * 4 + 1;
        this.wobblePhase = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.age = 0;
      }

      update() {
        this.y -= this.speedY;
        this.age += 1;
        // Horizontal wobble
        this.x += Math.sin(this.age * this.wobbleSpeed + this.wobblePhase) * 0.3;
        // Keep within bounds
        if (this.x < this.r) this.x = this.r;
        if (this.x > W - this.r) this.x = W - this.r;
        // Reset if floated to the top
        if (this.y + this.r < 0) {
          this.reset();
        }
      }

      draw(ctx) {
        const x = this.x;
        const y = this.y;
        const r = this.r;

        ctx.save();
        ctx.globalAlpha = this.opacity;

        // Glowing cyan/branded spark
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgb(${tintR},${tintG},${tintB})`;
        
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff'; // White core
        ctx.fill();

        // Secondary glow ring
        ctx.beginPath();
        ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tintR},${tintG},${tintB},0.3)`;
        ctx.fill();

        ctx.restore();
      }
    }

    // Spawn 15 bubbles staggered across the height (reduced from 60 to stop lag)
    bubblesRef.current = Array.from({ length: 15 }).map((_, i) => {
      const b = new Bubble();
      b.y = Math.random() * H; // start scattered, not all at bottom
      return b;
    });

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      bubblesRef.current.forEach(b => {
        b.update();
        b.draw(ctx);
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [liquidColor, fillLevel]);

  // Canvas fills the filled portion of the pod glass
  // Glass body is pod-height (580) minus two caps (~64px each) = ~452px
  const canvasHeightPx = (fillLevel / 100) * 452;

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={canvasHeightPx}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${canvasHeightPx}px`,
        pointerEvents: 'none',
        zIndex: 15,
      }}
    />
  );
};

export default BubbleCanvas;
