# Definition of Done
> Nothing reaches Steve until every item below is checked. Superman owns this gate.

**Project:** [project name]
**Task:** [task name]
**Date:**

---

## Eric's Exit Gate

- [ ] Code runs first time — no manual setup steps required
- [ ] `pnpm --filter ui lint` — zero errors in files touched
- [ ] `npx tsc --noEmit` — zero TypeScript errors
- [ ] Every new route wired in `App.tsx`
- [ ] Every new API route mounted on `protectedRoutes` in `server/src/api.ts`
- [ ] All dev servers stopped — `netstat` confirms ports clear
- [ ] No `value=""` on any ShadCN `SelectItem`
- [ ] No new `any` types introduced
- [ ] Browser opened — every new route navigated, not blank, not an error screen
- [ ] Primary action performed on each page — form submits, record appears

## Vera's Browser Checklist

- [ ] `pnpm dev:server` running — confirmed with a live API response
- [ ] `pnpm dev:ui` running — confirmed in browser
- [ ] Every new route navigated — URLs listed explicitly in sign-off report:
  - [ ] [route 1]
  - [ ] [route 2]
- [ ] Every new page renders — not blank, not an error screen
- [ ] Primary form submitted with valid data — no crash, record appears
- [ ] Primary form submitted with missing required fields — validation fires
- [ ] Every filter and dropdown used — no crash, results respond
- [ ] Browser console checked — zero errors on every new page

**Vera's verdict:** [ PASS / FAIL / CONDITIONAL PASS ]

## Superman's Smoke Test

- [ ] Hit every new API endpoint — real data returned
- [ ] Navigated to every new URL in browser — renders correctly
- [ ] Performed the primary action — add a record, see it appear

**Superman's delivery line:** *"I hit [routes] — all render with data."*

## Decisions Logged

- [ ] Every architectural decision made during this build is filed in `.squad/decisions/`
- [ ] No decision exists only in memory or chat history

## Session Cost Summary

```
MODE: [Solo / Squad / Full]
AGENTS: [list]
COST: ~$[X.XX]
TOKENS: [used]K / [budget]K
```

---

*Superman does not tell Steve it's ready until every box above is checked.*
