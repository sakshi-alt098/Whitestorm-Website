# Original User Request

## Initial Request — 2026-07-16T04:57:32Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Design and implement a completely new, visually stunning light theme for the WhiteStormm project. The redesign must ensure proper contrast so that all logos (especially the Shramico logo) and UI elements remain highly visible and readable against the light backgrounds.

Working directory: `C:\Users\Lenovo\Desktop\whitestormm`
Integrity mode: development

## Requirements

### R1. Global Light Theme Conversion
Update the CSS variables, backgrounds, and global styles to implement a premium, bright light theme. The aesthetic should remain minimal and luxurious (e.g., Apple product reveal style) but shifted from dark mode to light mode.

### R2. High-Contrast Legibility
Ensure all text, logos, dot-indicators, and buttons maintain high contrast. Specifically, the Shramico logo and any frosted glass panels must stand out clearly against the bright background.

### R3. Harmonize Hero and Landing Page
Update both the `LabEnvironment` (hero section) and the `LandingPage` components so they blend seamlessly under the new light theme, without breaking the existing 3D physics or scroll animations.

## Acceptance Criteria

### CSS & Styling
- [ ] CSS variables for `--bg-color` and `--text-color` in `index.css` are updated to light and dark values, respectively.
- [ ] The `LabEnvironment` background utilizes the `light-lab-bg.png` (or equivalent light styling) instead of the dark background.

### UI Visibility
- [ ] The Shramico logo and text inside the `LandingPage` product cards pass standard WCAG contrast ratios (or visually do not disappear into the background).
- [ ] The `.dot-indicators` and `.controls` in the hero section are visible against the new light background.
