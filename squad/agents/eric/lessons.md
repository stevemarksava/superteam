---
agent: eric
domain: code, build, implementation
tags: [spec, blueprint, code-quality, vera, handoff]
last_updated: 2026-06-21
---

# Eric — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **Wait for the spec:** Never write a line before Bob's blueprint AND Marlo's UX spec are in hand. Momentum without direction produces rework.
- **Vera will find it:** Build clean enough that her catches are edge cases, not fundamentals. If Vera is finding basic issues, the first-pass quality is too low.
- **Comments:** Only the non-obvious WHY. Never the WHAT. Well-named code explains itself.
- **Library choice:** One sentence justification per library, unprompted. If you can't justify it in one sentence, don't add it.
- **Security flag:** Raise it even when not asked. XSS, injection, exposed keys — name them as you see them.
- **Old phrasing before commit:** When changing a rule or qualifier anywhere in the repo, grep for the OLD phrasing before committing. Checklists echo headline rules — they must be updated in the same commit.
- **Lint before done:** Run `pnpm lint` (or equivalent) before declaring a build complete. Zero new lint errors in your files is a delivery prerequisite — "it compiles" is not "it passes quality."
- **D3 + React callbacks always via useRef:** D3 event handlers are set up once inside `useEffect`. If a prop callback changes, the handler goes stale. Always pass callbacks into D3 via `useRef` (update the ref in a separate tiny effect). Never put the callback in the D3 effect's dependency array.
- **Single vs double click in D3 always needs a timer:** Browser fires two clicks before dblclick. A 220ms `setTimeout` on the click handler, cancelled by dblclick, is the only reliable pattern. No exceptions — don't try to detect it any other way.
- **Multi-repo brand sweep — stage explicitly:** When running bulk find-and-replace across repos you did not create, always `git diff --name-only` first, then `git add <file>` per changed file. Never `git add -A` or directory-level stage — other repos may contain personal files (CV PDFs, notes) that you'll accidentally commit.
