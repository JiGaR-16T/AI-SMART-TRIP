# Architecture Overview

This document describes the 7-layer architecture of the **TravelMind** system.

```mermaid
graph TD
    subgraph Layer 7: Experience
        UI["React + Vite + TypeScript (SPA)"]
        StatusPage["/status Telemetry Page"]
    end

    subgraph Layer 6: API
        DRF["Django REST Framework API"]
        Spectacular["OpenAPI / Swagger UI (/api/docs/)"]
        ExceptionHandler["Constitution Error Handler"]
        ReqIdMiddleware["X-Request-ID Middleware"]
    end

    subgraph Layer 5: Application
        TripService["Trip Planning Service"]
        OptimizerService["Optimization Service"]
        AuthService["Auth & Profile Service"]
    end

    subgraph Layer 4: Domain
        Models["TimeStampedUUIDModel Entities"]
        TrustLabels["DataLabel (LIVE / ESTIMATED / CACHED / DEMO)"]
    end

    subgraph Layer 3: DSA / Optimization
        AlgoCommon["algorithms.common (Receipt, EngineResult, Trace)"]
        GraphDSA["Dijkstra / A* Shortest Route"]
        OptDSA["Knapsack / DP Budget Optimizer"]
        BacktrackDSA["CSP Itinerary Scheduler"]
        TrieDSA["Trie Autocomplete"]
    end

    subgraph Layer 2: Data & Integration
        DBAdapter["PostgreSQL / SQLite ORM"]
        RedisCache["Redis Cache Manager"]
        ExternalAPIs["Flight / Hotel / Weather Providers"]
    end

    subgraph Layer 1: Infrastructure
        Docker["Docker & Docker Compose"]
        CeleryWorker["Celery Worker & Beat"]
        GHActions["GitHub Actions CI"]
    end

    UI --> DRF
    DRF --> ReqIdMiddleware
    DRF --> ExceptionHandler
    DRF --> TripService
    DRF --> OptimizerService
    TripService --> AlgoCommon
    TripService --> GraphDSA
    TripService --> OptDSA
    TripService --> Models
    TripService --> RedisCache
    TripService --> DBAdapter
    CeleryWorker --> RedisCache
    CeleryWorker --> DBAdapter
```

## Architectural Tenets

1. **AI is never the source of truth for deterministic constraints**: AI interprets prompts, while pure algorithmic engines compute budgets, shortest paths, and slot assignments.
2. **Layer isolation**: `algorithms/` is pure Python and never imports Django, ORM models, or web framework components.
3. **Telemetry & Receipts**: Every optimization engine returns an `AlgorithmReceipt` showing steps, comparisons, memory, and complexity to provide genuine educational transparency.
4. **Standardized Envelopes**: All responses adhere to the constitution contracts:
   - Success: `{"success": true, "data": ..., "meta": ...}`
   - Error: `{"success": false, "error": {"code": ..., "message": ..., "details": ...}}`
