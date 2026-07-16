import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Setup global helpers or base values
const PRODUCTS = [
  { name: 'Shramico', fillLevel: 85 },
  { name: 'Project Nova', fillLevel: 45 },
  { name: 'Project Aegis', fillLevel: 25 },
  { name: 'Project Titan', fillLevel: 10 },
];

test.describe('Tier 1: Feature Coverage', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
    // Bypass intro sequence (7000ms) + assembly sequence (5500ms)
    await page.clock.fastForward(13000);
  });

  test('T1-1: Navbar - Brand Logo exists and contains WHITESTORMM', async ({ page }) => {
    const logo = page.locator('.nav-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('WHITESTORMM');
  });

  test('T1-2: Navbar - Products link exists', async ({ page }) => {
    const link = page.locator('.nav-links a').nth(0);
    await expect(link).toBeVisible();
    await expect(link).toContainText('Products');
  });

  test('T1-3: Navbar - Philosophy link exists', async ({ page }) => {
    const link = page.locator('.nav-links a').nth(1);
    await expect(link).toBeVisible();
    await expect(link).toContainText('Philosophy');
  });

  test('T1-4: Navbar - Company link exists', async ({ page }) => {
    const link = page.locator('.nav-links a').nth(2);
    await expect(link).toBeVisible();
    await expect(link).toContainText('Company');
  });

  test('T1-5: Navbar - Careers link exists', async ({ page }) => {
    const link = page.locator('.nav-links a').nth(3);
    await expect(link).toBeVisible();
    await expect(link).toContainText('Careers');
  });

  test('T1-6: Navbar - Contact CTA exists', async ({ page }) => {
    const btn = page.locator('.btn-nav');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('Contact Us');
  });

  test('T1-7: Lab - Container exists', async ({ page }) => {
    const container = page.locator('.lab-environment');
    await expect(container).toBeVisible();
  });

  test('T1-8: Lab - 3D Scene exists and has perspective', async ({ page }) => {
    const scene = page.locator('.scene');
    await expect(scene).toBeVisible();
    const perspective = await scene.evaluate(el => window.getComputedStyle(el).perspective);
    expect(perspective).not.toBeNull();
  });

  test('T1-9: Lab - Carousel element exists', async ({ page }) => {
    const carousel = page.locator('.carousel');
    await expect(carousel).toBeVisible();
  });

  test('T1-10: Lab - 4 Incubation Pods exist', async ({ page }) => {
    const cells = page.locator('.carousel-cell');
    await expect(cells).toHaveCount(4);
  });

  test('T1-11: Lab - Central Reactor exists', async ({ page }) => {
    const reactor = page.locator('.central-reactor');
    await expect(reactor).toBeVisible();
  });

  test('T1-12: Lab - Lab Floor exists', async ({ page }) => {
    const floor = page.locator('.lab-floor');
    await expect(floor).toBeVisible();
  });

  test('T1-13: Lab - Base Sockets exist', async ({ page }) => {
    const sockets = page.locator('.base-socket');
    await expect(sockets).toHaveCount(4);
  });

  test('T1-14: Controls - Prev Button is present', async ({ page }) => {
    const btn = page.locator('#btn-prev');
    await expect(btn).toBeVisible();
  });

  test('T1-15: Controls - Next Button is present', async ({ page }) => {
    const btn = page.locator('#btn-next');
    await expect(btn).toBeVisible();
  });

  test('T1-16: Controls - Active Label exists', async ({ page }) => {
    const label = page.locator('.active-label');
    await expect(label).toBeVisible();
  });

  test('T1-17: Indicators - Container exists', async ({ page }) => {
    const container = page.locator('.dot-indicators');
    await expect(container).toBeVisible();
  });

  test('T1-18: Indicators - 4 Dot Buttons exist', async ({ page }) => {
    const dots = page.locator('.dot');
    await expect(dots).toHaveCount(4);
  });

  test('T1-19: Indicators - Active Dot has active class', async ({ page }) => {
    const activeDot = page.locator('.dot').nth(0);
    await expect(activeDot).toHaveClass(/dot-active/);
  });

  test('T1-20: Cards - Product Grid exists', async ({ page }) => {
    const grid = page.locator('.product-grid');
    await expect(grid).toBeVisible();
  });

  test('T1-21: Cards - Shramico Card exists', async ({ page }) => {
    const card = page.locator('.product-card').first();
    await expect(card).toBeVisible();
  });

  test('T1-22: Cards - Shramico Logo has correct source', async ({ page }) => {
    const logo = page.locator('.product-card img.pc-logo');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', 'https://shramico.com/Shramico_logo.jpeg');
  });

  test('T1-23: Cards - Shramico Title is correct', async ({ page }) => {
    const title = page.locator('.product-card .pc-title');
    await expect(title).toContainText('Shramico');
  });

  test('T1-24: Cards - Shramico Badge is correct', async ({ page }) => {
    const badge = page.locator('.product-card .badge-active');
    await expect(badge).toContainText('Flagship Platform');
  });

  test('T1-25: Scroll - Landing Page exists', async ({ page }) => {
    const container = page.locator('.landing-page');
    await expect(container).toBeVisible();
  });
});

