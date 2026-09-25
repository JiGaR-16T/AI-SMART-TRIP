import uuid

from django.db import models


class TimeStampedUUIDModel(models.Model):
    """Abstract base model for domain entities.

    Architectural Decision: UUID vs Sequential Integer IDs
    -------------------------------------------------------
    1. Security & Anti-Enumeration: Using UUIDv4 prevents sequential guessing
       of sensitive resources (e.g., someone scraping itineraries via /trips/1, /trips/2).
    2. Distributed & Offline Generation: Enables frontend/mobile or background workers
       to safely generate identifiers before syncing to database.
    3. Partitioning & Sharding Safety: Enables easier data migration and sharding without
       primary key sequence conflicts.
    """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Globally unique identifier for this entity.",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
        help_text="Timestamp when the entity was created.",
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when the entity was last modified.",
    )

    class Meta:
        abstract = True
        ordering = ["-created_at"]
