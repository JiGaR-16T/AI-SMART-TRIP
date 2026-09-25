# TravelMind — Glossary

> A beginner-friendly guide to all the technical terms used in this project. Each term is explained in 1–3 simple sentences.

---

## Architecture & Frameworks

| Term | What It Means |
|------|--------------|
| **Full-Stack** | Building both the frontend (what users see in the browser) and the backend (the server that processes data and runs logic). A full-stack developer handles both sides. |
| **Django** | A Python web framework that helps you build websites and APIs quickly. It handles URLs, databases, authentication, and more out of the box. Think of it as a toolkit for building the server side. |
| **Django REST Framework (DRF)** | An add-on for Django that makes it easy to build REST APIs. An API is a way for the frontend to talk to the backend — like a waiter taking orders between you and the kitchen. |
| **React** | A JavaScript library for building user interfaces. Instead of writing one giant HTML page, you build small reusable "components" (like a search bar, a card, a button) and combine them. |
| **Vite** | A modern build tool that makes your React app start up and refresh very fast during development. Think of it as a super-fast compiler for your frontend code. |
| **TypeScript** | JavaScript with **type safety**. It catches errors like "you passed a number where a string was expected" before your code even runs. The `strict` mode catches even more mistakes. |
| **REST API** | A way to organize how the frontend talks to the backend. Uses URLs like `/api/v1/trips/` and HTTP methods like GET (read), POST (create), PUT (update), DELETE (remove). |
| **JWT (JSON Web Token)** | A way to handle login sessions. When you log in, the server gives you a small encrypted token. You send this token with every request to prove who you are, instead of sending your password each time. |
| **OpenAPI / Swagger** | A standard way to document your API. Tools like `drf-spectacular` automatically generate a webpage that shows all your endpoints, what data they accept, and what they return. |

## Data Structures & Algorithms (DSA)

| Term | What It Means |
|------|--------------|
| **Trie** | A tree-like data structure used for fast text search and autocomplete. When you type "Del" and it suggests "Delhi", "Dehradun", "Delhousie" — that's a Trie at work. Each node is a character, and paths through the tree form words. |
| **Heap** | A special tree structure where the root is always the smallest (min-heap) or largest (max-heap) element. Used for finding the "top N" results efficiently — like "show me the 10 cheapest trips." |
| **Graph** | A network of points (nodes/vertices) connected by lines (edges). Cities are nodes, routes between them are edges. The edge can have a weight (distance, time, cost). Used to model transportation networks. |
| **Dijkstra's Algorithm** | Finds the shortest/cheapest path between two points in a graph. Named after Edsger Dijkstra. If you want "the cheapest way to get from Delhi to Goa", Dijkstra's algorithm explores routes systematically until it proves it found the best one. |
| **A\* (A-Star) Algorithm** | Like Dijkstra but smarter — it uses a "heuristic" (educated guess) about how far the destination is, so it explores fewer dead ends. If Dijkstra is a thorough explorer, A\* is one with a compass. |
| **Dynamic Programming (DP)** | Solving a big problem by breaking it into smaller overlapping subproblems, solving each one once, and storing the result. Like filling in a table cell by cell instead of recalculating everything from scratch. |
| **Knapsack Problem** | A classic optimization problem: given a bag with a weight limit (budget) and items with weights and values (activities with costs and enjoyment scores), pick the best combination that fits. Used for budget optimization. |
| **Backtracking** | Trying possibilities step by step. If you reach a dead end (constraint violated), you undo the last step and try a different path. Like solving a maze by trying paths and going back when you hit a wall. |
| **Constraint Satisfaction Problem (CSP)** | A problem where you need to assign values to variables while satisfying a set of rules. Example: scheduling 10 activities across 5 days where no two overlap, each fits the time slot, and lunch is always at noon. |
| **Pareto Optimization / Pareto Front** | When you have multiple goals that conflict (cheapest trip vs. most comfortable vs. shortest travel time), the "Pareto front" is the set of solutions where you can't improve one goal without making another worse. We show users all these trade-off options. |
| **Sorting Algorithms** | Methods to arrange items in order (cheapest first, highest rated first, shortest distance first). Different algorithms have different speeds — we use the right one for each situation. |
| **Time Complexity (Big-O)** | A way to describe how an algorithm's speed changes as the input grows. O(n) means it takes roughly proportional time, O(n²) means it slows down quadratically. Shown in the AlgorithmReceipt. |
| **Space Complexity** | How much memory an algorithm uses as the input grows. Like time complexity, but for RAM instead of CPU time. |

