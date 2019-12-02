from django.conf.urls import url
from django.urls import path

from . import views
from .views import *

urlpatterns = [
    # ... the rest of the urlpatterns ...
    # must be catch-all for pushState to work
    path('outcomes/', OutcomeList.as_view(), name="outcome-list"),
    #url(r'^', views.FrontendAppView.as_view()),
]
