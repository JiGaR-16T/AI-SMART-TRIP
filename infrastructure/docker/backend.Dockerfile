# ==============================================================================
# TravelMind Backend Dockerfile
# Multi-stage build with non-root security enforcement
# ==============================================================================

# Stage 1: Build & Dependencies
FROM python:3.11-slim as builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements/ /app/backend/requirements/
RUN pip install --upgrade pip && \
    pip install -r /app/backend/requirements/prod.txt

# Stage 2: Runtime Image
FROM python:3.11-slim as runner

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000 \
    PYTHONPATH=/app/backend:/app/algorithms

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root system user and group
RUN groupadd -r travelmind && useradd -r -g travelmind -d /app -s /sbin/nologin travelmind

# Copy installed python dependencies from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy codebase
COPY backend/ /app/backend/
COPY algorithms/ /app/algorithms/

# Install local algorithms package
RUN pip install -e /app/algorithms

# Create static and media directories with proper permissions
RUN mkdir -p /app/backend/staticfiles /app/backend/media && \
    chown -R travelmind:travelmind /app

USER travelmind

EXPOSE 8000

CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]
