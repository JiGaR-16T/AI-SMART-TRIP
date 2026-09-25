import logging
import re
from typing import Any

from core.middleware.request_id import get_current_request_id

# Patterns that indicate sensitive credentials
REDACTION_PATTERNS = [
    (
        re.compile(r"(password['\"]?\s*[:=]\s*['\"])([^'\"]+)(['\"])", re.IGNORECASE),
        r"\1[REDACTED]\3",
    ),
    (
        re.compile(r"(secret['\"]?\s*[:=]\s*['\"])([^'\"]+)(['\"])", re.IGNORECASE),
        r"\1[REDACTED]\3",
    ),
    (re.compile(r"(bearer\s+)([a-zA-Z0-9_\-\.]+)", re.IGNORECASE), r"\1[REDACTED]"),
    (
        re.compile(r"(api[_-]?key['\"]?\s*[:=]\s*['\"])([^'\"]+)(['\"])", re.IGNORECASE),
        r"\1[REDACTED]\3",
    ),
    (re.compile(r"(token['\"]?\s*[:=]\s*['\"])([^'\"]+)(['\"])", re.IGNORECASE), r"\1[REDACTED]\3"),
]


class SecretRedactionFilter(logging.Filter):
    """Logging filter that scrubs passwords, API keys, and bearer tokens from logs."""

    def filter(self, record: logging.LogRecord) -> bool:
        if isinstance(record.msg, str):
            record.msg = self.redact(record.msg)

        if record.args:
            if isinstance(record.args, dict):
                clean_args = {k: self._clean_value(v) for k, v in record.args.items()}
                record.args = clean_args
            elif isinstance(record.args, tuple):
                record.args = tuple(self._clean_value(arg) for arg in record.args)

        return True

    def redact(self, text: str) -> str:
        for pattern, replacement in REDACTION_PATTERNS:
            text = pattern.sub(replacement, text)
        return text

    def _clean_value(self, val: Any) -> Any:
        if isinstance(val, str):
            return self.redact(val)
        return val


class RequestIDFilter(logging.Filter):
    """Injects the current request ID into log records for distributed tracing."""

    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = get_current_request_id() or "-"
        return True
