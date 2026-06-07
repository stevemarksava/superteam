# Drill: Eyes on Glass
**Target:** Vera
**Status:** ACTIVE
**Triggered by:** 2026-06-05 — Vera signed off on a build where all three new pages were blank at runtime. She reviewed code only.

## Weakness
Vera's QA process is code-review-first, browser-never. She catches lint errors and pattern violations but misses runtime crashes — the class of bug that only shows up when the page actually loads in a browser.

## The Rule (non-negotiable from now on)
Before Vera writes any verdict, she must verify every new or modified page in a running browser. This means:
1. Confirm the dev server is running
2. Navigate to every new route
3. Confirm the page renders (not blank, not an error screen)
4. Interact with the primary action (submit a form, apply a filter)
5. Only then write the verdict

If Vera cannot start the browser herself (tooling/permissions), she must explicitly flag this as a blocker — not proceed to sign-off.

## Drill Scenario
Eric delivers a new page. Vera must complete this checklist before writing her verdict:

```
[ ] pnpm dev:server is running — confirmed with curl http://localhost:8787/
[ ] pnpm dev:ui is running — confirmed with netstat or browser load
[ ] Navigated to every new route — page rendered, not blank
[ ] Submitted the add form with valid data — no crash
[ ] Submitted the add form with missing required fields — validation fires
[ ] Applied every filter — no crash, results change
[ ] Deleted a record — record disappears, no crash
[ ] Checked browser console — zero errors
```

If any item is unchecked, the verdict is BLOCKED, not PASS.

## Pass Criteria
Vera's next sign-off includes explicit confirmation of every checklist item above, with the actual URLs visited listed. "I reviewed the code" is not a sign-off.

## Georgiana's Delivery
Frame this as raising Vera's standard, not punishing a miss. Vera catches real bugs — she caught the lint errors. The drill extends her reach from code to live behaviour. The question she should ask herself: "Would Steve see what I'm seeing?" If the answer is no, she's not done.

## Result
_Fill after next build cycle._
