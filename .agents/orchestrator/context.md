# Project Context: WhiteStormm

## Project Structure
- `index.html`: Main HTML entry point.
- `src/index.css`: Global styles containing CSS variables.
- `src/App.jsx` & `src/App.css`: Root component and app-wide styles.
- `src/components/`:
  - `LabEnvironment.jsx`: Hero/Lab container component.
  - `LandingPage.jsx` & `LandingPage.css`: Product landing page container.
  - `Navbar.jsx` & `Navbar.css`: Top navigation.
  - `BubbleCanvas.jsx`, `CentralReactor.jsx`, `LabDoor.jsx`, `TerminalIntro.jsx`, `TestTube.jsx`: Interactive subcomponents.
- `public/`: Assets directory containing `light-lab-bg.png`, `lab-bg.png`, etc.
- `src/assets/`: React/Vite default SVGs and alternative lab background images.

## Technology Stack
- React
- CSS / PostCSS
- Vite (bundler)

## Constraints & Requirements
- Opaque-box E2E testing must verify requirements.
- No code modification by the Orchestrator itself.
- High-contrast requirement for the Shramico logo.
- Smooth transition between LabEnvironment and LandingPage.
