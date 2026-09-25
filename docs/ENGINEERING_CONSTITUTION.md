# TravelMind — Engineering Constitution

> **Version**: 1.0  
> **Effective from**: Part 0  
> **Last updated**: 2026-09-25  
> **Authority**: This document is the single source of truth for all engineering decisions across the TravelMind project. Every contributor, every AI assistant, and every code review MUST adhere to these rules.

---

## 1. Project Vision

**TravelMind** is an Intelligent Travel Planning and Multi-Objective Optimization System that combines AI-powered natural language understanding with real Data Structures & Algorithms to solve complex travel planning problems.

It is an **India-first** travel planner where:

- **AI** handles language understanding, suggestions, and explanations.
- **Real algorithms** (Trie, Heaps, Sorting, Graphs, Dijkstra, A\*, DP, Knapsack, Backtracking, Pareto optimization) perform all deterministic computation.
- The system is **genuinely intelligent**, not a CRUD app that only looks smart.

This is a **college Software Engineering project** built to demonstrate mastery of full-stack development, DSA, AI integration, and modern engineering practices.

---

## 2. Seven-Layer Architecture

TravelMind follows a strict layered architecture. Each layer may only depend on the layers **below** it — never above or sideways.

```
┌─────────────────────────────────────────────────────┐
│  Layer 7: EXPERIENCE (React + Vite + TypeScript)    │
│  UI components, pages, routing, state management    │
├─────────────────────────────────────────────────────┤
│  Layer 6: API (Django REST Framework)               │
│  Endpoints, serialization, auth, rate-limiting      │
├─────────────────────────────────────────────────────┤
│  Layer 5: APPLICATION (Service / Use-Case modules)  │
│  Orchestrates domain + DSA layers, business logic   │
├─────────────────────────────────────────────────────┤
│  Layer 4: DOMAIN (Models, Entities, Value Objects)  │
│  Core business rules, domain events                 │
├─────────────────────────────────────────────────────┤
│  Layer 3: DSA / OPTIMIZATION (algorithms/)          │
│  Pure Python. Trie, Graph, Dijkstra, A*, DP,        │
│  Knapsack, Heaps, Sorting, Pareto optimization      │
├─────────────────────────────────────────────────────┤
│  Layer 2: DATA / INTEGRATION                        │
│  Database access, external API clients, caching,    │
│  AI provider adapters, file storage                 │
├─────────────────────────────────────────────────────┤
│  Layer 1: INFRASTRUCTURE                            │
│  Docker, Redis, Celery, PostgreSQL, CI/CD, logging  │
└─────────────────────────────────────────────────────┘
```

### Layer Ownership

| Layer | Folder(s) | Owner |
|-------|-----------|-------|
| 7 — Experience | `frontend/` | Frontend |
| 6 — API | `backend/*/api/` | Backend |
| 5 — Application | `backend/*/services/`, `backend/*/use_cases/` | Backend |
| 4 — Domain | `backend/*/models/`, `backend/*/entities/` | Backend |
| 3 — DSA/Optimization | `algorithms/` | Pure Python (NO Django imports) |
| 2 — Data/Integration | `backend/*/repositories/`, `backend/*/providers/` | Backend |
| 1 — Infrastructure | `infrastructure/`, `.github/`, `docker-compose.yml` | DevOps |

---

## 3. Golden Rules

These rules are **non-negotiable**. Violating any of them blocks a PR merge.

### Rule 1 — One Part at a Time
Implement the current part ONLY. Do not start future parts unless something is a genuine dependency (keep it minimal and document it).

### Rule 2 — Inspect Before You Build
Always check: `git status`, folder tree, package/requirements files, env files, existing tests, `docs/`. Read `docs/ENGINEERING_CONSTITUTION.md` and `docs/PROGRESS.md` before writing code. Never assume anything exists. Never overwrite working code without a reason.

### Rule 3 — Plan Before You Code
Before coding, produce a SHORT plan (what you found, what you will add/change, risks). Then implement.

