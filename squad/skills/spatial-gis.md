# SKILL: Spatial Analysis, GIS & Location Intelligence
> Domain expert on this squad: **Steve**. Before designing a spatial data model or choosing a CRS, consult Steve — he has deep GIS expertise and the squad should leverage it rather than guess.

---

## When to Use Spatial / GIS

Use spatial when **location is a dimension of the data or analysis:**
- Where are things? (point data — offices, events, partners, beneficiaries)
- What is near what? (proximity, catchment areas, service coverage)
- What overlaps? (boundaries, regions, administrative units)
- How many are in this area? (aggregation within polygons)
- What is the route or distance? (network analysis, travel time)
- How does this phenomenon distribute across space? (heat maps, choropleth)

**FoEI context:** Campaign reach by country/region, partner locations, environmental data layers, community impact areas, deforestation boundaries, forest cover change.

---

## Stack Options

| Tool | Best for | Notes |
|------|----------|-------|
| **PostGIS** | Production spatial queries on Postgres | The standard. Extends Postgres with geometry types and 300+ spatial functions. |
| **SpatiaLite** | Lightweight spatial on SQLite | Direct drop-in for this project's SQLite stack. `better-sqlite3` + SpatiaLite extension. Excellent for smaller datasets. |
| **Drizzle + PostGIS** | TypeScript-native spatial | Drizzle supports Postgres geometry columns. Raw SQL for spatial functions. |
| **Turf.js** | Client-side or server-side spatial analysis in JS | No DB required. Point-in-polygon, buffer, distance, clustering. Great for API-layer analysis. |
| **GDAL** | Data format conversion (CLI) | Convert between Shapefile, GeoJSON, GeoPackage, CSV with coordinates. |
| **QGIS** | Desktop GIS analysis | Steve's tool for exploratory analysis. Output to GeoJSON for web consumption. |
| **Leaflet.js** | Interactive web maps (lightweight) | The standard for simple web maps. React wrapper: `react-leaflet`. |
| **Mapbox GL JS** | Complex, performant web maps | Vector tiles, 3D, custom styles. Requires Mapbox account (has free tier). |
| **deck.gl** | Large-scale data visualisation on maps | For millions of points, flow maps, hexagonal aggregation. Uber OSS. |

**For this stack (Node.js + SQLite → Azure SQL):** SpatiaLite locally (SQLite extension), PostGIS for production if moving to Postgres, Turf.js for API-layer analysis, Leaflet.js or Mapbox GL JS for the UI map layer.

---

## Core Concepts

### Geometry Types (GeoJSON / OGC standard)
```json
{ "type": "Point", "coordinates": [4.9041, 52.3676] }          // Amsterdam
{ "type": "LineString", "coordinates": [[lng, lat], ...] }       // Route, border
{ "type": "Polygon", "coordinates": [[[lng, lat], ...]] }        // Region, catchment
{ "type": "MultiPolygon", "coordinates": [[[[lng, lat], ...]]] } // Country with islands
```

### Coordinate Reference Systems (CRS)
| CRS | EPSG | Use when |
|-----|------|----------|
| **WGS84** | 4326 | Global lat/lng — store all coordinates in this |
| **Web Mercator** | 3857 | Web tile maps (Leaflet/Mapbox expect this internally) |
| **RD New** | 28992 | Netherlands national standard — Dutch govt datasets |
| **ETRS89** | 4258 | European standard — EU datasets |

**Rule:** Store in WGS84 (EPSG:4326). Transform for analysis if needed. Never mix CRS in the same query.

### Key Spatial Operations (PostGIS / SpatiaLite)
```sql
-- Distance between two points (metres)
SELECT ST_Distance(
  ST_Transform(ST_SetSRID(ST_MakePoint(lng1, lat1), 4326), 3857),
  ST_Transform(ST_SetSRID(ST_MakePoint(lng2, lat2), 4326), 3857)
);

-- Points within 50km of a location
SELECT name FROM partners
WHERE ST_DWithin(
  ST_Transform(location, 3857),
  ST_Transform(ST_SetSRID(ST_MakePoint($lng, $lat), 4326), 3857),
  50000
);

-- Count partners per country polygon
SELECT c.name, COUNT(p.id)
FROM countries c
LEFT JOIN partners p ON ST_Within(p.location, c.boundary)
GROUP BY c.name;
```

### Turf.js (server-side, no DB required)
```typescript
import * as turf from '@turf/turf';

// Buffer a point by 50km
const buffered = turf.buffer(point, 50, { units: 'kilometers' });

// Check if point is inside polygon
const inside = turf.booleanPointInPolygon(point, polygon);

// Cluster points
const clustered = turf.clustersKmeans(featureCollection, { numberOfClusters: 5 });
```

---

