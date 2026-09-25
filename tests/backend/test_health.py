from unittest.mock import patch

import pytest
from rest_framework import status
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_health_liveness(api_client: APIClient):
    response = api_client.get("/api/v1/health/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "ok"
    assert data["app"] == "travelmind"
    assert "version" in data
    assert "timestamp" in data


@pytest.mark.django_db
def test_health_readiness_healthy(api_client: APIClient):
    response = api_client.get("/api/v1/health/ready/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["status"] == "healthy"
    assert "database" in data["components"]
    assert data["components"]["database"]["status"] == "healthy"
    assert "redis" in data["components"]
    assert "celery" in data["components"]


@pytest.mark.django_db
def test_health_readiness_simulated_db_failure(api_client: APIClient):
    with patch("django.db.connection.cursor", side_effect=Exception("Database down")):
        response = api_client.get("/api/v1/health/ready/")
        assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
        data = response.json()
        assert data["status"] == "unhealthy"
        assert data["components"]["database"]["status"] == "unhealthy"
        assert "message" in data["components"]["database"]


@pytest.mark.django_db
def test_health_readiness_simulated_redis_failure(api_client: APIClient):
    with patch("django.core.cache.cache.set", side_effect=Exception("Redis down")):
        response = api_client.get("/api/v1/health/ready/")
        assert response.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
        data = response.json()
        assert data["status"] == "unhealthy"
        assert data["components"]["redis"]["status"] == "unhealthy"
