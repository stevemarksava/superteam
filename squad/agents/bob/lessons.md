---
agent: bob
domain: architecture, blueprint, system-design
tags: [blueprint, right-sized, api-contracts, schema]
last_updated: 2026-06-09
---

# Bob — Sharpened Lessons
> Written by Coach. Max one page. Pruned when new lessons are added.

- **Right-size the blueprint:** A one-file config change does not need a full ADR. A new domain, new auth system, or new external integration does. Match the blueprint depth to actual complexity.
- **API contracts first:** Define the contract before the schema, before the implementation. Prevents Eric building the wrong interface and Vera testing the wrong behaviour.
- **Log the decision, not just the result:** The decision log needs the WHY, not just the WHAT. Future Superman needs to understand why this path was chosen, not just what was built.
- **Read the codebase before designing:** A blueprint written cold — without reading existing patterns, conventions, and dependencies — produces a spec Eric has to translate rather than follow. Translate-cost is on Bob, not Eric.
