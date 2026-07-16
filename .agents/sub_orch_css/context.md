# Context: Global CSS Conversion

## Target Files and Actions
1. `src/index.css`:
   - Replace variables in `:root` with light-metallic palette.
   - Update body background image to `/light-lab-bg.png` and radial overlay gradients to light-blue/violet.
   - Adjust `.pod-glass` inset shadows to be soft (`rgba(0,0,0,0.08)`).
   - Adjust `.pipe` background to silver chrome gradients and lighter shadows.
   - Adjust carousel base, slices, and sockets to brushed titanium.
   - Customize scrollbars for a clean light aesthetic.
2. `src/components/LandingPage.css`:
   - Convert text colors, headings, paragraphs, and cards from dark/white to high-contrast dark gray/black.
   - Adjust glass panels to a lighter translucent backing (`rgba(255, 255, 255, 0.7)`).
   - Flip primary/secondary buttons: primary gets black background, white text.
   - Change `.dashboard-mockup` background to white.
3. `src/components/Navbar.css`:
   - Scrolled background becomes `rgba(255, 255, 255, 0.8)` with blur and a light bottom border.
   - Text color becomes `#111827`, link colors `#4b5563`, hover colors `#111827`.
   - Nav CTA button gets transparent background, dark border, and flips color on hover.
4. `src/components/TerminalIntro.css`:
   - Overlay background becomes `#fafafa`, text color `#1d1d1f`.
5. `src/components/TestTube.jsx`:
   - Update `getDarkerColor` helper function to return rich mid-darks instead of near-blacks.

## Design Palette
- `--bg-color`: `#fafafa`
- `--text-color`: `#1d1d1f`
- `--metal-dark`: `#7a8290`
- `--metal-base`: `#a0aab5`
- `--metal-mid`: `#c8d1db`
- `--metal-light`: `#e3ebf5`
- `--metal-highlight`: `#f0f5fa`
- `--metal-shine`: `#ffffff`
