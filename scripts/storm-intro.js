/* ═══════════════════════════════════════════════════
   WHITESTORMM — storm-intro.js
   Thunder & Lightning Intro
═══════════════════════════════════════════════════ */

class LightningBolt {
  constructor(startX, startY, targetX, targetY) {
    this.segments = [];
    this.alpha = 1;
    this.life = 0;
    this.maxLife = 8 + Math.random() * 15; // frames
    this.generatePath(startX, startY, targetX, targetY);
  }

  generatePath(sx, sy, tx, ty) {
    this.segments.push({x: sx, y: sy});
    let currentX = sx;
    let currentY = sy;
    
    // distance
    const dx = tx - sx;
    const dy = ty - sy;
    const distance = Math.hypot(dx, dy);
    
    let numSteps = Math.floor(distance / 25); // rough segment length
    if(numSteps < 5) numSteps = 5;
    
    for(let i=0; i<numSteps; i++) {
       // move towards target with randomness
       const progress = (i+1)/numSteps;
       const expectedX = sx + dx * progress;
       const expectedY = sy + dy * progress;
       
       // random jaggedness
       const jitter = 70 * (1 - Math.pow(progress, 2)); // less jitter near the end
       currentX = expectedX + (Math.random() - 0.5) * jitter;
       currentY = expectedY + (Math.random() - 0.5) * jitter;
       
       this.segments.push({x: currentX, y: currentY});
    }
  }

  draw(ctx, fadeOut) {
    if (this.life >= this.maxLife) return;
    this.alpha = (1 - (this.life / this.maxLife)) * fadeOut;
    
    ctx.beginPath();
    ctx.moveTo(this.segments[0].x, this.segments[0].y);
    for (let i = 1; i < this.segments.length; i++) {
      ctx.lineTo(this.segments[i].x, this.segments[i].y);
    }
    
    // Inner core
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.lineWidth = 1.5 + Math.random() * 2.5;
    
    // Glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#4FC3F7';
    ctx.stroke();
    
    ctx.shadowBlur = 0; // reset
    this.life++;
  }
}

class StormIntro {
  constructor() {
    this.overlay   = document.getElementById('storm-overlay');
    this.canvas    = document.getElementById('storm-canvas');
    this.logoFlash = document.getElementById('storm-logo-flash');
    this.ctx       = this.canvas.getContext('2d');
    this.startTime = null;
    this.duration  = 2400; // intense short duration
    this.rafId     = null;
    this.bolts     = [];

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.run();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.W  = this.canvas.width;
    this.H  = this.canvas.height;
  }

  run() {
    this.startTime = performance.now();
    this.animate(this.startTime);
  }

  animate(now) {
    const elapsed  = now - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    
    // Fade out everything at the very end
    const fadeOut = progress < 0.75 ? 1 : Math.max(0, 1 - (progress - 0.75) / 0.25);
    
    // Background clear with trailing effect
    let bgAlpha = 0.3; // fade out old bolts
    let bgColor = '#0A0B10';
    
    // Random thunder flash
    const isFlashing = Math.random() > 0.92 && progress < 0.8;
    if (isFlashing) {
      bgColor = '#FFFFFF';
      bgAlpha = 0.6;
    }
    
    this.ctx.globalAlpha = bgAlpha * fadeOut;
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(0, 0, this.W, this.H);
    this.ctx.globalAlpha = 1;

    // Generate new bolts sweeping from top-left to bottom-right
    if (progress < 0.8 && Math.random() > 0.55) {
      // Origin moves along diagonal, with some randomness
      const currentOriginX = (this.W * 1.2) * progress - (this.W * 0.2) + (Math.random() - 0.5) * 300;
      const currentOriginY = (this.H * 1.2) * progress - (this.H * 0.2) + (Math.random() - 0.5) * 300;
      
      // Target is further down the diagonal
      const targetX = currentOriginX + this.W * 0.4 + (Math.random() - 0.5) * 500;
      const targetY = currentOriginY + this.H * 0.4 + (Math.random() - 0.5) * 500;
      
      this.bolts.push(new LightningBolt(currentOriginX, currentOriginY, targetX, targetY));
      
      // Branch bolt
      if (Math.random() > 0.4) {
        const branchX = currentOriginX + (Math.random() - 0.2) * 600;
        const branchY = currentOriginY + Math.random() * 600;
        this.bolts.push(new LightningBolt(currentOriginX, currentOriginY, branchX, branchY));
      }
    }

    // Draw bolts
    for (let i = this.bolts.length - 1; i >= 0; i--) {
      this.bolts[i].draw(this.ctx, fadeOut);
      if (this.bolts[i].life >= this.bolts[i].maxLife) {
        this.bolts.splice(i, 1);
      }
    }

    // Show the circular cropped logo during the main flash phase
    if (progress >= 0.6 && progress < 0.9) {
      this.logoFlash.classList.add('visible');
      // intense shadow on the logo during lightning
      if (isFlashing) {
         this.logoFlash.style.opacity = '0.8';
      } else {
         this.logoFlash.style.opacity = '0.4';
      }
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
    }, 800);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('storm-active');
  window.stormIntro = new StormIntro();
});
