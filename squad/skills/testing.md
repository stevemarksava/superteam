# Skill Card: Testing Strategy
> Owned by: Vera (quality gate) · Eric (exit gate)
> This card covers testing types, when to use each, and Vera's test library.

---

## Testing Philosophy

**Vera's rule:** Code is broken until proven otherwise. Tests don't prove code is good — they prove it does what was specified. Know the difference.

**Eric's rule:** The test suite is not the quality gate. The browser is. Running `pnpm lint` and `npx tsc` is the floor, not the ceiling.

---

## Testing Types — When to Use Each

### 1. Manual Browser Testing (Always — Vera owns)
**When:** Every build, every feature, every change to a user-facing route.
**What it catches:** Blank pages, runtime crashes, layout breaks, form submission failures, console errors.
**What it doesn't catch:** Logic bugs in non-UI code, race conditions, load issues.

Vera's browser checklist is the minimum. See `DEFINITION_OF_DONE.md`.

### 2. Static Analysis (Always — Eric owns)
**When:** Before every "build complete" message.
**Tools:** `pnpm lint`, `npx tsc --noEmit`
**What it catches:** Type errors, unused variables, obvious code smell, ShadCN/Radix misuse.
**What it doesn't catch:** Runtime behaviour, integration bugs.

Zero errors is the floor. Not "mostly clean."

### 3. API Testing (Always when new routes added — Superman smoke tests)
**When:** Every new API endpoint.
**Tools:** `curl`, browser network tab, Postman.
**What it catches:** Endpoint unreachable, wrong response shape, auth not applied, unhandled errors.

Superman's smoke test covers this — one curl per new endpoint before delivery.

### 4. Integration Testing (Recommended — Eric writes, Vera executes)
**When:** Multi-step flows (create entity → verify it appears → delete → verify cascade).
**Tools:** Manual test scripts, or automated with Playwright/Vitest.
**What it catches:** Cross-feature bugs, cascade failures, state corruption between operations.

For MVP builds, manual integration testing is acceptable. For production systems, automate.

### 5. Edge Case Testing (Always — Vera owns)
**When:** Every form, every filter, every user input.
**Scenarios to always test:**
- Empty required field → validation fires
- Invalid format (bad email, future date where past required) → validation fires
- Extremely long input → UI doesn't break
- No data state → empty state renders, not a crash
- Rapid interaction → no duplicate submissions

### 6. Regression Testing (Always after changes — Vera owns)
**When:** After any significant change to existing code.
**What to test:** Everything that was working before. Not just the new thing.
**Common failure:** Fixing one thing breaks another. Vera catches this. Eric didn't cause it intentionally — regression tests exist to catch unintended side effects.

---

## Vera's Test Library — Common Scenarios

### CRUD Entity
```
[ ] Create with all fields — record appears in list
[ ] Create with only required fields — record appears in list
[ ] Create with missing required field — validation fires, no record created
[ ] Create with invalid field (bad email, too long) — validation fires
[ ] Read — record appears with correct data
[ ] Filter by field — only matching records show
[ ] Filter with no matches — empty state renders
[ ] Delete — record disappears from list
[ ] Delete last record — empty state renders
[ ] Cascade: delete parent — children disappear
```

### Authentication / Access
```
[ ] Unauthenticated request — 401 returned
[ ] Authenticated request — 200 returned with correct data
[ ] Wrong role — 403 returned (not 500)
[ ] Token expired — redirect to login (not a crash)
```

### Forms
```
[ ] Submit with all valid data — success, no crash
[ ] Submit with empty required field — validation message appears
[ ] Submit twice quickly — no duplicate record
[ ] Cancel / close — form resets, no partial data saved
[ ] Long string in text field — UI doesn't overflow or crash
```

### Navigation
```
[ ] Every new route navigates correctly
[ ] Browser back button works — no crashes
[ ] Direct URL to new route — loads correctly (not a blank page)
[ ] 404 route — handled gracefully
```

---

## Common Testing Failure Patterns

| Pattern | Agent | Description | Fix |
|---------|-------|-------------|-----|
| Code-only sign-off | Vera | Verdict written without opening a browser | Run the app first, always |
| Happy path only | Vera | Only tests the success case | Always test the empty, error, and edge cases |
| Lint skipped | Eric | "Build complete" without running lint | Lint is mandatory. No exceptions. |
| Regression ignored | Both | New feature tested, existing features not re-checked | Run through core flows on every delivery |
| Verdict flip | Vera | Writes FAIL then reverses in same document | Read everything. Write verdict once. |

---

## When to Automate vs Manual

| Scenario | Manual OK | Automate When |
|----------|-----------|---------------|
| MVP / prototype | Yes | It ships to real users |
| One-time data migration | Yes | It runs more than once |
| CRUD on a single entity | Yes | You have 5+ entities |
| Auth flow | Manual first | After 2nd sprint |
| Regression on core flows | Manual first | You've regressed twice |

Rule of thumb: **automate the test the third time you run it manually.**
