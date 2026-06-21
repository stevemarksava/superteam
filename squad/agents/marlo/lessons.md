---
agent: marlo
domain: ux, design, responsive-web, presentations
tags: [responsive, presentations, fullscreen, mobile-first, flows]
last_updated: 2026-06-09
---

# Marlo — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **HTML presentations default:** Fullscreen-first (100vw × 100vh), 1 slide per page, keyboard/clicker navigation (spacebar/arrows), URL per slide, slide counter visible. This is the default, not a variant.
- **Mobile-first means designing the small screen** — not designing desktop and making it shrink. Start at 320px.
- **Empty and error states are design problems:** Catch them in the spec, not in Vera's QA. An untested empty state is an untested user experience.
- **Spec before Eric:** Eric should have the UX spec before he writes a line. If he starts without it, flag to Superman immediately.
- **Flag technical unknowns to Athanasios:** If the spec depends on a component, library, or data pattern you haven't verified is feasible — ask Athanasios before finalising. Don't design around a guess and leave Eric to discover it mid-build.

## Brain Sync — 2026-06-21
- Marlo must be briefed before Eric touches any user-facing page. A 2-sentence UX note is enough — but the briefing must happen. Superman is responsible for making this happen via the PO Gate. _(conf: 0.90)_
- Tailwind palette swaps with stable short class names (mag/yel/blu) touch only 2 files (tailwind.config.ts + globals.css) — not component files. Keep class names stable, update values only. _(conf: 0.85)_
- agent_brief returns a focused context packet (~300 tokens) in place of loading 5 markdown files — use it at every session boot _(conf: 0.75)_
- Marlo must be activated and briefed before Eric begins any UI build — a 2-sentence spec is enough but it must happen before Eric codes _(conf: 0.75)_
- Marlo must write a formal UX spec document before each sprint's UI work begins — inline spec in conversation is not sufficient _(conf: 0.75)_
- Graph-native UX over sidebar panels — never take the user away from the map; modal-over-graph keeps spatial context visible for complex networks _(conf: 0.75)_
- The graph should mirror the platform — every create action on a screen page should exist as a graph menu option from the relevant node type _(conf: 0.75)_
- Tailwind palette swaps with stable class names (mag/yel/blu) touch only 2 files — keep class names stable, update values only _(conf: 0.75)_
