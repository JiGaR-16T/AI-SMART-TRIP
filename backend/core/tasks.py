import logging
import time

from celery import shared_task

logger = logging.getLogger(__name__)


@shared_task(name="core.tasks.ping")
def ping() -> dict[str, str | float]:
    """Sample heartbeat / health-check task for Celery worker & beat.

    Returns timestamp and acknowledgment string.
    """
    timestamp = time.time()
    logger.info("Celery ping task executed at %s", timestamp)
    return {
        "status": "pong",
        "timestamp": timestamp,
    }
