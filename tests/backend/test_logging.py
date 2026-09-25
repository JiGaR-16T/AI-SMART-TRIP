import logging

from core.logging import RequestIDFilter, SecretRedactionFilter
from core.middleware.request_id import _request_id_ctx


def test_secret_redaction_filter():
    filter_ = SecretRedactionFilter()
    record = logging.LogRecord(
        name="test",
        level=logging.INFO,
        pathname="",
        lineno=0,
        msg="Login with password='supersecret123' and bearer eyJhbGciOi...",
        args=(),
        exc_info=None,
    )
    filter_.filter(record)

    assert "supersecret123" not in record.msg
    assert "[REDACTED]" in record.msg


def test_request_id_filter():
    token = _request_id_ctx.set("trace-abc-123")
    try:
        filter_ = RequestIDFilter()
        record = logging.LogRecord(
            name="test",
            level=logging.INFO,
            pathname="",
            lineno=0,
            msg="User searched for flights",
            args=(),
            exc_info=None,
        )
        filter_.filter(record)
        assert getattr(record, "request_id", None) == "trace-abc-123"
    finally:
        _request_id_ctx.reset(token)
