# Skill Card: Data Science & Machine Learning Engineering
> Owned by: Eric (builds) · Bob (architects the data pipeline) · Athanasios (researches models and tools)
> Brief Nexus if the project runs on Azure ML, Microsoft Fabric, or Azure AI Foundry.

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

## When to Call Nexus
- The project runs on Azure ML, Microsoft Fabric, or Azure AI Foundry
- Fine-tuning on Azure OpenAI is being considered
- Microsoft Purview is needed for data governance
- The ML pipeline needs to comply with Microsoft's responsible AI standards
