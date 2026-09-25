from unittest.mock import MagicMock

from core.api.pagination import StandardResultsSetPagination
from core.api.response import error_response, success_response
from core.enums import DataLabel
from core.models import TimeStampedUUIDModel


def test_success_response():
    resp = success_response(data={"item": 1}, meta={"cached": True})
    assert resp.status_code == 200
    assert resp.data["success"] is True
    assert resp.data["data"] == {"item": 1}
    assert resp.data["meta"] == {"cached": True}


def test_error_response():
    resp = error_response(
        code="INVALID_ARG", message="Bad arg", details={"field": ["bad"]}
    )
    assert resp.status_code == 400
    assert resp.data["success"] is False
    assert resp.data["error"]["code"] == "INVALID_ARG"
    assert resp.data["error"]["details"] == {"field": ["bad"]}


def test_datalabel_choices():
    assert DataLabel.LIVE == "LIVE"
    assert DataLabel.ESTIMATED == "ESTIMATED"
    assert DataLabel.CACHED == "CACHED"
    assert DataLabel.DEMO == "DEMO"


def test_pagination_envelope():
    paginator = StandardResultsSetPagination()
    request = MagicMock()
    request.query_params = {}
    paginator.request = request

    page = MagicMock()
    page.number = 1
    page.paginator.count = 45
    page.has_next.return_value = True
    page.has_previous.return_value = False
    paginator.page = page

    resp = paginator.get_paginated_response(["item1", "item2"])
    assert resp.data["success"] is True
    assert resp.data["pagination"]["page"] == 1
    assert resp.data["pagination"]["total_items"] == 45
    assert resp.data["pagination"]["total_pages"] == 3
    assert resp.data["pagination"]["has_next"] is True
    assert resp.data["pagination"]["has_previous"] is False


def test_model_is_abstract():
    assert TimeStampedUUIDModel._meta.abstract is True
