import importlib
import os


def test_test_settings_loading():
    settings_mod = importlib.import_module("config.settings.test")
    assert settings_mod.DEBUG is False
    assert settings_mod.CELERY_TASK_ALWAYS_EAGER is True
    assert "core" in settings_mod.INSTALLED_APPS


def test_dev_settings_loading():
    settings_mod = importlib.import_module("config.settings.dev")
    assert settings_mod.DEBUG is True
    assert "*" in settings_mod.ALLOWED_HOSTS


def test_prod_settings_defaults():
    os.environ["ALLOWED_HOSTS"] = "api.travelmind.in,travelmind.in"
    settings_mod = importlib.import_module("config.settings.prod")
    assert settings_mod.DEBUG is False
    assert settings_mod.SECURE_BROWSER_XSS_FILTER is True
    assert settings_mod.SECURE_CONTENT_TYPE_NOSNIFF is True
    assert settings_mod.X_FRAME_OPTIONS == "DENY"
    assert "api.travelmind.in" in settings_mod.ALLOWED_HOSTS
