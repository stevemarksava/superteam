# Eric — Global Memory
> Cross-project learnings. Patterns, gotchas, and decisions that apply everywhere.

---

## Permanent Knowledge (Never Forget)

### ShadCN / Radix Constraints
- `SelectItem` requires a non-empty string `value` — `value=""` crashes the component silently. Use `"all"`, `"none"`, or a domain sentinel.
- Controlled `Select` value must match one of the `SelectItem` values or be `undefined` — mismatches cause blank renders with no error.
- `better-sqlite3` is synchronous — never `await` Drizzle queries against it.
- Closing a terminal does not kill Node.js child processes — use `Stop-Process -Name node` or kill by PID.

### Port Hygiene
- Always stop dev servers before reporting "build complete". Orphaned processes on ports 5173/8787 cause blank pages for the next person — and that next person is Steve.
- Run `netstat -ano | findstr ":5173 "` and `netstat -ano | findstr ":8787 "` before done.

### Code Quality
- Run `pnpm lint` and `npx tsc --noEmit` before every "build complete". Zero errors is the floor, not a target.
- No `any` types in new files. If the type is genuinely unknown, type it properly.

---

## Project Learnings

### FoEI Campaign Action Tracker (2026-06-05)
**Stack:** React + Vite (UI) · Hono + SQLite (server) · Drizzle ORM · Zod

**What worked:**
- Zod for server-side validation — cleaner than manual field checks
- Drizzle `.leftJoin()` for including related entity names in list responses
- `onDelete: 'cascade'` at schema level — works reliably in SQLite

**What to do differently:**
- Add edit routes (PUT) upfront — delete-and-recreate is clunky for users
- Use the ShadCN calendar component for date pickers instead of plain `<input type="date">`
- Wrap date conversion logic in shared utility functions — DRY violation hit in multiple route files
- Add loading skeletons for tables — plain "Loading…" text is weak UX

**Libraries used and why:**
- `zod` 4.4.3 — server-side validation schema
- `@radix-ui/react-select`, `react-day-picker` via ShadCN — accessible Select and Calendar components
