from __future__ import annotations

from typing import Any

from rest_framework import status as http_status
from rest_framework.response import Response


def success_response(
    data: Any = None,
    meta: dict[str, Any] | None = None,
    status: int = http_status.HTTP_200_OK,
) -> Response:
    """Generate a standard success API response."""
    payload: dict[str, Any] = {
        "success": True,
        "data": data,
    }
    if meta is not None:
        payload["meta"] = meta
    return Response(payload, status=status)


def error_response(
    code: str,
    message: str,
    details: dict[str, Any] | None = None,
    status: int = http_status.HTTP_400_BAD_REQUEST,
) -> Response:
    """Generate a standard error API response."""
    payload = {
        "success": False,
        "error": {
            "code": code,
            "message": message,
            "details": details or {},
        },
    }
    return Response(payload, status=status)
