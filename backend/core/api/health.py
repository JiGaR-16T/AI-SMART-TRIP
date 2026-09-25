from __future__ import annotations

import time
from typing import Any

from django.conf import settings
from django.db import connection
from django.utils import timezone
from drf_spectacular.utils import OpenApiResponse, extend_schema, inline_serializer
from rest_framework import fields, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

# Liveness Serializer for OpenAPI Documentation
LivenessResponseSerializer = inline_serializer(
    name="LivenessResponse",
    fields={
        "status": fields.CharField(default="ok"),
        "app": fields.CharField(default="travelmind"),
        "version": fields.CharField(default="0.1.0"),
        "timestamp": fields.DateTimeField(),
    },
)

# Readiness Component Serializer
ComponentStatusSerializer = inline_serializer(
    name="ComponentStatus",
    fields={
        "status": fields.CharField(),
        "latency_ms": fields.FloatField(),
        "message": fields.CharField(required=False),
        "engine": fields.CharField(required=False),
    },
)

ReadinessResponseSerializer = inline_serializer(
    name="ReadinessResponse",
    fields={
        "status": fields.CharField(),
        "version": fields.CharField(),
        "environment": fields.CharField(),
        "timestamp": fields.DateTimeField(),
        "components": fields.DictField(child=ComponentStatusSerializer),
    },
)


class HealthLivenessView(APIView):
    """Liveness probe to confirm backend web process is responding."""

    authentication_classes = []
    permission_classes = []

    @extend_schema(
        summary="Liveness Probe",
        description="Returns 200 OK if the web server process is alive and accepting HTTP traffic.",
        responses={200: LivenessResponseSerializer},
        tags=["Health"],
    )
    def get(self, request: Request) -> Response:
        return Response(
            {
                "status": "ok",
                "app": "travelmind",
                "version": "0.1.0",
                "timestamp": timezone.now().isoformat(),
            },
            status=status.HTTP_200_OK,
        )


class HealthReadinessView(APIView):
    """Readiness probe to confirm external backing services (DB, Redis, Celery) are reachable."""

    authentication_classes = []
    permission_classes = []

    @extend_schema(
        summary="Readiness Probe",
        description="Checks connectivity and latencies for PostgreSQL, Redis cache, and Celery broker.",
        responses={
            200: OpenApiResponse(
                response=ReadinessResponseSerializer, description="All components healthy"
            ),
            503: OpenApiResponse(
                response=ReadinessResponseSerializer,
                description="One or more components degraded/unhealthy",
            ),
        },
        tags=["Health"],
    )
    def get(self, request: Request) -> Response:
        components: dict[str, dict[str, Any]] = {}
        overall_healthy = True

        # 1. Database check
        db_start = time.perf_counter()
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
                cursor.fetchone()
            db_latency = (time.perf_counter() - db_start) * 1000.0
            components["database"] = {
                "status": "healthy",
                "latency_ms": round(db_latency, 2),
                "engine": connection.vendor,
            }
        except Exception:
            overall_healthy = False
            components["database"] = {
                "status": "unhealthy",
                "latency_ms": round((time.perf_counter() - db_start) * 1000.0, 2),
                "message": "Database connection failed",
            }

        # 2. Redis check
        redis_start = time.perf_counter()
        try:
            from django.core.cache import cache

            cache.set("__health_check__", "1", timeout=5)
            val = cache.get("__health_check__")
            if val == "1":
                redis_latency = (time.perf_counter() - redis_start) * 1000.0
                components["redis"] = {
                    "status": "healthy",
                    "latency_ms": round(redis_latency, 2),
                }
            else:
                raise ValueError("Cache read failed")
        except Exception:
            # Redis failure doesn't crash the whole app in dev if fallback enabled
            components["redis"] = {
                "status": "unhealthy",
                "latency_ms": round((time.perf_counter() - redis_start) * 1000.0, 2),
                "message": "Redis cache ping failed",
            }
            overall_healthy = False

        # 3. Celery broker check
        celery_start = time.perf_counter()
        try:
            from config.celery import app as celery_app

            with celery_app.connection_for_read() as conn:
                conn.connect()
                conn.release()
            celery_latency = (time.perf_counter() - celery_start) * 1000.0
            components["celery"] = {
                "status": "healthy",
                "latency_ms": round(celery_latency, 2),
            }
        except Exception:
            components["celery"] = {
                "status": "unhealthy",
                "latency_ms": round((time.perf_counter() - celery_start) * 1000.0, 2),
                "message": "Celery broker ping failed",
            }
            overall_healthy = False

        env_name = (
            "test"
            if "test" in settings.SETTINGS_MODULE
            else ("development" if settings.DEBUG else "production")
        )

        payload = {
            "status": "healthy" if overall_healthy else "unhealthy",
            "version": "0.1.0",
            "environment": env_name,
            "timestamp": timezone.now().isoformat(),
            "components": components,
        }

        http_code = status.HTTP_200_OK if overall_healthy else status.HTTP_503_SERVICE_UNAVAILABLE
        return Response(payload, status=http_code)
