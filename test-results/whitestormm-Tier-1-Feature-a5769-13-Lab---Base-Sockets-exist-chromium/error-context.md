# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: whitestormm.spec.js >> Tier 1: Feature Coverage >> T1-13: Lab - Base Sockets exist
- Location: tests\whitestormm.spec.js:88:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - img
  - main "Product carousel" [ref=e4]:
    - generic [ref=e5]:
      - generic:
        - generic:
          - img
          - generic:
            - generic: "01"
          - generic:
            - generic: "02"
          - generic:
            - generic: "03"
          - generic:
            - generic: "04"
      - generic [ref=e27]:
        - generic:
          - generic:
            - img "Shramico Logo"
            - generic:
              - generic: Shramico
              - generic: Flagship Platform
      - generic [ref=e49]:
        - generic:
          - generic:
            - generic:
              - generic: Project Nova
              - generic: In Development
      - generic [ref=e71]:
        - generic:
          - generic:
            - generic:
              - generic: Project Aegis
              - generic: Conceptual Phase
      - generic [ref=e93]:
        - generic:
          - generic:
            - generic:
              - generic: Project Titan
              - generic: Researching
  - navigation [ref=e109]:
    - generic [ref=e110]:
      - generic [ref=e111]: WHITESTORMM
      - generic [ref=e112]:
        - link "Products" [ref=e113] [cursor=pointer]:
          - /url: "#innovations"
        - link "Philosophy" [ref=e114] [cursor=pointer]:
          - /url: "#"
        - link "Company" [ref=e115] [cursor=pointer]:
          - /url: "#"
        - link "Careers" [ref=e116] [cursor=pointer]:
          - /url: "#"
      - button "Contact Us" [ref=e118] [cursor=pointer]
  - generic [ref=e119]:
    - generic [ref=e121]:
      - heading "Our Innovations" [level=2] [ref=e122]
      - generic [ref=e127]:
        - generic [ref=e128]:
          - generic [ref=e129]:
            - img "Shramico Logo" [ref=e130]
            - heading "Shramico" [level=3] [ref=e131]
          - generic [ref=e132]: Flagship Platform
        - paragraph [ref=e133]: Advanced architectural platform designed to unify enterprise systems through intelligent automation and scalable microservices.
        - generic [ref=e134]:
          - generic [ref=e135]: React
          - generic [ref=e136]: Node.js
          - generic [ref=e137]: AWS
          - generic [ref=e138]: AI
        - button "Explore Shramico" [ref=e139] [cursor=pointer]
    - generic [ref=e143]:
      - heading "Who We Are" [level=2] [ref=e144]
      - paragraph [ref=e145]: WhiteStormm is a vanguard technology collective. We engineer premium software platforms that bridge the gap between human intuition and machine intelligence.
      - paragraph [ref=e146]: Our vision is a future where digital infrastructure is invisible, effortless, and infinitely scalable. We build not just to solve today's problems, but to define tomorrow's standards.
    - generic [ref=e150]:
      - heading "Innovation Philosophy" [level=2] [ref=e151]
      - generic [ref=e152]:
        - generic [ref=e153]:
          - heading "Idea" [level=4] [ref=e155]
          - paragraph [ref=e156]: Conceptualizing the impossible.
        - generic [ref=e157]:
          - heading "Research" [level=4] [ref=e159]
          - paragraph [ref=e160]: Rigorous validation.
        - generic [ref=e161]:
          - heading "Engineering" [level=4] [ref=e163]
          - paragraph [ref=e164]: Precision execution.
        - generic [ref=e165]:
          - heading "Testing" [level=4] [ref=e167]
          - paragraph [ref=e168]: Relentless refinement.
        - generic [ref=e169]:
          - heading "Launch" [level=4] [ref=e171]
          - paragraph [ref=e172]: Deploying excellence.
    - generic [ref=e174]:
      - heading "Technology Stack" [level=2] [ref=e175]
      - generic [ref=e176]:
        - generic [ref=e177]: React
        - generic [ref=e178]: Next.js
        - generic [ref=e179]: Node.js
        - generic [ref=e180]: TypeScript
        - generic [ref=e181]: Flutter
        - generic [ref=e182]: Python
        - generic [ref=e183]: AI / ML
        - generic [ref=e184]: Cloud Infrastructure
        - generic [ref=e185]: PostgreSQL
        - generic [ref=e186]: Docker
        - generic [ref=e187]: Kubernetes
        - generic [ref=e188]: AWS
    - generic [ref=e192]:
      - generic [ref=e193]: Featured Spotlight
      - heading "Shramico Ecosystem" [level=2] [ref=e194]
      - list [ref=e195]:
        - listitem [ref=e196]:
          - generic [ref=e197]: ✓
          - text: Real-time synchronization architecture
        - listitem [ref=e198]:
          - generic [ref=e199]: ✓
          - text: Zero-latency edge computing
        - listitem [ref=e200]:
          - generic [ref=e201]: ✓
          - text: Bank-grade encryption protocols
        - listitem [ref=e202]:
          - generic [ref=e203]: ✓
          - text: Intuitive human-machine interfaces
      - button "Visit Shramico" [ref=e204] [cursor=pointer]
    - generic [ref=e215]:
      - heading "Future Horizons" [level=2] [ref=e216]
      - generic [ref=e217]:
        - generic [ref=e218]:
          - generic [ref=e219]: Coming Soon
          - heading "AI Platform" [level=4] [ref=e220]
          - paragraph [ref=e221]: Next-generation cognitive engines.
        - generic [ref=e222]:
          - generic [ref=e223]: Coming Soon
          - heading "Enterprise Tools" [level=4] [ref=e224]
          - paragraph [ref=e225]: Streamlined corporate operations.
        - generic [ref=e226]:
          - generic [ref=e227]: Coming Soon
          - heading "Healthcare Solutions" [level=4] [ref=e228]
          - paragraph [ref=e229]: Precision biotech analytics.
        - generic [ref=e230]:
          - generic [ref=e231]: Coming Soon
          - heading "Automation Suite" [level=4] [ref=e232]
          - paragraph [ref=e233]: Robotic process automation.
    - generic [ref=e235]:
      - heading "Why WhiteStormm" [level=2] [ref=e236]
      - generic [ref=e237]:
        - generic [ref=e238]:
          - generic [ref=e239]: ⚡
          - heading "Premium Engineering" [level=4] [ref=e240]
        - generic [ref=e241]:
          - generic [ref=e242]: 🚀
          - heading "Performance First" [level=4] [ref=e243]
        - generic [ref=e244]:
          - generic [ref=e245]: 👁
          - heading "Human-Centered" [level=4] [ref=e246]
        - generic [ref=e247]:
          - generic [ref=e248]: 🏗
          - heading "Scalable Architecture" [level=4] [ref=e249]
        - generic [ref=e250]:
          - generic [ref=e251]: 🔒
          - heading "Zero-Trust Security" [level=4] [ref=e252]
        - generic [ref=e253]:
          - generic [ref=e254]: 💡
          - heading "Relentless Innovation" [level=4] [ref=e255]
    - generic [ref=e258]:
      - generic [ref=e259]:
        - generic [ref=e260]: 42+
        - generic [ref=e261]: Projects Deployed
      - generic [ref=e262]:
        - generic [ref=e263]: "15"
        - generic [ref=e264]: Enterprise Clients
      - generic [ref=e265]:
        - generic [ref=e266]: "8"
        - generic [ref=e267]: Countries
      - generic [ref=e268]:
        - generic [ref=e269]: 99.9%
        - generic [ref=e270]: Uptime
    - generic [ref=e272]:
      - heading "Partner Testimonials" [level=2] [ref=e273]
      - generic [ref=e274]:
        - generic [ref=e275]:
          - paragraph [ref=e276]: "\"WhiteStormm didn't just build our platform; they redefined our entire digital strategy. The engineering quality is indistinguishable from magic.\""
          - generic [ref=e277]: — Sarah Jenkins, CEO at Nexus
        - generic [ref=e278]:
          - paragraph [ref=e279]: "\"The level of polish, performance, and attention to detail is unparalleled. They operate at the bleeding edge of modern web architecture.\""
          - generic [ref=e280]: — Marcus Thorne, CTO at Aether
    - generic [ref=e282]:
      - heading "Latest Insights" [level=2] [ref=e283]
      - generic [ref=e284]:
        - generic [ref=e285]:
          - generic [ref=e286]: Engineering
          - heading "The Future of Edge Computing in 2027" [level=4] [ref=e287]
          - generic [ref=e288] [cursor=pointer]:
            - text: Read Article
            - generic [ref=e289]: →
        - generic [ref=e290]:
          - generic [ref=e291]: AI
          - heading "Integrating Cognitive Models into UI" [level=4] [ref=e292]
          - generic [ref=e293] [cursor=pointer]:
            - text: Read Article
            - generic [ref=e294]: →
        - generic [ref=e295]:
          - generic [ref=e296]: Product Design
          - heading "Why Micro-Interactions Matter" [level=4] [ref=e297]
          - generic [ref=e298] [cursor=pointer]:
            - text: Read Article
            - generic [ref=e299]: →
    - generic [ref=e301]:
      - heading "Frequently Asked Questions" [level=2] [ref=e302]
      - generic [ref=e303]:
        - generic [ref=e304]:
          - heading "What is WhiteStormm?" [level=4] [ref=e305]
          - paragraph [ref=e306]: An advanced technology collective building premium digital ecosystems.
        - generic [ref=e307]:
          - heading "What products do you build?" [level=4] [ref=e308]
          - paragraph [ref=e309]: Enterprise software, AI platforms, and zero-latency data infrastructure.
        - generic [ref=e310]:
          - heading "What is Shramico?" [level=4] [ref=e311]
          - paragraph [ref=e312]: Our flagship architectural platform for enterprise microservices.
        - generic [ref=e313]:
          - heading "How can I collaborate?" [level=4] [ref=e314]
          - paragraph [ref=e315]: Reach out to our engineering directors via the contact form below.
        - generic [ref=e316]:
          - heading "Do you offer enterprise solutions?" [level=4] [ref=e317]
          - paragraph [ref=e318]: Yes. We build entirely bespoke infrastructure for billion-dollar enterprises.
    - generic [ref=e321]:
      - generic [ref=e322]:
        - heading "Careers" [level=2] [ref=e323]
        - paragraph [ref=e324]: We are always looking for exceptional talent to join our engineering and design teams.
        - list [ref=e325]:
          - listitem [ref=e326]:
            - text: Senior Frontend Architect
            - generic [ref=e327]: Remote
          - listitem [ref=e328]:
            - text: Machine Learning Engineer
            - generic [ref=e329]: London
          - listitem [ref=e330]:
            - text: Product Designer
            - generic [ref=e331]: Remote
        - button "View All Positions" [ref=e332] [cursor=pointer]
      - generic [ref=e333]:
        - heading "Contact Us" [level=2] [ref=e334]
        - paragraph [ref=e335]: Ready to build the future?
        - generic [ref=e336]:
          - textbox "Email Address" [ref=e337]
          - textbox "How can we help?" [ref=e338]
          - button "Send Message" [ref=e339] [cursor=pointer]
        - generic [ref=e340]:
          - link "LinkedIn" [ref=e341] [cursor=pointer]:
            - /url: "#"
          - link "GitHub" [ref=e342] [cursor=pointer]:
            - /url: "#"
          - link "Twitter" [ref=e343] [cursor=pointer]:
            - /url: "#"
    - contentinfo [ref=e344]:
      - generic [ref=e345]:
        - generic [ref=e346]:
          - generic [ref=e347]:
            - heading "WhiteStormm" [level=3] [ref=e348]
            - paragraph [ref=e349]: Engineering the impossible.
          - generic [ref=e350]:
            - heading "Company" [level=4] [ref=e351]
            - link "About" [ref=e352] [cursor=pointer]:
              - /url: "#"
            - link "Careers" [ref=e353] [cursor=pointer]:
              - /url: "#"
            - link "Blog" [ref=e354] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e355]:
            - heading "Products" [level=4] [ref=e356]
            - link "Shramico" [ref=e357] [cursor=pointer]:
              - /url: "#"
            - link "Ecosystem" [ref=e358] [cursor=pointer]:
              - /url: "#"
          - generic [ref=e359]:
            - heading "Legal" [level=4] [ref=e360]
            - link "Privacy Policy" [ref=e361] [cursor=pointer]:
              - /url: "#"
            - link "Terms of Service" [ref=e362] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e363]: © 2026 WhiteStormm Technologies. All rights reserved.
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
> 13  |   test.beforeEach(async ({ page }) => {
      |        ^ Test timeout of 30000ms exceeded while running "beforeEach" hook.
  14  |     await page.clock.install();
  15  |     await page.goto('/');
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
```