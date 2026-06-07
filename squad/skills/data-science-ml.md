# Skill Card: Data Science & Machine Learning Engineering
> Owned by: Eric (builds) · Bob (architects the data pipeline) · Athanasios (researches models and tools)
> Brief Nexus if the project runs on Azure ML, Microsoft Fabric, Azure AI Foundry, or Azure Databricks.

---

## When This Skill Applies

Use this card when the project involves any of:
- Training, fine-tuning, or evaluating ML models
- Data cleaning, transformation, and feature engineering pipelines
- Exploratory data analysis (EDA) at scale
- Model deployment and inference endpoints
- Embeddings, vector search, RAG pipelines
- Time-series analysis, forecasting, anomaly detection
- Notebook-based workflows (Jupyter, Fabric Notebooks, Databricks)

Not this card: LLM API integrations (that's Eric's standard web stack). This card is for when you own the model or the data pipeline, not just the API call.

---

## Stack Options

### Python Data Stack (default for owned pipelines)
| Tool | Purpose | When |
|------|---------|------|
| `pandas` | Tabular data manipulation | Always for tabular EDA |
| `polars` | Fast columnar processing | When pandas is too slow (>1M rows) |
| `numpy` | Numerical ops, array manipulation | Foundation layer |
| `scikit-learn` | Classical ML (classification, regression, clustering, pipelines) | Most ML tasks |
| `xgboost` / `lightgbm` | Gradient boosting | Tabular prediction problems |
| `pytorch` | Deep learning (custom models, fine-tuning) | When scikit-learn isn't enough |
| `transformers` (HuggingFace) | Pre-trained model loading, fine-tuning, inference | NLP, embeddings, vision |
| `sentence-transformers` | Text embeddings | RAG, semantic search |
| `faiss` / `chromadb` | Vector search | RAG retrieval layer |
| `mlflow` | Experiment tracking, model registry | Any iterative training work |

### Cloud ML (when Azure is the platform — defer to Nexus for architecture)
| Service | Purpose |
|---------|---------|
| Azure ML | Training runs, model registry, endpoints |
| Microsoft Fabric | End-to-end lakehouse + notebook + pipeline |
| Azure AI Foundry | Model catalogue, fine-tuning, prompt flow |
| Azure OpenAI | GPT-4o, embeddings, fine-tuned models |
| Azure AI Search | Vector search + hybrid search at scale |

---

## Data Pipeline Architecture (Bob owns the design)

Before Eric writes a single transform, Bob answers:
1. Where does the data come from? (API, DB, files, stream)
2. What's the volume? (rows/day, GB/hour)
3. What's the latency requirement? (real-time, batch hourly, daily)
4. Where does the output go? (another DB, a model, a dashboard)
5. What fails? (upstream source down, schema change, null explosion)

**Batch vs stream decision:**
- Batch (scheduled): < 1 hour latency acceptable, simpler, cheaper — default
- Stream (Kafka/Event Hub): < 1 minute latency required — justify the complexity

---

## ML Engineering Standards

### Before training
- [ ] Data is understood — EDA done, null rates known, class balance checked
- [ ] Baseline established — what does a dumb model (mean, mode, last value) score?
- [ ] Train/validation/test split is temporal for time-series data (no future leakage)
- [ ] Features are documented — what each means, where it comes from

### Model selection
- Start simple. Linear model first. Add complexity only when it demonstrably helps.
- Classical ML (scikit-learn) before deep learning. Deep learning before foundation model fine-tuning.
- Fine-tuning a foundation model is a last resort — cost, latency, and maintenance are high.

### Evaluation
- Pick the right metric for the problem. Accuracy is wrong for imbalanced classes.
- Common: F1, AUC-ROC (classification) · RMSE, MAE, MAPE (regression) · NDCG (ranking)
- Report on the test set, not the validation set. Never on the training set.
- Report confidence intervals, not just point estimates.

### Deployment
- Model serving options: FastAPI endpoint (simple), Azure ML endpoint (managed), Azure Functions (serverless, cold start risk)
- Version your models in mlflow or Azure ML registry
- Monitor: data drift, prediction distribution, latency, error rate
- Have a rollback plan before going live

---

## RAG Pipeline (Retrieval-Augmented Generation)
The most common LLM + data engineering pattern in this stack.

```
Documents → Chunking → Embedding → Vector Store
                                        ↓
User Query → Embedding → Retrieval → Context → LLM → Response
```

**Gotchas:**
- Chunk size matters — too small loses context, too large dilutes relevance. Start at 512 tokens.
- Always hybrid search (vector + keyword) for production — pure vector search misses exact matches.
- Retrieved context has a token limit — rank and truncate before sending to the LLM.
- Evaluate retrieval quality separately from generation quality — two failure modes.

---

---

