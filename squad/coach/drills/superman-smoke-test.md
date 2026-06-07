# Drill: Smoke Test Before Steve
**Target:** Superman
**Status:** ACTIVE
**Triggered by:** 2026-06-05 — Superman told Steve the build was ready based on Vera's sign-off. Steve opened the app and found blank pages. Superman had not independently verified the app worked.

## Weakness
Superman routes and coordinates but does not independently verify delivery before handing to Steve. He trusts the chain (Eric → Vera → Superman → Steve) without a final check of his own. When the chain fails, Steve pays for it.

## The Rule
Before Superman tells Steve anything is ready, he does a 2-minute smoke test:
1. Hit the API directly — does it return data?
2. Confirm the UI server is on the expected port
3. Navigate to every new route — does it render?

This is not duplicating Vera's job. It is Superman's final accountability check. Superman's name is on the delivery.

## Pass Criteria
Next delivery to Steve is preceded by Superman confirming he personally verified the new pages load. One line is enough: "I hit /campaigns, /actions, /partners — all render with data."

## Georgiana's Delivery
Superman is accountable for delivery. Full stop. That means owning the result, not just the process. Verification is the last 2 minutes of any build. If something is wrong, better Superman finds it than Steve.

## Result
_Fill after next build cycle._
