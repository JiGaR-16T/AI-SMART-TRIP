from __future__ import annotations

import functools
import time
import types
from collections.abc import Callable
from contextlib import AbstractContextManager
from typing import ParamSpec, TypeVar

from algorithms.common.receipt import AlgorithmReceipt

P = ParamSpec("P")
R = TypeVar("R")


class ExecutionMetrics:
    """Telemetry counters collected during algorithm execution."""

    def __init__(self) -> None:
        self.steps: int = 0
        self.comparisons: int = 0
        self.swaps: int = 0
        self.nodes_explored: int = 0
        self.elapsed_ms: float = 0.0

    def step(self, count: int = 1) -> None:
        self.steps += count

    def compare(self, count: int = 1) -> None:
        self.comparisons += count

    def swap(self, count: int = 1) -> None:
        self.swaps += count

    def explore_node(self, count: int = 1) -> None:
        self.nodes_explored += count


class MeasureContext(AbstractContextManager[ExecutionMetrics]):
    """Context manager measuring execution time and telemetry counters."""

    def __init__(self) -> None:
        self.metrics = ExecutionMetrics()
        self._start_time: float = 0.0

    def __enter__(self) -> ExecutionMetrics:
        self._start_time = time.perf_counter()
        return self.metrics

    def __exit__(
        self,
        exc_type: type[BaseException] | None,
        exc_val: BaseException | None,
        exc_tb: types.TracebackType | None,
    ) -> None:
        duration_s = time.perf_counter() - self._start_time
        self.metrics.elapsed_ms = duration_s * 1000.0


def measure_execution() -> MeasureContext:
    """Create a measurement context manager."""
    return MeasureContext()


def measured_algorithm(
    name: str,
    category: str,
    time_complexity: str = "O(n)",
    space_complexity: str = "O(1)",
) -> Callable[[Callable[P, R]], Callable[P, tuple[R, AlgorithmReceipt]]]:
    """Decorator for functions that accept a metrics counter and return (result, receipt)."""

    def decorator(fn: Callable[P, R]) -> Callable[P, tuple[R, AlgorithmReceipt]]:
        @functools.wraps(fn)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> tuple[R, AlgorithmReceipt]:
            ctx = MeasureContext()
            with ctx as metrics:
                # If function accepts 'metrics' in kwargs, pass it; else call as is
                if "metrics" in fn.__code__.co_varnames:
                    kwargs["metrics"] = metrics  # type: ignore[assignment]
                result = fn(*args, **kwargs)

            # Determine input size
            input_size = 0
            if args:
                first = args[0]
                if hasattr(first, "__len__"):
                    input_size = len(first)
                elif isinstance(first, int | float):
                    input_size = int(first)

            receipt = AlgorithmReceipt(
                name=name,
                category=category,
                input_size=input_size,
                steps=metrics.steps,
                comparisons=metrics.comparisons,
                swaps=metrics.swaps,
                nodes_explored=metrics.nodes_explored,
                elapsed_ms=metrics.elapsed_ms,
                time_complexity=time_complexity,
                space_complexity=space_complexity,
            )
            return result, receipt

        return wrapper

    return decorator
