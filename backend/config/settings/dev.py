from .base import *  # noqa: F403

DEBUG = True

# Fallback to local memory cache if REDIS_URL not available or in offline dev
USE_LOCAL_CACHE = env.bool("USE_LOCAL_CACHE", default=False)  # noqa: F405
if USE_LOCAL_CACHE:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "travelmind-dev-cache",
        }
    }

ALLOWED_HOSTS = ["*"]

CORS_ALLOW_ALL_ORIGINS = True
