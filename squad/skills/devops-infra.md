# Skill Card: DevOps & Infrastructure Operations
> Owned by: Bob (designs) · Eric (executes) · Nexus (Microsoft-specific patterns)
> This card covers beyond-basic deployment — containers, CI/CD pipelines, IaC, monitoring, secrets.

---

## When This Skill Applies

Use this card when the project involves any of:
- Containerisation (Docker, container registries)
- CI/CD pipelines beyond a simple push-to-deploy (GitHub Actions, Azure DevOps)
- Infrastructure as Code (Bicep, Terraform, ARM)
- Multi-environment management (dev / staging / prod)
- Secrets management (Key Vault, environment variables at scale)
- Monitoring, logging, alerting beyond basic console output
- Auto-scaling, load balancing, cost optimisation at infrastructure level
- Database migrations in production environments

Not this card: basic `git push` deploys to Vercel/Netlify/Firebase. That's Eric's standard toolkit. This card is for when infra becomes its own workstream.

---

## Containers (Docker)

### When to containerise
- App has complex dependencies that vary between environments
- Team has more than one developer
- Deployment target is Azure Container Apps, AKS, or any Kubernetes
- You need reproducible builds

### Dockerfile best practices
```dockerfile
# Multi-stage build — keep production image lean
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 8787
CMD ["node", "dist/index.js"]
```

**Gotchas:**
- Never copy `.env` files into the image — use environment variables at runtime
- Use `.dockerignore` — exclude `node_modules`, `.git`, `*.log`
- Pin base image versions — `node:20-alpine` not `node:latest`
- Non-root user in production: `USER node` before CMD

---

## CI/CD Pipelines

### GitHub Actions (default for this stack)
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test
```

**For Azure deployments — defer to Nexus** for Azure DevOps pipelines, Azure SWA GitHub Actions, and AKS deployment workflows.

### Pipeline stages (in order)
1. **Lint + type-check** — fast, catches most issues, no environment needed
2. **Unit tests** — fast, no external dependencies
3. **Build** — compile, bundle
4. **Integration tests** — needs a test environment
5. **Deploy to staging** — automated, gated on all above passing
6. **Deploy to production** — manual trigger or auto after staging soak

---

## Infrastructure as Code

### Bicep (Azure — Nexus owns detailed patterns)
Use Bicep for any Azure infrastructure that needs to be reproducible.
Brief Nexus for module structure and Avanade-recommended patterns.

### Terraform (multi-cloud or non-Azure)
Use Terraform when infrastructure spans multiple cloud providers.

### What must always be IaC
- Any production resource (storage, compute, networking)
- Any resource that costs money
- Any resource with security implications (firewall rules, IAM roles)

### What can stay manual (for now)
- Local dev tooling
- One-time data migrations
- Prototype/throwaway resources

---

## Secrets Management

**Never:**
- Hardcode secrets in code
- Commit `.env` files with real values
- Pass secrets as plain environment variables in CI logs

**Always:**
- Secrets in Azure Key Vault (production) or GitHub Secrets/Actions secrets (CI)
- `.env.example` in the repo, `.env` in `.gitignore`
- Rotate secrets that were ever accidentally committed — assume they're compromised

**Pattern for local dev:**
```
.env.example  ← committed, shows required keys with placeholder values
.env          ← gitignored, developer fills in real values locally
```

**Pattern for production:**
Azure Key Vault → Azure Managed Identity → App reads at startup (no secrets in env vars at all)

---

## Monitoring & Observability

### Minimum bar for production
- **Uptime monitoring** — know before Steve does when it's down (UptimeRobot, Azure Monitor)
- **Error tracking** — capture unhandled exceptions with context (Sentry, Application Insights)
- **Request logging** — structured logs with correlation IDs, not `console.log`

### Azure Application Insights (when on Azure — Nexus for setup)
```typescript
// Structured logging pattern
logger.info('Campaign created', {
  campaignId: campaign.id,
  userId: ctx.user.id,
  duration_ms: Date.now() - startTime
});
```

### Alerting (Bob designs, Eric wires)
Alert on: error rate spike, latency p95 > threshold, disk/memory approaching limit, cost approaching budget.
Do not alert on: every 404, every validation error, expected background noise.

---

## Database Migrations in Production

The highest-risk operation in any live system. Bob owns the strategy, Eric executes.

**Rules:**
1. Migrations are **always forwards-only** — write rollback scripts separately, never rely on auto-revert
2. **Never** drop a column in the same migration that stops using it — deprecate first, drop in the next release
3. **Test on a production-size data copy** before running on real production
4. **Have a verified backup** before any destructive migration
5. **Run during low-traffic windows** for any migration that locks tables
6. **Zero-downtime pattern:** add column nullable → deploy code that writes to both old + new → backfill → make non-nullable → remove old column (3 separate releases)

---

## Common Infrastructure Failure Patterns

| Pattern | Description | Fix |
|---------|-------------|-----|
| Works on my machine | Missing env vars, different Node version | Docker from day one, `.env.example` mandatory |
| Secrets in git | Credentials committed, repo public | gitleaks pre-commit hook, immediate rotation |
| Manual snowflake infra | One engineer knows how prod was set up | IaC everything that costs money |
| No monitoring | Steve finds out prod is down from a user | Uptime monitor + error tracking before launch |
| Migration without backup | Data loss during schema change | Backup, test on copy, then run |
