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

## Brain Sync — 2026-06-21
- Always check Turbopack native binary availability for the target platform before upgrading Next.js major — win32/arm64 may require --webpack fallback _(conf: 0.75)_
- Research output from Athanasios is input to Bob's blueprint — never let Eric start building on a research finding without Bob reviewing the architecture first _(conf: 0.75)_
- Superman starts designing solo before squad review — pre-build gate must run before any architecture decision. _(conf: 0.75)_
- Always verify package versions from supplier website before specifying in a blueprint — never from memory. _(conf: 0.75)_
- Confidence hierarchy must be enforced in code not just docs — who confirms matters as much as what is confirmed. _(conf: 0.75)_
- Seed scripts with multiline SET statements break when split by semicolons — collapse all SET clauses to a single line _(conf: 0.75)_
- Bob must read .squad/decisions/ before making any architectural changes — logged decisions must not be contradicted without a formal override _(conf: 0.75)_
- Never replace a widely-referenced foreign key when adding multi-party support — add a junction table to avoid cascading changes across RLS, graph, dashboard, session notes _(conf: 0.75)_
- Google OAuth as sole identity provider requires a documented manual recovery runbook before drivers go live _(conf: 0.75)_
- GitHub API at request time adds latency, rate limits, and secret exposure risk — never fetch methodology content from GitHub at runtime when bundled files work equally well _(conf: 0.75)_
- Static methodology content belongs in bundled YAML files not in Supabase — Supabase is for operational data not reference content _(conf: 0.75)_
- PostgREST subquery workaround: split into two separate queries and merge in JS with a Set for dedup — clean, fast, no views needed _(conf: 0.75)_
- Resist putting checklists and methodology content in the DB — static arrays in the page file are simpler unless different circuits need different content _(conf: 0.75)_
