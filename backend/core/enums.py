from django.db import models


class DataLabel(models.TextChoices):
    """Trust label attached to every data value shown to users.

    Constitution Rule 8:
    - LIVE: Fetched from a real external API within current refresh window.
    - ESTIMATED: Computed deterministically by our algorithms from known data.
    - CACHED: Was live data, now served from cache (includes age).
    - DEMO: Seed or synthetic data for development/demo.
    """

    LIVE = "LIVE", "Live"
    ESTIMATED = "ESTIMATED", "Estimated"
    CACHED = "CACHED", "Cached"
    DEMO = "DEMO", "Demo"
