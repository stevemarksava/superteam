# Skill Card: Code Review & Red Team
> Owned by: Kryptonite (red team before build) · Vera (quality gate after build)
> Read this before running a red team or code review.

---

## Two Different Things

**Red team (Kryptonite — before Eric builds):** Attack the plan, not the code. Find the assumption that's wrong, the risk that's been ignored, the requirement that's ambiguous. The goal is to save Eric from building the wrong thing.

**Code review (Vera — after Eric builds):** Verify the code does what the brief says. Find bugs, missing edge cases, security gaps. The goal is to prevent broken code reaching Steve.

They are not interchangeable. Both must happen on every build, every mode.

---

## Kryptonite's Red Team Process

### When to run
- Mandatory on every build, every mode — before Eric starts
- Never skip because the plan "seems obvious" or the task is small

### What to attack

**1. The assumptions**
- What is the team assuming is true that hasn't been verified?
- What does the plan depend on that could be wrong?
- Example: "We're assuming the API returns data synchronously" — has this been tested?

**2. The requirements**
- Which acceptance criteria are vague enough to cause arguments later?
- What edge cases does the plan not cover?
- What does "done" look like if Steve is in a bad mood vs a good mood?

**3. The architecture**
- What breaks first when this feature gets used at 10× expected load?
- What's the hardest thing to change later if the design is wrong?
- What would a hostile user do with this feature?

**4. The risks**
- What third-party dependency could fail at the worst moment?
- What's the data loss scenario?
- What's the security exposure?

**5. The blind spots**
- What is the team too close to see?
- What would someone from outside the project say about this plan?

### Red Team Report Format
```
KRYPTONITE — RED TEAM REPORT
Plan: [name]
Date:

CRITICAL RISKS (must address before build starts):
1. [risk] — [why it matters] — [recommended mitigation]

SIGNIFICANT RISKS (address or explicitly accept):
2. [risk] — [why it matters] — [recommended mitigation]

ASSUMPTIONS TO VERIFY:
- [assumption] — [how to verify]

BLIND SPOTS:
- [what the team hasn't thought about]

VERDICT: [ CLEAR TO BUILD / BUILD WITH CONDITIONS / DO NOT BUILD YET ]
Conditions (if applicable): [what must change before Eric starts]
```

---

## Vera's Code Review Process

### What to check

**Correctness**
- Does the code do what the brief says?
- Are all acceptance criteria covered?
- Does the code handle the unhappy path (missing data, failed API calls, invalid input)?

**Security basics**
- Is user input validated before it reaches the database?
- Are there any obvious injection points?
- Are API keys or secrets hardcoded anywhere?
- Does the auth check happen before data is returned?

**Integration**
- Does this code break anything that was working before?
- Are all new routes wired up correctly?
- Do the TypeScript types actually match what the API returns?

**Code quality**
- Are there `any` types that shouldn't be there?
- Are there commented-out code blocks left in?
- Are there `console.log` statements left from debugging?

### What NOT to do
- Don't review style — that's lint's job
- Don't suggest refactors beyond what the brief asks for
- Don't withhold a PASS because you'd have done it differently
- Don't reverse your verdict in the same report — read everything first, then write

---

## Common Failure Patterns (from game tape)

| Pattern | Who | Description |
|---------|-----|-------------|
| Declare done before lint | Eric | Reporting build complete before running `pnpm lint`. Always zero lint errors before done. |
| Code-only sign-off | Vera | Writing a verdict without opening a browser. Runtime bugs are invisible in code review. |
| Assumption not challenged | Kryptonite | Red team skipped on "simple" features. Simple features have simple blind spots. |
| Verdict reversal | Vera | Writing FAIL then changing to PASS in the same document. Read everything, then write once. |
