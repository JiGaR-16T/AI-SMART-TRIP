# ADR-0001: Modular Monolith Over Microservices

## Status

ACCEPTED

## Date

2026-09-25

## Context

TravelMind requires multiple interconnected subsystems: search/autocomplete, route optimization, budget planning, itinerary scheduling, AI integration, recommendations, and more. We need to decide how to structure the codebase.

The two main approaches are:

1. **Microservices**: Each subsystem is a separate deployable service with its own database, communicating via HTTP/gRPC/message queues.
2. **Modular Monolith**: A single deployable application, but with strict internal module boundaries, clear interfaces, and enforced dependency rules.

### Key Factors
- This is a **college project** built by a small team (primarily one person).
- The developer is a **beginner/fresher** learning software engineering.
- The project needs to demonstrate **DSA and algorithms**, not distributed systems.
- Budget for infrastructure is **minimal to zero**.
- The project timeline is **bounded by the academic semester**.

## Decision

We will build TravelMind as a **modular monolith** with strict internal boundaries.

### What This Means
- **One Django backend** with clearly separated Django apps for each domain (trips, search, optimization, users, etc.).
- **One React frontend** with feature-based folder organization.
- **One `algorithms/` package** that is pure Python, completely independent of Django.
- **Strict import rules**: each module exposes a public API (service layer). Other modules import only through services, never reaching into internal models or repositories directly.
- **One database** (PostgreSQL) with schema-level separation where appropriate.
- **One deployment unit** (Docker Compose: web + worker + db + redis).

### Module Communication
- Modules communicate through **Python function calls** within the same process.
- Each module's service layer is the only entry point.
- If a module ever needs to become a separate service in the future, the service interface is already defined.

## Consequences

### Positive
- **Simplicity**: One codebase, one deployment, one database — manageable for a solo developer.
- **Fast development**: No network overhead between modules, no distributed debugging, no service discovery.
- **Easy testing**: Integration tests are simple function calls, not HTTP mocking.
- **Learning focus**: The developer can focus on DSA, AI, and engineering quality rather than infrastructure complexity.
- **Cost**: Runs on a single server or even a laptop. No cloud service costs.
- **Refactorability**: If a module's interface is clean, extracting it into a microservice later is straightforward.

### Negative
- **Scaling limits**: Cannot independently scale hot modules (e.g., the search/autocomplete engine might get more traffic than the booking flow).
- **Deployment coupling**: A bug in one module means redeploying the entire application.
- **Technology lock-in**: All modules must use Python/Django (though `algorithms/` is already framework-agnostic).

### Risks
- **Boundary erosion**: Without discipline, modules may start importing each other's internals. Mitigated by: import linting rules, code review, and the Engineering Constitution.
- **Growing complexity**: As the project grows, a single codebase can become unwieldy. Mitigated by: strict folder structure, clear module boundaries, and the 7-layer architecture.

## Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|------------|------|------|-------------|
| Full microservices | Independent scaling, technology diversity, fault isolation | Massive operational complexity, distributed debugging, network latency, infrastructure cost, steep learning curve | Overkill for a college project with one developer. The complexity would consume time that should go to DSA and AI work. |
| Serverless functions | Auto-scaling, pay-per-use | Cold starts, vendor lock-in, hard to run locally, poor for stateful algorithms | TravelMind's algorithms are CPU-bound and stateful (graphs in memory). Serverless is a poor fit. |
| No structure (single Django app) | Simple to start | Becomes unmaintainable quickly, no separation of concerns | Defeats the purpose of demonstrating software engineering skills. |

## References

- [Modular Monolith: A Primer](https://www.kamilgrzybek.com/blog/posts/modular-monolith-primer) by Kamil Grzybek
- [MonolithFirst](https://martinfowler.com/bliki/MonolithFirst.html) by Martin Fowler
- [The Majestic Modular Monolith](https://www.youtube.com/watch?v=BOvxJaklcr0) (talk)
