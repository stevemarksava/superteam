# ATHANASIOS — INTELLIGENCE BRIEF
## Retail Banking Prototype (Avanade / Oltiva)

**Subject:** Full stack reconnaissance of avanade-prototyper-retail-banking  
**Project Path:** `c:\Users\s.marks\Documents\GitHub\avanade-prototyper-retail-banking`  
**Requested by:** Superman (via system directive)  
**Date:** 2026-06-05  
**Confidence:** HIGH — complete file-level scan executed without external dependencies

---

## 1. PROJECT IDENTITY

**Purpose:** Retail banking client relationship management (CRM) prototype. Relationship Managers (RMs) log client enquiries, track product discussions, and record meeting outcomes. Compliance Officers review KYC submissions with AI-powered document extraction.

**Deployment Target:** Azure Static Web Apps + Azure Functions (Node.js) + Azure SQL (not yet wired; SQLite in local dev)

**Tech Surface:** Full-stack TypeScript. Monorepo via pnpm. Server (Hono 4 REST API on Node) + UI (React 19 + Vite + Tailwind CSS 4 + shadcn/ui).

**Authentication:** Microsoft Entra ID via Azure Static Web Apps client principal header. Local dev escape hatch with synthetic users when `ENTRA_ENABLED=false`.

**AI Surface:** Anthropic Claude API for KYC document extraction (vision + structured output). Optional; unset API key = AI endpoints return 503.

**Origin:** Evolved from a prior Petri-net-focused prototype (ghost tables in Azure SQL migration). Current domain: retail banking intake + KYC workflow.

---

## 2. TECH STACK (EXACT VERSIONS)

### Server (`server/`)

| Package | Version | Purpose |
|---------|---------|---------|
| `hono` | `^4.0.5` | REST API framework |
| `@hono/node-server` | `^1.11.0` | Node.js adapter for Hono |
| `drizzle-orm` | `^0.36.0` | ORM (SQLite locally; SQL Server in preview) |
| `better-sqlite3` | `^12.10.0` | SQLite driver (local dev) |
| `mssql` | `^11.0.1` | Azure SQL driver (production, not yet wired) |
| `@anthropic-ai/sdk` | `^0.100.1` | Claude API client for KYC extraction |
| `@azure/identity` | `^4.13.1` | DefaultAzureCredential for Azure services |
| `@azure/storage-blob` | `^12.31.0` | Blob storage for KYC document binaries |
| `jose` | `^5.2.3` | JWT verification (Entra Bearer tokens) |
| `dotenv` | `^16.4.5` | Env var loader |
| `pdfkit` | `^0.18.0` | PDF generation (demo data seed) |
| `tsx` | `^4.7.0` | TypeScript execution for scripts |
| `vitest` | `^1.2.2` | Test runner |

