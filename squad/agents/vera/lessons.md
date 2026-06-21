---
agent: vera
domain: quality, testing, sign-off
tags: [testing, sign-off, audit, grep, blocker]
last_updated: 2026-06-09
---

# Vera — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **No size threshold:** Test everything, every delivery. One config file change counts. One line counts.
- **Grep the whole repo:** When checking for a pattern, name, or rule across files — grep ALL files. Never trust that one instance was the only one. This is how Madhavi survived in vera.md itself.
- **Verdict format:** PASS / FAIL / CONDITIONAL PASS. Always one of these. "Seems fine" is not a Vera report.
- **Blocker ≠ skip:** If you cannot test (no browser, no server, no filesystem) — that is a BLOCKER. Tell Superman immediately. Do not proceed without flagging it.
- **Config is testable:** Even markdown and config changes are testable — grep for removed patterns, check cross-references, validate section numbering, verify rule propagation across files.
- **External outputs need sign-off too — not just code:** Any document, recommendation, or file being pushed to an external repo is a deliverable. Vera reviews it before it leaves. Check: are code references (line numbers, file paths) correct? Are claims (expected gains, model names) verifiable? Is the audience served by this output? "Nothing ships without Vera's sign-off" means nothing — including a 309-line advisory document going to a student's academic repo.
- **Read first, write once:** Read ALL files and run ALL checks before writing a single word of the verdict. A verdict that reverses in the same document means you wrote before you finished reading. One verdict. Final.

## Brain Sync — 2026-06-21
- Auth gates (requireAuth vs requireFoundation) must be validated against the product backlog permission model, not inferred from code surface analysis alone. One wrong gate can break a user flow silently. _(conf: 0.90)_
- All server action failures must use redirect("?error=..."), never throw. This contract is now established across all 4 action files in racecar-platform. Apply to every new action file without exception. _(conf: 0.90)_
- Vera is most effective pre-push, not post-retro. Every hour Vera is delayed after a commit is one extra round trip. Wire Vera into the delivery path before Superman signs off, not as a retro step. _(conf: 0.85)_
- Subagent briefs for sign-off and review passes must explicitly state read-and-assess-only — no writes — or subagents with write access will write _(conf: 0.75)_
- Vera consolidated sign-off across the full session catches more than item-by-item review — make it the last explicit step on every sprint, not an ad hoc call when Steve asks _(conf: 0.75)_
- agent_brief returns a focused context packet (~300 tokens) in place of loading 5 markdown files — use it at every session boot _(conf: 0.75)_
- Vera must test the live app in a browser first before doing any code-level review — code review alone misses rendering and routing failures _(conf: 0.75)_
- Vera QA must happen before push not as a retro activity — auth holes reach production undetected without pre-push gating _(conf: 0.75)_
- Vera must always verify against the actual codebase not prior game tape notes — stale notes cause false positives _(conf: 0.75)_
- Vera must be the last gate before Superman delivers — not a mid-session event or retro item _(conf: 0.75)_
- Auth gates must be matched to the permission model in the backlog not to a surface-level read of the code — always cross-check backlog before changing an auth gate _(conf: 0.75)_
- Spec documents must be wired into the build — if a spec says to include something and it is not in the build Vera must catch it _(conf: 0.75)_
- Every server action using the service role key must have an explicit role check at the top — role validation cannot be assumed from the route _(conf: 0.75)_
- requireFoundation() gates all write operations — requireAuth() is only for read-only actions where any logged-in user is acceptable _(conf: 0.75)_
- Never ship a UI control that the server does not actually read — remove dead toggles immediately _(conf: 0.75)_
- Never ship a server action without wiring it to a UI form — dead action code is wasted work and creates confusion _(conf: 0.75)_
- assessment_history inserts via admin client bypass RLS — the is_foundation() check in SELECT policy must be explicitly tested _(conf: 0.75)_
- Playwright selectors must use .first() when the same text appears in both nav and content areas simultaneously _(conf: 0.75)_
- Magic link redirect approach for Playwright auth does not work — Supabase enforces redirect URL allowlist; use admin generateLink + verifyOtp to construct SSR cookie manually _(conf: 0.75)_
- Never ship spec items that are not wired — if claude-assistant.md specifies safety boundaries they must appear in the actual system prompt or Vera must catch the gap _(conf: 0.75)_
