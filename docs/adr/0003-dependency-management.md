# ADR-0003: Dependency Management Strategy

## Status

**Accepted** — 2026-09-25

## Context

We need a way to manage Python dependencies for both the backend (Django) and
the algorithms package. Options considered:

1. **requirements/{base,dev,prod}.txt** — simple, widely understood, but no
   build metadata and requires manual syncing.
2. **pyproject.toml + pip** — modern PEP 621 standard, one file for metadata
   and deps, supports editable installs for local packages, and tools like
   `ruff` and `pytest` can also be configured there.
3. **Poetry / PDM / Hatch** — more advanced tooling but adds an extra tool
   a beginner must learn.

## Decision

We use **pyproject.toml** for both the backend and the algorithms package.

- `algorithms/pyproject.toml` — declares the algorithms package as an
  installable pure-Python library with zero dependencies.
- `backend/pyproject.toml` — declares all backend dependencies and includes
  `algorithms` as an editable local dependency via `pip install -e ../algorithms`.
- We use **requirements/*.txt files generated from pyproject.toml** as a
  simple fallback for environments that do not support editable installs
  (CI caching, Docker layer caching).

### Why not Poetry/PDM?

This is a college project. Adding another tool increases the learning curve
without proportional benefit. `pip` + `pyproject.toml` is the PEP standard
and works everywhere.

## Consequences

- All Python metadata lives in `pyproject.toml` (one per package).
- `pip install -e .` works for development.
- `ruff`, `pytest`, and `mypy` are configured in the backend's
  `pyproject.toml`.
- Requirements txt files exist for pinning (generated via `pip freeze`
  or `pip-compile`) for reproducible CI/Docker builds.
