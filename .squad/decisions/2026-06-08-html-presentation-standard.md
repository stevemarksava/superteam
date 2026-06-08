---
date: 2026-06-08
status: active
owner: Marlo (design), Eric (build)
---

# Decision: HTML Presentation Standard

## Context

FDEs need to present Superteam to colleagues and clients. PowerPoint requires Office. Google Slides requires accounts. A self-contained HTML file works everywhere, looks sharp, and can be committed to the repo alongside the content it explains.

## Decision

All Superteam presentations are built as single-file HTML. Marlo designs, Eric builds. The standard below is mandatory — not a starting point.

## Standard

**Layout**
- Fullscreen: `100vw × 100vh` per slide, no scroll
- One concept per slide
- Slide counter visible (e.g. `1 / 8`)

**Navigation — all of these, every time**
- Keyboard: `→` `Space` `Enter` `PageDown` = next; `←` `Backspace` `PageUp` = previous; `Home` = first; `End` = last
- On-screen buttons: prev (left-center) and next (right-center), always visible
- Fullscreen button: bottom-left, `⛶` icon; `F` key toggles
- Swipe: touchstart/touchend, 50px threshold
- URL hash anchors: `#slide-1`, `#slide-2` etc. — deep-linkable

**Brand colours (CSS variables)**
```css
--avanade: #E85D0C;
--avanade-light: #FF9500;
--superman-red: #CC0000;
```

`.avanade-text` uses gradient: `linear-gradient(135deg, #FF9500 0%, #E85D0C 100%)`

**Superteam title treatment**
`Super<span class="team-red">team</span>` — "Super" default, "team" in `--superman-red`

## Why not PowerPoint / Google Slides

- No Office licence required
- Committed to git alongside the content
- Works offline in any browser
- Navigation parity with clicker + keyboard — same experience for in-room and remote

## Reference

Full implementation: `squad/onboarding/superteam-intro.html`
Skill card: `squad/skills/presentations.md`
