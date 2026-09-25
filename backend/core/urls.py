from django.urls import path

from core.api.health import HealthLivenessView, HealthReadinessView

urlpatterns = [
    path("health/", HealthLivenessView.as_view(), name="health-liveness"),
    path("health/ready/", HealthReadinessView.as_view(), name="health-readiness"),
]
