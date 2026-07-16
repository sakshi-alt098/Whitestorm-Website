# E2E Test Suite Investigation and Analysis

This document provides a comprehensive analysis of the WhiteStormm website codebase, focusing on feature inventory, styling layout, expected DOM structure, and a recommended testing strategy for a robust, opaque-box E2E test suite (Tiers 1-4) as per the guidelines in `C:\Users\Lenovo\Desktop\whitestormm\.agents\sub_orch_e2e\SCOPE.md`.

---

## 1. Core User-Facing Features (N = 5)

We have identified exactly five (N = 5) core user-facing features in the current codebase layout:

### Feature 1: Top Navigation Bar (`Navbar.jsx` / `Navbar.css`)
*   **Description**: A fixed top navigation bar displaying the brand logo, navigation links, and a call-to-action button.
*   **Behavior**: Appends the class `nav-scrolled` when the viewport scroll position exceeds 50px (`window.scrollY > 50`), altering the background transparency and backdrop filter to blend with the scrolling content.
*   **Key Selectors**: `.ws-navbar`, `.nav-logo`, `.nav-links`, `.btn-nav`.

### Feature 2: 3D Lab Environment / Hero Section (`LabEnvironment.jsx` / `index.css`)
*   **Description**: A 3D physical carousel exhibiting four incubation pods (test tubes) containing project specimen holograms, centered around a DNA reactor (`CentralReactor`).
*   **Behavior**: 
    *   **Assembly Sequence**: Runs a cinematic assembly sequence on load. Starts at Phase 0 (empty platform), Phase 1 (glass rises), Phase 2 (caps lock), Phase 3 (liquid fills), Phase 4 (specimens appear, UI controls render).
    *   **Physics Loop**: Uses a high-performance 60FPS `requestAnimationFrame` loop with a critically damped spring for smooth inertial rotations and drag-snapping.
*   **Key Selectors**: `.lab-environment`, `.scene`, `.carousel`, `.carousel-cell`, `.central-reactor`, `.carousel-base`, `.base-socket`.

### Feature 3: Carousel Controls & Indicators (`LabEnvironment.jsx` / `index.css`)
*   **Description**: UI overlays that allow users to select different products within the 3D Lab Environment.
*   **Behavior**: Only rendered when the assembly sequence finishes (`assemblyPhase >= 4`). Prev and Next buttons rotate the carousel. Dot indicators jump to specific pods. The active label displays the currently selected product name with matching ambient colors.
*   **Key Selectors**: `.controls`, `#btn-prev`, `#btn-next`, `.active-label`, `.dot-indicators`, `.dot`, `.dot-active`.

### Feature 4: Product Showcase Cards (`LandingPage.jsx` / `LandingPage.css`)
*   **Description**: Content cards detailing the products, with a focus on the flagship platform, Shramico.
*   **Behavior**: Holds high-resolution logo images, badges (e.g., "Flagship Platform"), description paragraphs, technology stack tags, and action buttons. Must remain highly legible with proper contrast in the light theme.
*   **Key Selectors**: `.product-grid`, `.product-card`, `img.pc-logo`, `.pc-title`, `.badge-active`, `.btn-primary`.

### Feature 5: Scroll Triggers & Landing Page Layout (`LandingPage.jsx` / `LandingPage.css`)
*   **Description**: A multi-section landing page that fades elements in dynamically as the user scrolls.
*   **Behavior**: Uses an `IntersectionObserver` to detect when elements with the `.scroll-fade` class enter the viewport, adding the `.visible` class to initiate CSS-based transitions.
*   **Key Selectors**: `.landing-page`, `.lp-section`, `.scroll-fade`, `.scroll-fade.visible`.

---

## 2. Styling Layout

The styling is structured to separate global variables and layout constraints from component-specific styles:

### A. Global Styles & Theme Variables (`src/index.css`)
*   **Variables**: Declared in `:root`. In the dark theme state, it defines variables like `--bg-color: #02040a` and `--text-color: #e2e8f0`. In the redesigned light theme, these variables must map to bright colors (e.g., `--bg-color: #f8fafc` and `--text-color: #0f172a`).
*   **Theme Integration**: Global components reference `var(--bg-color)` and `var(--text-color)`.
*   **3D Scene Assets**: `.lab-environment` defines background-color `#f3f4f6` and radial gradients, but is designed to transition to utilizing `light-lab-bg.png` or equivalent light theme backgrounds. Sockets, metal bands (`--metal-*`), and incubation caps use metallic gradient definitions designed to render clearly in light configurations.

