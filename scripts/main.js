/* ═══════════════════════════════════════════════════
   WHITESTORMM — main.js
   App initialisation:
   - Ambient cloud canvas background
   - Scroll reveal animations
   - Smooth scroll for CTA
   - General polish
═══════════════════════════════════════════════════ */

// ── Ambient Cloud Canvas ──────────────────────────
class CloudBackground {
  constructor() {
    this.canvas = document.getElementById('cloud-canvas');
    this.ctx    = this.canvas.getContext('2d');
    this.clouds = [];
    this.rafId  = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.spawn();
    this.animate();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.W = this.canvas.width;
    this.H = this.canvas.height;
  }

  spawn() {
    const count = 18;
    for (let i = 0; i < count; i++) {
      this.clouds.push(this.makeCloud(true));
    }
  }

  makeCloud(random = false) {
    const y = random ? Math.random() * this.H : this.H + 80;
    return {
      x:     random ? Math.random() * this.W : -200 + Math.random() * (this.W + 400),
      y,
      vx:    0.12 + Math.random() * 0.25,
      vy:    (Math.random() - 0.5) * 0.05,
      rx:    60 + Math.random() * 120,
      ry:    30 + Math.random() * 60,
      alpha: 0.015 + Math.random() * 0.035,
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.W, this.H);

    this.clouds.forEach((c, i) => {
      c.x += c.vx;
      c.y += c.vy;

      // Wrap around
      if (c.x > this.W + 200) {
        this.clouds[i] = this.makeCloud(false);
        this.clouds[i].x = -200;
      }

      this.ctx.globalAlpha = c.alpha;
      this.ctx.beginPath();
      this.ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(79, 195, 247, 1)';
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

// ── Scroll Reveal ─────────────────────────────────
class ScrollReveal {
  constructor() {
    this.targets = document.querySelectorAll(
      '.about-badge, .about-title, .about-description, .stats-row, .founder-card, .shramico-header, .product-showcase, .feature-card'
    );

    this.targets.forEach(el => el.classList.add('reveal'));

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    this.targets.forEach(el => this.observer.observe(el));
  }
}

// ── Smooth Scroll for CTA ─────────────────────────
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ── Nav bar on scroll (minimal) ───────────────────
function setupScrollEffects() {
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    // Could add a sticky nav bar here if needed
    lastY = y;
  }, { passive: true });
}

// ── Navigation ────────────────────────────────────
function setupNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  // Reveal nav after storm on index.html
  window.addEventListener('stormDone', () => {
    setTimeout(() => {
      nav.classList.remove('nav--hidden');
      nav.classList.add('nav--visible');
    }, 300);
  }, { once: true });

  // Fallback reveal
  setTimeout(() => {
    nav.classList.remove('nav--hidden');
    nav.classList.add('nav--visible');
  }, 3500);

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile hamburger
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('nav-links--open');
      toggle.classList.toggle('nav-toggle--open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }
}

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  new CloudBackground();
  new ScrollReveal();
  setupSmoothScroll();
  setupScrollEffects();
  setupNav();

  console.log('%c⚡ WHITESTORMM', 'color:#4FC3F7;font-size:20px;font-weight:900;');
  console.log('%cBuilding Tomorrow, Today.', 'color:#9E9E9E;font-size:12px;');
});
