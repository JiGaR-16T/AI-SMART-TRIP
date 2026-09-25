from typing import Any

from django.http import HttpRequest, JsonResponse


def error_404(request: HttpRequest, exception: Any = None) -> JsonResponse:
    """Standard 404 handler for routes not found."""
    return JsonResponse(
        {
            "success": False,
            "error": {
                "code": "NOT_FOUND",
                "message": f"Resource at '{request.path}' was not found.",
                "details": {},
            },
        },
        status=404,
    )


def error_500(request: HttpRequest) -> JsonResponse:
    """Standard 500 handler for unhandled server errors."""
    return JsonResponse(
        {
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "An unexpected server error occurred.",
                "details": {},
            },
        },
        status=500,
    )
