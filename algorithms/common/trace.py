from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class TraceEvent:
    """Individual step event recorded during algorithm visualization/execution."""

    step_index: int
    event_type: str  # e.g., 'compare', 'swap', 'visit', 'relax', 'backtrack', 'prune'
    description: str
    state: dict[str, Any] = field(default_factory=dict)
    highlights: list[str | int] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "step_index": self.step_index,
            "event_type": self.event_type,
            "description": self.description,
            "state": self.state,
            "highlights": self.highlights,
        }


class TraceRecorder:
    """Records chronological execution steps for DSA Lab visualizations."""

    def __init__(self, max_steps: int = 1000) -> None:
        self.max_steps = max_steps
        self.events: list[TraceEvent] = []
        self._current_step: int = 0

    def record(
        self,
        event_type: str,
        description: str,
        state: dict[str, Any] | None = None,
        highlights: list[str | int] | None = None,
    ) -> None:
        """Record a single step event if within max_steps threshold."""
        if len(self.events) >= self.max_steps:
            return

        self._current_step += 1
        event = TraceEvent(
            step_index=self._current_step,
            event_type=event_type,
            description=description,
            state=state or {},
            highlights=highlights or [],
        )
        self.events.append(event)

    def clear(self) -> None:
        """Reset the recorder."""
        self.events.clear()
        self._current_step = 0

    def to_list(self) -> list[dict[str, Any]]:
        """Serialize all recorded events to dictionaries."""
        return [evt.to_dict() for evt in self.events]

    def __len__(self) -> int:
        return len(self.events)
