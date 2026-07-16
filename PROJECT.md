# Project: WhiteStormm Light Theme Redesign

## Architecture
WhiteStormm is a React-based single-page application with Vite as the build tool.
- **Styling**: Leverages global CSS variables defined in `:root` inside `src/index.css` for theme colors, layout dimensions, and core utility classes. Component-specific styles are defined in their respective `.css` files (e.g., `Navbar.css`, `LandingPage.css`, `CentralReactor.css`).
- **Data Flow**:
  - `App.jsx` mounts the main page components (`Navbar`, `IntroSequence`, `LabEnvironment`, `LandingPage`).
  - Scroll position triggers transitions between the 3D lab environment (hero section) and the landing page.
- **Shared Interfaces**: CSS Variables are the primary bridge for thematic variables (colors, shadows).

## Code Layout
- `src/index.css`: Global styles & variables.
- `src/components/LabEnvironment.jsx` & `index.css`: 3D Carousel container and physics.
- `src/components/LandingPage.jsx` & `LandingPage.css`: Content sections.
- `src/components/Navbar.jsx` & `Navbar.css`: Top navigation.
- `public/`: Assets such as `light-lab-bg.png`.

## Milestones
| # | Name | Scope | Dependencies | Status | Conversation ID |
|---|------|-------|-------------|--------|-----------------|
| M1 | E2E Test Suite Creation | Setup testing infra and write Tier 1-4 tests | None | IN_PROGRESS | e41daa69-d3b9-4eab-a8c8-a69134761515 |
| M2 | Global CSS Conversion | Convert CSS variables & backgrounds to light theme | M1 | IN_PROGRESS | c5872fb6-9c1d-4a59-b67d-915247885985 |
| M3 | Legibility & Contrast | Ensure logos, glass panels, indicators, and buttons are high-contrast | M2 | PLANNED | TBD |
| M4 | Page Harmonization | Blend hero and landing page seamlessly | M3 | PLANNED | TBD |
| M5 | Verification & Audit | Pass all E2E tests, challenger, and forensic audit checks | M4 | PLANNED | TBD |

## Interface Contracts
### Global CSS variables ↔ Component styles
- `--bg-color`: The primary light background color (e.g., `#f8fafc`).
- `--text-color`: The primary dark text color (e.g., `#0f172a`).
- `--metal-*`: Colors for the physical/metallic structures in 3D scene (adjusted for lighter aesthetics).
