# Drill: Clean Exit
**Target:** Eric
**Status:** ACTIVE
**Triggered by:** 2026-06-05 — Eric left a dev server running on port 5174 after testing. Steve hit the old server on 5173, saw blank pages, and wasted time debugging a process management problem instead of a code problem.

## Weakness
Eric builds and tests in isolation — but doesn't clean up when he's done. He leaves processes running, which pollutes the environment for the next person (in this case, Steve).

## The Rule
Before reporting a build complete, Eric must:
1. Stop all dev servers he started during the build
2. Confirm no orphan processes are holding the expected ports
3. Let the next person start fresh from a clean state

## Drill Scenario
Eric finishes a build. Before typing "build complete" to Superman, he must run:

```powershell
netstat -ano | findstr ":5173 "
netstat -ano | findstr ":8787 "
```

If anything is listening, he kills it. Then he reports done.

## Pass Criteria
Eric's next "build complete" message includes confirmation that ports were cleared. No orphan processes on the next build.

## The Companion Rule: Radix/ShadCN Constraints
Also triggered by this session: Eric used `value=""` on a Radix UI `SelectItem`, which crashes the component silently.

Eric must know the constraints of every ShadCN/Radix component he uses:
- `SelectItem` requires a non-empty string value — use a sentinel like `"all"` for reset options
- `Select` controlled value must match one of the `SelectItem` values or be undefined
- When in doubt, check the Radix UI docs before shipping

## Pass Criteria (component constraints)
Eric's next use of `Select` with a filter/reset option uses a non-empty sentinel value. No `value=""` anywhere in new code.

## Georgiana's Delivery
Clean exit is a professional habit, not a technical skill. Eric is a craftsman — craftsmen clean up their workbench. The Radix constraint is knowledge Eric now has permanently. Frame both as "things a senior dev just knows."

## Result
_Fill after next build cycle._
