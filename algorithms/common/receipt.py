from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Generic, TypeVar

T = TypeVar("T")


@dataclass
class AlgorithmReceipt:
    """Receipt documenting algorithm execution metadata.

    Shown in the UI so users and evaluators see real algorithm telemetry.
    """

    name: str
    category: str
    input_size: int
    steps: int = 0
    comparisons: int = 0
    swaps: int = 0
    nodes_explored: int = 0
    elapsed_ms: float = 0.0
    time_complexity: str = "O(1)"
    space_complexity: str = "O(1)"
    notes: str = ""
    extra: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        """Convert receipt to dictionary representation."""
        return {
            "name": self.name,
            "category": self.category,
            "input_size": self.input_size,
            "steps": self.steps,
            "comparisons": self.comparisons,
            "swaps": self.swaps,
            "nodes_explored": self.nodes_explored,
            "elapsed_ms": round(self.elapsed_ms, 3),
            "time_complexity": self.time_complexity,
            "space_complexity": self.space_complexity,
            "notes": self.notes,
            "extra": self.extra,
        }


@dataclass
class EngineResult(Generic[T]):
    """Standard return envelope for all computational and algorithmic engines."""

    data: T
    explanation: str
    algorithm_receipt: AlgorithmReceipt
    data_labels: dict[str, str] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        """Convert engine result to dictionary representation."""
        return {
            "data": self.data,
            "explanation": self.explanation,
            "algorithm_receipt": self.algorithm_receipt.to_dict(),
            "data_labels": self.data_labels,
        }
