# Skill Card: Compliance, Privacy & Legal
> Owned by: Athanasios (researches requirements) · G (costs of compliance) · Bob (designs compliant architecture) · Kryptonite (red-teams compliance gaps)
> Brief Nexus when the project involves Microsoft Purview, Azure Policy, or M365 compliance features.

---

## When This Skill Applies

Use this card when the project involves any of:
- Personal data of EU residents (GDPR mandatory)
- Health data (HIPAA if US, NEN 7510 if Netherlands)
- Financial data (PCI-DSS for card data, DORA for EU financial entities)
- Data exchange between organisations (iSHARE, IDSA/Gaia-X governance)
- Government or public sector data (NIS2, BIO baseline)
- Children's data (COPPA, GDPR Article 8)
- Any system that will be certified, audited, or tendered

**Not this card:** Basic input validation, auth, or "don't hardcode API keys." That's the standard quality bar. This card is for regulated environments.

---

## GDPR (General Data Protection Regulation)
Applies to: any personal data of EU residents, regardless of where the organisation is based.

### The 6 lawful bases for processing
1. **Consent** — freely given, specific, informed, unambiguous. A pre-ticked box is not consent.
2. **Contract** — processing necessary to perform a contract with the data subject
3. **Legal obligation** — required by law
4. **Vital interests** — protecting someone's life (rare)
5. **Public task** — official authority or public interest
6. **Legitimate interests** — must be balanced against the individual's rights (grey area — document the assessment)

### What every GDPR-relevant system needs

**At architecture level (Bob):**
- Data minimisation — collect only what you need
- Purpose limitation — don't use data for something other than what it was collected for
- Storage limitation — define retention periods, implement deletion
- Data residency — EU data must stay in the EU (Azure: use EU regions, disable geo-replication outside EU)

**In the build (Eric):**
- Right to erasure (Article 17) — users can request deletion; implement a deletion endpoint
- Right to access (Article 15) — users can export their data; implement a data export endpoint
- Consent management — track when consent was given, to what, and a mechanism to withdraw it
- Pseudonymisation where possible — store user IDs rather than names in logs

**In the docs (Kevin):**
- Privacy notice — plain language description of what data is collected and why
- Data Processing Agreement (DPA) — required when using third-party processors (cloud providers, analytics tools)
- Record of Processing Activities (RoPA) — internal register of all data processing; legally required for organisations >250 employees

### GDPR checklist before launch
- [ ] Lawful basis documented for each data processing activity
- [ ] Privacy notice written and accessible
- [ ] Consent mechanism implemented (if consent is the lawful basis)
- [ ] Data retention periods defined and automated deletion in place
- [ ] Right to erasure endpoint exists
- [ ] Data export endpoint exists
- [ ] Data residency confirmed (EU data in EU regions)
- [ ] Third-party processors have DPAs in place
- [ ] DPA signed with any cloud provider handling personal data

---

## iSHARE / IDSA Data Space Governance
Relevant to: federated data exchange between organisations (Steve's domain — consult Steve directly)

**What it is:** A trust framework for secure, governed data sharing between organisations. Replaces bilateral contracts with a standardised governance layer.

**Key concepts:**
- **Participant** — any organisation in the data space
- **Data Provider** — exposes data via a connector
- **Data Consumer** — accesses data via a connector
- **Authorisation Registry** — enforces access policies
- **iSHARE Satellite** — trust anchor that validates participant identity

**Athanasios's role:** Research which participants, connectors, and governance policies apply. File in `knowledge/recon/[project].md`.

**Bob's role:** Design the connector integration and data exchange architecture.

**Note:** Steve has direct experience with iSHARE and IDSA from PortGuard. Always consult Steve before blueprinting a data space architecture.

---

## NIS2 (Network and Information Security Directive)
Applies to: essential and important entities in the EU (energy, transport, health, digital infrastructure, public administration, and more)

**Key obligations:**
- Risk management measures (technical + organisational)
- Incident reporting to national authority within 24 hours (initial) and 72 hours (full report)
- Supply chain security (assess your suppliers' security posture)
- Cybersecurity hygiene (MFA, patching, access control)

**Athanasios checks:** Does this project's operator fall under NIS2? If yes, flag to Superman before build starts.

---

## Privacy by Design (PbD)
7 principles — applied at architecture stage, not bolted on at the end:

1. **Proactive, not reactive** — prevent privacy problems before they occur
2. **Privacy as the default** — most privacy-protective settings are the default, not opt-in
3. **Privacy embedded into design** — not a feature, part of the architecture
4. **Full functionality** — positive-sum, not zero-sum (privacy AND security, not privacy OR security)
5. **End-to-end security** — lifecycle protection, secure deletion at end of life
6. **Visibility and transparency** — auditable, open to verification
7. **Respect for user privacy** — user-centric, consent-first

Bob applies these at blueprint stage. Kryptonite challenges whether they're actually in the design.

---

## Compliance Architecture Patterns (Bob's toolkit)

### Data residency
- Azure: choose region at resource creation. EU data → West Europe (Netherlands) or North Europe (Ireland).
- Disable geo-redundancy outside the residency boundary.
- Audit with Azure Policy — flag non-compliant resources automatically.

### Encryption
- In transit: TLS 1.2+ mandatory. TLS 1.3 preferred.
- At rest: Azure Storage, SQL, Cosmos all encrypt by default. Verify it's not disabled.
- Key management: Azure Key Vault. Customer-managed keys (CMK) for regulated data.

### Access control
- Principle of least privilege — every service identity gets only what it needs
- Azure RBAC — role assignments auditable, reviewable
- Privileged Identity Management (PIM) — just-in-time access for admin roles

### Audit logging
- Azure Monitor + Log Analytics — every access, every change, tamper-evident
- Retention: GDPR doesn't specify, but 12 months is common practice
- Alert on: admin access outside business hours, bulk data export, failed auth spikes

---

## Compliance Cost (G's input required)

Compliance is not free. G flags these costs before build starts:

| Compliance area | Typical cost driver |
|----------------|---------------------|
| GDPR | DPA legal fees, consent management tooling, ongoing DPO retainer if required |
| Data residency | Premium for EU-only Azure regions vs global |
| Encryption (CMK) | Azure Key Vault Premium tier, latency overhead |
| Audit logging | Log Analytics workspace costs scale with data volume |
| NIS2 | External security audit, incident response retainer |
| iSHARE | Connector licensing, satellite registration fees |

**Rule:** No compliant system ships without G signing off on the compliance cost model.

---

## Red Flags Kryptonite Watches For

- "We'll add GDPR compliance later" — no you won't, it's architecture
- "We don't need a DPA, it's just one API call" — yes you do
- "Users agree by using the service" — not valid GDPR consent
- "We store it in the US but the users are in the EU" — that's a cross-border transfer, needs a legal mechanism
- "The data is anonymised" — re-identification risk is often underestimated; Athanasios checks
- "We don't need to delete data, we might need it later" — that's not how GDPR works
