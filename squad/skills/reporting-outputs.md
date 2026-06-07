# SKILL: Reporting & Visualisation Outputs
> Kevin owns report narrative. Eric owns the data layer. Marlo owns the layout. This skill card covers the full menu of output types available so the right one gets chosen at the start, not after Eric has already built the wrong thing.

---

## Output Type Decision Tree

```
Is the audience technical or non-technical?
├── Non-technical (Steve, donors, board, FoEI partners)
│   ├── Narrative needed?  → Kevin writes it
│   ├── Numbers?           → Table (Kevin) or Chart (Eric + Recharts)
│   └── Location data?     → Map (Leaflet/Mapbox) + Kevin summary
└── Technical (developers, analysts)
    ├── Raw data needed?   → CSV / JSON export
    ├── Exploratory?       → Interactive chart or map
    └── Graph relationships? → Force-directed graph (D3) or table
```

---

## Output Types — Full Menu

### 1. Tabular Reports
**When:** Structured data with rows and columns. Default for financial, audit, grant reports.
**Tool:** React table (`@tanstack/react-table`) or plain HTML table with Tailwind.
**Kevin's note:** Every table needs a headline number and a one-sentence interpretation. Numbers without context are data, not insight.
**Export:** CSV via `papaparse`, Excel via `xlsx` npm package, PDF via `@react-pdf/renderer`.

---

### 2. Standard Charts
**When:** Trends, comparisons, distributions.

| Chart type | Use when | React library |
|------------|----------|---------------|
| Bar / column | Compare categories | Recharts `<BarChart>` |
| Line | Trend over time | Recharts `<LineChart>` |
| Area | Volume over time, stacked | Recharts `<AreaChart>` |
| Pie / donut | Part-of-whole (max 5 segments) | Recharts `<PieChart>` |
| Scatter | Correlation between two variables | Recharts `<ScatterChart>` |
| Histogram | Distribution of a single variable | Recharts `<BarChart>` with bins |
| Heatmap | Matrix of values | Observable Plot or D3 |

**Default library:** [Recharts](https://recharts.org) — React-native, well-maintained, clean defaults.
**For custom/complex charts:** [Observable Plot](https://observablehq.com/plot/) or D3.js direct.
**Chart.js:** Avoid — less React-idiomatic than Recharts.

---

### 3. Maps (Spatial Reporting)
> See `.squad/skills/spatial-gis.md` for full spatial stack.

| Map type | Use when | Tool |
|----------|----------|------|
| **Marker map** | Show locations (partners, events, offices) | `react-leaflet` with markers |
| **Choropleth** | Value by region (funding per country) | Leaflet/Mapbox + GeoJSON fill |
| **Heat map** | Density of activity | deck.gl HeatmapLayer or Leaflet.heat |
| **Cluster map** | Many points, grouped by zoom level | `react-leaflet` marker cluster plugin |
| **Flow map** | Movement between locations | deck.gl ArcLayer |
| **Isochrone** | Reachability from a point | Mapbox Isochrone API overlay |
| **Static map image** | PDF reports, email, non-interactive | Mapbox Static Images API |

**Default:** `react-leaflet` + OpenStreetMap tiles (free, no API key needed for basic use).
**Upgrade to:** Mapbox GL JS when vector tiles, custom styles, or large datasets required.

---

### 4. Graph / Network Visualisation
> See `.squad/skills/graphdb.md` for full graph stack.

| Viz type | Use when | Tool |
|----------|----------|------|
| **Force-directed** | Explore connections in a network | D3.js force simulation, Sigma.js |
| **Hierarchical tree** | Org charts, category trees | D3 tree layout, Mermaid |
| **Sankey diagram** | Flow volumes between nodes | D3 sankey, Recharts (limited) |
| **Arc diagram** | Connections without layout clutter | D3 arc |
| **Matrix** | Dense networks, find clusters visually | D3 matrix |

**Default for web:** D3.js force simulation (interactive) or Sigma.js (performant for large graphs).
**For reports/docs:** Mermaid diagrams (render in markdown, version-controllable).

---

### 5. Dashboard
**When:** Multiple metrics need to live together for ongoing monitoring.
**Pattern:** Grid of cards — KPI numbers at top, charts below, table at bottom.
**Stack:** React grid layout (`react-grid-layout` for draggable, CSS grid for fixed).
**Real-time:** WebSocket from Hono server; polling fallback every 30s.
**Refresh strategy:** On-demand button preferred over auto-refresh for non-profit context (avoids server cost from constant polling).

---

### 6. Export Formats

| Format | Use when | Tool |
|--------|----------|------|
| **CSV** | Data analysts, Excel users | `papaparse` |
| **Excel (.xlsx)** | Finance, grant reporting, FoEI context | `xlsx` (SheetJS) |
| **PDF** | Donor reports, board packs, audit docs | `@react-pdf/renderer` or Puppeteer (server-side) |
| **GeoJSON** | Spatial data for analysts | JSON stringify of geometry object |
| **JSON** | Developer consumption, API output | Standard response |
| **Markdown** | Documentation, decision logs | Kevin's default for internal docs |

**FoEI note:** Donors and finance teams expect Excel. Always offer CSV + Excel for any financial report. PDF for narrative reports.

---

### 7. Presentations
> Full decision tree, tooling, and design principles: `.squad/skills/presentations.md`

| Format | Best for | Tool |
|--------|----------|------|
| **PowerPoint (.pptx)** | Donors, board, external stakeholders | `pptxgenjs` (server-generated or client-side) |
| **Sli.dev** | Internal, developer, sprint demos | Markdown-driven, exports to PDF |
| **Reveal.js** | Live data, charts, code in slides | React components embedded in HTML slides |
| **React + Print CSS** | Branded, one-off, no extra dependency | Tailwind + `window.print()` |

**Who does what:** Kevin writes the content structure → Marlo designs the layout → Eric builds it.

---

### 8. Narrative Reports (Kevin's Domain)
**When:** Stakeholders need context, not just numbers.
**Structure:** Goal → What we did → Result → What's next → Key decisions.
**Kevin's output formats:**
- Sprint/project status — weekly, plain language
- Grant report — formal, audit-ready, evidence-linked
- Technical summary — for developers, includes decisions and rationale
- Post-project retrospective — lessons learned, next time

Kevin always includes: one headline metric, one key finding, one recommendation.

---

## Reporting Stack by Project Type

### Standard CRUD App (FoEI Campaign Tracker)
- Tables: `@tanstack/react-table`
- Charts: Recharts
- Export: CSV (papaparse), Excel (xlsx)
- Reports: Kevin markdown → PDF

### Data/Analytics Dashboard
- Charts: Recharts + Observable Plot
- KPI cards: stat cards (already in this starter)
- Export: CSV, Excel, JSON

### Location-Aware App
- Maps: react-leaflet (default) or Mapbox GL JS (advanced)
- Spatial data export: GeoJSON + CSV with lat/lng
- Reports: static map image (Mapbox) in Kevin's PDFs

### Network/Graph App
- Graph viz: D3 force or Sigma.js
- Analysis output: Kevin table of ranked nodes, centrality scores
- Export: GEXF (Gephi), CSV, JSON

---

## What Kevin Needs to Produce a Report
1. **Data** — raw numbers or a query result from Eric
2. **Audience** — who is reading this and what decision does it inform?
3. **Format** — screen / PDF / email / presentation
4. **Deadline** — is this for a board meeting or internal review?

Kevin does NOT need a design from Marlo for text-heavy reports. He does need Marlo for dashboards and anything with significant layout decisions.

---

*Maintained in `.squad/skills/reporting-outputs.md`*
