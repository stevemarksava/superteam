# SKILL: Presentations — PowerPoint, HTML Fullscreen & React Slides
> Marlo designs. Kevin writes the content. Eric builds the code-driven version.
> Choose the format before anyone starts — building the wrong thing is expensive.

## Steve's Default for Demos and Internal Presentations

**Fullscreen HTML presenter** — one slide per page, keyboard/clicker navigation, no scrollbars, no mouse required.

Rules Marlo enforces before Eric builds anything:
1. `width: 100vw; height: 100vh; overflow: hidden` on every slide container
2. One slide = one page. If the content doesn't fit, it's two slides.
3. **Keyboard:** Right arrow, Space, PageDown, Enter all advance. Left arrow, PageUp, Backspace go back. Home/End jump to first/last. These are the signals a Logitech presenter clicker sends — design for clicker-first.
4. **On-screen buttons:** Fixed prev/next arrow buttons (left/right center). Visible but subtle (opacity ~0.35, full on hover). Works for mouse and touch — no clicker required.
5. **Fullscreen:** F key toggles fullscreen. A small fullscreen button in the bottom-left corner (⛶ icon). On-screen hint on slide 1 only.
6. **Swipe:** touchstart/touchend listeners — 50px threshold. Deck works on tablets and phones.
7. URL hash per slide (`#slide-1`, `#slide-2`) so specific slides can be linked or shared.
8. Visible slide counter (`3 / 12`) bottom-right corner.
9. CSS custom properties for all brand colours and fonts — one variable file to skin the whole deck.
10. **Brand colours go in variables:** `--avanade: #E85D0C` / `--avanade-light: #FF9500` for Avanade. `--superman-red: #CC0000` for the "team" in Superteam. Never hardcode brand colours in component CSS.

```html
<!-- Minimal fullscreen slide structure -->
<style>
  :root { --bg: #0f172a; --fg: #f8fafc; --accent: #6366f1; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 100vw; height: 100vh; overflow: hidden; background: var(--bg); color: var(--fg); font-family: system-ui; }
  .slide { width: 100vw; height: 100vh; display: none; align-items: center; justify-content: center; padding: 4rem; }
  .slide.active { display: flex; flex-direction: column; }
</style>

<script>
  let current = 0;
  const slides = document.querySelectorAll('.slide');
  function show(n) {
    slides.forEach((s, i) => s.classList.toggle('active', i === n));
    location.hash = n + 1;
  }
  document.addEventListener('keydown', e => {
    if (['ArrowRight', 'Space', 'PageDown'].includes(e.key)) show(Math.min(current + 1, slides.length - 1));
    if (['ArrowLeft', 'PageUp'].includes(e.key)) show(Math.max(current - 1, 0));
    current = [...slides].findIndex(s => s.classList.contains('active'));
  });
  show(location.hash ? parseInt(location.hash.slice(1)) - 1 : 0);
</script>
```

---

---

## Format Decision Tree

```
Does the audience need to edit the file themselves?
├── YES → PowerPoint (.pptx) — use pptxgenjs or a template
└── NO → Continue

Is this a demo, internal talk, or live presenter session?
├── YES → Fullscreen HTML presenter (see above) or Reveal.js
└── NO → Continue

Is the presentation data-driven or developer-facing?
├── YES → Reveal.js + React components — live charts, code highlighting
└── NO → Continue

Does the audience expect a polished, brand-consistent deck?
├── YES → PowerPoint template + pptxgenjs, or Marlo designs in HTML with export
└── NO → Sli.dev / markdown slides — fastest to produce, version-controllable
```

