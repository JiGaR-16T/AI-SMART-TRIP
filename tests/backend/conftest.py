import pytest
from rest_framework.test import APIClient


@pytest.fixture
def api_client() -> APIClient:
    """Fixture providing a DRF API client."""
    return APIClient()
