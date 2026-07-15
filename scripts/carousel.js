/* ═══════════════════════════════════════════════════
   WHITESTORM — carousel.js
   3D circular ring carousel
   - Swipe-ONLY rotation (no auto-spin)
   - Arrow keys + touch + mouse drag
   - Uses PodTransition for stormy switching
═══════════════════════════════════════════════════ */

class EnergyRingCarousel {
  constructor() {
    this.ring    = document.getElementById('ring');
    this.pods    = Array.from(document.querySelectorAll('.pod'));
    this.btnPrev = document.getElementById('nav-prev');
    this.btnNext = document.getElementById('nav-next');

    this.N            = this.pods.length;
    this.current      = 0;
    this.currentAngle = 0;
    this.locked       = false; // prevents double-swipe during transition
    this.podAngle     = 360 / this.N; // degrees between each pod
    this.ringRadius   = this.calcRadius();

    this.init();
    this.setupControls();
    this.setupSwipe();
    this.setupKeyboard();
  }

  calcRadius() {
    return window.innerWidth < 600 ? 240 : 400;
  }

  // ─── Initialise pod positions ─────────────────
  init() {
    const radius = this.calcRadius();

    this.pods.forEach((pod, i) => {
      const angle = this.podAngle * i;
      pod.style.setProperty('--pod-angle', `${angle}deg`);
      pod.style.setProperty('--ring-radius', `${radius}px`);
      pod.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    // First pod is active
    this.setActive(0, false);

    // Resize handler
    window.addEventListener('resize', () => {
      const r = this.calcRadius();
      this.pods.forEach((pod, i) => {
        const angle = this.podAngle * i;
        pod.style.setProperty('--ring-radius', `${r}px`);
        pod.style.transform = `rotateY(${angle}deg) translateZ(${r}px)`;
      });
    });
  }

  // ─── Rotate ring so pod `index` faces front ───
  rotateTo(index, animate = true) {
    this.currentAngle = -(index * this.podAngle);
    if (animate) {
      this.ring.style.transition = 'transform 0.9s cubic-bezier(0.23,1,0.32,1)';
    } else {
      this.ring.style.transition = 'none';
    }
    this.ring.style.transform = `rotateY(${this.currentAngle}deg)`;

    // Update active pod
    this.pods.forEach((pod, i) => {
      if (i === index) {
        pod.classList.add('pod--active');
        pod.classList.remove('pod--inactive');
      } else {
        pod.classList.remove('pod--active');
        pod.classList.add('pod--inactive');
      }
    });
  }

  // ─── Update active/inactive classes ───────────
  setActive(index, animRing = true) {
    this.current = index;

    if (animRing) this.rotateTo(index);

    // Tell pod animator
    if (window.podAnimator) window.podAnimator.setActive(index);
  }

  // ─── Navigate with full stormy transition ─────
  navigateTo(nextIndex) {
    if (this.locked) return;
    if (nextIndex === this.current) return;

    const ni = ((nextIndex % this.N) + this.N) % this.N;
    const fromPod = this.pods[this.current];
    const toPod   = this.pods[ni];

    this.locked = true;

    // Rotate ring first (fast, subtle), then do stormy particle transition
    this.rotateTo(ni, true);

    window.podTransition.execute(fromPod, toPod, () => {
      this.setActive(ni, false); // ring already rotated
      this.locked = false;
    });
  }

  next() { this.navigateTo(this.current + 1); }
  prev() { this.navigateTo(this.current - 1); }

  // ─── Button controls ──────────────────────────
  setupControls() {
    if (this.btnNext) this.btnNext.addEventListener('click', () => this.next());
    if (this.btnPrev) this.btnPrev.addEventListener('click', () => this.prev());
  }

  // ─── Swipe / drag ─────────────────────────────
  setupSwipe() {
    let startX = null;
    let startY = null;
    let isDragging = false;
    const THRESHOLD = 50; // px minimum swipe

    const start = (x, y) => {
      startX = x;
      startY = y;
      isDragging = true;
    };

    const end = (x, y) => {
      if (!isDragging || startX === null) return;
      isDragging = false;
      const dx = x - startX;
      const dy = y - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > THRESHOLD) {
        dx < 0 ? this.next() : this.prev();
      }
      startX = startY = null;
    };

    // Mouse
    document.addEventListener('mousedown', e => start(e.clientX, e.clientY));
    document.addEventListener('mouseup',   e => end(e.clientX,   e.clientY));

    // Touch
    document.addEventListener('touchstart', e => start(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    document.addEventListener('touchend',   e => end(e.changedTouches[0].clientX, e.changedTouches[0].clientY), { passive: true });
  }

  // ─── Arrow keys ───────────────────────────────
  setupKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }
}

// ── Boot after storm clears ──
function bootCarousel() {
  window.carousel = new EnergyRingCarousel();
  if (window.podAnimator) window.podAnimator.init();
}

window.addEventListener('stormDone', bootCarousel, { once: true });

// Fallback: boot after 3s anyway (in case storm event misfires)
setTimeout(() => {
  if (!window.carousel) bootCarousel();
}, 3200);