**Default for demos and internal presentations:** Fullscreen HTML presenter (Steve's preference)
**Default for non-technical stakeholders (donors, board, FoEI partners):** PowerPoint via `pptxgenjs`
**Default for technical / dev audience:** Reveal.js or Sli.dev
**Default for AI-generated decks from data:** `pptxgenjs` in a Hono API route

---

## Option 1 — PowerPoint Generation (pptxgenjs)

**Library:** [`pptxgenjs`](https://gitbun.com/gitbrent/PptxGenJS) — pure JS, no Office required, runs in Node.js and browser.

```typescript
import pptxgen from 'pptxgenjs';

const prs = new pptxgen();

// Title slide
const slide1 = prs.addSlide();
slide1.addText('FoEI Campaign Impact Report', {
  x: 1, y: 1.5, w: 8, h: 1.5,
  fontSize: 36, bold: true, color: '003366'
});

// Data slide with table
const slide2 = prs.addSlide();
slide2.addTable(
  [
    [{ text: 'Campaign', options: { bold: true } }, { text: 'Actions', options: { bold: true } }],
    ['Amazon Watch', '142'],
    ['Climate Justice', '89'],
  ],
  { x: 0.5, y: 1.5, w: 9, colW: [5, 4] }
);

// Chart slide — bar chart from data
slide2.addChart(prs.ChartType.bar, chartData, { x: 1, y: 1, w: 8, h: 4 });

// Image slide
slide3.addImage({ path: './assets/map.png', x: 1, y: 1, w: 8, h: 4 });

await prs.writeFile({ fileName: 'report.pptx' });
// Or return as buffer for download:
const buffer = await prs.write({ outputType: 'nodebuffer' });
```

**Hono download endpoint pattern:**
```typescript
app.get('/api/reports/download-pptx', async (c) => {
  const buffer = await generateReport(); // returns nodebuffer
  c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
  c.header('Content-Disposition', 'attachment; filename="report.pptx"');
  return c.body(buffer);
});
```

**Capabilities:** Text, shapes, images, tables, charts (bar, line, pie, doughnut, area), backgrounds, master slides, animations (limited).

**Gotchas:**
- Coordinates are in inches by default — `x: 1` = 1 inch from left
- Slide dimensions default to 10" × 7.5" (widescreen: 13.33" × 7.5")
- Charts require data in a specific `{ name, labels, values }` array format
- Fonts must be installed on the user's machine to render correctly
- Images must be local file paths or base64 data URIs (not remote URLs directly)

---

## Option 2 — Sli.dev (Markdown Slides, Recommended for Internal / Dev Audience)

**Tool:** [Slidev](https://sli.dev) — markdown-driven, Vue-based, exports to PDF or SPA.

```markdown
---
theme: default
highlighter: shiki
---

# FoEI Impact 2025

---

## Campaign Reach

<div class="grid grid-cols-2 gap-4">
  <div>
    **142 actions** completed across 3 campaigns
  </div>
  <div>
    <img src="/map.png" class="w-full" />
  </div>
</div>

---

## Code Example (syntax highlighted)

\`\`\`typescript
const campaigns = await db.select().from(campaignTable);
\`\`\`
```

**Run:** `npx slidev slides.md` → live at `localhost:3030`
**Export:** `npx slidev export slides.md` → PDF, PNG per slide, or SPA

**Best for:** Technical presentations, sprint demos, developer documentation, internal reviews.
**Gotchas:** Vue-based, not React — keep it separate from the React UI. Requires Node.js to build.

---

## Option 3 — Reveal.js (HTML Presentation, React-embeddable)

**Library:** [`reveal.js`](https://revealjs.com) — the industry standard HTML presentation framework. React wrapper: `revealjs` + manual init, or use [`@greglobinski/gatsby-plugin-revealjs`].

```html
<!-- Standalone HTML presentation -->
<div class="reveal">
  <div class="slides">
    <section>
      <h1>FoEI Impact</h1>
    </section>
    <section>
      <!-- Embed a live Recharts component -->
      <div id="chart-container"></div>
    </section>
  </div>
</div>
```

```typescript
// React integration
import Reveal from 'reveal.js';
import { useEffect, useRef } from 'react';

export function Presentation() {
  const deckRef = useRef(null);
  useEffect(() => {
    const deck = new Reveal(deckRef.current, { hash: true });
    deck.initialize();
    return () => deck.destroy();
  }, []);
  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        <section><h1>Campaign Impact</h1></section>
        <section><CampaignChart data={data} /></section>
      </div>
    </div>
  );
}
```

**Best for:** Presentations that need live React components (charts, maps, data tables) embedded directly in slides. Browser-served, no export needed.

---

## Option 4 — React + Print CSS (Simplest Custom Approach)

For branded, one-off reports that need to look like slides but aren't interactive:

```css
/* Print-as-slides CSS */
@media print {
  .slide {
    page-break-after: always;
    width: 297mm;
    height: 210mm; /* A4 landscape */
    display: flex;
    align-items: center;
    padding: 2rem;
  }
}
```

```typescript
// Trigger print from React
<button onClick={() => window.print()}>Export as PDF</button>
```

**Best for:** Quick branded reports that look like slides. No extra library. Recharts and maps render in print. Marlo can style with Tailwind.

---

## Marlo's Slide Design Principles

When Marlo designs a presentation (any format):

1. **One idea per slide** — if you're summarising, you're writing a report. Slides deliver one thing.
2. **Headline = the message** — not "Campaign Data" but "142 actions completed, 23% above target"
3. **Data slides have one chart** — not three. One chart, one story.
4. **Brand consistency** — FoEI has a brand. Use it. Colours, fonts, logo placement are not optional.
5. **The last slide is not "Questions?"** — it's the one thing you want them to remember.
6. **Design for the room** — donor meeting vs. internal sprint demo vs. board pack are different products.

---

## Kevin's Content Structure (Any Format)

```
Slide 1:  Title — what this presentation is about
Slide 2:  Context — why we're here / what happened
Slide 3-N: The story — one point per slide, data-backed
Last:     The ask or the action — what do you want them to do?
```

Kevin writes the content outline first. Marlo then designs around it. Eric builds last.

---

## When to Use What

| Audience | Format | Tooling |
|----------|--------|---------|
| Donors, board, external | Polished deck | `pptxgenjs` or Marlo HTML → PDF |
| FoEI finance/audit | Data-heavy, exportable | `pptxgenjs` with table/chart slides |
| Internal sprint demo | Fast, code-friendly | Sli.dev (markdown) |
| Developer presentation | Live code + components | Reveal.js + React |
| One-off report-as-slides | Branded, print-ready | React + Print CSS |
| AI-generated from data | Automated PPTX | `pptxgenjs` in Hono API route |

---

## Install

```powershell
# pptxgenjs (server-side generation)
pnpm add pptxgenjs --filter server

# Sli.dev (standalone, no install needed)
npx slidev slides.md

# Reveal.js (React integration)
pnpm add reveal.js --filter ui
```

---

*Maintained in `.squad/skills/presentations.md`*
