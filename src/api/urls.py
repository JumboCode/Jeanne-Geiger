from django.conf.urls import url
from django.urls import path
from django.contrib import admin

from . import views
from .views import *

urlpatterns = [
    path('cases/', views.CasesList.as_view(), name="cases"),
    path('one-case/', views.OneCase.as_view(), name="one-case"),
    path('CasesByCommunity/', views.CasesByCommunity.as_view(), name="CasesByCommunity"),
    path('communities/', views.CommunitiesList.as_view(), name="communities"),
    path('CommunityData/', views.CommunityData.as_view(), name="CommunityData"),
    path('ActiveCaseCountView/', views.ActiveCaseCountView.as_view(), name="ActiveCaseCountView"),
    path('DVHRTReferalSourceView/', views.DVHRTReferalSourceView.as_view(), name="DVHRTReferalSourceView"),
    path('DVHRTHighRiskVictimInfo/', views.DVHRTHighRiskVictimInfo.as_view(), name="DVHRTHighRiskVictimInfo"),
    path('DVHRTHighRiskAbuserInfo/', views.DVHRTHighRiskAbuserInfo.as_view(), name="DVHRTHighRiskAbuserInfo"),
    path('DVHRTRiskFactorCounts/', views.DVHRTRiskFactorCounts.as_view(), name="DVHRTRiskFactorCounts"),
    path('DVHRTCriminalJusticeOutcomes/', views.DVHRTCriminalJusticeOutcomes.as_view(), name="DVHRTCriminalJusticeOutcomes"),
]

