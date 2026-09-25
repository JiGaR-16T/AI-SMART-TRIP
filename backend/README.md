# TravelMind Backend

Django REST Framework backend for TravelMind Intelligent Travel Planner.

## Structure
- `config/`: Split Django settings (`base.py`, `dev.py`, `test.py`, `prod.py`), URLs, Celery setup, and WSGI/ASGI handlers.
- `core/`: Base application containing response envelopes, custom exception handlers, request-ID logging middleware, health-check APIs, base models, and shared choices.
- `requirements/`: Layered requirements files (`base.txt`, `dev.txt`, `prod.txt`).