### B. Component-Specific Styles
*   `Navbar.css`: Controls the glassmorphism of `.ws-navbar` and transition attributes for `.nav-scrolled`.
*   `LandingPage.css`: Manages layout grids, cards (`.glass-panel`, `.product-card`), buttons (`.btn-primary`, `.btn-secondary`), and scroll-fade keyframes.
*   `CentralReactor.css`: Custom animations and 3D pane structures for the DNA core.
*   `TerminalIntro.css`: Styling for the initial cinematic black overlay text fade phases.

---

## 3. Expected DOM Structure & UI Elements

E2E tests should assert the presence, visibility, classes, attributes, and styles of the following key UI elements:

| UI Element | Expected Selector / Location | Expected DOM Structure / Attributes / Classes | E2E Testing Target |
| :--- | :--- | :--- | :--- |
| **Shramico Logo (Hero)** | `.carousel-cell` (active) -> `.shramico-logo` | `<img src="https://shramico.com/Shramico_logo.jpeg" alt="Shramico Logo" class="shramico-logo" />` | Check visibility after 7s; verify contrast ratio against light tube liquid background. |
| **Shramico Logo (Card)** | `.product-card` -> `.pc-logo` | `<img src="https://shramico.com/Shramico_logo.jpeg" alt="Shramico Logo" class="pc-logo" />` | Check existence; verify contrast ratio against white/frosted card body. |
| **Dot Indicators** | `.dot-indicators` (in `.lab-environment`) | `<div class="dot-indicators"><button class="dot dot-active" style="--dot-color: ..."></button>...</div>` | Verify there are 4 buttons; check that exactly one has `.dot-active`. |
| **Controls Overlay** | `.controls` (in `.lab-environment`) | `<div class="controls"><button id="btn-prev">...</button><div class="active-label">...</div><button id="btn-next">...</button></div>` | Confirm prev/next buttons exist; confirm `.active-label` text matches active product. |
| **Lab Environment** | `.lab-environment` | `<div class="lab-environment" style="touch-action: pan-y">...</div>` | Check container properties; verify CSS variables, background styling, or background-image. |
| **Scroll Landing Page** | `.landing-page` | `<div class="landing-page"><section class="lp-section">...</section>...</div>` | Ensure sections are present; verify `.scroll-fade` classes apply `.visible` on scroll. |

---

## 4. Recommended Testing Strategy (Tiers 1-4)

To satisfy the requirement of creating an opaque-box E2E test suite that runs in Node, we recommend **Playwright** as the primary automation framework. 

### Why Playwright?
1.  **True Opaque-Box**: Runs on the built production bundle (`dist/` folder served via `vite preview`) rather than mocking React internals.
2.  **Visual and Layout Audits**: Unlike JSDOM, Playwright renders a headless browser (Chromium) and can compute actual layout rectangles, bounding boxes, scroll positions, and CSS variable evaluation.
3.  **Fast-Forward Clock**: Playwright's Clock API allows tests to fast-forward the 7-second intro sequence (`page.clock.fastForward(7000)`) to execute tests quickly and reliably without delays.
4.  **Axe Accessibility**: Integration with `@axe-core/playwright` enables automated contrast ratio checks (`WCAG 2.1 AA`) for elements like the Shramico logo, dot indicators, and buttons.

### Test Catalog Plan (60 Test Cases)

With N = 5 features, we design a suite of exactly **60 test cases** to ensure comprehensive coverage:

#### Tier 1: Feature Coverage (25 tests)
1.  Navbar: Brand logo `.nav-logo` exists and contains text "WHITESTORMM".
2.  Navbar: "Products" link exists.
3.  Navbar: "Philosophy" link exists.
4.  Navbar: "Company" link exists.
5.  Navbar: "Careers" link exists.
6.  Navbar: "Contact Us" action button exists.
7.  Lab: `.lab-environment` container is present in the DOM.
8.  Lab: `.scene` element exists and has CSS perspective.
9.  Lab: `.carousel` element exists.
10. Lab: 4 `.carousel-cell` elements exist.
11. Lab: `.central-reactor` exists.
12. Lab: `.lab-floor` exists.
13. Lab: Sockets (`.base-socket`) exist for each carousel product.
14. Controls: `#btn-prev` button is present.
15. Controls: `#btn-next` button is present.
16. Controls: `.active-label` exists and contains the initial product name "Shramico".
17. Indicators: `.dot-indicators` container exists.
18. Indicators: 4 `.dot` buttons are rendered.
19. Indicators: Active dot has `.dot-active` class.
20. Cards: Shramico product card exists inside `.product-grid`.
21. Cards: Shramico card has logo `img.pc-logo` with source `https://shramico.com/Shramico_logo.jpeg`.
22. Cards: Shramico card has title `h3.pc-title` containing "Shramico".
23. Cards: Shramico card has badge `span.badge-active` with "Flagship Platform".
24. Scroll: `.landing-page` container is present in the DOM.
25. Scroll: Multiple `.scroll-fade` elements exist in the landing page layout.

