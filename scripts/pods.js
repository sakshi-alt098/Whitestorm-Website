/* ═══════════════════════════════════════════════════
   WHITESTORM — pods.js  (ENHANCED v2)
   Energy Core Pod animations:
   - Multi-orbit particle halos (3 concentric rings)
   - Random electric spark emissions
   - Energy burst when pod becomes active
   - Wormhole shooting particles toward center
   - Interference sparkles at orbital intersections
═══════════════════════════════════════════════════ */

class PodAnimator {
  constructor() {
    this.pods    = [];
    this.rafId   = null;
    this.running = false;
    this.tick    = 0;
  }

  init() {
    document.querySelectorAll('.pod').forEach((el) => {
      const canvas = el.querySelector('.pod-particle-canvas');
      if (!canvas) return;

      canvas.width  = canvas.offsetWidth  || 420;
      canvas.height = canvas.offsetHeight || 420;
      const ctx = canvas.getContext('2d');
      const cx  = canvas.width  / 2;
      const cy  = canvas.height / 2;

      const isDormant   = el.classList.contains('pod--dormant');
      const isShramico  = el.classList.contains('pod--shramico');
      const isActive    = el.classList.contains('pod--active');

      const pod = {
        el, canvas, ctx, cx, cy,
        isActive, isDormant,
        color: isShramico
          ? { r:244, g:162, b:97 }
          : { r:79,  g:195, b:247 },
        accentColor: { r:0, g:229, b:255 },
        orbits:   [],
        sparks:   [],
        bursting: false,
        burstParticles: [],
      };

      this.spawnOrbits(pod);
      this.pods.push(pod);
    });

    this.start();
  }

  /* ── Orbital layers ── */
  spawnOrbits(pod) {
    const { cx, cy, isDormant, color } = pod;

    // 3 concentric orbits at different radii
    const orbitDefs = [
      { radius: 82,  count: isDormant ? 4 : 14, speed:  0.006, dir:  1, sizeMult: 1.0 },
      { radius: 108, count: isDormant ? 3 : 10, speed:  0.004, dir: -1, sizeMult: 0.7 },
      { radius: 135, count: isDormant ? 2 : 6,  speed:  0.0025, dir: 1, sizeMult: 0.5 },
    ];

    orbitDefs.forEach(def => {
      const orbit = { particles: [], radius: def.radius, speed: def.speed, dir: def.dir };
      for (let i = 0; i < def.count; i++) {
        const angle = (i / def.count) * Math.PI * 2 + Math.random() * 0.3;
        orbit.particles.push({
          angle,
          size:       (1.0 + Math.random() * 1.8) * def.sizeMult,
          alpha:      isDormant ? (0.1 + Math.random() * 0.2) : (0.35 + Math.random() * 0.5),
          pulse:      Math.random() * Math.PI * 2,
          pulseSpeed: 0.025 + Math.random() * 0.04,
          isAccent:   Math.random() > 0.75,
          trail:      [],
        });
      }
      pod.orbits.push(orbit);
    });
  }

  /* ── Spark emission ── */
  emitSpark(pod, fromX, fromY) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3;
    pod.sparks.push({
      x: fromX, y: fromY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.04 + Math.random() * 0.06,
      size: 0.8 + Math.random() * 1.5,
      isBlue: Math.random() > 0.4,
    });
  }

  /* ── Energy burst when becoming active ── */
  triggerBurst(pod) {
    pod.bursting = true;
    pod.burstParticles = [];
    const { cx, cy, color } = pod;
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 + Math.random() * 0.2;
      const speed = 2 + Math.random() * 6;
      pod.burstParticles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 3,
        life: 1,
        decay: 0.025 + Math.random() * 0.03,
        isAccent: Math.random() > 0.5,
      });
    }
    setTimeout(() => { pod.bursting = false; pod.burstParticles = []; }, 1200);
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.tick++;
      this.pods.forEach(p => this.drawPod(p));
      this.rafId = requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  /* ── Draw single pod ── */
  drawPod(pod) {
    const { canvas, ctx, cx, cy, isDormant, color, accentColor } = pod;
    const isActive = pod.el.classList.contains('pod--active');
    const intensityMult = isDormant ? 0.2 : (isActive ? 1.0 : 0.45);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* — Draw orbits — */
    pod.orbits.forEach(orbit => {
      orbit.particles.forEach(p => {
        p.angle += orbit.speed * orbit.dir;
        p.pulse += p.pulseSpeed;

        const x = cx + Math.cos(p.angle) * orbit.radius;
        const y = cy + Math.sin(p.angle) * orbit.radius;
        const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.2;
        const alpha = Math.max(0, pulseAlpha * intensityMult);
        const size  = p.size * (1 + Math.sin(p.pulse) * 0.3);
        const c = p.isAccent ? accentColor : color;

        // Store trail
        p.trail.push({ x, y });
        if (p.trail.length > 8) p.trail.shift();

        // Draw trail
        if (isActive && p.trail.length > 1) {
          for (let t = 1; t < p.trail.length; t++) {
            const trailAlpha = alpha * (t / p.trail.length) * 0.35;
            ctx.globalAlpha = trailAlpha;
            ctx.beginPath();
            ctx.moveTo(p.trail[t-1].x, p.trail[t-1].y);
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
            ctx.strokeStyle = `rgb(${c.r},${c.g},${c.b})`;
            ctx.lineWidth = size * 0.5;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
        ctx.fill();

        // Glow for accent or active particles
        if (isActive && (p.isAccent || Math.random() > 0.92)) {
          ctx.globalAlpha = alpha * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.2)`;
          ctx.fill();
        }

        // Random spark emission (active pods only)
        if (isActive && !isDormant && Math.random() > 0.985) {
          this.emitSpark(pod, x, y);
        }
      });
    });

    /* — Draw sparks — */
    pod.sparks = pod.sparks.filter(s => s.life > 0);
    pod.sparks.forEach(s => {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.92;
      s.vy *= 0.92;
      s.life -= s.decay;

      const sc = s.isBlue ? accentColor : color;
      ctx.globalAlpha = s.life * intensityMult;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${sc.r},${sc.g},${sc.b})`;
      ctx.fill();
    });

    /* — Draw energy burst (on activation) — */
    if (pod.bursting) {
      pod.burstParticles = pod.burstParticles.filter(b => b.life > 0);
      pod.burstParticles.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.96;
        b.vy *= 0.96;
        b.life -= b.decay;

        const bc = b.isAccent ? accentColor : color;
        ctx.globalAlpha = b.life;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${bc.r},${bc.g},${bc.b})`;
        ctx.fill();

        // Glow
        ctx.globalAlpha = b.life * 0.25;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${bc.r},${bc.g},${bc.b},0.15)`;
        ctx.fill();
      });
    }

    ctx.globalAlpha = 1;
  }

  /* ── Called by carousel when active pod changes ── */
  setActive(index) {
    this.pods.forEach((pod, i) => {
      const wasActive = pod.isActive;
      pod.isActive = (i === index);
      pod.el.classList.toggle('pod--active',   i === index);
      pod.el.classList.toggle('pod--inactive', i !== index);

      // Trigger burst animation when a pod becomes newly active
      if (!wasActive && pod.isActive && !pod.isDormant) {
        this.triggerBurst(pod);
      }

      // Clear trails on inactive pods
      if (!pod.isActive) {
        pod.orbits.forEach(o => o.particles.forEach(p => p.trail = []));
      }
    });
  }
}

window.podAnimator = new PodAnimator();
