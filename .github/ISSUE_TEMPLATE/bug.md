---
name: Bug Report
about: Something is broken or behaving unexpectedly
title: '[BUG] '
labels: bug
assignees: ''
---

## What's Broken

[One sentence: what is wrong.]

## Steps to Reproduce

1.
2.
3.

**Expected:** [What should happen]
**Actual:** [What actually happens]

---

## Context

- **When did this start?** [After a specific build / always / unknown]
- **Environment:** [ Local dev / Staging / Production ]
- **Browser / OS:** [if UI bug]

---

## Recon Checklist

Before Eric touches code, Athanasios checks:

- [ ] Is this a config issue? (env vars, missing files, wrong ports)
- [ ] Is this a dependency issue? (version mismatch, missing package)
- [ ] Is this a data issue? (bad seed data, migration not applied)
- [ ] Is this a code issue? (logic bug in files we own)

**Root cause hypothesis:** [What do we think is actually broken?]

---

## Severity

[ CRITICAL — blocks all work / MAJOR — significant user impact / MINOR — low impact, workaround exists ]

---

## Notes

[Error messages, stack traces, screenshots, anything useful.]
