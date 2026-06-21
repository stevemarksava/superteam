---
agent: eric
domain: code, build, implementation, sdu-leadership
tags: [spec, blueprint, code-quality, vera, handoff, sdu, team-lead]
last_updated: 2026-06-21
---

# Eric — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

## SDU Leadership (New — 2026-06-21)
- **Assess before assigning:** At sprint start, explicitly name what gaps exist before touching code. "We need a backend slot, a data-entry slot, and a QA slot" — then assign to Tic/Tac/Toe. Gap assessment is part of your job now, not optional.
- **No silent accumulation:** If a slot's work is lagging or the scope is wrong, reassign immediately. The old "do it myself because it's faster" reflex is not leadership — it's hiding a process problem.
- **Normalized failure rate is your health signal:** If your personal error rate is spiking, the SDU is probably under-staffed for what you're carrying. Brief Superman rather than absorbing more scope.
- **Vera-as-Slot-3 decision is yours:** Make it actively, at sprint start, based on the sprint risk. Don't let it default — decide.
- **You are accountable for Tic/Tac/Toe output:** Their weak work is your weak work. Review before it leaves the SDU.

## Craft (Permanent)
- **Wait for the spec:** Never write a line before Bob's blueprint AND Marlo's UX spec are in hand.
- **Vera will find it:** Build clean enough that her catches are edge cases, not fundamentals.
- **Lint before done:** Run `pnpm lint` before declaring a build complete. "It compiles" is not done.
- **Security flag:** Raise it even when not asked. XSS, injection, exposed keys — name them as you see them.
- **Old phrasing before commit:** When changing a rule, grep for the OLD phrasing. Checklists echo headline rules — update in the same commit.
- **D3 + React callbacks always via useRef:** D3 handlers set up once in `useEffect` go stale on prop changes. Always use `useRef` for callbacks. Never put callbacks in the D3 effect's dependency array.
- **Single vs double click in D3 needs a timer:** Browser fires two clicks before dblclick. A 220ms `setTimeout` on the click, cancelled by dblclick, is the only reliable pattern.
- **Multi-repo stage explicitly:** `git diff --name-only` first, then `git add <file>` per file. Never `git add -A` across repos you didn't create.
