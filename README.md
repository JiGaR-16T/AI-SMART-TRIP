# 🧠 TravelMind

**An Intelligent Travel Planning and Multi-Objective Optimization System Using AI and Data Structures & Algorithms**

---

## What Is This?

TravelMind is an India-first smart travel planner where you describe your dream trip in plain English — "Plan a 5-day Rajasthan trip under ₹30,000 with adventure activities" — and the system uses **real algorithms** (not just AI guesswork) to find optimal routes, budgets, and schedules.

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

## 📊 Status: Part 0 — Project Constitution

See [docs/PROGRESS.md](docs/PROGRESS.md) for the full progress tracker.

---

## 📁 Project Structure

```
travelmind/
├── frontend/               # React + Vite + TypeScript (UI)
├── backend/                # Python + Django + DRF (API & Business Logic)
├── algorithms/             # Pure Python DSA engines (no Django)
├── data/seed/              # Seed/demo data for development
├── infrastructure/         # Docker, Redis, Celery configs
│   ├── docker/
│   ├── redis/
│   └── celery/
├── docs/                   # All project documentation
│   ├── ENGINEERING_CONSTITUTION.md  ← The rulebook
│   ├── PROGRESS.md                  ← Progress tracker
│   ├── GLOSSARY.md                  ← Term definitions
│   ├── COMMIT_CONVENTION.md         ← Git commit rules
│   ├── architecture/
│   ├── api/
│   ├── algorithms/
│   ├── database/
│   ├── testing/
│   ├── deployment/
│   ├── college/
│   └── adr/                         ← Architecture Decision Records
├── tests/                  # All test files
│   ├── algorithms/
│   ├── backend/
│   ├── frontend/
│   ├── integration/
│   └── e2e/
├── scripts/                # Utility scripts
├── .github/                # GitHub templates & CI/CD
├── .gitignore
├── .editorconfig
├── .gitattributes
├── LICENSE                  (MIT)
├── CONTRIBUTING.md
└── README.md                ← You are here
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TypeScript |
| Backend | Python + Django + Django REST Framework |
| Database | PostgreSQL |
| Cache / Broker | Redis |
| Background Jobs | Celery |
| Authentication | JWT |
| API Docs | OpenAPI (drf-spectacular) |
| Testing | pytest · Vitest · React Testing Library · Playwright |
| Infrastructure | Docker + docker-compose + GitHub Actions |

---

## 📚 Documentation

- [Engineering Constitution](docs/ENGINEERING_CONSTITUTION.md) — The project rulebook
- [Progress Tracker](docs/PROGRESS.md) — What's done, what's next
- [Glossary](docs/GLOSSARY.md) — All terms explained for beginners
- [Commit Convention](docs/COMMIT_CONVENTION.md) — How to write commit messages
- [Contributing Guide](CONTRIBUTING.md) — How to contribute
- Architecture Decision Records: [ADR Index](docs/adr/)

---

## 📝 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

*Built with ❤️ as a college Software Engineering project by Jigar Chauhan.*
