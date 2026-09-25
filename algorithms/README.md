# TravelMind Algorithms Package

Pure Python implementation of core Data Structures & Algorithms used across TravelMind.

## Architectural Rule
This package is **Layer 3 (DSA / Optimization)** in the TravelMind 7-layer architecture.
It must **NEVER** import Django, DRF, or any external framework dependencies. It relies purely on the Python standard library.

## Subpackages
- `common`: `AlgorithmReceipt`, `EngineResult`, measurement context managers, and execution tracers.
- `searching`: Search algorithms (binary search, exponential search, etc.)
- `sorting`: Priority queues, topological sorting, custom trip rankers
- `structures`: Custom graphs, heaps, disjoint-set union (DSU), Trie
- `graph`: Dijkstra, A*, Bellman-Ford, Floyd-Warshall
- `optimization`: 0/1 Knapsack, fractional knapsack, Pareto frontier
- `backtracking`: Constraint satisfaction, itinerary slotting
- `scheduling`: Interval scheduling, activity selection
- `similarity`: Cosine similarity, Jaccard distance, preference vector matching
- `strings`: Trie autocomplete, Levenshtein edit distance, phonetic matching
- `social_choice`: Borda count, Condorcet voting for group travel decisions
