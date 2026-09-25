import time

from algorithms.common.measure import (
    ExecutionMetrics,
    measure_execution,
    measured_algorithm,
)
from algorithms.common.receipt import AlgorithmReceipt, EngineResult
from algorithms.common.trace import TraceRecorder


def test_algorithm_receipt_to_dict():
    receipt = AlgorithmReceipt(
        name="Linear Search",
        category="searching",
        input_size=10,
        steps=5,
        comparisons=5,
        swaps=0,
        nodes_explored=0,
        elapsed_ms=1.234,
        time_complexity="O(n)",
        space_complexity="O(1)",
        notes="Standard search test",
        extra={"cache_hit": False},
    )
    d = receipt.to_dict()
    assert d["name"] == "Linear Search"
    assert d["category"] == "searching"
    assert d["input_size"] == 10
    assert d["steps"] == 5
    assert d["comparisons"] == 5
    assert d["elapsed_ms"] == 1.234
    assert d["time_complexity"] == "O(n)"
    assert d["extra"]["cache_hit"] is False


def test_engine_result_to_dict():
    receipt = AlgorithmReceipt(
        name="Demo",
        category="test",
        input_size=1,
    )
    result = EngineResult(
        data={"route": ["DEL", "BOM"]},
        explanation="Direct route selected",
        algorithm_receipt=receipt,
        data_labels={"route": "LIVE"},
    )
    d = result.to_dict()
    assert d["data"] == {"route": ["DEL", "BOM"]}
    assert d["explanation"] == "Direct route selected"
    assert d["algorithm_receipt"]["name"] == "Demo"
    assert d["data_labels"] == {"route": "LIVE"}


def test_execution_metrics():
    metrics = ExecutionMetrics()
    metrics.step(2)
    metrics.compare(3)
    metrics.swap(1)
    metrics.explore_node(4)

    assert metrics.steps == 2
    assert metrics.comparisons == 3
    assert metrics.swaps == 1
    assert metrics.nodes_explored == 4


def test_measure_context():
    with measure_execution() as metrics:
        time.sleep(0.01)
        metrics.step()
        metrics.compare()

    assert metrics.steps == 1
    assert metrics.comparisons == 1
    assert metrics.elapsed_ms > 0.0


def test_measured_algorithm_decorator():
    @measured_algorithm(
        name="Sample Linear Sum",
        category="testing",
        time_complexity="O(n)",
        space_complexity="O(1)",
    )
    def compute_sum(items: list[int], metrics: ExecutionMetrics | None = None) -> int:
        total = 0
        for item in items:
            if metrics:
                metrics.step()
                metrics.compare()
            total += item
        return total

    items = [1, 2, 3, 4, 5]
    total, receipt = compute_sum(items)

    assert total == 15
    assert receipt.name == "Sample Linear Sum"
    assert receipt.input_size == 5
    assert receipt.steps == 5
    assert receipt.comparisons == 5
    assert receipt.elapsed_ms >= 0.0


def test_trace_recorder():
    recorder = TraceRecorder(max_steps=5)
    recorder.record("visit", "Visiting start node", state={"curr": 0}, highlights=[0])
    recorder.record("relax", "Relaxing edge", state={"curr": 1}, highlights=[0, 1])

    assert len(recorder) == 2
    events = recorder.to_list()
    assert len(events) == 2
    assert events[0]["event_type"] == "visit"
    assert events[0]["step_index"] == 1
    assert events[0]["highlights"] == [0]

    # Test max steps threshold
    for i in range(10):
        recorder.record("step", f"Step {i}")
    assert len(recorder) == 5

    recorder.clear()
    assert len(recorder) == 0