## Infrastructure & DevOps

| Term | What It Means |
|------|--------------|
| **PostgreSQL** | A powerful open-source database. Stores all your data (users, trips, destinations) in organized tables. More reliable and feature-rich than SQLite (which Django uses by default for development). |
| **Redis** | An in-memory data store — like a super-fast sticky note pad. Used for caching (storing frequently-accessed data so we don't hit the database every time) and as a message broker for Celery. |
| **Celery** | A tool for running tasks in the background. When a user requests a complex trip optimization that takes 30 seconds, Celery runs it in the background and notifies the user when it's done, instead of making them wait. |
| **Docker** | A tool that packages your app and all its dependencies into a "container" — a lightweight, portable box that runs the same way on every computer. No more "it works on my machine" problems. |
| **docker-compose** | A tool that defines and runs multiple Docker containers together. One command starts your web server, database, Redis, and Celery worker all at once. |
| **CI/CD (Continuous Integration / Continuous Deployment)** | Automatic pipelines that run your tests, check code quality, and deploy your app every time you push code. GitHub Actions is the CI/CD tool we use. |
| **GitHub Actions** | GitHub's built-in CI/CD system. You write YAML files that describe what to do when code is pushed (run tests, lint, deploy). Free for public repositories. |

## Testing

| Term | What It Means |
|------|--------------|
| **pytest** | A Python testing framework. You write functions that start with `test_` and use `assert` to check that your code produces the expected results. |
| **Vitest** | Like pytest, but for JavaScript/TypeScript. Used to test React components and utility functions. |
| **React Testing Library** | A tool for testing React components by interacting with them the way a user would (clicking buttons, typing text) rather than testing internal implementation details. |
| **Playwright** | A tool for end-to-end (E2E) testing — it opens a real browser, clicks through your app like a human would, and checks that everything works correctly. |
| **Code Coverage** | The percentage of your code that is executed by tests. 90% coverage means tests exercise 90% of your code lines. Higher is better, but 100% isn't always practical. |
| **Linting** | Automatically checking code for style issues and potential bugs without running it. Like a spell-checker for code. We use `ruff` (Python) and `eslint` (TypeScript). |
| **Type Checking** | Verifying that variables and functions use the correct data types. Catches errors like passing a string where a number is expected. We use `mypy` (Python) and TypeScript's built-in `tsc`. |

## Project-Specific Terms

| Term | What It Means |
|------|--------------|
| **Trust Label** | A tag on every piece of data telling users where it came from: LIVE (real-time API), ESTIMATED (algorithm-computed), CACHED (was live, now stored), or DEMO (fake data for testing). |
| **EngineResult** | The standard return format for all our algorithms. Contains the result data, a human-readable explanation, an AlgorithmReceipt, and trust labels. |
| **AlgorithmReceipt** | A record of what an algorithm did: its name, how many nodes it explored, how long it took, and its time/space complexity. Displayed in the UI for transparency. |
| **Provider Interface** | An abstraction that defines HOW to get external data (flights, weather, etc.) without specifying WHERE from. This lets us swap real APIs with mock data for offline development. |
| **Modular Monolith** | Our architecture: one deployable application, but with strict internal module boundaries. Simpler than microservices but more organized than a big ball of mud. See ADR-0001. |
| **ADR (Architecture Decision Record)** | A document that records a significant technical decision: what we decided, why, and what alternatives we considered. Helps future developers understand the reasoning. |
| **Conventional Commits** | A standard format for Git commit messages: `type(scope): description`. Examples: `feat(search): add Trie autocomplete`, `fix(api): handle empty budget`. |
| **Paise** | 1/100th of a Rupee (₹). We store money as integer paise (₹1,500 = 150000 paise) to avoid floating-point math errors like 0.1 + 0.2 = 0.30000000000000004. |

---

*Don't see a term you're looking for? Add it here and ask for an explanation!*
