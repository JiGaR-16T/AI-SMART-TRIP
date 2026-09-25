# Contributing to TravelMind

Thank you for your interest in contributing to TravelMind! This guide explains our branching, commit, and code review conventions.

---

## Getting Started

1. **Read the docs first**:
   - [Engineering Constitution](docs/ENGINEERING_CONSTITUTION.md) — the project rulebook (mandatory)
   - [Glossary](docs/GLOSSARY.md) — if any term is unfamiliar
   - [Progress Tracker](docs/PROGRESS.md) — to see what's in progress

2. **Set up your environment**: See the Environment Setup section in the Engineering Constitution.

3. **Pick a task**: Check the open issues or the current part in the progress tracker.

---

## Branching Strategy

We use a simple branch-per-part workflow:

```
main                            ← stable, always green
├── feat/part-XX-<name>         ← feature work
├── fix/part-XX-<description>   ← bug fixes
├── chore/part-XX-<description> ← tooling, config
├── test/part-XX-<description>  ← test additions
└── docs/part-XX-<description>  ← documentation only
```

### Rules
- **Never push directly to `main`**. Always use a branch.
- **Never force-push** to any shared branch.
- Branch names use lowercase with hyphens: `feat/part-03-trie-search`
- Delete branches after merge.

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format
```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

| Type | When to Use |
|------|------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | A performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system or external dependency changes |
| `ci` | CI configuration changes |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Reverts a previous commit |

### Examples
```
feat(algorithms): implement Dijkstra shortest path engine
fix(api): return 404 instead of 500 for missing trips
docs(constitution): add trust-label system documentation
test(algorithms): add edge cases for Trie autocomplete
chore(deps): upgrade Django to 5.1
refactor(services): extract trip optimizer into separate module
perf(search): cache Trie in Redis for faster autocomplete
```

### Rules
- Use **imperative mood** in the subject: "add feature" not "added feature"
- Keep the subject line under **72 characters**
- Do not end the subject with a period
- Capitalize the first letter of the description

---

## Pull Request Process

1. **Create a branch** from `main` following the naming convention.
2. **Make your changes** following the Engineering Constitution.
3. **Write tests** for your changes and ensure they pass.
4. **Run the full check suite**:
   ```bash
   # Python
   ruff check .
   mypy .
   pytest

   # TypeScript (when applicable)
   npm run lint
   npm run type-check
   npm run test
   npm run build
   ```
5. **Update documentation**: `docs/PROGRESS.md` and any relevant docs.
6. **Open a Pull Request** using the PR template.
7. **Self-review** using the Definition of Done checklist.

---

## Code Style

- **Python**: PEP 8, enforced by `ruff`. Type hints on all public functions.
- **TypeScript**: `strict` mode. PascalCase components, camelCase functions.
- **No business logic** in views, serializers, or React components.
- **No hardcoded secrets**. Use `.env` files.
- See the full naming conventions in the [Engineering Constitution](docs/ENGINEERING_CONSTITUTION.md#4-naming-conventions).

---

## Questions?

If anything is unclear, open an issue with the "question" label or check the [Glossary](docs/GLOSSARY.md).
