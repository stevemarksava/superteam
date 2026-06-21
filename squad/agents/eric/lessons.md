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

## Brain Sync — 2026-06-21
- All server action failures must use redirect("?error=..."), never throw. This contract is now established across all 4 action files in racecar-platform. Apply to every new action file without exception. _(conf: 0.90)_
- Supabase queries are promises — never use .then() chaining on query results. Await each step in sequence. TypeScript will not catch this error at compile time. _(conf: 0.90)_
- Supabase Site URL is the first check when a custom domain redirects to the Vercel default URL. The fix is in Supabase dashboard → Authentication → URL Configuration, not in Next.js config. _(conf: 0.90)_
- Tailwind palette swaps with stable short class names (mag/yel/blu) touch only 2 files (tailwind.config.ts + globals.css) — not component files. Keep class names stable, update values only. _(conf: 0.85)_
- Always verify package versions from supplier website before specifying in a blueprint — never from memory. _(conf: 0.75)_
- Confidence hierarchy must be enforced in code not just docs — who confirms matters as much as what is confirmed. _(conf: 0.75)_
- On any rule change, grep the entire repo for the old phrasing before committing — never trust that a single edit propagated everywhere _(conf: 0.75)_
- Seed scripts with multiline SET statements break when split by semicolons — collapse all SET clauses to a single line _(conf: 0.75)_
- agent_brief returns a focused context packet (~300 tokens) in place of loading 5 markdown files — use it at every session boot _(conf: 0.75)_
- Do not wait for Steve between sprints — if build is green and task is clear, ship and continue without pausing for permission _(conf: 0.75)_
- Spec documents must be wired into the build — if a spec says to include something and it is not in the build Vera must catch it _(conf: 0.75)_
- Every server action using the service role key must have an explicit role check at the top — role validation cannot be assumed from the route _(conf: 0.75)_
- GitHub API at request time adds latency, rate limits, and secret exposure risk — never fetch methodology content from GitHub at runtime when bundled files work equally well _(conf: 0.75)_
- A co-driver guard must prevent the lead driver being added as a co-driver — DB PRIMARY KEY alone does not catch cross-table business rule violations _(conf: 0.75)_
- All DDL must be safe to re-run — tables use IF NOT EXISTS, enums use DO $$ EXCEPTION WHEN duplicate_object $$, triggers use CREATE OR REPLACE _(conf: 0.75)_
- Delete-before-reinsert is the standard pattern for seed tables without unique constraints — tables with unique constraints should use upsert _(conf: 0.75)_
- requireFoundation() gates all write operations — requireAuth() is only for read-only actions where any logged-in user is acceptable _(conf: 0.75)_
- getAuthAndRole() helper is the correct pattern for actions that drivers and foundation both need with different permission levels — blunt requireFoundation() blocks too broadly _(conf: 0.75)_
- PostgREST subquery workaround: split into two separate queries and merge in JS with a Set for dedup — clean, fast, no views needed _(conf: 0.75)_
- Always add the business rule guard in the server action function not just as a DB comment or assumed from the schema constraint _(conf: 0.75)_
- The error handling contract for server actions must be documented from day one — all failures redirect with error query param, never throw _(conf: 0.75)_
- Never ship a UI control that the server does not actually read — remove dead toggles immediately _(conf: 0.75)_
- Never ship a server action without wiring it to a UI form — dead action code is wasted work and creates confusion _(conf: 0.75)_
- When writing async validation blocks always trace each await in sequence — no .then() chaining on Supabase queries _(conf: 0.75)_
- Server actions passed as props to client components is the clean pattern for mixing server auth with client interactivity _(conf: 0.75)_
- When moving a page into a route group delete .next/types before re-running typecheck — cache holds the old path as a stale type error _(conf: 0.75)_
- buildLiveContext() should be a per-request async function keeping the static SYSTEM prompt cached — only add live data at call time _(conf: 0.75)_
- 60-minute idempotency guard on assessment history prevents double-submit duplicates from rapid resubmission _(conf: 0.75)_
- Always use URLSearchParams for calendar URL generation — never manually concatenate query strings with special characters _(conf: 0.75)_
- Resist putting checklists and methodology content in the DB — static arrays in the page file are simpler unless different circuits need different content _(conf: 0.75)_
- window.innerWidth/Height is safe inside {popup && ...} client components in Next.js App Router because popup starts as null and only evaluates after a browser click event _(conf: 0.75)_
- Network graph must show ALL client orgs regardless of status — status filter must never remove nodes that have linked entities _(conf: 0.75)_
- Network graph node type prefix (engagement: vs case:) must match the actual status — always build an engStatusMap to determine the correct prefix _(conf: 0.75)_
- Case nodes in the network graph must be labeled distinctly from client nodes — use Case · P{phase} not the client name _(conf: 0.75)_
- D3 useMemo for filtered nodes and links prevents the useEffect from firing on every render — only fire when filters actually change _(conf: 0.75)_
- D3 callbacks must always be passed via useRef — never put the callback itself in the D3 event handler dependency to avoid stale closure bugs _(conf: 0.75)_
- Single vs double click in D3 always needs a 220ms timer — browser fires two click events before dblclick and the timer is the only reliable way to distinguish them _(conf: 0.75)_
- The ?from=network back navigation pattern must be applied consistently to every entity detail page linked from the graph _(conf: 0.75)_
- Box Box live context adds 500-800 tokens per request depending on active engagements — monitor token budget as engagement count grows _(conf: 0.75)_
- Graph-native UX over sidebar panels — never take the user away from the map; modal-over-graph keeps spatial context visible for complex networks _(conf: 0.75)_
- Network server actions should return {error?} not redirect() so the client can call them programmatically and handle errors inline without leaving the graph _(conf: 0.75)_
- The graph should mirror the platform — every create action on a screen page should exist as a graph menu option from the relevant node type _(conf: 0.75)_
- Always check Turbopack native binary availability for the target platform before upgrading Next.js major — win32/arm64 may require --webpack fallback _(conf: 0.75)_
- Tailwind 4 @theme migration is mechanical — every tailwind.config.ts value maps 1:1 to a CSS variable using --color-* and --font-* naming _(conf: 0.75)_
- Always clear .next/ cache between major Next.js upgrades — stale artifacts cause ENOENT errors _(conf: 0.75)_
- Set NODE_OPTIONS=--max-old-space-size=3072 when running next dev --webpack on win32/arm64 with WASM bindings _(conf: 0.75)_
- Major versions (Tailwind 4, Next.js 16, TypeScript 6) must be held for dedicated migration sprints — never mix into feature sprints _(conf: 0.75)_
- YAML scalars containing double quotes must use single-quote wrapping — mid-string double quotes close the YAML string early _(conf: 0.75)_
- When staging brand changes across repos always list exact changed files with git diff --name-only then git add each file individually — never use git add -A in repos with personal files _(conf: 0.75)_
- Tailwind palette swaps with stable class names (mag/yel/blu) touch only 2 files — keep class names stable, update values only _(conf: 0.75)_
- Playwright selectors must use .first() when the same text appears in both nav and content areas simultaneously _(conf: 0.75)_
- Magic link redirect approach for Playwright auth does not work — Supabase enforces redirect URL allowlist; use admin generateLink + verifyOtp to construct SSR cookie manually _(conf: 0.75)_
- Supabase Site URL is the first check when a custom domain redirects to the Vercel default — it is in Supabase dashboard Authentication URL Configuration not in Next.js config _(conf: 0.75)_
- Never ship spec items that are not wired — if claude-assistant.md specifies safety boundaries they must appear in the actual system prompt or Vera must catch the gap _(conf: 0.75)_
