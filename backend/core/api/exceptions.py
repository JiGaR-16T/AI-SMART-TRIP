import logging
from typing import Any

from django.core.exceptions import PermissionDenied as DjangoPermissionDenied
from django.http import Http404
from rest_framework import exceptions, status
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

logger = logging.getLogger(__name__)


def custom_exception_handler(exc: Exception, context: dict[str, Any]) -> Response | None:
    """Standardizes all DRF and unhandled exceptions into the constitution error envelope:

    {
        "success": false,
        "error": {
            "code": "ERROR_CODE",
            "message": "Human-readable description",
            "details": {}
        }
    }
    """
    # First invoke DRF's standard handler to get the normalized response
    response = drf_exception_handler(exc, context)

    # Handle Django native Http404 and PermissionDenied if DRF didn't
    if response is None:
        if isinstance(exc, Http404):
            exc = exceptions.NotFound()
            response = drf_exception_handler(exc, context)
        elif isinstance(exc, DjangoPermissionDenied):
            exc = exceptions.PermissionDenied()
            response = drf_exception_handler(exc, context)

    if response is not None:
        error_code = _get_error_code(exc)
        message = _get_error_message(exc, response)
        details = _get_error_details(response.data)

        custom_data = {
            "success": False,
            "error": {
                "code": error_code,
                "message": message,
                "details": details,
            },
        }
        response.data = custom_data
        return response

    # Unhandled 500 error - log and return safe response without leaking traces
    logger.exception("Unhandled server exception: %s", str(exc), extra={"context": context})

    return Response(
        {
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected internal server error occurred. Please try again later.",
                "details": {},
            },
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


def _get_error_code(exc: Exception) -> str:
    if isinstance(exc, exceptions.ValidationError):
        return "VALIDATION_ERROR"
    if isinstance(exc, exceptions.NotFound):
        return "NOT_FOUND"
    if isinstance(exc, exceptions.AuthenticationFailed | exceptions.NotAuthenticated):
        return "AUTHENTICATION_FAILED"
    if isinstance(exc, exceptions.PermissionDenied):
        return "PERMISSION_DENIED"
    if isinstance(exc, exceptions.MethodNotAllowed):
        return "METHOD_NOT_ALLOWED"
    if isinstance(exc, exceptions.Throttled):
        return "RATE_LIMIT_EXCEEDED"
    if isinstance(exc, exceptions.UnsupportedMediaType):
        return "UNSUPPORTED_MEDIA_TYPE"
    return "BAD_REQUEST"


def _get_error_message(exc: Exception, response: Response) -> str:
    if isinstance(exc, exceptions.ValidationError):
        return "Validation failed for the submitted input."
    if hasattr(exc, "detail") and isinstance(exc.detail, str):
        return str(exc.detail)
    if isinstance(response.data, dict) and "detail" in response.data:
        return str(response.data["detail"])
    return "The request could not be processed."


def _get_error_details(data: Any) -> dict[str, Any]:
    if isinstance(data, dict):
        if "detail" in data and len(data) == 1:
            return {}
        return {
            str(k): list(v) if isinstance(v, list | tuple) else [str(v)]
            for k, v in data.items()
            if k != "detail"
        }
    if isinstance(data, list):
        return {"non_field_errors": [str(item) for item in data]}
    return {}
