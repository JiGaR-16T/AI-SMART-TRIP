import uuid

from rest_framework import status
from rest_framework.test import APIClient


def test_request_id_generated_when_missing(api_client: APIClient):
    response = api_client.get("/api/v1/health/")
    assert response.status_code == status.HTTP_200_OK
    assert "X-Request-ID" in response
    req_id = response["X-Request-ID"]
    # Check that it is a valid UUID
    uuid_obj = uuid.UUID(req_id)
    assert str(uuid_obj) == req_id


def test_request_id_preserved_when_provided(api_client: APIClient):
    custom_id = "custom-test-trace-id-12345"
    response = api_client.get("/api/v1/health/", HTTP_X_REQUEST_ID=custom_id)
    assert response.status_code == status.HTTP_200_OK
    assert response["X-Request-ID"] == custom_id
