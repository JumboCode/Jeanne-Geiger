from django.conf.urls import url
from django.urls import path

from .views import *

urlpatterns = [
    # ... the rest of the urlpatterns ...
    # must be catch-all for pushState to work
    path('outcomes/', Outcome.as_view(), name="outcome-list"),
    #url(r'^', views.FrontendAppView.as_view()),
]