test.describe('Tier 2: Boundary & Corner Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
    await page.clock.fastForward(13000);
  });

  test('T2-26: Navbar - Scrolled No Trigger (scrollY <= 50)', async ({ page }) => {
    const navbar = page.locator('.ws-navbar');
    await page.evaluate(() => window.scrollTo(0, 30));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 50)));
    await expect(navbar).not.toHaveClass(/nav-scrolled/);
  });

  test('T2-27: Navbar - Scrolled Triggered (scrollY > 50)', async ({ page }) => {
    const navbar = page.locator('.ws-navbar');
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 50)));
    await expect(navbar).toHaveClass(/nav-scrolled/);
  });

  test('T2-28: Navbar - Scrolled Reset (scrollY back to top)', async ({ page }) => {
    const navbar = page.locator('.ws-navbar');
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 50)));
    await expect(navbar).toHaveClass(/nav-scrolled/);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 50)));
    await expect(navbar).not.toHaveClass(/nav-scrolled/);
  });

  test('T2-29: Lab - Drag Left updates carousel rotation', async ({ page }) => {
    const lab = page.locator('.lab-environment');
    const box = await lab.boundingBox();
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 200, startY, { steps: 5 });
    await page.mouse.up();

    await expect(page.locator('.active-label')).toBeVisible();
  });

  test('T2-30: Lab - Drag Right updates carousel rotation', async ({ page }) => {
    const lab = page.locator('.lab-environment');
    const box = await lab.boundingBox();
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 200, startY, { steps: 5 });
    await page.mouse.up();

    await expect(page.locator('.active-label')).toBeVisible();
  });

  test('T2-31: Lab - Snap Back (low velocity dragging does not rotate)', async ({ page }) => {
    const labelBefore = await page.locator('.active-label').textContent();
    const lab = page.locator('.lab-environment');
    const box = await lab.boundingBox();
    
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 - 5, box.y + box.height / 2, { steps: 2 });
    await page.mouse.up();

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    const labelAfter = await page.locator('.active-label').textContent();
    expect(labelAfter).toBe(labelBefore);
  });

  test('T2-32: Lab - Drag Snap Next/Prev (high velocity transitions index)', async ({ page }) => {
    const lab = page.locator('.lab-environment');
    const box = await lab.boundingBox();
    
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 - 300, box.y + box.height / 2, { steps: 10 });
    await page.mouse.up();

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
    const labelAfter = await page.locator('.active-label').textContent();
    expect(labelAfter).not.toBe('Shramico');
  });

  test('T2-33: Controls - Next Transition snaps carousel from index 0 to 1', async ({ page }) => {
    await page.locator('#btn-next').click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    await expect(page.locator('.active-label')).toHaveText('Project Nova');
  });

  test('T2-34: Controls - Prev Transition from index 0 wraps to 3', async ({ page }) => {
    await page.locator('#btn-prev').click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    await expect(page.locator('.active-label')).toHaveText('Project Titan');
  });

  test('T2-35: Controls - Click Active Dot does not change index', async ({ page }) => {
    await page.locator('.dot').first().click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    await expect(page.locator('.active-label')).toHaveText('Shramico');
  });

  test('T2-36: Controls - Jump to Dot index 2 snaps carousel to index 2', async ({ page }) => {
    await page.locator('.dot').nth(2).click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    await expect(page.locator('.active-label')).toHaveText('Project Aegis');
  });

  test('T2-37: Controls - Next Click Spay (rapid clicking snaps correctly)', async ({ page }) => {
    await page.locator('#btn-next').click();
    await page.locator('#btn-next').click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
    await expect(page.locator('.active-label')).toHaveText('Project Aegis');
  });

  test('T2-38: Assembly - Phase 0 Hidden controls/dots', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(7500); // 7000ms intro + 500ms phase 0
    await expect(page.locator('.controls')).not.toBeAttached();
    await expect(page.locator('.dot-indicators')).not.toBeAttached();
  });

  test('T2-39: Assembly - Phase 1 Hidden controls/dots', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(8500); // 7000ms intro + 1500ms phase 1
    await expect(page.locator('.controls')).not.toBeAttached();
  });

  test('T2-40: Assembly - Phase 2 Hidden controls/dots', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(10000); // 7000ms intro + 3000ms phase 2
    await expect(page.locator('.controls')).not.toBeAttached();
  });

  test('T2-41: Assembly - Phase 3 Hidden controls/dots', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(11000); // 7000ms intro + 4000ms phase 3
    await expect(page.locator('.controls')).not.toBeAttached();
  });

  test('T2-42: Assembly - Phase 4 Visible controls/dots', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(13000); // 7000ms intro + 6000ms phase 4
    await expect(page.locator('.controls')).toBeVisible();
    await expect(page.locator('.dot-indicators')).toBeVisible();
  });

  test('T2-43: Test Tube - Liquid Height matches product definition (Shramico has 85% height)', async ({ page }) => {
    const activeLiquid = page.locator('.pod-wrapper--active .pod-liquid');
    await expect(activeLiquid).toBeVisible();
    const styleAttr = await activeLiquid.getAttribute('style');
    expect(styleAttr).toContain('height: 85%');
  });

  test('T2-44: Test Tube - Specimen Hidden until phase 4', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(11000); // phase 3
    const entity = page.locator('.carousel-cell .floating-entity').first();
    await expect(entity).toHaveClass(/entity-hidden/);
  });

  test('T2-45: Test Tube - Glass tube has glass-hidden class during phase 0', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(7500); // Phase 0
    const glass = page.locator('.carousel-cell .pod-glass').first();
    await expect(glass).toHaveClass(/glass-hidden/);
  });

  test('T2-46: Test Tube - Glass tube has glass-risen class from phase 1 onwards', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(8500); // Phase 1
    const glass = page.locator('.carousel-cell .pod-glass').first();
    await expect(glass).toHaveClass(/glass-risen/);
  });

  test('T2-47: Scroll - Fade Out of View elements have opacity 0', async ({ page }) => {
    const elem = page.locator('.landing-page .lp-heading').first();
    const opacity = await elem.evaluate(el => window.getComputedStyle(el).opacity);
    expect(opacity).toBe('0');
  });

  test('T2-48: Scroll - Fade In View gains visible class', async ({ page }) => {
    const elem = page.locator('.landing-page .lp-heading').first();
    await elem.scrollIntoViewIfNeeded();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 150)));
    await expect(elem).toHaveClass(/visible/);
  });

  test('T2-49: Scroll - Fade Retained after exiting viewport', async ({ page }) => {
    const elem = page.locator('.landing-page .lp-heading').first();
    await elem.scrollIntoViewIfNeeded();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 150)));
    await expect(elem).toHaveClass(/visible/);

    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 150)));
    await expect(elem).toHaveClass(/visible/);
  });

  test('T2-50: Responsive - Mobile viewport adapts without error', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 100)));
    await expect(page.locator('.lab-environment')).toBeVisible();
  });
});

