/* ═══════════════════════════════════════════════════
   WHITESTORM — transition.js
   Stormy pod switch transition:
   Phase 1: Pod shatters into storm particles
   Phase 2: Whitestorm logo ghost (15% opacity, 2s)
   Phase 3: New pod assembles from converging particles
═══════════════════════════════════════════════════ */

class PodTransition {
  constructor() {
    this.canvas    = document.getElementById('transition-canvas');
    this.ctx       = this.canvas.getContext('2d');
    this.logoGhost = document.getElementById('logo-ghost');
    this.particles = [];
    this.rafId     = null;
    this.active    = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // ─── Main entry point ───────────────────────────
  execute(fromPod, toPod, onComplete) {
    if (this.active) return;
    this.active = true;

    const fromRect = fromPod.getBoundingClientRect();
    const toRect   = toPod.getBoundingClientRect();
    const cx = fromRect.left + fromRect.width  / 2;
    const cy = fromRect.top  + fromRect.height / 2;
    const tx = toRect.left   + toRect.width    / 2;
    const ty = toRect.top    + toRect.height   / 2;

    // --- Phase 1: Shatter from pod ---
    this.particles = [];
    this.spawnShatterParticles(cx, cy, fromPod);

    // Hide current pod
    fromPod.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    fromPod.style.opacity    = '0';
    fromPod.style.transform  = `rotateY(${fromPod.style.getPropertyValue('--pod-angle') || '0deg'}) translateZ(var(--ring-radius, 380px)) scale(0.85)`;

    this.startParticleLoop();

    // --- Phase 2: Logo ghost ---
    setTimeout(() => {
      this.showLogoGhost();
    }, 280);

    // --- Phase 3: Assemble new pod ---
    setTimeout(() => {
      this.spawnAssembleParticles(tx, ty, toPod);
      toPod.style.opacity = '0';
    }, 1700);

    // --- Reveal new pod ---
    setTimeout(() => {
      toPod.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      toPod.style.opacity    = '1';
      toPod.style.transform  = `rotateY(var(--pod-angle, 0deg)) translateZ(var(--ring-radius, 380px)) scale(1)`;
      this.hideLogoGhost();
    }, 2150);

    // --- Done ---
    setTimeout(() => {
      fromPod.style.opacity    = '';
      fromPod.style.transform  = '';
      fromPod.style.transition = '';
      toPod.style.transition   = '';
      toPod.style.transform    = '';
      this.active = false;
      onComplete();
    }, 2600);
  }

  // ─── Spawn explosion particles from a pod ───────
  spawnShatterParticles(cx, cy, pod) {
    const count = 130;
    const isShramico = pod.classList.contains('pod--shramico');

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 9;
      const isBlue = Math.random() > (isShramico ? 0.6 : 0.4);

      this.particles.push({
        x:    cx + (Math.random() - 0.5) * 220,
        y:    cy + (Math.random() - 0.5) * 220,
        vx:   Math.cos(angle) * speed + 2.5, // Storm: bias rightward
        vy:   Math.sin(angle) * speed - 1.5, // slight upward
        size: 1.2 + Math.random() * 3.8,
        life: 1,
        decay: 0.008 + Math.random() * 0.018,
        color: isBlue
          ? { r: 79,  g: 195, b: 247 }
          : isShramico
          ? { r: 244, g: 162, b: 97  }
          : { r: 150 + Math.floor(Math.random()*80), g: 150 + Math.floor(Math.random()*80), b: 160 + Math.floor(Math.random()*70) },
        trail: isBlue,
        type: 'shatter',
      });
    }
  }

  // ─── Spawn converging particles toward new pod ──
  spawnAssembleParticles(tx, ty, pod) {
    const count = 90;
    const isShramico = pod.classList.contains('pod--shramico');

    for (let i = 0; i < count; i++) {
      const angle    = Math.random() * Math.PI * 2;
      const distance = 280 + Math.random() * 320;
      const isBlue   = Math.random() > 0.45;

      this.particles.push({
        x:      tx + Math.cos(angle) * distance,
        y:      ty + Math.sin(angle) * distance,
        targetX: tx + (Math.random() - 0.5) * 80,
        targetY: ty + (Math.random() - 0.5) * 80,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 3,
        life: 1,
        decay: 0.006 + Math.random() * 0.01,
        color: isBlue
          ? { r: 79,  g: 195, b: 247 }
          : isShramico
          ? { r: 244, g: 162, b: 97  }
          : { r: 0,   g: 229, b: 255 },
        trail: isBlue,
        type: 'assemble',
        speed: 0.06 + Math.random() * 0.06,
      });
    }
  }

  // ─── Particle render loop ────────────────────────
  startParticleLoop() {
    cancelAnimationFrame(this.rafId);
    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let alive = false;

      for (const p of this.particles) {
        if (p.life <= 0) continue;
        alive = true;

        if (p.type === 'shatter') {
          p.x  += p.vx;
          p.y  += p.vy;
          p.vy += 0.08; // subtle gravity
          p.vx *= 0.985;
          p.life -= p.decay;
        } else {
          // Converging — lerp toward target
          p.x  += (p.targetX - p.x) * p.speed;
          p.y  += (p.targetY - p.y) * p.speed;
          const dist = Math.hypot(p.targetX - p.x, p.targetY - p.y);
          if (dist < 6) p.life -= 0.05;
          else          p.life -= p.decay * 0.3;
        }

        const alpha = Math.max(0, p.life);
        const { r, g, b } = p.color;

        // Trail line
        if (p.trail && p.type === 'shatter') {
          this.ctx.globalAlpha = alpha * 0.45;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
          this.ctx.strokeStyle = `rgb(${r},${g},${b})`;
          this.ctx.lineWidth = p.size * 0.5;
          this.ctx.lineCap = 'round';
          this.ctx.stroke();
        }

        // Main dot
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgb(${r},${g},${b})`;
        this.ctx.fill();

        // Glow for blue particles
        if (p.trail) {
          this.ctx.globalAlpha = alpha * 0.25;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(${r},${g},${b},0.15)`;
          this.ctx.fill();
        }
      }

      this.ctx.globalAlpha = 1;

      if (alive) {
        this.rafId = requestAnimationFrame(loop);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };

    this.rafId = requestAnimationFrame(loop);
  }

  // ─── Logo Ghost ─────────────────────────────────
  showLogoGhost() {
    this.logoGhost.classList.add('visible');
  }

  hideLogoGhost() {
    this.logoGhost.classList.remove('visible');
  }
}

window.podTransition = new PodTransition();
