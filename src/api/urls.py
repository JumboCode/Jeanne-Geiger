from django.conf.urls import url
from django.urls import path
from django.contrib import admin

from . import views
from .views import *

urlpatterns = [
    # ... the rest of the urlpatterns ...
    # must be catch-all for pushState to work
    # path('outcomes/', views.OutcomeList.as_view(), name="outcomes"),
    # path('communities/', views.CommunitiesList.as_view(), name="community"),
    path('cases/', views.CasesList.as_view(), name="cases"),
]
