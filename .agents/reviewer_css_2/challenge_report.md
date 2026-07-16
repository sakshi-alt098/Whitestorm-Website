## Challenge Summary

**Overall risk assessment**: LOW

## Challenges

### [Medium] Challenge 1: Case sensitivity of hex codes in `getDarkerColor`

- **Assumption challenged**: Inputs to `getDarkerColor` will always be exactly lowercase matches of predefined strings.
- **Attack scenario**: Adding a new product or changing existing product configs to use uppercase hexes (e.g., `#22C55E` instead of `#22c55e`) will bypass the lookup. The function will return the base color, causing the 3D test tube to render with no gradient (flat color).
- **Blast radius**: Liquid visual rendering in the test tube component.
- **Mitigation**: Normalize inputs by performing comparison on `hexColor.toLowerCase()`.

### [Low] Challenge 2: Scrolled Navbar contrast on complex backgrounds

- **Assumption challenged**: The scrolled navbar `rgba(255, 255, 255, 0.8)` background with `blur(20px)` provides sufficient separation.
- **Attack scenario**: Scrolling highly detailed or text-heavy content underneath the navbar can make `#4b5563` navigation links hard to read.
- **Blast radius**: Navigation readability.
- **Mitigation**: Standardize contrast checks under scroll conditions in Milestone 3, potentially adjusting opacity to `0.9` or increasing blur.

### [Low] Challenge 3: Dark-to-Light flash transition during cinematic intro

- **Assumption challenged**: Transitioning from the black walls/doors of the cinematic intro sequence to the bright light-mode laboratory is visually smooth.
- **Attack scenario**: The intro walls are `#000` while the lab environment is `#fafafa`/`#f3f4f6`. If the user has high display brightness, the quick transition from a dark door opening to a light lab might cause a "flashbang" effect or visual discomfort.
- **Blast radius**: Visual comfort / User Experience.
- **Mitigation**: Adjust the timing or introduce a brief white-out/fade transition to ease the visual transition.

## Stress Test Results

- Hex color casing variance (e.g., `#22C55E`) → Expected: correct darker color mapping → Actual: returns `#22C55E` (fallback, no change) → FAIL
- High scroll offset viewport collision → Expected: nav links remain legible → Predicted: minor contrast reduction → PASS (degrades gracefully)

## Unchallenged Areas

- Core 3D physics loops and drag velocity computations (out of styling scope, handled in Milestone 1).
