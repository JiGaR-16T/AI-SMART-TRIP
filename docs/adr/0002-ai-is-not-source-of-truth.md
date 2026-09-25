# ADR-0002: AI Is Not the Source of Truth for Deterministic Work

## Status

ACCEPTED

## Date

2026-09-25

## Context

TravelMind integrates AI (Large Language Models) for natural language understanding — parsing user trip requests like "Plan a 5-day trip to Rajasthan under ₹30,000 with adventure activities" into structured parameters.

However, there is a dangerous temptation: **letting the AI compute deterministic answers** instead of our own algorithms. For example:

- ❌ Asking the LLM: "What's the cheapest route from Delhi to Jaipur?"
- ❌ Asking the LLM: "Optimize this budget allocation across 5 destinations."
- ❌ Asking the LLM: "What's the weather in Mumbai today?"
- ❌ Trusting the LLM's "knowledge" of train prices, hotel costs, or distances.

### Why This Is a Problem

1. **LLMs hallucinate**: They confidently generate plausible-sounding but incorrect data. A route cost of "₹2,500" from an LLM is a guess, not a fact.
2. **LLMs are non-deterministic**: The same prompt can produce different answers. Algorithms must be reproducible.
3. **LLMs cannot verify**: They cannot check if their answer satisfies constraints (budget ≤ ₹30,000). Our Knapsack/DP algorithms can.
4. **This is a DSA project**: The entire point is to demonstrate that real algorithms solve real problems. If the LLM does the work, we've built a chatbot, not an optimization system.
5. **Trust and transparency**: Users deserve to know HOW a result was computed (AlgorithmReceipt), not just get a black-box answer.

## Decision

### AI's Role (ALLOWED)
- **Natural Language Understanding**: Parse "budget trip to Goa for a week" → `{destination: "Goa", duration: 7, budget_tier: "economy"}`.
- **Suggestions & Inspiration**: "Based on your interest in history, you might also enjoy Hampi."
- **Explanations**: "This route was chosen because Dijkstra's algorithm found it has the lowest total travel time of 6h 45m."
- **Conversational UX**: Multi-turn trip planning conversation.
- **Fuzzy matching assistance**: Help disambiguate "Varanasi" vs "Banaras" vs "Kashi" (all the same city).

### AI's Boundary (FORBIDDEN)
- **Computing routes, distances, or travel times**: Use graph algorithms (Dijkstra, A*).
- **Optimizing budgets**: Use Knapsack/DP algorithms.
- **Scheduling itineraries**: Use backtracking/CSP algorithms.
- **Ranking results**: Use sorting algorithms + scoring functions.
- **Providing live data** (prices, weather, availability): Use external APIs with provider interfaces.
- **Making deterministic decisions**: Any decision that must be reproducible and verifiable.

### The Validation Rule

```
User Input → [AI: Parse & Understand] → Structured Parameters
    → [Algorithms: Compute] → EngineResult with AlgorithmReceipt
        → [Validation: Verify constraints] → Validated Result
            → [AI: Explain in natural language] → User Output
```

Every AI output that feeds into computation is validated by deterministic code:
1. AI parses "under 30k" → `max_budget_paise = 3000000`
2. Deterministic code verifies: `isinstance(max_budget_paise, int) and max_budget_paise > 0`
3. Algorithm computes the optimal allocation
4. Deterministic code verifies: `total_cost <= max_budget_paise`
5. AI explains: "Here's your optimized plan. The Knapsack algorithm allocated your ₹30,000 budget..."

## Consequences

### Positive
- **Correctness**: All deterministic results are mathematically verifiable.
- **Transparency**: Users see exactly which algorithm was used and how (AlgorithmReceipt).
- **Reproducibility**: Same inputs always produce the same outputs.
- **Academic value**: The project genuinely demonstrates DSA knowledge.
- **Offline capability**: Core functionality works without any AI API (using mock providers).
- **Cost control**: AI API calls are limited to NLU/explanation, not every computation.

### Negative
- **More code**: We must implement every algorithm ourselves rather than asking an LLM.
- **AI capabilities underused**: Modern LLMs can do impressive reasoning, but we deliberately limit them.
- **Complexity**: The parse → compute → validate → explain pipeline has more moving parts than "just ask the AI."

### Risks
- **Scope creep into AI**: As the project grows, there may be pressure to "just let the AI handle it" for complex edge cases. Mitigated by: this ADR, code review, and the Golden Rule #4.
- **AI parsing errors**: The NLU step might misparse user intent. Mitigated by: confirmation UX ("Did you mean...?"), structured validation, and fallback to manual input.

## Alternatives Considered

| Alternative | Pros | Cons | Why Rejected |
|------------|------|------|-------------|
| AI does everything (chatbot approach) | Simple, fast to build | Hallucinations, non-deterministic, no DSA demonstration, no transparency | Defeats the project's purpose. Not an engineering system. |
| No AI at all | Fully deterministic, simple | Poor UX (manual form filling), no natural language, harder to use | Misses the opportunity to show AI + DSA synergy. |
| AI with hard output schemas (structured output) | AI returns JSON, we validate format | Format is correct, content may still be hallucinated (e.g., fake prices) | Format validation ≠ content validation. A hallucinated price in valid JSON is still wrong. |

## References

- [Retrieval-Augmented Generation (RAG)](https://arxiv.org/abs/2005.11401) — similar philosophy: ground AI in real data
- [AI-Assisted vs AI-Driven](https://martinfowler.com/articles/exploring-gen-ai.html) — Martin Fowler on keeping humans (and algorithms) in the loop
- Golden Rule #4 in `docs/ENGINEERING_CONSTITUTION.md`
