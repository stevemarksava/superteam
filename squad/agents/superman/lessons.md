---
agent: superman
domain: lead, routing, delivery, session-boot
tags: [delivery-gate, routing, session-boot, vera, coach, kryptonite, memory]
last_updated: 2026-06-21
---

# Superman — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **Session boot:** Read lessons + last game tape BEFORE briefing anyone. Cold starts waste the team's paid-for learning.
- **Delivery gate:** Read it from the FILE at session end — not from memory. Every item. Ticked or blocked.
- **Vera:** Explicitly trigger her after every delivery. She does not self-activate. Name her. Wait for her output.
- **Coach:** Trigger game tape write immediately after every push. It does not self-activate either.
- **Kryptonite:** Runs before every build, every mode. No size exception. Solo is not an exemption.
- **Grep first:** When removing a concept (name, rule, qualifier) across the repo, grep ALL files before claiming it's done. Never assume one file was the only instance.
- **Old phrasing before commit:** On any rule change, grep the repo for the OLD phrasing before committing. Checklists and tables restate rules — they are hit by the same change. One commit, all instances, zero survivors.
- **Rule ≠ behaviour:** A rule written into a config file is not a behaviour that fires. Writing it and running it are two separate things.
- **Infrastructure before the rule ships:** If a rule says "log to X/Y/" — create X/Y/ in the same commit. A rule pointing to a folder that doesn't exist is a broken rule on day one.
- **Subagent scope contracts:** When briefing a sign-off or review agent, explicitly state "read and assess only — no writes." Without this, agents with write access will write. The scope of the brief is the scope of the permission.
- **Decisions folder at boot:** Before briefing anyone on a build, check `.squad/decisions/`. It holds the team's "why we built it this way" record. Contradicting a logged decision without flagging it is a process failure.
- **No I in team — consulting outputs need a squad too:** Any session that produces output leaving this conversation (document, recommendation, push to another repo) requires mode classification. Research tasks → Athanasios. Action plans → Paulien. Cost implications → G. External outputs → Vera sign-off. Kryptonite challenges confident recommendations. "It felt exploratory" is not an exemption. Consequence of output, not complexity of build, is the trigger.
- **Log decisions BEFORE the build starts:** The decision log's value is preventing wrong implementations, not documenting completed ones. If a decision isn't in `.squad/decisions/` before Eric starts, it doesn't exist.
- **Multi-repo commits — explicit staging only:** When delivering a change across multiple repos (brand sweeps, global search-and-replace, backfills), always `git diff --name-only` first, then `git add <file>` one by one. Never use `git add -A` or `git add <directory>` across foreign repos — they may have untracked personal files (CVs, notes, credentials) that will be committed and pushed. This mistake is irreversible once pushed to a remote. Explicit staging is non-negotiable when crossing repo boundaries.
- **Research output is input to Bob, not a build order:** When Athanasios delivers a research brief, it goes to Bob for a blueprint before Eric touches anything. Athanasios findings + Bob blueprint = Eric build brief. Skip Bob, build on sand.

