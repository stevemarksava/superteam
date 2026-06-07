# SKILL: Graph Database & Network Analysis
> Domain expert on this squad: **Steve**. Before designing a graph schema or traversal strategy, consult Steve — he has deep expertise here and the squad should leverage it rather than guess.

---

## When to Use a Graph DB (Not a Relational DB)

Use graph when the **relationships between entities** are as important as the entities themselves:
- Network analysis: who is connected to whom, by how many hops?
- Hierarchies with arbitrary depth: org charts, category trees, reporting lines
- Recommendation engines: "others like you also..."
- Supply chains and dependency trees
- Social graphs and collaboration networks
- Fraud detection: suspicious patterns in transaction networks
- Access control: role inheritance, permission propagation

**Do NOT reach for a graph DB for simple CRUD.** If the data is flat or the query is mostly "give me this record," use Postgres/SQLite. Graph earns its cost when traversal is the core workload.

---

## Stack Options

| Tool | Best for | Notes |
|------|----------|-------|
| **Neo4j** | Production, complex traversals, full ecosystem | Industry standard. Cypher is the query language. Free Community edition. AuraDB is managed cloud. |
| **FalkorDB** | Redis-compatible, fast, lightweight | Good for smaller graphs embedded in existing Redis stack. RedisGraph successor. |
| **Amazon Neptune** | AWS-native, managed, Gremlin + SPARQL | High cost. Use only if already deep in AWS. |
| **ArangoDB** | Multi-model (graph + document + key-value) | Good if you need graph AND document in one store. |
| **SurrealDB** | Multi-model, embedded-friendly | Newer, growing. Good for edge/serverless. |
| **Graphology** (JS) | In-memory graph analysis in Node.js/browser | Not a DB — an analysis library. Great for smaller graphs processed server-side. |
| **NetworkX** (Python) | In-memory analysis, academic/data science | The Python standard for graph analysis. |

**For this stack (Node.js + TypeScript):** Neo4j with `neo4j-driver` npm package, or Graphology for in-memory analysis without a separate DB.

---

## Core Concepts

### Property Graph Model (Neo4j / most tools)
```
(node:Label {property: value}) -[:RELATIONSHIP {property: value}]-> (node:Label)
```
- **Nodes** — entities (Person, Campaign, Organisation)
- **Relationships** — directed edges with a type (WORKS_FOR, FUNDS, CONNECTED_TO)
- **Properties** — key-value data on both nodes and relationships
- **Labels** — type tags on nodes (a node can have multiple labels)

### Cypher Query Language (Neo4j)
```cypher
// Find all partners connected to a campaign within 2 hops
MATCH (c:Campaign {name: 'Amazon'})-[*1..2]-(p:Partner)
RETURN p.name, p.region

// Shortest path between two organisations
MATCH path = shortestPath((a:Org {id: '1'})-[*]-(b:Org {id: '2'}))
RETURN path

// PageRank — who is most influential in the network?
CALL gds.pageRank.stream('myGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC LIMIT 10
```

---

## Analysis Types

| Analysis | What it answers | Algorithm |
|----------|----------------|-----------|
| **Shortest path** | Fastest route between two nodes | Dijkstra, A* |
| **Centrality** | Who is most influential? | PageRank, Betweenness, Degree |
| **Community detection** | Which clusters naturally form? | Louvain, Label Propagation |
| **Link prediction** | Who should be connected but isn't? | Jaccard similarity, Adamic-Adar |
| **Reachability** | Can A reach B? In how many hops? | BFS/DFS traversal |
| **Cycle detection** | Are there circular dependencies? | DFS with backtracking |

Neo4j Graph Data Science (GDS) library implements all of the above as Cypher procedures.

---

## Integration with Existing Stack

### Node.js / TypeScript
```typescript
import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const session = driver.session();
const result = await session.run(
  'MATCH (c:Campaign)-[:HAS_PARTNER]->(p:Partner) WHERE c.id = $id RETURN p',
  { id: campaignId }
);
```

### Drizzle ORM note
Drizzle has no graph DB adapter — use the native driver directly. Graph queries sit alongside Drizzle queries for relational data. Hybrid pattern: relational for CRUD entities, graph for relationship traversal.

### Azure
Azure Cosmos DB has a Gremlin API (graph). Viable if already on Azure. Performance is adequate; Cypher is more expressive than Gremlin for complex traversals.

---

## Reporting & Visualisation Output

| Output type | Tool | Notes |
|-------------|------|-------|
| **Force-directed graph** | D3.js force simulation | Interactive, browser. Best for exploratory network viz. |
| **Network diagram** | Sigma.js | Performant for large graphs (>1000 nodes). WebGL rendering. |
| **Hierarchical tree** | D3 tree / Mermaid | For org charts, dependency trees. |
| **Matrix / heatmap** | D3.js, Observable Plot | Adjacency matrix view — good for dense networks. |
| **Gephi export** | GEXF format | Desktop analysis tool. For analysts who want to explore. |
| **Tables from Cypher** | Standard Hono/React table | Most Cypher results are tabular. Export as CSV for Kevin's reports. |
| **Graph metrics report** | Kevin + Athanasios | PageRank scores, centrality rankings, community summaries — tabular, narrative. |

---

## Known Gotchas
- Neo4j relationship direction matters in the schema but can be ignored in queries with `--` (undirected match)
- Large graph imports: use `LOAD CSV` or `neo4j-admin import`, not row-by-row Cypher
- Index node properties you query by — without indexes, full graph scans kill performance
- The GDS library requires a separate graph projection (`CALL gds.graph.project(...)`) before running algorithms
- Integer IDs from relational DBs should be stored as properties; don't rely on Neo4j internal node IDs

---

## Steve's Role
Steve is the domain expert. When a graph schema decision is needed:
1. Describe the entities and relationships to Steve
2. Ask him to validate the model before Bob blueprints it
3. His pattern libraries and traversal strategies should feed Athanasios's knowledge bank

*Skill owner: Steve · Maintained in `.squad/skills/graphdb.md`*
