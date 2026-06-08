# Marlo Memory

## Design Cycle: Superteam Onboarding Presentation
**Date:** 2026-06-08

### What Was Designed and For Whom
A fullscreen HTML presenter (8 slides) to onboard Bernd and Paulien — two FDEs at Avanade — to Superteam. They may not be highly technical. The goal: leave knowing what Superteam is, who the agents are, and how to start in 5 minutes.

### File Delivered
`C:\Users\s.marks\.claude\squad\onboarding\superteam-intro.html`

### Key UX Decisions and Reasoning

**Navigation:** Spacebar, right-arrow, PageDown advance. Left-arrow, PageUp retreat. No mouse required — clicker-compatible. URL hash per slide (`#slide-1` through `#slide-8`). Slide counter bottom-right (always visible). Nav hint ("→ to begin") shows only on slide 1, disappears after first advance.

**Visual tone:** Near-black background (#0b0f19) with electric cyan (#00d4ff) as primary accent, indigo (#6366f1) and teal (#10b981) as secondaries. Not corporate. Confident, modern, slightly sci-fi — signals "this is a real team, not a chatbot wrapper."

**Typography:** Inter (Google Fonts CDN) for all body/heading text. JetBrains Mono for code snippets and command-line examples. Large, bold headlines (clamp-based fluid sizing, min 4rem). No small print — presentation-first sizing.

**Slide 3 (Squad grid):** 6-column grid of agent cards, each with a coloured top-border accent to differentiate roles visually without relying on text alone. Superman card gets a subtle gradient background to signal primacy. 12 agents in 2 rows — fits without scroll.

**Slide 4 (Paths):** Three-column card layout, one per entry point. Code-style action blocks at the bottom of each card give a concrete "here's exactly what to do" feel without overwhelming.

**Slide 5 (Using It):** Two-column layout — explanation on left, command examples on right. Left border colour on each command line encodes which agent is speaking. JetBrains Mono for the command text reinforces "this is a real instruction you can type."

**Slide 6 (Philosophy):** Large ghost numbers (01/02/03) behind each principle. Accent colour on the key word per principle. Quality gate callout at the bottom — visually distinct so it reads as a non-negotiable, not just another bullet.

**Slide 8 (Last slide):** Deliberately NOT "Questions?" — following Marlo's principle that the last slide is the one thing to remember. "Superman is always listening." ends the deck on an action, not an invitation to wonder. Bernd and Paulien's names appear as badges — personal touch.

**Self-contained:** Only external dependency is Google Fonts CDN (Inter + JetBrains Mono). No frameworks, no bundler, no npm. Opens as a static HTML file in any browser.

### User Scenario Used for Validation
Bernd opens the file in Chrome before a 15-minute onboarding call with Steve. He has never used Superteam. He presses the spacebar to advance. By slide 4 he knows which path to take (claude.ai, no install). By slide 7 he has the exact steps to paste instructions and send his first message. By slide 8 he remembers one thing: "Superman is always listening." The deck required no explanation to navigate.

### No Changes from Steve (first pass)