## Dutch / European Data Sources

| Dataset | Source | What it contains |
|---------|--------|-----------------|
| **BAG** | PDOK (pdok.nl) | All buildings, addresses in Netherlands |
| **CBS wijken/buurten** | CBS (cbs.nl) | Dutch neighbourhood/district boundaries + statistics |
| **BRT** | PDOK | Topographic map of Netherlands |
| **Natural Earth** | naturalearthdata.com | Country/region boundaries, global |
| **OpenStreetMap** | Geofabrik (geofabrik.de) | Everything — roads, buildings, landuse, global |
| **Global Forest Watch** | globalforestwatch.org | Deforestation, forest cover change (FoEI context) |
| **World Bank** | datacatalog.worldbank.org | Country-level development data with geometry |
| **GADM** | gadm.org | Administrative boundaries for all countries |

---

## Analysis Types

| Analysis | Use case | Tool |
|----------|----------|------|
| **Point clustering** | Where are concentrations of partners/events? | Turf.js kmeans, PostGIS ST_ClusterDBSCAN |
| **Catchment / isochrone** | What's reachable in X minutes drive/walk? | Mapbox Isochrone API, OpenRouteService API |
| **Heat map** | Density of activity across an area | deck.gl HeatmapLayer, Leaflet.heat |
| **Choropleth** | Value per region (funding by country) | Leaflet/Mapbox with GeoJSON fill styling |
| **Spatial join** | Which region does each point fall in? | PostGIS ST_Within, Turf.js booleanPointInPolygon |
| **Buffer zone** | What's within X km of a location? | PostGIS ST_DWithin, Turf.js buffer |
| **Centroid / aggregate** | Centre of a cluster, aggregate stats per polygon | PostGIS ST_Centroid, ST_Union |
| **Flow map** | Movement between locations | deck.gl ArcLayer, kepler.gl |

---

## Reporting & Visualisation Output

| Output | Tool | Notes |
|--------|------|-------|
| **Interactive map** | Leaflet.js / `react-leaflet` | Default for web. Tile layer from OpenStreetMap (free) or Mapbox. |
| **Vector tile map** | Mapbox GL JS | Better performance for large datasets. Custom styling. |
| **Large-scale dots/heat** | deck.gl | Millions of points. WebGL. |
| **Static map** | Mapbox Static Images API | For PDF reports, email, non-interactive contexts. |
| **GeoJSON download** | Hono endpoint returning GeoJSON | Analysts open in QGIS, ArcGIS Online, Google Earth. |
| **CSV with lat/lng** | Standard CSV export | Simplest format for Kevin's reports. Anyone can map it. |
| **Choropleth table** | Kevin + data table | Country/region with value — tabular alongside the map. |
| **QGIS project** | Export for Steve | Steve opens in QGIS for deep analysis. |

---

## Integration with Existing Stack

### SQLite + SpatiaLite (local dev)
```typescript
import Database from 'better-sqlite3';
const db = new Database('./data/local.sqlite');
db.loadExtension('mod_spatialite');  // Requires SpatiaLite system install
```

### Adding geometry to Drizzle schema
```typescript
// Drizzle doesn't natively support geometry — use text for WKT or real for lat/lng
export const partners = sqliteTable('partners', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  name: text('name').notNull(),
  lat: real('lat'),           // WGS84 latitude
  lng: real('lng'),           // WGS84 longitude
  // For polygon data: store as GeoJSON text
  boundary: text('boundary'), // GeoJSON string
});
```

For spatial queries beyond simple lat/lng, use raw SQL with SpatiaLite/PostGIS functions outside Drizzle.

---

## Known Gotchas
- WGS84 (EPSG:4326) stores coordinates as (longitude, latitude) — many people get this backwards
- Distance calculations in degrees are meaningless — always project to metres first (EPSG:3857 for global, EPSG:28992 for Netherlands)
- GeoJSON polygon winding order: exterior ring counterclockwise, holes clockwise (RFC 7946)
- SpatiaLite requires a system-level install of `libspatialite` — document this in setup instructions
- Mapbox requires an access token even on the free tier — never commit tokens to git
- Large GeoJSON files (>5MB) will kill browser performance — use vector tiles or simplify geometries
- OpenStreetMap data requires attribution in any public-facing product

---

## Steve's Role
Steve is the domain expert on spatial analysis and GIS. When spatial decisions are needed:
1. Describe the data and the analysis goal to Steve
2. Ask him to validate the CRS choice and spatial model
3. His QGIS workflows and spatial analysis patterns should feed Athanasios's knowledge bank
4. For Dutch data: Steve knows the national datasets (PDOK, CBS, BAG) — always ask before searching

*Skill owner: Steve · Maintained in `.squad/skills/spatial-gis.md`*