test.describe('Tier 3: Cross-Feature Combinations', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
    await page.clock.fastForward(13000);
  });

  test('T3-51: Navbar Scrolled vs Background Contrast', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    // Perform standard accessibility audit on navbar
    const results = await new AxeBuilder({ page })
      .include('.ws-navbar')
      .analyze();
    
    // Note: contrast rule might fail since CSS light theme has not been completed.
    // We assert violations length to be 0.
    expect(results.violations).toEqual([]);
  });

  test('T3-52: Active Label & Dot Sync', async ({ page }) => {
    await page.locator('#btn-next').click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 300)));
    await expect(page.locator('.active-label')).toHaveText('Project Nova');
    await expect(page.locator('.dot').nth(1)).toHaveClass(/dot-active/);
  });

  test('T3-53: Carousel Interactivity & Scroll Offset behavior', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 20));
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 50)));
    
    await page.locator('#btn-next').click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 300)));
    await expect(page.locator('.active-label')).toHaveText('Project Nova');
  });

  test('T3-54: Intro Cinematic Bypass loads application instantly', async ({ page }) => {
    await expect(page.locator('.controls')).toBeVisible();
    await expect(page.locator('.ws-navbar')).toBeVisible();
    await expect(page.locator('.landing-page')).toBeVisible();
  });

  test('T3-55: Navbar Navigation Scroll', async ({ page }) => {
    const navLink = page.locator('.nav-links a').first();
    await navLink.click();
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

test.describe('Tier 4: Real-World Application Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
    await page.clock.fastForward(13000);
  });

  test('T4-56: WCAG Contrast Check - Page Background & Text', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include('body')
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('T4-57: WCAG Contrast Check - Shramico Logo', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include('.shramico-logo')
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('T4-58: WCAG Contrast Check - Dot Indicators & Controls', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include('.controls')
      .include('.dot-indicators')
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('T4-59: Cinematic Timeline sequence timing', async ({ page }) => {
    await page.clock.setFixedTime(0);
    await page.goto('/');
    await page.clock.fastForward(6900);
    await expect(page.locator('.ws-navbar')).not.toBeAttached();
    
    await page.clock.fastForward(200); // 7100ms
    await expect(page.locator('.ws-navbar')).toBeVisible();
  });

  test('T4-60: Performance Idle Check (Static carousel maintains stable transform)', async ({ page }) => {
    const initialTransform = await page.locator('.carousel').evaluate(el => el.style.transform);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    const finalTransform = await page.locator('.carousel').evaluate(el => el.style.transform);
    expect(finalTransform).toBe(initialTransform);
  });
});