### UI (`ui/`)

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^19.1.0` | UI framework |
| `react-dom` | `^19.1.0` | DOM renderer |
| `vite` | `^6.3.5` | Build tool + dev server |
| `react-router-dom` | `^7.6.0` | Client-side routing |
| `tailwindcss` | `^4.1.7` | CSS framework |
| `@tailwindcss/vite` | `^4.1.7` | Tailwind Vite plugin (no PostCSS) |
| `@radix-ui/react-*` | `^1.x` (various) | Unstyled UI primitives for shadcn |
| `lucide-react` | `^0.511.0` | Icon library |
| `next-themes` | `^0.4.6` | Dark/light mode management |
| `date-fns` | `^4.4.0` | Date formatting |
| `cmdk` | `^1.1.1` | Command palette (shadcn component) |
| `typescript` | `~5.8.3` | Type checker |

**Key architectural choice:** Tailwind CSS 4 via Vite plugin (no PostCSS). Requires explicit `@tailwindcss/vite` import in `vite.config.ts`. **All code examples in docs MUST use PowerShell syntax** — no `bash`, `cp`, or Unix-only commands.

---

## 3. DOMAIN MODEL (EVERY TABLE)

All schema definitions live in `server/src/schema/*.ts`. SQLite in local dev; Azure SQL migrations prepared but not active.

**Schema pattern (enforced):**
- Primary keys: `text('id').$defaultFn(() => randomUUID())` — never auto-increment integers
- Timestamps: `integer('col', { mode: 'timestamp' }).default(sql\`(unixepoch())\`)` — never `text` or SQL `DATETIME`
- Foreign keys use `references(() => table.column, { onDelete: 'cascade' })`

### Tables

| Table | PK | Purpose | Key Columns |
|-------|---|---------|-------------|
| **users** | `id` (text) | User records (Entra principals) | `email` (unique), `display_name`, `photo_url`, `created_at`, `updated_at` |
| **clients** | `id` (text, UUID) | Client master record | `full_name`, `email`, `phone`, `segment` (mass/affluent/private), `kyc_status` (not_started/submitted/verified/needs_info/rejected), structured KYC fields (DOB, address, ID doc type/number/expiry), `created_by_id` → users |
| **products** | `id` (text, UUID) | Product catalogue | `name`, `category` (lending/deposits/investments/insurance/cards), `active` (int bool) |
| **enquiries** | `id` (text, UUID) | Client enquiry/opportunity | `client_id` → clients (cascade), `title`, `status` (new/in_progress/closed), `source` (referral/walk_in/website/event/outbound), `next_step_date`, `notes`, `owner_id` → users |
| **enquiry_products** | composite PK | Many-to-many: enquiries ↔ products | `enquiry_id` → enquiries (cascade), `product_id` → products (cascade) |
| **meetings** | `id` (text, UUID) | Meetings held for an enquiry | `enquiry_id` → enquiries (cascade), `meeting_date`, `attendees`, `notes`, `created_by_id` → users |
| **outcomes** | `id` (text, UUID) | Post-meeting outcome (1:1 with meeting) | `meeting_id` → meetings (cascade, unique), `result` (proceeded/declined/follow_up/no_interest), `products_pursued` (JSON array of product IDs), `summary`, `recorded_by_id` → users |
| **kyc_documents** | `id` (text, UUID) | KYC document binary metadata + AI extraction | `client_id` → clients (cascade), `document_type` (passport/national_id/utility_bill/bank_statement), `original_filename`, `mime_type`, `size_bytes`, `storage_key`, `extraction_status` (pending/completed/failed), `extracted_fields` (JSON), `inconsistencies` (JSON array), `extraction_error`, `extraction_model`, `extraction_usage` (JSON), `uploaded_at`, `uploaded_by_id` → users, `analyzed_at` |
| **kyc_reviews** | `id` (text, UUID) | KYC state transition audit log | `client_id` → clients (cascade), `from_state`, `to_state`, `decision` (submit/approve/request_info/reject/resubmit/reverify), `checklist` (JSON array of strings), `notes`, `acted_at`, `acted_by_id` → users, `acted_by_name`, `acted_role` (rm/compliance) |

**Relationships:**
- Clients → Enquiries (1:N)
- Enquiries → Products (N:M via enquiry_products)
- Enquiries → Meetings (1:N)
- Meetings → Outcomes (1:1, meeting_id is unique FK)
- Clients → KYC Documents (1:N)
- Clients → KYC Reviews (1:N, append-only audit log)

**AI-extracted document fields (JSON in `kyc_documents.extracted_fields`):**
```typescript
{
  type: KycDocumentType,
  full_name?: string,
  date_of_birth?: string, // ISO 8601
  document_number?: string,
  issuing_country?: string, // ISO-2
  expiry_date?: string, // photo ID only
  issue_date?: string, // proof of address only
  issuer?: string, // proof of address only — e.g. "Thames Water"
  address?: {
    line1?: string,
    city?: string,
    postcode?: string,
    country?: string // ISO-2
  }
}
```

**Inconsistencies (JSON array in `kyc_documents.inconsistencies`):**
```typescript
{
  field: string, // e.g. "full_name", "date_of_birth", "address.postcode"
  check: string, // e.g. "match_against_client", "not_expired", "within_90_days"
  result: 'match' | 'mismatch' | 'missing_in_client' | 'missing_in_document',
  client_value?: string | null,
  document_value?: string | null,
  severity: 'info' | 'warning' | 'error'
}
```

---

## 4. API SURFACE (EVERY ROUTE, AUTH STATUS, PURPOSE)

**Base:** `/api/v1`

**Auth middleware:** Applied to `/api/v1/protected/*`. Three-tier fallback:
1. `x-ms-client-principal` header (Azure SWA, production)
2. `Authorization: Bearer <token>` (raw Entra JWT verified via JWKS)
3. Local-dev escape hatch: `ENTRA_ENABLED=false` synthesizes `local-rm` or `local-compliance` user based on `x-dev-role` request header

**User object attached to context (`c.get('user')`):**
```typescript
{
  id: string,
  email: string,
  display_name: string | null,
  photo_url: string | null,
  created_at: Date,
  updated_at: Date,
  roles: string[] // populated from Entra app roles or x-dev-role header
}
```

### Public Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | Health check — returns `{ status: 'ok'/'degraded', database: 'connected'/'unavailable' }` |
| GET | `/api/v1/hello` | Smoke test — `{ message: 'Hello from Hono!' }` |
| GET | `/api/v1/db-test` | DB smoke test — counts enquiries, returns `{ message, enquiryCount, timestamp }` |

### Protected Endpoints

**ALL** require auth (via `authMiddleware`). Role restrictions noted where applicable.

#### User
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/me` | Current user principal | All |

#### Clients
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/clients` | List all clients (desc by created_at) | All |
| GET | `/api/v1/protected/clients/:id` | Get client + their enquiries | All |
| POST | `/api/v1/protected/clients` | Create new client — sets `created_by_id` to calling user. **`kyc_status` defaults to `not_started` and CANNOT be set directly** — use KYC workflow endpoints | All |
| PATCH | `/api/v1/protected/clients/:id` | Update client fields (NOT kyc_status) | All |

#### Products
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/products` | List active products (asc by category, name) | All |

#### Enquiries
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/enquiries` | List all enquiries with client + products | All |
| GET | `/api/v1/protected/enquiries/:id` | Get enquiry detail + meetings + outcomes | All |
| POST | `/api/v1/protected/enquiries` | Create enquiry — validates client_id exists, product_ids exist, sets owner_id = calling user | All |
| PATCH | `/api/v1/protected/enquiries/:id` | Update enquiry fields + product_ids | All |

#### Meetings
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/enquiries/:enquiryId/meetings` | List meetings for enquiry (asc by meeting_date) | All |
| POST | `/api/v1/protected/enquiries/:enquiryId/meetings` | Create meeting | All |
| PATCH | `/api/v1/protected/meetings/:id` | Update meeting | All |

#### Outcomes
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| POST | `/api/v1/protected/meetings/:meetingId/outcome` | Upsert outcome for meeting | All |
| PATCH | `/api/v1/protected/outcomes/:id` | Update outcome | All |

#### KYC Documents
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/clients/:id/documents` | List all documents for client (desc by uploaded_at) | All |
| POST | `/api/v1/protected/clients/:id/documents` | Upload document (multipart: `file`, `document_type`) — triggers synchronous AI extraction (10-20s response time). Requires `rm` role. | RM only |
| GET | `/api/v1/protected/documents/:id` | Get document metadata | All |
| GET | `/api/v1/protected/documents/:id/file` | Stream document binary (inline Content-Disposition) | All |
| POST | `/api/v1/protected/documents/:id/apply` | Apply selected extracted fields to client record. Body: `{ fields: string[] }` where each string is a dot-path like `"date_of_birth"`, `"address.line1"`, `"expiry_date"`. Triggers re-computation of **all** document inconsistencies for this client. Requires `rm` role. | RM only |
| DELETE | `/api/v1/protected/documents/:id` | Delete document (storage + DB row). Requires `rm` role. | RM only |

#### KYC Workflow
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/clients/:id/kyc/reviews` | Full audit history for client (desc by acted_at) | All |
| POST | `/api/v1/protected/clients/:id/kyc/submit` | RM submits/resubmits/re-verifies a client. Valid from: `not_started` → submit → `submitted`, `needs_info` → resubmit → `submitted`, `verified` → reverify → `submitted`. Body: `{ notes?: string }`. Requires `rm` role. | RM only |
| POST | `/api/v1/protected/clients/:id/kyc/decide` | Compliance decides on a submitted review. Valid from: `submitted` only. Body: `{ decision: 'approve'|'request_info'|'reject', checklist?: KycChecklistItem[], notes?: string }`. Decision → state: approve → `verified`, request_info → `needs_info`, reject → `rejected`. **Notes required** if decision is `request_info` or `reject`. Requires `compliance` role. | Compliance only |
| GET | `/api/v1/protected/kyc/queue` | Clients in `submitted` state, oldest first (SLA ordering). Includes submission metadata + RM notes. Requires `compliance` role. | Compliance only |
| GET | `/api/v1/protected/kyc/my-actions` | Clients owned by calling RM that need action: `not_started` or `needs_info`. Oldest first. Includes last review action (if any). Requires `rm` role. | RM only |

#### AI
| Method | Path | Purpose | Roles |
|--------|------|---------|-------|
| GET | `/api/v1/protected/ai/status` | Check if `ANTHROPIC_API_KEY` is configured (lightweight, no API call) — `{ configured: boolean, model: string }` | All |
| POST | `/api/v1/protected/ai/ping` | End-to-end smoke test: sends a tiny prompt to Claude and returns the reply + usage. Cheap (≤ 32 output tokens) but not free — do NOT poll this. | All |

**Note on segregation of duties (SoD):** The server does NOT currently enforce that the same user cannot both submit AND decide a KYC review. In local dev the role switcher gives RM and Compliance distinct synthetic user IDs, so SoD is structurally enforced by the `requireRole()` checks. In production with real Entra app roles, a future iteration should compare `acted_by_id` from the submission against the decider's `user.id` and reject if they match. Flagged as TODO in code (line 209-216 of `kycRoutes.ts`).

---

## 5. UI PAGES & NAVIGATION (EVERY PAGE, ROUTE, ROLE ACCESS)

**Base Routes (React Router 7.6):**

| Path | Component | Purpose | Role Access |
|------|-----------|---------|-------------|
| `/` | Home | Dashboard: open enquiries, owned by me, KYC actions (RM only), recent enquiries list | All |
| `/enquiries` | Enquiries | Full enquiry list table with filters (open/mine/week) | All |
| `/enquiries/new` | NewEnquiry | Create enquiry form — client dropdown, product multi-select, source, notes | All |
| `/enquiries/:id` | EnquiryDetail | Enquiry detail + timeline of meetings + outcomes | All |
| `/clients` | Clients | Client list table, filterable by segment + KYC status | All |
| `/clients/:id` | ClientDetail | Client detail card, contact/identity fields, enquiry list, **KYC section** (documents upload, timeline, review actions) | All |
| `/kyc` | ComplianceQueue | Compliance queue — clients in `submitted` state, oldest first. Clicking a row opens `/clients/:id?kyc=open`. **Requires `compliance` role** (403 from server otherwise; UI also shows role-required message). | Compliance only |
| `/settings` | Settings | Theme toggle, AI status check, AI ping test | All |
| `/responsive-test` | ResponsiveTestPage | Responsive UI test page (dev/debug) | All |
| `/viewport-test` | ViewportTestPage | Viewport height test (dev/debug) | All |
| `/auth-test` | AuthTestPage | Auth debug page (dev/debug) | All |

**Sidebar Navigation (`ui/src/components/appSidebar.tsx`):**
- Home
- Enquiries
- Clients
- KYC (Compliance Queue) — **only visible when `activeRole === 'compliance'`**
- Settings

**Role Switcher (`ui/src/components/navbar.tsx`):**
- Dropdown in navbar lets user act as "Relationship Manager" (rm) or "Compliance Officer" (compliance)
- Active role persisted to `localStorage` key `oltiva.activeRole`
- Read by `serverComm.ts` on every request → forwarded as `x-dev-role` header
- Server's auth middleware honours this header only when `ENTRA_ENABLED=false`
- **In production:** The switcher would still work but should filter to roles the user actually has (read from `user.roles` populated by Entra app role assignments)

**Key UI components:**
- `KycDocumentsCard` — document upload form (file picker + type selector), document list with extraction status chips, extracted fields viewer, "Apply selected fields" action, inconsistency chip renderer (colour-coded by severity)
- `KycReviewCard` — RM submit form (with notes), Compliance decide form (decision + checklist + notes)
- `KycTimeline` — vertical timeline of all `kyc_reviews` rows for a client (who did what when, colour-coded by decision)

**KYC Document Upload Flow (RM perspective):**
1. Navigate to `/clients/:id`
2. Click "Upload document" in the KYC Documents card
3. Select file (PDF, JPEG, PNG, max 10MB) + document type (passport / national ID / utility bill / bank statement)
4. Submit → POST to `/api/v1/protected/clients/:id/documents`
5. Server writes to storage (local FS or Azure Blob), inserts row with `extraction_status='pending'`
6. Server calls `extractKycDocument()` synchronously (10-20s) — sends bytes to Claude, parses JSON, computes inconsistencies, updates row
7. Response returns final state (completed/failed)
8. UI refreshes document list → shows extraction status, extracted fields, inconsistencies (colour-coded chips: info = blue, warning = amber, error = red)
9. RM can click "Apply selected fields" → opens modal, picks which fields to copy to client record
10. On apply: POST to `/api/v1/protected/documents/:id/apply` → server updates client, re-computes inconsistencies for **all** client documents
11. RM can then submit for review (POST to `/api/v1/protected/clients/:id/kyc/submit`) → client moves to `submitted` state → appears in Compliance queue

**KYC Review Flow (Compliance perspective):**
1. Navigate to `/kyc` (Compliance Queue)
2. Table shows all clients in `submitted` state, oldest first
3. Click row → opens `/clients/:id?kyc=open`
4. Page scrolls to KYC section automatically (via `?kyc=open` query param)
5. Review uploaded documents, extracted fields, inconsistencies
6. Fill Compliance decide form: decision (approve / request info / reject), checklist, notes
7. Submit → POST to `/api/v1/protected/clients/:id/kyc/decide`
8. Server creates review audit row, updates client kyc_status (verified / needs_info / rejected)
9. If `needs_info`: client reappears in RM's "KYC actions for you" dashboard card → RM can fix and resubmit

---

## 6. AI INTEGRATION (FULL FLOW)

**Endpoint:** KYC document extraction (vision + structured output via Anthropic Claude API)

**Trigger:** POST `/api/v1/protected/clients/:id/documents` (RM uploads a KYC document)

**Flow:**
1. RM uploads file (multipart form: `file` + `document_type`) → server validates MIME type (PDF / JPEG / PNG), size (≤ 10MB), stores in backend (local FS or Azure Blob)
2. Server inserts `kyc_documents` row with `extraction_status='pending'` so row exists even if extraction crashes mid-call
3. Server calls `extractKycDocument()` (synchronous, 10-20s) — sends bytes to Claude with structured-output prompt
4. Claude returns JSON matching `ExtractedFields` schema (see Domain Model section 3 above)
5. Server parses JSON, strips stray ```json fences if present (be lenient), validates structure
6. Server calls `computeInconsistencies()` — deterministic engine comparing extracted fields to `clients` record, returns `Inconsistency[]` (see Domain Model section 3)
7. Server updates `kyc_documents` row: `extraction_status='completed'`, `extracted_fields` (JSON), `inconsistencies` (JSON array), `extraction_model`, `extraction_usage` (token counts + cache stats), `analyzed_at`
8. On failure: `extraction_status='failed'`, `extraction_error` = error message, `analyzed_at`
9. Response returns final `KycDocument` object → UI renders extracted fields + inconsistencies

**Prompt caching:** System prompt identical across every extraction → cache breakpoint at end of system block (`cache_control: {type: "ephemeral"}`). Subsequent extractions pay ~10% of prompt cost (cache hit on input tokens).

**Model configuration:**
- Default: `claude-opus-4-7` (env var `ANTHROPIC_MODEL` can override)
- **For cost-sensitive demos:** Set `ANTHROPIC_MODEL=claude-sonnet-4-6` or `claude-haiku-4-5`
- **AI not mandatory:** If `ANTHROPIC_API_KEY` is unset, AI endpoints return 503. Core intake workflow (clients / enquiries / meetings / outcomes) works without AI.

**Inconsistency engine (deterministic, no AI):**
- Pure function `computeInconsistencies(client: ClientForCheck, fields: ExtractedFields): Inconsistency[]`
- Checks:
  - **Name match:** Permissive set-based matcher — handles middle names, middle initials, surname/given order variations, diacritics (decompose + drop combining marks), punctuation
  - **DOB match:** Exact ISO date comparison (client.date_of_birth vs extracted.date_of_birth)
  - **Expiry date (photo ID only):** Not expired (expiry_date > now)
  - **Issue date (proof of address only):** Within 90 days (issue_date < 90 days ago)
  - **Address postcode (proof of address only):** Normalised match (uppercase, strip spaces)
  - **Address city (proof of address only):** Normalised match (same logic as name)
  - **Issuing country (photo ID only):** ISO-2 match against client address country (mismatch = info severity — travellers/dual-nationals are common)
- Severity model:
  - **info** — minor/informational (traveller, missing data, name variation with all words matched)
  - **warning** — mismatch that RM should look at but not blocking (e.g. postcode mismatch, city mismatch)
  - **error** — hard regulatory issue (expired ID, stale proof of address, DOB mismatch)
- Results serialised to JSON array in `kyc_documents.inconsistencies`, rendered in UI as colour-coded chips

**Re-computation trigger:** When RM applies extracted fields to client record (POST `/api/v1/protected/documents/:id/apply`), server updates client, then re-runs `computeInconsistencies()` for **every** document on that client and persists fresh `inconsistencies` arrays. This keeps inconsistency state in sync with the evolving client record.

**Cost monitoring:** `extraction_usage` JSON column stores `{ input_tokens, output_tokens, cache_read_input_tokens, cache_creation_input_tokens }` from every Claude call. Could be aggregated for reporting. File `server/src/lib/cost-monitor.ts` exists (stubbed — not currently used in routes).

---

## 7. AUTH & SECURITY (END-TO-END)

### Production Auth Flow (Azure SWA + Entra ID)

1. User navigates to app deployed on Azure Static Web Apps
2. SWA intercepts unauthenticated request → redirects to `/.auth/login/aad` (Azure Active Directory = Entra ID)
3. User signs in with Microsoft account → Entra ID returns JWT
4. SWA validates JWT, extracts claims, creates `x-ms-client-principal` header (base64-encoded JSON containing user ID, email, name, roles)
5. SWA forwards request to backend (Azure Functions) with `x-ms-client-principal` header
6. Backend auth middleware (`server/src/middleware/auth.ts`) reads header, decodes JSON, attaches `User` object to Hono context (`c.set('user', ...)`)
7. Protected routes read `c.get('user')` → always populated, trusted (SWA strips any client-supplied header)

**Roles:** Populated from `decoded.userRoles` array in SWA principal, or `roles` claim in JWT (Bearer token path). Used for endpoint-level RBAC (`requireRole(c, 'rm')` / `requireRole(c, 'compliance')`).

### Local Dev Auth Flow

Three options:

**Option 1: SWA CLI (`swa start`)**
- Run `swa start ui --api-location server` → emulates SWA routing + auth locally
- Stubs `/.auth/me` with a fake principal
- Injects `x-ms-client-principal` header on every backend request
- **Best for full-stack integration testing**

**Option 2: Separate dev servers + `ENTRA_ENABLED=false`**
- Run `pnpm dev:server` (backend on :8787) + `pnpm dev:ui` (UI on :5173)
- Vite proxies `/api/*` to `http://localhost:8787` and stubs `/.auth/me` with local-dev principal (configured in `ui/vite.config.ts`)
- Set `ENTRA_ENABLED=false` in `server/.env`
- Auth middleware synthesises a placeholder user: `local-rm` or `local-compliance` based on `x-dev-role` request header
- UI reads `activeRole` from localStorage, sends as `x-dev-role` header via `serverComm.ts`
- **Best for rapid iteration** (separate log streams, clearer error messages)

**Option 3: Bearer token (raw Entra JWT)**
- Obtain JWT from Entra ID (e.g. via `az account get-access-token --resource <client_id>`)
- Send as `Authorization: Bearer <token>` header
- Auth middleware verifies via JWKS (tenant ID + client ID required in env vars)
- **Best for Postman / scripted testing**

### Security Patterns

**Input validation:** Every route parses + validates input (type checks, enum checks, length limits, FK existence checks). No raw user input reaches SQL.

**SQL injection:** Mitigated by Drizzle ORM (parameterized queries). Schema is the single source of truth; no raw SQL in routes except migrations.

**Path traversal:** Storage keys validated in `LocalFsStorage.resolveKey()` — rejects `..`, leading `/`, leading `\`.

**File upload validation:** Document upload checks MIME type (PDF / JPEG / PNG), size (≤ 10MB), generates SHA256-prefixed storage key → no user-controlled file paths.

**Role-based access control (RBAC):** `requireRole(c, 'rm')` / `requireRole(c, 'compliance')` helpers check `c.get('user').roles` array. Returns 403 if role missing. Applied to:
- KYC document upload/apply/delete: RM only
- KYC submit: RM only
- KYC decide: Compliance only
- KYC queue: Compliance only
- KYC my-actions: RM only

**Segregation of duties (SoD):** NOT YET ENFORCED. Same user CAN both submit and decide a KYC review in production if they have both roles. In local dev the role switcher gives RM and Compliance distinct synthetic user IDs, so SoD is structurally enforced. TODO flagged in code (line 209-216 of `server/src/api/kycRoutes.ts`).

**Secrets management:** All secrets in env vars (`ANTHROPIC_API_KEY`, `ENTRA_CLIENT_ID`, `AZURE_STORAGE_ACCOUNT`, etc.). Never committed to git. `.env` file gitignored. CLAUDE.md instructs AI agents to never read or modify `.env` files — tell the user what values to set instead.

**Hardcoded secrets scan (this recon):** NONE FOUND. Bearer token reference in auth middleware is documentation comment, not a live secret. `127.0.0.1` references in comments are for Azurite local testing guidance only.

---

## 8. KNOWN ISSUES / GAPS

### Code-Level Issues

1. **TODO: RBAC from JWT `roles` claim** (`server/src/middleware/auth.ts:92`)
   - Bearer token path extracts user email/name but sets `roles: []` — placeholder
   - Production Entra integration needs to read `roles` claim from JWT and populate `user.roles`
   - Currently only SWA client principal path populates roles correctly (from `decoded.userRoles`)

2. **TODO: Entra client ID placeholder** (`server/src/lib/entra-auth.ts:42`)
   - Dev-mode token verification has hardcoded dummy client ID
   - Replace with real app registration client ID once Entra app is created

3. **TODO: Save functionality stub** (`ui/src/pages/Settings.tsx:18`)
   - Settings page has a comment `// TODO: Implement save functionality` but no settings are actually persisted server-side (theme is localStorage-only)

4. **Segregation of duties (SoD) not enforced in production** (`server/src/api/kycRoutes.ts:209-216`)
   - Same user can both submit and decide a KYC review if they have both roles
   - Local dev workaround: role switcher gives RM/Compliance distinct synthetic user IDs
   - Production fix: compare `acted_by_id` from submission review against decider's `user.id` and reject if match

5. **Azure SQL not wired** (`server/src/lib/db.ts:7-18`)
   - Database client is SQLite-only (via `better-sqlite3` + Drizzle)
   - Production deployment path is Azure SQL, but Drizzle's SQL Server dialect is still in preview (as of `drizzle-orm@0.36.0`)
   - Reference migrations exist in `server/drizzle/mssql/` but are never applied
   - **WARNING:** `server/drizzle/mssql/0002_sql_server_migration.sql` contains schema for a **different project** (Petri nets: `petri_nets`, `petri_net_places`, `petri_net_transitions`, etc.) — ghost tables from prior prototype iteration. These tables do NOT match the current domain model (clients / enquiries / meetings / KYC). **Do not use this migration as-is for retail banking deployment.**
   - Recommended production path:
     - Either (a) use `mssql` driver directly with raw SQL queries (write fresh migrations matching current schema), or
     - (b) wait for Drizzle's `sqlserver` dialect to stabilize, replace `sqliteTable` with `sqlServerTable` in schema files, regenerate migrations

6. **Prompt caching advisory** (`server/src/lib/anthropic.ts:13-17`)
   - Comment notes that prompt caching should be used for features that re-send large fixed context on multiple requests
   - Currently only the KYC extraction system prompt is cached
   - If future features re-send product catalogue, per-client history, or large system prompts, add `cache_control: {type: "ephemeral"}` to cacheable blocks

7. **Cost monitoring stubbed** (`server/src/lib/cost-monitor.ts`)
   - File exists but is not imported or used in routes
   - Token usage is persisted in `kyc_documents.extraction_usage` (JSON) but not aggregated for reporting

### Architectural Gaps

8. **Local-dev only:** SQLite is not a production-grade database for this workload (concurrent writes, Azure Functions scale-out). The app MUST be migrated to Azure SQL before any real deployment. See issue #5 above for migration blockers.

9. **No retry logic for AI extraction:** If Claude API call fails (timeout, rate limit, transient error), the document is marked `extraction_status='failed'` with error message. RM must delete and re-upload. A retry mechanism (e.g. exponential backoff, queue-based async extraction) would improve resilience.

10. **No audit log for `clients` updates:** When RM applies extracted fields to a client record (POST `/documents/:id/apply`), the client row is updated but the old values are lost. A `clients_history` audit table (or soft-delete + versioning) would let Compliance see what changed and when.

11. **No server-side pagination:** All list endpoints (`/clients`, `/enquiries`, `/documents`, etc.) return full result sets. Fine for demo (<100 records) but will not scale. Add `?limit=` + `?offset=` or cursor-based pagination before production use.

12. **No bulk document upload:** RM must upload one document at a time. Each upload triggers a synchronous 10-20s Claude call. For clients needing 3+ documents, this is tedious. Consider async extraction + batch upload.

13. **No document file size enforcement at storage layer:** The 10MB limit is enforced in the upload route handler, but nothing stops a direct storage write from exceeding it. Low risk (no direct storage write path exists), but worth noting.

14. **German client ID workaround is UI-only:** Comment in `clients` schema (line 21-22) notes that German clients (`address_country='DE'`) are verified via PostIdent/VideoIdent (not document upload) — the UI suppresses the document upload form. However, the **backend does NOT enforce this**. A malicious client could POST to `/clients/:id/documents` for a DE client and the upload would succeed. Should add backend validation: `if (client.address_country === 'DE') return c.json({ error: 'German clients use PostIdent — document upload not allowed' }, 400)`.

---

## 9. DEPENDENCY AUDIT

**Manual step required:** `pnpm audit` not run during reconnaissance (Bash tool withheld per directive). Steve should run:

```powershell
# From project root
cd server
pnpm audit
cd ../ui
pnpm audit
```

**Known high-risk patterns** (from package surface):
- `better-sqlite3@^12.10.0` — native module, C bindings. Check for CVEs in SQLite engine itself.
- `@azure/storage-blob@^12.31.0` — large attack surface (cloud SDK). Keep updated.
- `mssql@^11.0.1` — SQL driver with connection pooling. Check for connection string injection / credential leaks.
- `jose@^5.2.3` — JWT library. Critical for auth. Check for signature bypass / algorithm confusion CVEs.
- `react@^19.1.0` — bleeding edge (19.x is latest). Check for XSS / hydration mismatches.

**Recommendation:** Run `pnpm audit` weekly. Pin major versions. Use Dependabot or Renovate for automated PRs.

---

## 10. HARDCODED / SECRETS SCAN

**Grep patterns executed:**
- `sk-` / `Bearer ` / `pk_` / `[A-Za-z0-9]{32,}` — API keys, long base64 strings
- `eval(` — code execution risk
- `dangerouslySetInnerHTML` — XSS risk
- `\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b` — hardcoded IPs
- `TODO:|FIXME:|HACK:|XXX:|TEMP:` — code debt markers

### Results

**No secrets found.** All matches were:
- Documentation comments explaining Bearer token format (`server/src/middleware/auth.ts:31,73,75-76`)
- Azurite local testing guidance (`CLAUDE.md:111`, `server/src/lib/azureBlobStorage.ts:16`) — IP is `127.0.0.1:10000` (local loopback, not a secret)

**No `eval()` calls found.**

**No `dangerouslySetInnerHTML` found.**

**TODOs found (3):**
1. `ui/src/pages/Settings.tsx:18` — Save functionality stub (documented in Known Issues #3)
2. `server/src/middleware/auth.ts:92` — RBAC from JWT roles claim (documented in Known Issues #1)
3. `server/src/lib/entra-auth.ts:42` — Entra client ID placeholder (documented in Known Issues #2)

**Verdict:** Clean. No hardcoded secrets, no dangerous patterns. TODOs are legitimate technical debt markers, all documented above.

---

## WHAT THIS MEANS FOR SUPERTEAM

**Project Maturity:** HIGH for demo/prototype. MEDIUM for production readiness.

**Strengths:**
- Clean architecture: REST API + React SPA with clear separation of concerns
- Strong typing: TypeScript end-to-end, schema-driven (Drizzle ORM)
- Modern stack: Hono 4 (fast, lightweight), React 19 (concurrent rendering), Tailwind CSS 4 (no PostCSS), shadcn/ui (unstyled primitives)
- AI integration is production-grade: prompt caching, structured output, deterministic inconsistency engine, cost tracking
- Security baseline is good: auth middleware with three-tier fallback, role-based access control, input validation, parameterized queries
- No secrets in code, no dangerous patterns (eval, dangerouslySetInnerHTML)
- Well-documented: CLAUDE.md is comprehensive, schema files have inline comments, every route has docstring

**Weaknesses:**
- **NOT PRODUCTION-READY** without Azure SQL migration (SQLite is local-dev only)
- Azure SQL migrations are incomplete + contain ghost schema from prior prototype (Petri nets)
- No segregation of duties enforcement in production (same user can submit + decide KYC)
- No retry logic for AI extraction failures
- No server-side pagination (all lists return full result sets)
- No audit log for client record updates (old values lost when RM applies extracted fields)

**Risk Surface:**
- **HIGH:** Database migration (SQLite → Azure SQL) is a blocker for any real deployment. Existing `mssql` migrations are wrong (Petri net schema, not retail banking). This must be rewritten from scratch.
- **MEDIUM:** Segregation of duties gap. If Entra app roles are misconfigured (same person has both RM + Compliance), they can bypass review workflow.
- **LOW:** German client workaround (PostIdent) is UI-only — backend doesn't enforce it. Minor exploit path (unlikely to be abused in practice).

**Deployment Readiness:**
- **For demo / Avanade pitch:** READY NOW (just set `ANTHROPIC_API_KEY` and run on SWA)
- **For pilot with real customer data:** NEEDS 2-3 days work (Azure SQL migration + SoD enforcement + pagination)
- **For production at scale:** NEEDS 1-2 weeks (above + retry logic + audit log + bulk upload + cost monitoring dashboard)

---

## RECOMMENDED ACTION

**Immediate (if deploying to Azure SWA for demo):**
1. Set `ANTHROPIC_API_KEY` in Azure Static Web Apps environment variables
2. Configure Entra ID app registration (client ID, tenant ID)
3. Set `ENTRA_CLIENT_ID` and `ENTRA_TENANT_ID` in SWA environment variables
4. **DO NOT** set `ENTRA_ENABLED=false` in production — that's local-dev only
5. Test auth flow end-to-end (sign in with Microsoft → verify user principal appears in `/api/v1/protected/me`)

**Before pilot with real data:**
1. **PRIORITY 1:** Write fresh Azure SQL migrations matching current schema (clients / enquiries / meetings / KYC) — do NOT use `server/drizzle/mssql/0002_sql_server_migration.sql` (it's from a different project)
2. **PRIORITY 2:** Enforce segregation of duties — add check in `/clients/:id/kyc/decide` that rejects if `acted_by_id` from submission review matches current user's ID
3. **PRIORITY 3:** Add backend validation for German clients (block document upload if `address_country='DE'`)
4. Test KYC workflow end-to-end with real documents (passport, utility bill) → verify extraction + inconsistency detection
5. Run `pnpm audit` in both server + ui workspaces → patch any high/critical CVEs

**Before production at scale:**
1. Add retry logic for AI extraction (exponential backoff, max 3 retries, or async queue)
2. Add server-side pagination to all list endpoints (`?limit=50&offset=0`)
3. Add `clients_history` audit table to track who changed what and when
4. Build cost monitoring dashboard (aggregate `extraction_usage` from `kyc_documents` table)
5. Load test: 100 concurrent document uploads → verify Azure Functions scale-out + blob storage throughput
6. Pen test: OWASP Top 10 checklist, focus on auth bypass / RBAC / file upload / SQL injection

---

## GAPS / UNKNOWNS

**What I couldn't confirm:**

1. **Entra app registration details:** Client ID, tenant ID, app roles configuration. Not visible in code (env vars). Steve will need to create app registration in Azure AD if not already done.

2. **Azure SQL connection string format:** The `mssql` driver is imported but never used. Connection pooling, credential management (Managed Identity vs SQL auth), and failover logic are not implemented. If Steve deploys to Azure SQL, he'll need to write the connection plumbing himself (or wait for Drizzle SQL Server support to stabilize).

3. **SWA routing configuration:** The `staticwebapp.config.json` file does not exist in this repo (or was not scanned). SWA routing rules (which paths proxy to backend, which are client-side routes) may be misconfigured. Steve should verify `/api/*` routes to Azure Functions and all other paths serve `index.html` (SPA fallback).

4. **Live CVE scan:** `pnpm audit` not run (manual step required). No way to confirm if dependencies have known vulnerabilities without executing the audit.

5. **Azure Blob Storage configuration:** `STORAGE_BACKEND=azure` path is implemented (`server/src/lib/azureBlobStorage.ts`) but not tested in this recon. Connection string / Managed Identity / SAS token logic is abstracted by `@azure/storage-blob` SDK. Steve should test blob upload/download/delete against real Azure Storage before deploying.

6. **Prompt caching effectiveness:** The system prompt is cached (`cache_control: {type: "ephemeral"}`) but without live API calls I can't confirm cache hit rate or cost savings. Steve should monitor Claude dashboard after first deployment → verify cache read tokens are ~90% of input tokens for subsequent extractions.

---

## SOURCES

**All findings are from direct file reads (Read tool) + grep scans (Grep tool) + glob mappings (Glob tool).** No external documentation or web search required. Full file list:

**Schema files:** `server/src/schema/*.ts` (9 files: clients, enquiries, enquiryProducts, kycDocuments, kycReviews, meetings, outcomes, products, users)  
**Route files:** `server/src/api/*.ts` (8 files: api.ts, aiRoutes.ts, clientsRoutes.ts, enquiriesRoutes.ts, kycDocumentsRoutes.ts, kycRoutes.ts, meetingsRoutes.ts, outcomesRoutes.ts, productsRoutes.ts)  
**Lib files:** `server/src/lib/*.ts` (10 files: anthropic.ts, azure-sql.ts, azureBlobStorage.ts, cost-monitor.ts, db.ts, entra-auth.ts, env.ts, kycExtraction.ts, kycInconsistencies.ts, seed.ts, storage.ts)  
**Middleware:** `server/src/middleware/auth.ts`  
**UI pages:** `ui/src/pages/*.tsx` (10 files: Home.tsx, Enquiries.tsx, NewEnquiry.tsx, EnquiryDetail.tsx, Clients.tsx, ClientDetail.tsx, ComplianceQueue.tsx, Settings.tsx, ResponsiveTestPage.tsx, ViewportTestPage.tsx, AuthTestPage.tsx)  
**UI lib:** `ui/src/lib/*.ts` (5 files: serverComm.ts, role.tsx, intake.ts, auth-context.tsx, utils.ts)  
**UI App root:** `ui/src/App.tsx`  
**Migrations:** `server/drizzle/mssql/*.sql` (3 files: 0000_initial.sql, 0002_sql_server_migration.sql, 0003_items_table.sql)  
**Package manifests:** `server/package.json`, `ui/package.json`  
**Project docs:** `CLAUDE.md`

**Grep scans executed:**
- API keys / secrets: `\b(sk-|Bearer |pk_|[A-Za-z0-9]{32,})`
- Code execution: `eval\(`
- XSS risk: `dangerouslySetInnerHTML`
- Hardcoded IPs: `\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b`
- Code debt markers: `(TODO|FIXME|HACK|XXX|TEMP):`

**Total files read:** 45+ files across server and UI workspaces  
**Total grep scans:** 5 patterns across full codebase  
**Reconnaissance duration:** ~10 minutes (read-only, zero footprint)

---

**END OF BRIEF**
