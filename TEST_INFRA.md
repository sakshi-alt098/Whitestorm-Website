# E2E Test Infrastructure - WhiteStormm Website

This document defines the E2E testing infrastructure, feature inventory, and the test case catalog for the WhiteStormm website.

## Feature Inventory (N = 5)

### Feature 1: Top Navigation Bar (`Navbar.jsx` / `Navbar.css`)
*   **Description**: Fixed top navigation bar containing the brand logo, navigation links, and a CTA button.
*   **Behavior**: Integrates glassmorphic styling and dynamically appends the `.nav-scrolled` class when scroll position exceeds 50px.
*   **Key Selectors**: `.ws-navbar`, `.nav-logo`, `.nav-links`, `.btn-nav`.

### Feature 2: 3D Lab Environment / Hero Section (`LabEnvironment.jsx` / `index.css`)
*   **Description**: A 3D interactive hero carousel showing 4 incubation pods (test tubes) containing project specimen holograms around a Central DNA Reactor.
*   **Behavior**: Orchestrates an assembly sequence from Phase 0 to Phase 4. Features a 60FPS inertial rotation & drag-snapping loop.
*   **Key Selectors**: `.lab-environment`, `.scene`, `.carousel`, `.carousel-cell`, `.central-reactor`, `.carousel-base`, `.base-socket`.

### Feature 3: Carousel Controls & Indicators (`LabEnvironment.jsx` / `index.css`)
*   **Description**: Interactive elements overlays to steer and snap the 3D carousel.
*   **Behavior**: Renders only in Phase 4. Includes Prev/Next navigation buttons, dot indicators, and an active label showing the currently selected product name.
*   **Key Selectors**: `.controls`, `#btn-prev`, `#btn-next`, `.active-label`, `.dot-indicators`, `.dot`, `.dot-active`.

### Feature 4: Product Showcase Cards (`LandingPage.jsx` / `LandingPage.css`)
*   **Description**: Clean content cards detailing various platforms, centered around the flagship Shramico.
*   **Behavior**: Contains brand logos, title badges, detailed text blocks, and technology tags. Has specific light theme accessibility and contrast requirements.
*   **Key Selectors**: `.product-grid`, `.product-card`, `img.pc-logo`, `.pc-title`, `.badge-active`, `.btn-primary`.

### Feature 5: Scroll Triggers & Landing Page Layout (`LandingPage.jsx` / `LandingPage.css`)
*   **Description**: Scroll-activated animations in the landing page sections.
*   **Behavior**: Utilizes an `IntersectionObserver` to trigger fade-in transitions (`.scroll-fade.visible`) when sections enter the viewport.
*   **Key Selectors**: `.landing-page`, `.lp-section`, `.scroll-fade`, `.scroll-fade.visible`.

---

## Test Case Catalog (60 Tests)

### Tier 1: Feature Coverage (25 Tests)
1.  **Navbar - Brand Logo**: `.nav-logo` exists and contains "WHITESTORMM".
2.  **Navbar - Products Link**: "Products" link exists in `.nav-links`.
3.  **Navbar - Philosophy Link**: "Philosophy" link exists in `.nav-links`.
4.  **Navbar - Company Link**: "Company" link exists in `.nav-links`.
5.  **Navbar - Careers Link**: "Careers" link exists in `.nav-links`.
6.  **Navbar - Contact CTA**: `.btn-nav` action button exists.
7.  **Lab - Container**: `.lab-environment` container is present in the DOM.
8.  **Lab - 3D Scene**: `.scene` element exists and has CSS 3D perspective setup.
9.  **Lab - Carousel Element**: `.carousel` element exists in the scene.
10. **Lab - Incubation Pods**: Exactly 4 `.carousel-cell` elements are present.
11. **Lab - Central Reactor**: `.central-reactor` exists.
12. **Lab - Lab Floor**: `.lab-floor` is rendered.
13. **Lab - Base Sockets**: Sockets (`.base-socket`) exist for each carousel product.
14. **Controls - Prev Button**: `#btn-prev` button is present.
15. **Controls - Next Button**: `#btn-next` button is present.
16. **Controls - Active Label**: `.active-label` exists and is initialized.
17. **Indicators - Container**: `.dot-indicators` container exists.
18. **Indicators - Dot Buttons**: Exactly 4 `.dot` buttons are rendered.
19. **Indicators - Active Dot**: Active dot initially has `.dot-active` class.
20. **Cards - Product Grid**: `.product-grid` is present in the LandingPage layout.
21. **Cards - Shramico Card**: Shramico product card exists inside the product grid.
22. **Cards - Shramico Logo**: Shramico card has logo `img.pc-logo` with source `https://shramico.com/Shramico_logo.jpeg`.
23. **Cards - Shramico Title**: Shramico card has title `.pc-title` containing "Shramico".
24. **Cards - Shramico Badge**: Shramico card has badge `.badge-active` with "Flagship Platform".
25. **Scroll - Landing Page**: `.landing-page` container is present in the DOM.