#### Tier 2: Boundary & Corner Cases (25 tests)
1.  Navbar: Scrolled class `nav-scrolled` is NOT applied when scrolled <= 50px.
2.  Navbar: Scrolled class `nav-scrolled` is applied when scrolled > 50px.
3.  Navbar: Scrolled class `nav-scrolled` is removed when scrolled back down.
4.  Lab Carousel: Dragging to the left updates rotation angle.
5.  Lab Carousel: Dragging to the right updates rotation angle.
6.  Lab Carousel: Dragging with low velocity snaps back to current index.
7.  Lab Carousel: Dragging with high velocity transitions to next/prev index.
8.  Controls: Clicking `#btn-next` transitions carousel from index 0 to 1.
9.  Controls: Clicking `#btn-prev` from index 0 wraps around to index 3.
10. Controls: Clicking active dot does not trigger carousel rotation.
11. Controls: Clicking dot index 2 snaps carousel to index 2.
12. Controls: Rapidly clicking `#btn-next` updates snap target reliably.
13. Assembly: Controls/dots are hidden during phase 0.
14. Assembly: Controls/dots are hidden during phase 1.
15. Assembly: Controls/dots are hidden during phase 2.
16. Assembly: Controls/dots are hidden during phase 3.
17. Assembly: Controls/dots are visible during phase 4.
18. Test Tube: Liquid fill level matches product definition (Shramico has 85% height).
19. Test Tube: Floating entity is hidden until assembly phase 4.
20. Test Tube: Glass tube has `glass-hidden` class during phase 0.
21. Test Tube: Glass tube has `glass-risen` class from phase 1 onwards.
22. Scroll: `.scroll-fade` elements are hidden (opacity 0) when out of viewport.
23. Scroll: `.scroll-fade` elements gain `.visible` class when scrolled into view.
24. Scroll: `.scroll-fade` elements retain `.visible` class after exiting viewport.
25. Responsive: Resizing viewport to mobile sizes adapts carousel sizing without layout overlap.

#### Tier 3: Cross-Feature Combinations (5 tests)
1.  Navbar Scrolled vs Background Contrast: Scrolled navbar meets contrast requirements on top of landing page sections.
2.  Active Label Sync: Clicking `#btn-next` syncs both `.active-label` text AND the `.dot-active` element state.
3.  Carousel Interactivity & Scroll Offset: Rotating the carousel while scrolled partially down behaves correctly without layout shifts.
4.  Intro Cinematic Bypass: Mocking/triggering skip loads the application instantly into phase 4.
5.  Navbar Navigation Scroll: Clicking navbar link "Products" scrolls page smoothly to the innovations section.

#### Tier 4: Real-World Application Scenarios (5 tests)
1.  WCAG Contrast Check - Page Background & Text: Verify body text vs background color meets WCAG AA contrast ratio (> 4.5:1).
2.  WCAG Contrast Check - Shramico Logo: Verify contrast of Shramico logo (with white border/container) against light theme background.
3.  WCAG Contrast Check - Dot Indicators & Controls: Verify that dot indicators (with colored shadows) and prev/next buttons (with frosted styling) have sufficient contrast on light theme background.
4.  Cinematic Timeline: Verify the sequence timing (phase 0 to 4) finishes, sets `introFinished` to true, and renders `Navbar` and `LandingPage` after exactly 7 seconds.
5.  Performance Idle Check: Ensure 60FPS loop does not cause layout thrashing when carousel is static.

---

## 5. Node-Based Execution Framework

To execute these tests, we suggest adding Playwright directly to `package.json` devDependencies.

### package.json configuration:
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.0",
    "@axe-core/playwright": "^4.10.0"
  }
}
```

### Proposed Playwright Config (`playwright.config.js`):
```javascript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

---
*End of Analysis Report.*