### Rule 4 — AI Is NOT the Source of Truth
AI is **never** the source of truth for deterministic work: costs, budgets, routes, scheduling, constraints, ranking. AI is for language understanding, suggestions, and explanations. All AI output is validated by deterministic code.

### Rule 5 — algorithms/ Is Pure Python
The `algorithms/` package is pure Python and must **NOT** import Django, DRF, or any framework module.

### Rule 6 — No Business Logic in Views/Components
No business logic in React components, Django views, or serializers. Use service/use-case modules in the Application layer.

### Rule 7 — No Hardcoded Secrets
Use environment variables, `.env` (git-ignored), and `.env.example`. Every external service needs a **provider interface** plus a **mock/demo provider** so the app always works offline.

### Rule 8 — Trust Labels Are Mandatory
Every data value shown to users carries a trust label:

| Label | Meaning |
|-------|---------|
| `LIVE` | Fetched from a real external API within the last refresh window |
| `ESTIMATED` | Computed by our algorithms from known data, not a live value |
| `CACHED` | Was live data but is now from cache (show cache age) |
| `DEMO` | Synthetic / seed data for development and demonstration |

**Never** present demo/estimated data as live. **Never** invent live prices, availability, weather, or routes.

### Rule 9 — Consistent API Error Format
All API errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": {}
  }
}
```

**Never** leak stack traces, secrets, or tokens in error responses.

### Rule 10 — Testing Is Mandatory
Write tests, RUN them, and fix failures. Also run lint, type-check, and build. Do not just report errors — fix root causes and re-run.

### Rule 11 — Cross-Platform Compatibility
Detect the operating system. Use cross-platform commands/scripts. Document exactly what to install if a tool (Docker, Node, Python, PostgreSQL, Redis) is missing. If Docker is unavailable, provide a documented fallback.

### Rule 12 — Documentation Is Not Optional
Update documentation and `docs/PROGRESS.md` for every part.

### Rule 13 — Git Discipline
- Create branch `feat/part-XX-<name>` (or `chore/`, `fix/`, `test/` as appropriate)
- Make meaningful conventional commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`)
- Run `git status` before and after
- Never force-push
- Merge into `main` only after everything passes

### Rule 14 — No Over-Engineering
Do not add libraries without a reason. Keep code readable with docstrings/comments that help a beginner learn.

### Rule 15 — Honest Completion Reporting
Do not claim completion unless you have actually verified it. If something blocks, report "PART X BLOCKED" and explain the real blocker.

---

## 4. Naming Conventions

### Python (Backend + Algorithms)

| Element | Convention | Example |
|---------|-----------|---------|
| Files/modules | `snake_case` | `trip_optimizer.py` |
| Classes | `PascalCase` | `TripOptimizer` |
| Functions/methods | `snake_case` | `find_shortest_route()` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_BUDGET_INR` |
| Private | Leading underscore | `_internal_helper()` |
| Type hints | Required on all public functions | `def find(query: str) -> list[str]:` |
| Style | PEP 8 | Enforced by `ruff` |

### TypeScript (Frontend)

| Element | Convention | Example |
|---------|-----------|---------|
| Files (components) | `PascalCase.tsx` | `TripCard.tsx` |
| Files (utilities) | `camelCase.ts` | `formatCurrency.ts` |
| Components | `PascalCase` | `<TripCard />` |
| Functions/hooks | `camelCase` | `useTripSearch()` |
| Constants | `UPPER_SNAKE_CASE` | `API_BASE_URL` |
| Interfaces/Types | `PascalCase` | `TripSearchResult` |
| Enums | `PascalCase` | `TrustLabel.LIVE` |
| Strict mode | Always enabled | `tsconfig.json: "strict": true` |

### Database

| Element | Convention | Example |
|---------|-----------|---------|
| Tables | `snake_case`, plural | `trip_destinations` |
| Columns | `snake_case` | `departure_city` |
| Foreign keys | `<table_singular>_id` | `destination_id` |
| Indexes | `idx_<table>_<columns>` | `idx_trips_departure_date` |

---

## 5. API Conventions

### URL Structure
```
/api/v1/<resource>/          # List / Create
/api/v1/<resource>/<id>/     # Retrieve / Update / Delete
/api/v1/<resource>/<id>/<action>/  # Custom action
```

### Success Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "trust_label": "LIVE",
    "algorithm_receipt": { ... },
    "timestamp": "2026-09-25T12:00:00Z"
  }
}
```

