from core.api.exceptions import custom_exception_handler
from rest_framework import exceptions, status
from rest_framework.test import APIClient, APIRequestFactory


def test_404_error_envelope(api_client: APIClient):
    response = api_client.get("/api/v1/non-existent-endpoint-xyz/")
    assert response.status_code == status.HTTP_404_NOT_FOUND
    data = response.json()
    assert data["success"] is False
    assert "error" in data
    assert data["error"]["code"] == "NOT_FOUND"
    assert "message" in data["error"]
    assert isinstance(data["error"]["details"], dict)


def test_custom_exception_handler_validation_error():
    exc = exceptions.ValidationError({"field_name": ["This field is required."]})
    context = {"request": APIRequestFactory().get("/")}
    response = custom_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    data = response.data
    assert data["success"] is False
    assert data["error"]["code"] == "VALIDATION_ERROR"
    assert "field_name" in data["error"]["details"]
    assert "This field is required." in data["error"]["details"]["field_name"]


def test_custom_exception_handler_unhandled_500():
    exc = RuntimeError(
        "Secret database connection string in stack trace should not leak"
    )
    context = {"request": APIRequestFactory().get("/")}
    response = custom_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    data = response.data
    assert data["success"] is False
    assert data["error"]["code"] == "INTERNAL_SERVER_ERROR"
    assert "Secret database connection" not in data["error"]["message"]
