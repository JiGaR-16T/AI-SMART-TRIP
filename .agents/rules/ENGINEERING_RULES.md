# TravelMind — Condensed Engineering Rules
# This file is automatically loaded by Antigravity IDE in every session.
# Full version: docs/ENGINEERING_CONSTITUTION.md

## Architecture
- 7-layer architecture: Experience → API → Application → Domain → DSA/Optimization → Data/Integration → Infrastructure
- Each layer may only depend on layers BELOW it
- `algorithms/` is pure Python — NO Django imports

## Code Rules
- No business logic in views, serializers, or React components — use service/use-case modules
- No hardcoded secrets — use `.env` (git-ignored) + `.env.example`
- Every external service has a provider interface + mock/demo provider for offline mode
- Python: snake_case, PEP 8, type hints on all public functions (ruff + mypy)
- TypeScript: strict mode, PascalCase components, camelCase functions (eslint + tsc)

## Data Rules
- Trust labels on ALL user-facing data: LIVE | ESTIMATED | CACHED | DEMO
- Never present demo/estimated data as live
- Money in integer paise (₹1 = 100 paise), never float
- Dates in ISO 8601, distances in meters, coordinates as [lat, lng]

## API Rules
- URL pattern: `/api/v1/<resource>/`
- Success: `{success: true, data: ..., meta: {trust_label, algorithm_receipt}}`
- Error: `{success: false, error: {code, message, details}}`
- Never leak stack traces, secrets, or tokens

## Engine Contract
- Every algorithm returns EngineResult: {data, explanation, algorithm_receipt, data_labels}
- AlgorithmReceipt: {algorithm_name, input_size, nodes_explored, steps, comparisons, elapsed_ms, time_complexity, space_complexity}
- AI handles language understanding + explanations. Algorithms handle all computation.

## Testing
- algorithms/ ≥ 90% coverage, backend/ ≥ 80%, frontend/ ≥ 70%
- Run tests, lint, type-check, and build before claiming completion
- Fix failures yourself — don't just report them

## Git
- Branch: `feat/part-XX-<name>` | `fix/` | `chore/` | `test/` | `docs/`
- Conventional commits: `feat(scope): description`
- Never force-push. Merge to main only after all checks pass.