### Paginated Response Format
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total_items": 142,
    "total_pages": 8,
    "has_next": true,
    "has_previous": false
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Trip with id 42 was not found.",
    "details": {}
  }
}
```

### Data Format Rules

| Data Type | Format | Example |
|-----------|--------|---------|
| Dates | ISO 8601 | `"2026-09-25"` |
| Timestamps | ISO 8601 with timezone | `"2026-09-25T12:00:00Z"` |
| Money (INR) | **Integer paise** (₹1 = 100 paise) | `150000` = ₹1,500.00 |
| Durations | ISO 8601 duration or minutes integer | `"PT2H30M"` or `150` |
| Distances | Meters (integer) | `450000` = 450 km |
| Coordinates | `[latitude, longitude]` as floats | `[28.6139, 77.2090]` |

> **Money Convention Decision**: We store and transmit money as **integer paise** (not float rupees) to avoid floating-point precision errors. The frontend converts to ₹X,XXX.XX for display. See [ADR-0003 (future)](docs/adr/) for full rationale.

---

## 6. Trust-Label System

Every piece of data shown to the user MUST carry one of these labels:

```python
from enum import Enum

class TrustLabel(str, Enum):
    LIVE = "LIVE"           # Real-time from external API
    ESTIMATED = "ESTIMATED" # Computed by our algorithms
    CACHED = "CACHED"       # Was live, now from cache (show age)
    DEMO = "DEMO"           # Synthetic seed data
```

### Rules
1. The label travels from the data layer through the API to the frontend.
2. The frontend displays a visual indicator (badge/icon) for each label.
3. `DEMO` data is never mixed with `LIVE` data in production.
4. `CACHED` data shows how old it is (e.g., "Cached 2 hours ago").
5. `ESTIMATED` data explains the estimation method.

---

## 7. EngineResult & AlgorithmReceipt Contract

Every engine/service that runs an algorithm returns this structure:

```python
from dataclasses import dataclass, field
from typing import Any

@dataclass
class AlgorithmReceipt:
    """Records what the algorithm did — shown in the UI for transparency."""
    algorithm_name: str              # e.g., "Dijkstra's Shortest Path"
    input_size: int                  # e.g., number of nodes in graph
    nodes_explored: int              # how many nodes/states were visited
    steps: int                       # total iterations/comparisons
    comparisons: int                 # number of key comparisons
    elapsed_ms: float                # wall-clock time in milliseconds
    time_complexity: str             # e.g., "O(V + E log V)"
    space_complexity: str            # e.g., "O(V)"
    extra: dict[str, Any] = field(default_factory=dict)  # algorithm-specific metrics

@dataclass
class EngineResult:
    """Standard return type for all engine/service computations."""
    data: Any                        # the actual result
    explanation: str                 # human-readable explanation of what happened
    algorithm_receipt: AlgorithmReceipt
    data_labels: dict[str, str]      # field_name -> TrustLabel value