## Brain Sync — 2026-06-21
- Auth gates (requireAuth vs requireFoundation) must be validated against the product backlog permission model, not inferred from code surface analysis alone. One wrong gate can break a user flow silently. _(conf: 0.90)_
- Marlo must be briefed before Eric touches any user-facing page. A 2-sentence UX note is enough — but the briefing must happen. Superman is responsible for making this happen via the PO Gate. _(conf: 0.90)_
- Supabase Site URL is the first check when a custom domain redirects to the Vercel default URL. The fix is in Supabase dashboard → Authentication → URL Configuration, not in Next.js config. _(conf: 0.90)_
- Cloudflare orange-cloud proxy in front of Vercel breaks DDoS protection and triggers a Vercel warning. For subdomains pointing to Vercel, always set DNS-only (grey cloud). _(conf: 0.90)_
- Vera is most effective pre-push, not post-retro. Every hour Vera is delayed after a commit is one extra round trip. Wire Vera into the delivery path before Superman signs off, not as a retro step. _(conf: 0.85)_
- Superman starts designing solo before squad review — pre-build gate must run before any architecture decision. _(conf: 0.75)_
- Knowledge graph infrastructure without content is a seeded empty building — batch import must follow immediately after graph goes live. _(conf: 0.75)_
- AuraDB free tier pauses after 3 days inactivity — keep-alive ping must be scheduled or brain goes cold. _(conf: 0.75)_
- On any rule change, grep the entire repo for the old phrasing before committing — never trust that a single edit propagated everywhere _(conf: 0.75)_
- Installing a skill loads it into context permanently — default to the catalogue and find-skills; install per-project and remove when done; reachable beats resident _(conf: 0.75)_
- Rules that reference a folder path must have that folder created in the same commit that adds the rule — not the next session _(conf: 0.75)_
- Before any task that produces an external output, classify the squad mode — consulting and research tasks need squad deployment (Athanasios, Paulien, G, Vera) as much as builds do _(conf: 0.75)_
- Output-consequence blindness: Superman weighs complexity of what is being built, not the consequence of what is being produced — a 309-line recommendation to a thesis student is high consequence regardless of whether it involved building anything _(conf: 0.75)_
- Paulien memory write and Coach game tape are paired session-close steps — wire them together so neither is left until Steve notices the gap _(conf: 0.75)_
- Subagent briefs for sign-off and review passes must explicitly state read-and-assess-only — no writes — or subagents with write access will write _(conf: 0.75)_
- Vera consolidated sign-off across the full session catches more than item-by-item review — make it the last explicit step on every sprint, not an ad hoc call when Steve asks _(conf: 0.75)_
- Kryptonite skip must be explicit — if Kryptonite is not deployed, Superman names why and logs it; invisible skips are not acceptable _(conf: 0.75)_
- agent_brief returns a focused context packet (~300 tokens) in place of loading 5 markdown files — use it at every session boot _(conf: 0.75)_
- machine_register once per machine + last_machine on ACTIVE_IN tracks cross-machine config drift with zero ongoing discipline cost _(conf: 0.75)_
- Superman must run the boot protocol at the start of every session without exception — skipping it causes all downstream agent errors to compound _(conf: 0.75)_
- Kryptonite must be in the first brief of every session — not called in after the build has started _(conf: 0.75)_
- Athanasios should be in the first brief every session — he surfaces structural issues other agents miss _(conf: 0.75)_
- Marlo must be activated and briefed before Eric begins any UI build — a 2-sentence spec is enough but it must happen before Eric codes _(conf: 0.75)_
- Kryptonite must run a full pre-sprint red team before Sprint 1 of any project — structural risks caught here would each become production bugs _(conf: 0.75)_
- Sprint scope must be split when blockers on seed data exist — never start admin section or CRUD sprints until migration is verified and seed runs cleanly _(conf: 0.75)_
- Deferred sprint items need more design spec before build — never defer without logging why and what spec is needed _(conf: 0.75)_
- Live engagements in progress require explicit data handover planning before platform goes live — document current phase, start date, contacts, session notes from outside the system before seeding _(conf: 0.75)_
- Do not wait for Steve between sprints — if build is green and task is clear, ship and continue without pausing for permission _(conf: 0.75)_
- STEVE-TODO.md is the contract — keep it current; mark resolved blockers done immediately so Steve can trust the list _(conf: 0.75)_
- Vera QA must happen before push not as a retro activity — auth holes reach production undetected without pre-push gating _(conf: 0.75)_
- Vera must be the last gate before Superman delivers — not a mid-session event or retro item _(conf: 0.75)_
- Auth gates must be matched to the permission model in the backlog not to a surface-level read of the code — always cross-check backlog before changing an auth gate _(conf: 0.75)_
- Google OAuth as sole identity provider requires a documented manual recovery runbook before drivers go live _(conf: 0.75)_
- The error handling contract for server actions must be documented from day one — all failures redirect with error query param, never throw _(conf: 0.75)_
- Resist putting checklists and methodology content in the DB — static arrays in the page file are simpler unless different circuits need different content _(conf: 0.75)_
- Box Box live context adds 500-800 tokens per request depending on active engagements — monitor token budget as engagement count grows _(conf: 0.75)_
- The graph should mirror the platform — every create action on a screen page should exist as a graph menu option from the relevant node type _(conf: 0.75)_
- Major versions (Tailwind 4, Next.js 16, TypeScript 6) must be held for dedicated migration sprints — never mix into feature sprints _(conf: 0.75)_
- Flag brand.yml conflicts against the chosen canonical palette before any brand-driven UI work begins _(conf: 0.75)_
- Supabase Site URL is the first check when a custom domain redirects to the Vercel default — it is in Supabase dashboard Authentication URL Configuration not in Next.js config _(conf: 0.75)_
- For subdomains pointing to Vercel always set Cloudflare to DNS-only (grey cloud) not proxied (orange cloud) _(conf: 0.75)_
- Research agents need WebSearch and WebFetch in the project allowlist to do live research — training-knowledge reports cannot verify current pricing or APIs _(conf: 0.75)_
- Research output from Athanasios is input to Bob's blueprint — never let Eric start building on a research finding without Bob reviewing the architecture first _(conf: 0.75)_

