## Description

<!-- What does this PR do? Keep it short. -->

## Part

<!-- Which part does this implement? e.g., Part 3 — Trie Search -->

Part XX — [name]

## Changes

<!-- List the key changes -->

- 
- 
- 

## Type of Change

- [ ] `feat` — New feature
- [ ] `fix` — Bug fix
- [ ] `refactor` — Code restructuring (no new feature or fix)
- [ ] `docs` — Documentation only
- [ ] `test` — Test additions or fixes
- [ ] `chore` — Maintenance, dependencies, tooling

## Definition of Done Checklist

### Code Quality
- [ ] All requirements from the part prompt are implemented
- [ ] No business logic in views, serializers, or React components
- [ ] No hardcoded secrets or credentials
- [ ] `algorithms/` has NO Django imports
- [ ] API errors follow the standard format: `{success, error: {code, message, details}}`
- [ ] Trust labels present on all user-facing data

### Testing
- [ ] Tests are written for new/changed code
- [ ] All tests PASS: `pytest` / `vitest`
- [ ] Lint PASSES: `ruff check .` / `npm run lint`
- [ ] Type check PASSES: `mypy .` / `tsc --noEmit`
- [ ] Build succeeds (if applicable)

### Documentation
- [ ] `docs/PROGRESS.md` updated
- [ ] Relevant docs updated (API docs, algorithm docs, etc.)
- [ ] New terms added to `docs/GLOSSARY.md` if applicable

### Git
- [ ] Branch follows naming convention: `feat/part-XX-<name>`
- [ ] Commits follow conventional commit format
- [ ] Branch is up to date with `main`
- [ ] No force-pushes

## Screenshots / Output

<!-- If applicable, add screenshots or command output -->

## How to Verify

<!-- Exact commands + what the reviewer should see -->

```bash
# Example:
# python manage.py runserver
# Open http://localhost:8000/api/v1/...
# Expected: ...
```

## Known Limitations

<!-- Anything that doesn't work perfectly yet? -->

- None
