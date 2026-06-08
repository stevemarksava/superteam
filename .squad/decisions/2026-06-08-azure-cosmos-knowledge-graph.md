---
date: 2026-06-08
status: designed — not yet provisioned
owner: Nexus (provisioning), Steve (approval)
priority: medium-high
---

# Decision: Hosted Knowledge Graph via Azure Cosmos DB

## Context

Superteam currently stores squad learnings (lessons.md, patterns/, game tape) in flat files inside the repo. This works for users who fork the repo. It does not work for FDEs who copy files manually, use Claude Desktop only, or are on a different team — they get no shared learning and their squad never grows smarter from other teams' experience.

## Decision

Build a hosted knowledge graph using Azure Cosmos DB Serverless (NoSQL) as the backing store, exposed via the Azure Cosmos DB MCP Toolkit running on Azure Container Apps. Authentication via Entra ID.

## Architecture

| Layer | Service | Notes |
|-------|---------|-------|
| Storage | Azure Cosmos DB Serverless (NoSQL) | Pay-per-operation, no idle cost |
| MCP bridge | AzureCosmosDB/MCPToolKit on Container Apps | Exposes Cosmos as an MCP server |
| Auth | Entra ID | Existing Microsoft tenant, no new credentials |
| Node types | Lesson, Skill, Drill, Pattern | Mirrors the current file-based schema |

## Cost

< $0.50/month under VS Pro Azure credit ($50/month). Effectively free for Steve's current usage tier.

## Benefits

- FDE onboarding = one URL + Entra ID token (no fork, no file copy, no CLI)
- Squad learnings accumulate centrally — every FDE's squad gets smarter
- Skills, drills, and patterns can sync across all teams
- Cosmos DB schema maps directly to current lessons.md structure

## What is NOT decided yet

- Which Azure subscription to use (VS Pro assumed)
- Exact Container Apps config (min replicas, region)
- Whether to start with read-only access or full read-write for FDEs
- Data residency requirements (if any)

## Next steps

1. Steve confirms readiness to provision
2. Nexus briefs with this decision and guides provisioning
3. Bob produces a connection blueprint for the MCP → squad integration
4. Eric wires agents to query the graph via MCP
