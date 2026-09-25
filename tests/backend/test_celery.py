from core.tasks import ping


def test_celery_ping_task_eager_execution():
    """Verify Celery task executes and returns pong payload eagerly."""
    result = ping.delay()
    assert result.successful()
    data = result.get()
    assert data["status"] == "pong"
    assert "timestamp" in data
