# Testing Strategy

This document defines the testing strategy, pyramid, and verification targets for TravelMind.

## 1. Testing Pyramid

```
        / \
       /   \        E2E (Playwright) - Future Parts
      /-----\       Integration Tests (API & DB checks)
     /       \      
    /---------\     Unit Tests (pytest for backend & algorithms, vitest for frontend)
   /           \    Static Analysis (ruff, eslint, mypy, tsc)
```

## 2. Coverage Targets

| Test Suite | Coverage Target | Current Status | Tool |
|---|---|---|---|
| `algorithms/` | ≥ 90% | **99%** | `pytest --cov=algorithms` |
| `backend/core/` | ≥ 80% | **85%** | `pytest --cov=backend/core` |
| `frontend/` | ≥ 70% | **100% (Unit)** | `vitest run` |

## 3. Running Tests

### Backend & Algorithms
```bash
# Run all tests
pytest -v

# Run with coverage report
pytest -v --cov=algorithms --cov=backend/core --cov-report=term-missing
```

### Frontend
```bash
cd frontend

# Run Vitest test runner
npm test

# Run TypeScript static type check
npx tsc --noEmit

# Run ESLint
npm run lint
```

## 4. Test Categories Implemented in Part 1

1. **Algorithm Receipt & Measurement Tests** (`tests/algorithms/test_common.py`):
   - Telemetry metrics accuracy (steps, comparisons, swaps, nodes explored)
   - Timing measurements with context manager and decorator
   - `TraceRecorder` chronological recording and limit cap enforcement
2. **Health Probe Tests** (`tests/backend/test_health.py`):
   - Liveness endpoint returning 200 OK
   - Readiness endpoint returning 200 OK when DB/Redis/Celery healthy
   - Simulated database connection failure returning 503 Unhealthy
   - Simulated Redis cache failure returning 503 Unhealthy
3. **Constitution Error Envelope Tests** (`tests/backend/test_error_format.py`):
   - 404 handler returning standard `{ success: false, error: ... }` format
   - Validation error handler converting field errors to normalized list details
   - Unhandled 500 handler preventing sensitive data or stack traces from leaking
4. **Celery Task Eager Execution** (`tests/backend/test_celery.py`):
   - Ping task synchronous dispatch and return verification
5. **Request Tracing & Logging Tests** (`tests/backend/test_request_id.py`, `tests/backend/test_logging.py`):
   - `X-Request-ID` generation and header propagation
   - Secret scrubbing filter removing passwords, bearer tokens, and API keys
6. **Frontend API Client & Status Page Tests** (`frontend/src/services/apiClient.test.ts`, `frontend/src/pages/StatusPage.test.tsx`):
   - Successful JSON response parsing
   - Constitution error envelope parsing into custom `ApiError`
   - Network failure handling
   - Status page loading, healthy components rendering, and error recovery states