## dbt (Data Build Tool)

dbt transforms data inside your warehouse using SELECT-based SQL models. Eric owns the build; Bob designs the model graph; Nexus for dbt Cloud on Azure/Fabric.

| Concept | What it does |
|---------|-------------|
| **Model** | A `.sql` file that is one SELECT. dbt materialises it. |
| **Materialisation** | `table` (full rebuild), `view` (no storage), `incremental` (append/merge new rows only), `ephemeral` (CTE, no storage) |
| **Test** | `not_null`, `unique`, `relationships`, `accepted_values` — run with `dbt test` |
| **Seed** | Static CSV files loaded as reference tables (`dbt seed`) |
| **Snapshot** | SCD Type 2 change tracking on a source table |
| **Source** | Declares an upstream table with optional freshness checks |
| **Docs** | `dbt docs generate && dbt docs serve` — interactive lineage + column docs |

**Incremental model pattern:**
```sql
{{ config(materialized='incremental', unique_key='event_id') }}

SELECT * FROM {{ source('raw', 'events') }}
{% if is_incremental() %}
  WHERE event_date > (SELECT MAX(event_date) FROM {{ this }})
{% endif %}
```

**Gotchas:**
- `incremental` strategy `merge` requires `unique_key`. Without it, rows duplicate.
- Test failures block downstream models — run `dbt build` not `dbt run + dbt test` separately.
- dbt Core is free and local; dbt Cloud adds orchestration, CI, and IDE. Brief Nexus on Azure Fabric or Databricks integration.

---

## Databricks

| Concept | Notes |
|---------|-------|
| **Delta Lake** | ACID transactions on Parquet. `OPTIMIZE` for file compaction + Z-ordering for query performance. `VACUUM` removes old versions (default 7-day retention). Time travel: `SELECT * FROM table VERSION AS OF 5` |
| **PySpark** | DataFrame API (preferred over RDD). `spark.read.format("delta")`, window functions, broadcast joins for small tables. |
| **SparkSQL** | Inline SQL on registered temp views or Unity Catalog tables. Interchangeable with PySpark in notebooks. |
| **Unity Catalog** | Three-level namespace: `catalog.schema.table`. Row filters and column masks for attribute-based access. Lineage tracking. Always use Unity Catalog on new Databricks platforms. |
| **MLflow native** | `mlflow.autolog()` captures runs automatically. Model registry built in. Model serving via Databricks endpoints. |
| **Databricks Asset Bundles (DAB)** | IaC for Databricks: jobs, pipelines, clusters declared in YAML. Deploy with `databricks bundle deploy`. |

**When to brief Nexus:** Azure Databricks architecture, Unity Catalog governance design, integration with ADLS Gen2, Fabric, or Azure ML.

---

## LLM Engineering

LLM engineering is more than calling an API. Eric owns the implementation; Athanasios researches model capabilities; Bob architects the system.

### Tool Use / Function Calling
```python
tools = [{
    "name": "get_weather",
    "description": "Get current weather for a city",
    "input_schema": {
        "type": "object",
        "properties": {"city": {"type": "string"}},
        "required": ["city"]
    }
}]
# Handle tool_use stop_reason → call function → return tool_result block
```

### Structured Output
```python
from pydantic import BaseModel
import instructor

class ExtractedData(BaseModel):
    name: str
    value: float

client = instructor.from_anthropic(anthropic.Anthropic())
result = client.messages.create(model="claude-sonnet-4-6", response_model=ExtractedData, ...)
```

### Context Management
- Count tokens before sending: `client.messages.count_tokens()`
- Sliding window: keep system + last N turns; summarise the rest
- Token budget control: `max_tokens` + `thinking.budget_tokens` for extended thinking

### Evaluation (non-negotiable before shipping)
- **Retrieval quality** (RAG): precision@k, recall@k — test retrieval separately from generation
- **Generation quality:** LLM-as-judge (structured rubric), human eval on 50-100 samples
- **RAGAS:** automated RAG evaluation (faithfulness, answer relevance, context precision)
- Never ship an LLM feature without a test dataset and baseline score

### When to use LangChain / LlamaIndex vs raw API
- Raw API first — it's simpler, more debuggable, and avoids abstraction leakage
- LangChain/LlamaIndex when: you need pre-built integrations (30+ vector stores, loaders) and don't want to write that plumbing yourself
- Avoid both if the chain is 3 steps or fewer — raw API is always cleaner at that scale

---

## When to Call Nexus
- The project runs on Azure ML, Microsoft Fabric, or Azure AI Foundry
- Databricks is the compute layer (architecture, Unity Catalog, Azure integration)
- Fine-tuning on Azure OpenAI is being considered
- Microsoft Purview is needed for data governance
- The ML pipeline needs to comply with Microsoft's responsible AI standards
