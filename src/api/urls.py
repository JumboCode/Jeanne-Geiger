from django.conf.urls import url
from django.urls import path
from django.contrib import admin

from . import views
from .views import *

urlpatterns = [
    # ... the rest of the urlpatterns ...
    # must be catch-all for pushState to work
    path('cases/', views.CasesList.as_view(), name="cases"),
    path('CasesByCommunity/', views.CasesByCommunity.as_view(), name="CasesByCommunity"),
    path('outcomes/', views.OutcomeList.as_view(), name="outcomes"),
    path('victims/', views.VictimList.as_view(), name="victims"),
    path('abusers/', views.AbuserList.as_view(), name="abusers"),
    path('riskfactors/', views.RiskFactorsList.as_view(), name="riskfactors"),
    path('communities/', views.CommunitiesList.as_view(), name="communities"),
    path('DVHRTHighRiskVictimInfo/', views.DVHRTHighRiskVictimInfo.as_view(), name="DVHRTHighRiskVictimInfo"),
    path('DVHRTHighRiskAbuserInfo/', views.DVHRTHighRiskAbuserInfo.as_view(), name="DVHRTHighRiskAbuserInfo"),
    path('DVHRTRiskFactorCounts/', views.DVHRTRiskFactorCounts.as_view(), name="DVHRTRiskFactorCounts"),
    path('DVHRTCriminalJusticeOutcomes/', views.DVHRTCriminalJusticeOutcomes.as_view(), name="DVHRTCriminalJusticeOutcomes"),
]

