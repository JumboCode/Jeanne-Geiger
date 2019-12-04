from django.conf.urls import url
from django.urls import path
from django.contrib import admin

from . import views
from .views import *

urlpatterns = [
    # ... the rest of the urlpatterns ...
    # must be catch-all for pushState to work
    path('outcomes/', views.OutcomeList.as_view(), name="outcomes"),
    path('victims/', views.VictimList.as_view(), name="victims"),
    path('abusers/', views.AbuserList.as_view(), name="abusers"),
]
