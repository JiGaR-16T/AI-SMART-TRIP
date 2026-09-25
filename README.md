# 🧠 TravelMind

**An Intelligent Travel Planning and Multi-Objective Optimization System Using AI and Data Structures & Algorithms**

---

## What Is This?

TravelMind is an India-first smart travel planner where you describe your dream trip in plain English — *"Plan a 5-day Rajasthan trip under ₹30,000 with adventure activities"* — and the system uses **real algorithms** (not just AI guesswork) to find optimal routes, budgets, and schedules.

**AI understands what you want.** Algorithms figure out how to make it happen.

| What | Technology |
|------|-----------|
| Understand your trip request | AI / Natural Language Processing |
| Find the best route | Dijkstra's Algorithm, A* |
| Optimize your budget | Knapsack Problem, Dynamic Programming |
| Schedule your itinerary | Backtracking, Constraint Satisfaction |
| Suggest destinations | Trie (autocomplete), Recommendation Engine |
| Show trade-offs | Pareto Optimization |
| Rank results | Heaps, Sorting Algorithms |

Every result comes with an **AlgorithmReceipt** — a transparent record showing which algorithm was used, how many options were explored, and how long it took.

---

## 📊 Status: Part 1 — Repository & System Foundation

✅ **Part 0 (Project Constitution)** & **Part 1 (Foundation)** completed!
- Pure Python algorithms package with telemetry (`AlgorithmReceipt`, `EngineResult`, `TraceRecorder`)
- Django REST Framework backend with split settings, request-ID logging, and custom error envelopes
- Health check probes (`/api/v1/health/` and `/api/v1/health/ready/`)
- Interactive OpenAPI / Swagger UI (`/api/docs/`)
- React + Vite + TypeScript frontend with `/status` telemetry dashboard
- Docker & Docker Compose setup with offline local-run fallback

See [docs/PROGRESS.md](docs/PROGRESS.md) for the full progress tracker.

---

## 🚀 Quick Start & Setup Guide

### Prerequisites
- **Python**: 3.11+ ([Download Python](https://www.python.org/downloads/))
- **Node.js**: 20+ LTS ([Download Node.js](https://nodejs.org/))
- **Git**: Installed ([Download Git](https://git-scm.com/))
- **Docker** *(Optional but recommended)*: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

### Option A: Running with Docker (Recommended)

If you have Docker Desktop installed:

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Build and start all services (PostgreSQL, Redis, Backend, Celery, Frontend)
docker compose up -d

# 3. View running services
docker compose ps
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000/api/v1/health/ready/
- **Swagger Documentation**: http://127.0.0.1:8000/api/docs/

---

### Option B: Local Run Fallback (Without Docker)

If Docker is not installed on your machine, you can run everything locally using Python virtual environments and Node:

#### 1. Windows (PowerShell)
```powershell
# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install backend dependencies & local algorithms package
pip install -r backend/requirements/dev.txt
pip install -e algorithms

# Install frontend dependencies
cd frontend
cmd.exe /c "npm install"
cd ..

# Copy .env
Copy-Item .env.example .env

# Start Backend (in terminal 1)
.\.venv\Scripts\python.exe backend/manage.py runserver 127.0.0.1:8000

# Start Frontend (in terminal 2)
cd frontend
cmd.exe /c "npm run dev"
```

#### 2. Linux / macOS
```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r backend/requirements/dev.txt
pip install -e algorithms

# Install frontend dependencies
cd frontend && npm install && cd ..

# Setup .env
cp .env.example .env

# Run dev servers
make dev
# Or manually:
# Terminal 1: python backend/manage.py runserver
# Terminal 2: cd frontend && npm run dev
```

---

## 🧪 Running Tests & Quality Checks

### Run All Tests
```powershell
# Windows
.\scripts\test.ps1

# Linux / Mac
make test
```

### Run Python Lint & Formatting
```powershell
# Windows
.\scripts\lint.ps1

# Linux / Mac
make lint
```

---

## 🔑 Environment Variables Reference

| Variable | Default Value | Purpose |
|----------|---------------|---------|
| `SECRET_KEY` | *(dev key)* | Django cryptographic signing key |
| `DEBUG` | `True` | Debug mode switch (never True in prod) |
| `DATABASE_URL` | `postgres://...` | Connection URI for PostgreSQL (or sqlite:///db.sqlite3) |
| `REDIS_URL` | `redis://127.0.0.1:6379/1` | Redis cache instance URI |
| `CELERY_BROKER_URL` | `redis://127.0.0.1:6379/0` | Celery message broker URI |
| `CELERY_RESULT_BACKEND` | `redis://127.0.0.1:6379/0` | Celery task result backend |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` | Allowed frontend origins |
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000/api/v1` | Frontend API client target |

---

## 📁 Project Structure

```
travelmind/
├── frontend/               # React + Vite + TypeScript (UI)
│   ├── src/pages/          # StatusPage, Itinerary, etc.
│   ├── src/services/       # API client with typed error envelopes
│   └── src/components/     # UI, trip, itinerary, algorithms components
├── backend/                # Python + Django + DRF (API & Business Logic)
│   ├── config/             # Split settings (base, dev, test, prod), Celery
│   ├── core/               # Health APIs, exception handler, request ID middleware
│   └── requirements/       # base.txt, dev.txt, prod.txt
├── algorithms/             # Pure Python DSA engines (Layer 3 - zero Django deps)
│   ├── common/             # AlgorithmReceipt, EngineResult, TraceRecorder
│   └── graph, sorting, optimization, backtracking, etc.
├── infrastructure/         # Dockerfiles and deployment configs
├── tests/                  # Pytest and Vitest test suites
├── docs/                   # Engineering constitution, ADRs, architecture docs
└── docker-compose.yml      # Orchestrates full stack
```

---

## 📚 Documentation Links
- [Engineering Constitution](docs/ENGINEERING_CONSTITUTION.md)
- [Architecture Overview & Diagram](docs/architecture/overview.md)
- [Local Development Guide](docs/deployment/local-dev.md)
- [Testing Strategy](docs/testing/strategy.md)
- [Progress Tracker](docs/PROGRESS.md)
- [Glossary](docs/GLOSSARY.md)
