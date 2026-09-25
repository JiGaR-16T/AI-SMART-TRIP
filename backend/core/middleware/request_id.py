import contextvars
import uuid
from collections.abc import Callable

from django.http import HttpRequest, HttpResponse

# Context variable to hold request ID across async/sync thread boundaries
_request_id_ctx: contextvars.ContextVar[str] = contextvars.ContextVar("request_id", default="")


def get_current_request_id() -> str:
    """Return the request ID for the current execution context."""
    return _request_id_ctx.get()


class RequestIDMiddleware:
    """Middleware that injects an X-Request-ID into request context and response headers."""

    HEADER_NAME = "HTTP_X_REQUEST_ID"
    RESPONSE_HEADER = "X-Request-ID"

    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        # Extract from header or generate new UUID
        request_id = request.META.get(self.HEADER_NAME)
        if not request_id:
            request_id = str(uuid.uuid4())

        # Attach to request object and context variable
        request.request_id = request_id
        token = _request_id_ctx.set(request_id)

        try:
            response = self.get_response(request)
            response[self.RESPONSE_HEADER] = request_id
            return response
        finally:
            _request_id_ctx.reset(token)
