# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: whitestormm.spec.js >> Tier 1: Feature Coverage >> T1-4: Navbar - Company link exists
- Location: tests\whitestormm.spec.js:38:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:4173/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | 
  4   | // Setup global helpers or base values
  5   | const PRODUCTS = [
  6   |   { name: 'Shramico', fillLevel: 85 },
  7   |   { name: 'Project Nova', fillLevel: 45 },
  8   |   { name: 'Project Aegis', fillLevel: 25 },
  9   |   { name: 'Project Titan', fillLevel: 10 },
  10  | ];
  11  | 
  12  | test.describe('Tier 1: Feature Coverage', () => {
  13  |   test.beforeEach(async ({ page }) => {
  14  |     await page.clock.install();
> 15  |     await page.goto('/');
      |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  16  |     // Bypass intro sequence (7000ms) + assembly sequence (5500ms)
  17  |     await page.clock.fastForward(13000);
  18  |   });
  19  | 
  20  |   test('T1-1: Navbar - Brand Logo exists and contains WHITESTORMM', async ({ page }) => {
  21  |     const logo = page.locator('.nav-logo');
  22  |     await expect(logo).toBeVisible();
  23  |     await expect(logo).toContainText('WHITESTORMM');
  24  |   });
  25  | 
  26  |   test('T1-2: Navbar - Products link exists', async ({ page }) => {
  27  |     const link = page.locator('.nav-links a').nth(0);
  28  |     await expect(link).toBeVisible();
  29  |     await expect(link).toContainText('Products');
  30  |   });
  31  | 
  32  |   test('T1-3: Navbar - Philosophy link exists', async ({ page }) => {
  33  |     const link = page.locator('.nav-links a').nth(1);
  34  |     await expect(link).toBeVisible();
  35  |     await expect(link).toContainText('Philosophy');
  36  |   });
  37  | 
  38  |   test('T1-4: Navbar - Company link exists', async ({ page }) => {
  39  |     const link = page.locator('.nav-links a').nth(2);
  40  |     await expect(link).toBeVisible();
  41  |     await expect(link).toContainText('Company');
  42  |   });
  43  | 
  44  |   test('T1-5: Navbar - Careers link exists', async ({ page }) => {
  45  |     const link = page.locator('.nav-links a').nth(3);
  46  |     await expect(link).toBeVisible();
  47  |     await expect(link).toContainText('Careers');
  48  |   });
  49  | 
  50  |   test('T1-6: Navbar - Contact CTA exists', async ({ page }) => {
  51  |     const btn = page.locator('.btn-nav');
  52  |     await expect(btn).toBeVisible();
  53  |     await expect(btn).toContainText('Contact Us');
  54  |   });
  55  | 
  56  |   test('T1-7: Lab - Container exists', async ({ page }) => {
  57  |     const container = page.locator('.lab-environment');
  58  |     await expect(container).toBeVisible();
  59  |   });
  60  | 
  61  |   test('T1-8: Lab - 3D Scene exists and has perspective', async ({ page }) => {
  62  |     const scene = page.locator('.scene');
  63  |     await expect(scene).toBeVisible();
  64  |     const perspective = await scene.evaluate(el => window.getComputedStyle(el).perspective);
  65  |     expect(perspective).not.toBeNull();
  66  |   });
  67  | 
  68  |   test('T1-9: Lab - Carousel element exists', async ({ page }) => {
  69  |     const carousel = page.locator('.carousel');
  70  |     await expect(carousel).toBeVisible();
  71  |   });
  72  | 
  73  |   test('T1-10: Lab - 4 Incubation Pods exist', async ({ page }) => {
  74  |     const cells = page.locator('.carousel-cell');
  75  |     await expect(cells).toHaveCount(4);
  76  |   });
  77  | 
  78  |   test('T1-11: Lab - Central Reactor exists', async ({ page }) => {
  79  |     const reactor = page.locator('.central-reactor');
  80  |     await expect(reactor).toBeVisible();
  81  |   });
  82  | 
  83  |   test('T1-12: Lab - Lab Floor exists', async ({ page }) => {
  84  |     const floor = page.locator('.lab-floor');
  85  |     await expect(floor).toBeVisible();
  86  |   });
  87  | 
  88  |   test('T1-13: Lab - Base Sockets exist', async ({ page }) => {
  89  |     const sockets = page.locator('.base-socket');
  90  |     await expect(sockets).toHaveCount(4);
  91  |   });
  92  | 
  93  |   test('T1-14: Controls - Prev Button is present', async ({ page }) => {
  94  |     const btn = page.locator('#btn-prev');
  95  |     await expect(btn).toBeVisible();
  96  |   });
  97  | 
  98  |   test('T1-15: Controls - Next Button is present', async ({ page }) => {
  99  |     const btn = page.locator('#btn-next');
  100 |     await expect(btn).toBeVisible();
  101 |   });
  102 | 
  103 |   test('T1-16: Controls - Active Label exists', async ({ page }) => {
  104 |     const label = page.locator('.active-label');
  105 |     await expect(label).toBeVisible();
  106 |   });
  107 | 
  108 |   test('T1-17: Indicators - Container exists', async ({ page }) => {
  109 |     const container = page.locator('.dot-indicators');
  110 |     await expect(container).toBeVisible();
  111 |   });
  112 | 
  113 |   test('T1-18: Indicators - 4 Dot Buttons exist', async ({ page }) => {
  114 |     const dots = page.locator('.dot');
  115 |     await expect(dots).toHaveCount(4);
```