## Brain Patterns (active)

- **[HIGH] rule-propagation-misses-buried-duplicates** — When a rule changes, the squad fixes the prominent occurrence and misses buried checklist or example restatements. Vera catches it at the gate but it should never reach the gate. Fix: grep old phrasing repo-wide before any rule-change commit.
- **[HIGH] output-consequence-blindness** — Superman classifies tasks by build complexity, not output consequence. Consulting and research tasks that produce external outputs (documents, recommendations, pushes to other repos) require full squad deployment — not solo execution. Two confirmed instances: Taha Thesis, implied by all-solo consulting sessions.
- **[HIGH] auth-gate-backlog-match** — Auth gates must match the permission model in the backlog not be inferred from code surface analysis. Caught twice in racecar-platform: events route gated incorrectly, requireFoundation regression on same session
- **[HIGH] marlo-before-eric** — Marlo must see every user-facing build before Eric codes it. A 2-sentence UX note counts — but the briefing must happen. Superman is responsible. Missed Sprint 1, Sprint 2, and Sprint 7
- **[HIGH] superman-solo-start** — Superman starts sessions or builds without the boot protocol or logging the PO Gate — all downstream agent errors trace back. Seen: 2026-06-18 (squad called out twice), 2026-06-19-sprint2-complete (PO Gate not logged before build)
- **[HIGH] vera-timing-late** — Vera QA happens as a retro activity or is skipped entirely — bugs that should be pre-push catches reach committed code or production. Seen across 5 game tapes in this project
- **[HIGH] eric-builds-without-marlo** — Eric builds user-facing flows without a Marlo UX brief — results in functional but unaudited UX requiring rework. Seen: Sprint 1 (all UI), Sprint 2 (onboarding wizard + driver detail), Sprint 7 (NetworkCreatePanel)
- **[MEDIUM] infrastructure-before-rules** — The squad wires the rule before it creates the infrastructure the rule depends on. Rules referencing a folder path, a file, or a process step must ship with that infrastructure in the same commit. Examples: game-tape folder, decisions folder, copilot-instructions.md.
- **[MEDIUM] error-handling-redirect** — All server action failures in Next.js must use redirect("?error=..."), never throw. Established across racecar-platform Sprint 2 across 4 action files
- **[MEDIUM] agent-decision-override** — Agents make changes that contradict logged decisions or backlog intent without checking the source of truth first. Bob (env vars), Superman (requireFoundation regression)
- **[MEDIUM] dead-code-shipped** — Code or spec items are written or documented but never wired into the running application. deepContext toggle, updateProfile action, Box Box safety boundaries — all shipped dead
- **[MEDIUM] seed-idempotency-failures** — Tables without unique constraints create duplicate rows on repeated seed runs unless delete-before-reinsert is used explicitly