```

### Contract Rules
1. Every function in `algorithms/` that the application layer calls MUST return an `EngineResult`.
2. The `algorithm_receipt` is passed through the API to the frontend and displayed in a collapsible "How was this computed?" panel.
3. The `explanation` is written in beginner-friendly language.
4. `data_labels` maps each field in `data` to its trust label.

---

## 8. Definition of Done

A part is **DONE** only when ALL of the following are true:

- [ ] All requirements from the part prompt are implemented
- [ ] Tests are written AND passing (`pytest`, `vitest`, etc.)
- [ ] Lint passes (`ruff` for Python, `eslint` for TypeScript)
- [ ] Type checking passes (`mypy` or `pyright` for Python, `tsc --noEmit` for TypeScript)
- [ ] Build succeeds (if applicable)
- [ ] No hardcoded secrets or credentials
- [ ] API error responses follow the standard format
- [ ] Trust labels are present on all user-facing data
- [ ] Documentation is updated (`docs/PROGRESS.md` + relevant docs)
- [ ] Code review checklist is completed
- [ ] Git branch is clean, commits follow conventional format
- [ ] Final report is written in the mandatory format

---

## 9. Git Workflow

### Branch Naming
```
main                           # stable, always green
├── feat/part-XX-<name>        # feature work for a specific part
├── fix/part-XX-<description>  # bug fixes
├── chore/part-XX-<description># tooling, config, dependencies
├── test/part-XX-<description> # test additions/fixes
└── docs/part-XX-<description> # documentation only
```

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Examples**:
```
feat(algorithms): implement Dijkstra shortest path engine
fix(api): return 404 instead of 500 for missing trips
docs(constitution): add trust-label system documentation
test(algorithms): add edge cases for Trie autocomplete
chore(deps): upgrade Django to 5.1
```

### Merge Rules
1. All tests must pass
2. Branch must be up to date with `main`
3. At least the self-review checklist must be completed
4. Never force-push to `main`

---

## 10. Security Rules

1. **No secrets in code**: All credentials in `.env` (git-ignored). `.env.example` documents required variables with dummy values.
2. **No stack traces in responses**: Production error responses show only the error code and message.
3. **Input validation**: All user input is validated at the API layer (serializers) and again at the service layer.
4. **SQL injection prevention**: Always use Django ORM or parameterized queries. Never build SQL strings manually.
5. **XSS prevention**: React's JSX escaping + Django's template escaping. Never use `dangerouslySetInnerHTML` or `|safe` without explicit sanitization.
6. **CORS**: Explicitly configured, never `*` in production.
7. **Authentication**: JWT with proper expiration. Refresh tokens are httpOnly cookies.
8. **Rate limiting**: Applied to all public endpoints.
9. **Dependency auditing**: Regular `pip audit` and `npm audit`.

---

## 11. Testing Pyramid & Coverage Targets

```
         ╱╲
        ╱ E2E ╲           Few, slow, high-confidence
       ╱────────╲          (Playwright)
      ╱Integration╲       Medium count, medium speed
     ╱──────────────╲      (API tests, DB tests)
    ╱   Unit Tests    ╲    Many, fast, isolated
   ╱────────────────────╲  (pytest, vitest)
  ╱   Static Analysis    ╲ Always-on, instant
 ╱────────────────────────╲ (ruff, eslint, mypy, tsc)
```

### Coverage Targets

| Layer | Target | Tool |
|-------|--------|------|
| `algorithms/` | ≥ 90% | `pytest --cov` |
| `backend/` (services, models) | ≥ 80% | `pytest --cov` |
| `frontend/` (components) | ≥ 70% | `vitest --coverage` |
| Integration tests | Key flows covered | `pytest` |
| E2E tests | Critical user journeys | `Playwright` |

### Test File Naming
- Python: `test_<module_name>.py` in `tests/<layer>/`
- TypeScript: `<ComponentName>.test.tsx` co-located with component
- E2E: `<flow_name>.spec.ts` in `tests/e2e/`

---

## 12. Environment Setup Checklist

These tools are required across the project (not all needed for Part 0):

| Tool | Required From | Installation |
|------|--------------|-------------|
| Git | Part 0 | [git-scm.com](https://git-scm.com/downloads) |
| Python 3.12+ | Part 1 | [python.org](https://www.python.org/downloads/) |
| Node.js 20+ LTS | Part 1 | [nodejs.org](https://nodejs.org/) |
| PostgreSQL 16+ | Part 2 | [postgresql.org](https://www.postgresql.org/download/) |
| Redis 7+ | Part 3+ | [redis.io](https://redis.io/download/) or Docker |
| Docker + Compose | Part 3+ | [docker.com](https://www.docker.com/products/docker-desktop/) |

---

*This document is a living document. It is updated as new conventions are established, but existing rules are never weakened without an ADR.*
