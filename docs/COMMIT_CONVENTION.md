# TravelMind — Commit Convention Guide

> Detailed guide with project-specific examples. For quick reference, see [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Why Conventional Commits?

1. **Readable history**: `git log --oneline` tells a clear story.
2. **Automated changelogs**: Tools can generate release notes from commit messages.
3. **Semantic versioning**: Commit types map to version bumps (feat → minor, fix → patch).
4. **College project**: Demonstrates professional engineering practices.

---

## Format

```
<type>(<scope>): <short description>

[optional body — explain WHY, not WHAT]

[optional footer — references, breaking changes]
```

---

## Types with Project Examples

### `feat` — New Feature
```
feat(algorithms): implement Trie data structure with insert and search

feat(api): add trip search endpoint with budget filtering

feat(frontend): create TripCard component with trust-label badges
```

### `fix` — Bug Fix
```
fix(algorithms): handle empty graph in Dijkstra to prevent IndexError

fix(api): return 400 instead of 500 when budget is negative

fix(frontend): fix currency display showing paise instead of rupees
```

### `docs` — Documentation
```
docs(constitution): add trust-label system documentation

docs(glossary): add explanation for Pareto optimization

docs(adr): record decision to use integer paise for money
```

### `test` — Tests
```
test(algorithms): add edge cases for Trie with Unicode city names

test(api): add integration tests for trip CRUD endpoints

test(e2e): add Playwright test for search-to-booking flow
```

### `refactor` — Code Restructuring
```
refactor(services): extract budget optimizer from trip service

refactor(algorithms): rename find_path to find_shortest_path for clarity
```

### `perf` — Performance
```
perf(algorithms): use min-heap instead of sorted list in Dijkstra

perf(search): add Redis caching for Trie autocomplete results
```

### `chore` — Maintenance
```
chore(deps): upgrade Django from 5.0 to 5.1

chore(docker): add health check to web service

chore(ci): add Python 3.12 to test matrix
```

### `style` — Formatting
```
style(backend): run ruff format on all Python files

style(frontend): fix eslint warnings in TripCard component
```

### `build` — Build System
```
build(frontend): update Vite config for production source maps

build(docker): optimize Dockerfile with multi-stage build
```

### `ci` — CI/CD
```
ci(github): add lint and test workflow for pull requests

ci(github): add deployment workflow for staging
```

---

## Scopes

Use these scopes to indicate what area of the project is affected:

| Scope | Area |
|-------|------|
| `algorithms` | The `algorithms/` package |
| `api` | Django REST API endpoints |
| `backend` | Django backend (general) |
| `frontend` | React frontend |
| `services` | Application service layer |
| `models` | Django models / domain |
| `search` | Search/autocomplete feature |
| `optimizer` | Budget/route optimization |
| `scheduler` | Itinerary scheduling |
| `auth` | Authentication/authorization |
| `deps` | Dependencies |
| `docker` | Docker configuration |
| `ci` | CI/CD pipelines |
| `db` | Database / migrations |
| `docs` | Documentation (when type is not `docs`) |
| `config` | Configuration files |

---

## Rules

1. **Imperative mood**: "add feature" ✅ not "added feature" ❌
2. **Under 72 characters** for the subject line
3. **No period** at the end of the subject
4. **Capitalize** the first word of the description
5. **Body explains WHY**, not what (the diff shows what)
6. **One logical change per commit** — don't mix a feature and a bug fix

---

## Breaking Changes

If a commit introduces a breaking change, add `BREAKING CHANGE:` in the footer:

```
feat(api)!: change money format from float rupees to integer paise

BREAKING CHANGE: All money fields in the API now use integer paise
instead of float rupees. ₹1,500.00 is now represented as 150000.
Frontend must divide by 100 for display.
```

---

## Multi-Line Example

```
feat(algorithms): implement A* pathfinding with haversine heuristic

A* uses the haversine formula (great-circle distance) as the heuristic
function to estimate remaining distance between cities. This provides
better performance than Dijkstra for geographically-spread graphs
because it explores fewer nodes by biasing toward the destination.

Closes #42
```