### Tier 2: Boundary & Corner Cases (25 Tests)
26. **Navbar - Scrolled No Trigger**: Scrolled class `nav-scrolled` is NOT applied when scrolled <= 50px.
27. **Navbar - Scrolled Triggered**: Scrolled class `nav-scrolled` is applied when scrolled > 50px.
28. **Navbar - Scrolled Reset**: Scrolled class `nav-scrolled` is removed when scrolled back to top.
29. **Lab - Drag Left**: Dragging to the left updates rotation angle.
30. **Lab - Drag Right**: Dragging to the right updates rotation angle.
31. **Lab - Snap Back**: Dragging with low velocity snaps back to original index.
32. **Lab - Drag Snap Next/Prev**: Dragging with high velocity transitions to next/prev index.
33. **Controls - Next Transition**: Clicking `#btn-next` transitions carousel from index 0 to 1.
34. **Controls - Prev Transition**: Clicking `#btn-prev` from index 0 wraps around to index 3.
35. **Controls - Click Active Dot**: Clicking the active dot does not trigger carousel rotation.
36. **Controls - Jump to Dot**: Clicking dot index 2 snaps carousel to index 2.
37. **Controls - Next Click Spay**: Rapidly clicking `#btn-next` updates snap target reliably.
38. **Assembly - Phase 0 Hidden**: Controls/dots are hidden during phase 0.
39. **Assembly - Phase 1 Hidden**: Controls/dots are hidden during phase 1.
40. **Assembly - Phase 2 Hidden**: Controls/dots are hidden during phase 2.
41. **Assembly - Phase 3 Hidden**: Controls/dots are hidden during phase 3.
42. **Assembly - Phase 4 Visible**: Controls/dots are visible during phase 4.
43. **Test Tube - Liquid Height**: Liquid fill level matches product definition (Shramico has 85% height).
44. **Test Tube - Specimen Hidden**: Floating entity is hidden until assembly phase 4.
45. **Test Tube - Glass Phase 0**: Glass tube has `glass-hidden` class during phase 0.
46. **Test Tube - Glass Phase 1+**: Glass tube has `glass-risen` class from phase 1 onwards.
47. **Scroll - Fade Out of View**: `.scroll-fade` elements are hidden (opacity 0) when out of viewport.
48. **Scroll - Fade In View**: `.scroll-fade` elements gain `.visible` class when scrolled into view.
49. **Scroll - Fade Retained**: `.scroll-fade` elements retain `.visible` class after exiting viewport.
50. **Responsive - Mobile Adapt**: Resizing viewport to mobile sizes adapts carousel sizing without layout overlap.

### Tier 3: Cross-Feature Combinations (5 Tests)
51. **Navbar Contrast on Scrolled**: Scrolled navbar meets contrast requirements on top of landing page sections.
52. **Active Label & Dot Sync**: Clicking `#btn-next` syncs both `.active-label` text AND the `.dot-active` element state.
53. **Carousel Interactivity & Scroll**: Rotating the carousel while scrolled partially down behaves correctly without layout shifts.
54. **Intro Cinematic Bypass**: Triggering/mocking skip loads the application instantly into phase 4.
55. **Navbar Navigation Scroll**: Clicking navbar link "Products" scrolls page smoothly to the innovations section.

### Tier 4: Real-World Application Scenarios (5 Tests)
56. **WCAG Contrast - Page Bg & Text**: Verify body text vs background color meets WCAG AA contrast ratio (> 4.5:1).
57. **WCAG Contrast - Shramico Logo**: Verify contrast of Shramico logo (with white border/container) against light theme background.
58. **WCAG Contrast - Indicators & Controls**: Verify that dot indicators and prev/next buttons have sufficient contrast on light theme background.
59. **Cinematic Timeline**: Verify the sequence timing (phase 0 to 4) finishes, sets `introFinished` to true, and renders `Navbar` and `LandingPage` after exactly 7 seconds.
60. **Performance Idle Check**: Ensure 60FPS loop does not cause layout thrashing when carousel is static.

---

## How to Run the Tests

To run the Playwright E2E test suite, use the following commands:

```bash
# Install dependencies (first time only)
npm install

# Run the E2E tests
npx playwright test
```
