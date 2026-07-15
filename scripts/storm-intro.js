/* ═══════════════════════════════════════════════════
   WHITESTORM — storm-intro.js
   Circular rotating storm / vortex
═══════════════════════════════════════════════════ */

class StormIntro {
  constructor() {
    this.overlay   = document.getElementById('storm-overlay');
    this.canvas    = document.getElementById('storm-canvas');
    this.logoFlash = document.getElementById('storm-logo-flash');
    this.ctx       = this.canvas.getContext('2d');
    this.particles = [];
    this.startTime = null;
    this.duration  = 2600;
    this.rafId     = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.spawnVortex();
    this.run();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.W  = this.canvas.width;
    this.H  = this.canvas.height;
    this.cx = this.W / 2;
    this.cy = this.H / 2;
  }

  spawnVortex() {
    const count = 500;
    for (let i = 0; i < count; i++) {
      // distribute more particles near the center
      const t = Math.pow(Math.random(), 1.5);
      const radius = 20 + (1 - t) * Math.max(this.W, this.H) * 0.7;
      const angle = Math.random() * Math.PI * 2;
      
      this.particles.push({
        radius,
        angle,
        speed: (0.02 + Math.random() * 0.04) * (1 - t * 0.5), // inner particles rotate faster
        inwardSpeed: 0.5 + Math.random() * 2,
        size: 0.8 + Math.random() * 2.5,
        alpha: 0.1 + Math.random() * 0.5,
        colorVal: 180 + Math.floor(Math.random() * 75), // white/grey
        delay: Math.random() * 0.3,
        trail: [] // store past positions to draw streaks
      });
    }
  }

  run() {
    this.startTime = performance.now();
    this.animate(this.startTime);
  }

  animate(now) {
    const elapsed  = now - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Start fading out the entire canvas after 70%
    const fadeOut = progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.3);

    // slight blur for motion trail effect
    this.ctx.fillStyle = `rgba(255, 255, 255, 0.25)`;
    this.ctx.fillRect(0, 0, this.W, this.H);

    for (const p of this.particles) {
      const pProgress = Math.max(0, (progress - p.delay) / (1 - p.delay));
      if (pProgress <= 0) continue;

      const appear = Math.min(pProgress * 5, 1);
      const alpha  = p.alpha * fadeOut * appear;
      if (alpha <= 0.01) continue;

      // Update position
      p.angle += p.speed;
      p.radius = Math.max(0, p.radius - p.inwardSpeed); // spiral inward
      
      const x = this.cx + Math.cos(p.angle) * p.radius;
      const y = this.cy + Math.sin(p.angle) * p.radius;

      // Draw particle
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = `rgb(${p.colorVal}, ${p.colorVal}, ${p.colorVal})`;
      
      // Draw as small lines to simulate fast rotation
      this.ctx.beginPath();
      if (p.trail.length > 0) {
        this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = `rgb(${p.colorVal}, ${p.colorVal}, ${p.colorVal})`;
        this.ctx.lineWidth = p.size;
        this.ctx.stroke();
      } else {
        this.ctx.arc(x, y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      // Update trail
      p.trail.push({ x, y });
      if (p.trail.length > 3) p.trail.shift();
    }

    this.ctx.globalAlpha = 1;

    // Show the circular cropped logo during the flash phase
    if (progress >= 0.7 && progress < 0.95) {
      this.logoFlash.classList.add('visible');
    } else {
      this.logoFlash.classList.remove('visible');
    }

    if (progress < 1) {
      this.rafId = requestAnimationFrame(ts => this.animate(ts));
    } else {
      this.complete();
    }
  }

  complete() {
    this.overlay.classList.add('fade-out');
    document.body.classList.remove('storm-active');
    setTimeout(() => {
      this.overlay.classList.add('hidden');
      document.body.classList.add('storm-done');
      const cloudCanvas = document.getElementById('cloud-canvas');
      if (cloudCanvas) cloudCanvas.classList.add('visible');
      window.dispatchEvent(new CustomEvent('stormDone'));
    }, 700);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('storm-active');
  window.stormIntro = new StormIntro();
});
