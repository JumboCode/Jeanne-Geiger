import logging
import os
import json
import time

from django.utils.decorators import method_decorator
from django.views.generic import View
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.core import serializers
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, renderers
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView, Response

from .serializers import *
from .models import *
from .utils import *
import http.client
import requests
import datetime

def date_range(request):
    start_date = request.META.get('HTTP_STARTDATE')
    end_date = request.META.get('HTTP_ENDDATE')
    
    # default: last 30 days 
    if (start_date is None) or (end_date is None) or (start_date == 'null') or (end_date == 'null') or (start_date == 'undefined') or (end_date == 'undefined') or (start_date == '') or (end_date == ''):
        end_date = datetime.datetime.today().strftime('%Y-%m-%d')
        start_date = (datetime.datetime.today() - datetime.timedelta(days=30)).strftime('%Y-%m-%d')

    return start_date, end_date

@method_decorator(requires_scope('admin'), name='post')
class AddCoordinator(generics.ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        coordinators = json.loads(request.POST.get("coord_data"))
        community_id = request.META.get('HTTP_COMMUNITYID')
        management_token = get_management_token()
        
        for coordinator in coordinators["data"]:
            user_id = create_user(coordinator, community_id, management_token)
            r = set_user_roles(user_id, management_token)

        return HttpResponse('Success', status=200) 

@method_decorator(requires_scope('admin'), name='post')
class OneCommunity(generics.ListCreateAPIView):
    queryset = Communities.objects.all()
    serializer_class = CommunitiesSerializer

    def get(self, request, *args, **kwargs):
        community_id = request.META.get("HTTP_COMMUNITYID")
        roles = get_roles(request)

        if 'Coordinator' in roles:
            try: 
                community_id = get_site(request)
            except:
                return HttpResponse('Forbidden', status=403)

        queryset = Communities.objects.filter(community_id=community_id)
        serializer_class = CommunitiesSerializer(queryset, many=True)
        return Response(serializer_class.data[0])

    def post(self, request, *args, **kwargs):
        community_id = request.META.get("HTTP_COMMUNITYID")
        try:
            communityData = Communities.objects.filter(community_id=community_id)[0]
        except:
            return HttpResponse('Not Found', status=404)

        communityData.community_name = request.POST.get("community_name")
        communityData.referral_sources = request.POST.get("referral_sources")
        communityData.last_updated = datetime.datetime.today().strftime('%Y-%m-%d')
        communityData.save() 
        return HttpResponse('Success', status=200)

@method_decorator(requires_scope('admin'), name='post')
class CommunitiesList(generics.ListCreateAPIView):
    queryset = Communities.objects.all()
    serializer_class = CommunitiesSerializer

    def get(self, request, *args, **kwargs):
        queryset = Communities.objects.all()
        serializer_class = CommunitiesSerializer(queryset, many=True)
        return Response(serializer_class.data)


    def post(self, request, *args, **kwargs):
        get_community_id = request.POST.get("community_id")
        try:
          communityData = Communities.objects.get(community_id=get_community_id)
        except:
            communityData = Communities(
                community_name = request.POST.get("community_name"),
                coordinators = request.POST.get("coordinators"),
                referral_sources = request.POST.get("referral_sources"),
                date_created = datetime.datetime.today().strftime('%Y-%m-%d'),
                last_updated = datetime.datetime.today().strftime('%Y-%m-%d'),
            )
            communityData.save()
            coordinators = json.loads(request.POST.get("coord_data"))
            management_token = get_management_token()
            
            for coordinator in coordinators["data"]:
                user_id = create_user(coordinator, communityData.community_id, management_token)
                r = set_user_roles(user_id, management_token)
            
        return JsonResponse({'community_id' : communityData.community_id})

@method_decorator(requires_scope('coord'), name='dispatch')
class OneCase(generics.ListCreateAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer
    
    def get(self, request, *args, **kwargs):
        case_id = request.META.get('HTTP_CASEID')
        try:
            community_id = get_site(request)
            case = Cases.objects.get(case_id=case_id)
            serializer_class = CasesSerializer(case)
            if (int(community_id) == case.community_id.community_id):
                return Response(serializer_class.data)
        except:
            return HttpResponse('Forbidden', status=403)

        return HttpResponse('Forbidden', status=403)

@method_decorator(requires_scope('coord'), name='dispatch')
class CasesByCommunity(generics.ListCreateAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer

    def get(self, request, *args, **kwargs):
        try:
            community_id = get_site(request)
        except:
            return HttpResponse('Forbidden', status=403) 
        cases = Cases.objects.filter(community_id=community_id)
        community = Communities.objects.filter(community_id=community_id)
        serializer_class = CommunitiesSerializer(community, many=True)
        community_name = serializer_class.data[0]['community_name']
        serializer_class = CasesSerializer(cases, many=True)

        response = { 'data': serializer_class.data,
                     'community_id': community_id,
                     'community_name': community_name }

        return Response(json.dumps(response))



@method_decorator(requires_scope('coord'), name='dispatch')
class CasesList(generics.ListCreateAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer

    def post(self, request, *args, **kwargs):
        get_case_id = request.POST.get("case_id")
        community_id = get_site(request)
        try: ## case exists, update values
            caseData = Cases.objects.get(case_id=get_case_id)

            if (caseData.community_id.community_id != community_id):
                return HttpResponse('Forbidden', status=403) 

            ## update community
            caseData.community_id.last_updated = datetime.datetime.today().strftime('%Y-%m-%d')
            caseData.community_id.save()

            ## update victim 
            caseData.victim_id.name = request.POST.get("v_name")
            caseData.victim_id.dob  = request.POST.get("v_dob")
            caseData.victim_id.gender = request.POST.get("v_gender")
            caseData.victim_id.race_ethnicity = request.POST.get("v_race_ethnicity")
            caseData.victim_id.age_at_case_acceptance = request.POST.get("v_age_at_case_acceptance")
            caseData.victim_id.primary_language = request.POST.get("v_primary_language")
            caseData.victim_id.town = request.POST.get("v_town")
            caseData.victim_id.save()

            ## update abuser
            caseData.abuser_id.name = request.POST.get("a_name")
            caseData.abuser_id.dob  = request.POST.get("a_dob")
            caseData.abuser_id.gender = request.POST.get("a_gender")
            caseData.abuser_id.race_ethnicity = request.POST.get("a_race_ethnicity")
            caseData.abuser_id.age_at_case_acceptance = request.POST.get("a_age_at_case_acceptance")
            caseData.abuser_id.primary_language = request.POST.get("a_primary_language")
            caseData.abuser_id.town = request.POST.get("a_town")
            caseData.abuser_id.save()

            ## update outcome
            caseData.outcome_id.connection_to_domestic_violence_services = request.POST.get("connection_to_domestic_violence_services")
            caseData.outcome_id.engagement_in_ongoing_domestic_violence_services = request.POST.get("engagement_in_ongoing_domestic_violence_services")
            caseData.outcome_id.charges_filed_at_or_after_case_acceptance = request.POST.get("charges_filed_at_or_after_case_acceptance")
            caseData.outcome_id.pretrial_hearing_outcome = request.POST.get("pretrial_hearing_outcome")
            caseData.outcome_id.sentencing_outcomes_disposition = request.POST.get("sentencing_outcomes_disposition")
            caseData.outcome_id.sentencing_outcomes_sentence = request.POST.get("sentencing_outcomes_sentence")
            caseData.outcome_id.save()

            ## update risk factors
            caseData.risk_factor_id.violence_increased = request.POST.get("violence_increased")
            caseData.risk_factor_id.attempted_leaving = request.POST.get("attempted_leaving")
            caseData.risk_factor_id.control_activites = request.POST.get("control_activites")
            caseData.risk_factor_id.attempted_murder = request.POST.get("attempted_murder")
            caseData.risk_factor_id.threatened_murder = request.POST.get("threatened_murder")
            caseData.risk_factor_id.weapon_threat = request.POST.get("weapon_threat")
            caseData.risk_factor_id.attempted_choke = request.POST.get("attempted_choke")
            caseData.risk_factor_id.multiple_choked = request.POST.get("multiple_choked")
            caseData.risk_factor_id.killing_capable = request.POST.get("killing_capable")
            caseData.risk_factor_id.owns_gun = request.POST.get("owns_gun")
            caseData.risk_factor_id.suicide_threat_or_attempt = request.POST.get("suicide_threat_or_attempt")
            caseData.risk_factor_id.is_unemployed = request.POST.get("is_unemployed")
            caseData.risk_factor_id.avoided_arrest = request.POST.get("avoided_arrest")
            caseData.risk_factor_id.unrelated_child = request.POST.get("unrelated_child")
            caseData.risk_factor_id.uses_illegal_drugs = request.POST.get("uses_illegal_drugs")
            caseData.risk_factor_id.is_alcoholic = request.POST.get("is_alcoholic")
            caseData.risk_factor_id.forced_sex = request.POST.get("forced_sex")
            caseData.risk_factor_id.constantly_jealous = request.POST.get("constantly_jealous")
            caseData.risk_factor_id.pregnant_abuse = request.POST.get("pregnant_abuse")
            caseData.risk_factor_id.children_threatened = request.POST.get("children_threatened")
            caseData.risk_factor_id.has_spied = request.POST.get("has_spied")
            caseData.risk_factor_id.save()

            ## update case data
            caseData.active_status = request.POST.get("active_status")
            caseData.relationship_type = request.POST.get("relationship_type")
            caseData.relationship_len = request.POST.get("relationship_len")
            caseData.minor_in_home = request.POST.get("minor_in_home")
            caseData.referral_source = request.POST.get("referral_source")
            caseData.date_accepted = request.POST.get("date_accepted")
            caseData.last_updated = datetime.datetime.today().strftime('%Y-%m-%d')
            caseData.save()

        except Cases.DoesNotExist: # case doesn't exist, create a new one
            community = Communities.objects.get(community_id=community_id)

            community.last_updated = datetime.datetime.today().strftime('%Y-%m-%d')
            community.save()
            
            outcomes = Outcomes(
                connection_to_domestic_violence_services = request.POST.get("connection_to_domestic_violence_services"),
                engagement_in_ongoing_domestic_violence_services = request.POST.get("engagement_in_ongoing_domestic_violence_services"),
                charges_filed_at_or_after_case_acceptance = request.POST.get("charges_filed_at_or_after_case_acceptance"),
                pretrial_hearing_outcome = request.POST.get("pretrial_hearing_outcome"),
                sentencing_outcomes_disposition = request.POST.get("sentencing_outcomes_disposition"),
                sentencing_outcomes_sentence = request.POST.get("sentencing_outcomes_sentence"),
            )
            outcomes.save()

            victim = Persons(
                is_victim = True,
                name = request.POST.get("v_name"),
                dob = request.POST.get("v_dob"),
                gender = request.POST.get("v_gender"),
                race_ethnicity = request.POST.get("v_race_ethnicity"),
                age_at_case_acceptance = request.POST.get("v_age_at_case_acceptance"),
                primary_language = request.POST.get("v_primary_language"),
                town = request.POST.get("v_town")
            )
            victim.save()

            abuser = Persons(
                is_victim = False,
                name = request.POST.get("a_name"),
                dob = request.POST.get("a_dob"),
                gender = request.POST.get("a_gender"),
                race_ethnicity = request.POST.get("a_race_ethnicity"),
                age_at_case_acceptance = request.POST.get("a_age_at_case_acceptance"),
                primary_language = request.POST.get("a_primary_language"),
                town = request.POST.get("a_town")
            )
            abuser.save()

            risk_factors = RiskFactors(
                violence_increased = request.POST.get("violence_increased"),
                attempted_leaving = request.POST.get("attempted_leaving"),
                control_activites = request.POST.get("control_activites"),
                attempted_murder = request.POST.get("attempted_murder"),
                threatened_murder = request.POST.get("threatened_murder"),
                weapon_threat = request.POST.get("weapon_threat"),
                attempted_choke = request.POST.get("attempted_choke"),
                multiple_choked = request.POST.get("multiple_choked"),
                killing_capable = request.POST.get("killing_capable"),
                owns_gun = request.POST.get("owns_gun"),
                suicide_threat_or_attempt = request.POST.get("suicide_threat_or_attempt"),
                is_unemployed = request.POST.get("is_unemployed"),
                avoided_arrest = request.POST.get("avoided_arrest"),
                unrelated_child = request.POST.get("unrelated_child"),
                uses_illegal_drugs = request.POST.get("uses_illegal_drugs"),
                is_alcoholic = request.POST.get("is_alcoholic"),
                forced_sex = request.POST.get("forced_sex"),
                constantly_jealous = request.POST.get("constantly_jealous"),
                pregnant_abuse = request.POST.get("pregnant_abuse"),
                children_threatened = request.POST.get("children_threatened"),
                has_spied = request.POST.get("has_spied")
            )
            risk_factors.save()

            caseData = Cases(
                outcome_id = outcomes,
                community_id = community,
                victim_id = victim,
                abuser_id = abuser,
                risk_factor_id = risk_factors,
                active_status = request.POST.get("active_status"),
                relationship_type = request.POST.get("relationship_type"),
                relationship_len = request.POST.get("relationship_len"),
                minor_in_home = request.POST.get("minor_in_home"),
                referral_source = request.POST.get("referral_source"),
                date_accepted = request.POST.get("date_accepted"),
                last_updated = datetime.datetime.today().strftime('%Y-%m-%d'),
            )
            caseData.save()

        return JsonResponse({'case_id' : caseData.case_id})
      
class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )

@method_decorator(requires_scope('admin'), name='get')
class ActiveCaseCountView(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_count = len(Cases.objects.filter(community_id=c_id, active_status=0))
        return JsonResponse({'case_count': case_count})

@method_decorator(requires_scope('coord'), name='dispatch')
class DVHRTReferalSourceView(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.META.get('HTTP_COMMUNITYID')
        r_dict = {}
        referral_sources = []
        community_q_set = Communities.objects.filter(community_id=c_id)

        for community in community_q_set:
            referral_sources = community.referral_sources

        for referral_source in referral_sources:
            r_dict[referral_source] = 0

        start_date, end_date = date_range(request)
        case_set = Cases.objects.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        for case in case_set:
            try: 
                r_dict[case.referral_source] += 1
            except: 
                r_dict[case.referral_source] = 1

        return JsonResponse(r_dict)

class DVHRTHighRiskVictimInfo(generics.ListCreateAPIView):
    query_set = Cases.objects.all().select_related('victim_id')

    def get(self, request, *args, **kwargs):
        c_id = request.META.get("HTTP_COMMUNITYID")
        roles = get_roles(request)
        if 'Coordinator' in roles:
            try: 
                c_id = get_site(request)
            except:
                return HttpResponse('Forbidden', status=403)

        victim_info = {}
        victim_info.update(self.get_vicitm_genders(request, c_id))
        victim_info.update(self.get_victim_ethnicities(request, c_id))
        victim_info.update(self.get_domestic_violence_service_utilization(request, c_id))

        return JsonResponse(victim_info)

    def get_vicitm_genders(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        genders_to_counts = {
            'Female': 0,
            'Male': 0,
            'Other': 0,
            'Total Gender Count': 0
        }

        total_count = 0
        for case in case_set:
            victim = case.victim_id
            try:
                genders_to_counts[victim.get_gender_display()] += 1
            except:
                genders_to_counts['Other'] += 1
            genders_to_counts['Total Gender Count'] += 1

        return genders_to_counts

    def get_victim_ethnicities(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        ethnicities_to_counts = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0
        }
        total_count = 0
        for case in case_set:
            victim = case.victim_id
            for ethnicity in victim.race_ethnicity:
                try:
                    ethnicities_to_counts[ethnicity] += 1
                except:
                    ethnicities_to_counts[ethnicity] = 1
                total_count += 1

        counts = {
            'American Indian/Alaska Native': ethnicities_to_counts[1],
            'Asian': ethnicities_to_counts[2],
            'Black/African American': ethnicities_to_counts[3],
            'Hispanic or Latino': ethnicities_to_counts[4],
            'Native Hawaiian/Pacific Islander': ethnicities_to_counts[5],
            'White': ethnicities_to_counts[6],
            'Other/Unknown': ethnicities_to_counts[0] + ethnicities_to_counts[7],
            'Total Ethnicity Count': total_count
        }

        return counts

    def get_domestic_violence_service_utilization(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = Cases.objects.filter(community_id=c_id, date_accepted__range=[start_date, end_date]).select_related('outcome_id')
        dvsu = {
            "connection_to_domestic_violence_services" : 0,
            "engagement_in_ongoing_domestic_violence_services" : 0,
            "total": 0,
        }

        for case in case_set:
            outcome = case.outcome_id
            if outcome.engagement_in_ongoing_domestic_violence_services:
                dvsu["engagement_in_ongoing_domestic_violence_services"] += 1
                dvsu["total"] += 1
            if outcome.connection_to_domestic_violence_services:
                dvsu["connection_to_domestic_violence_services"] += 1
                dvsu["total"] += 1

        return dvsu

class DVHRTHighRiskAbuserInfo(generics.ListCreateAPIView):
    query_set = Cases.objects.all().select_related('abuser_id')

    def get(self, request, *args, **kwargs):
        c_id = request.META.get("HTTP_COMMUNITYID")
        roles = get_roles(request)
        if 'Coordinator' in roles:
            try: 
                c_id = get_site(request)
            except:
                return HttpResponse('Forbidden', status=403)
        
        abuser_info = {}
        genders = self.get_abuser_genders(request, c_id)
        ethnicities = self.get_abuser_ethnicities(request, c_id)
        abuser_info.update(genders)
        abuser_info.update(ethnicities)
        return JsonResponse(abuser_info)

    def get_abuser_genders(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        genders_to_counts = {
            'Female': 0,
            'Male': 0,
            'Other': 0,
            'Total Gender Count': 0
        }

        total_count = 0
        for case in case_set:
            abuser = case.abuser_id
            try:
                genders_to_counts[abuser.get_gender_display()] += 1
            except:
                genders_to_counts['Other'] += 1
            genders_to_counts['Total Gender Count'] += 1

        return genders_to_counts

    def get_abuser_ethnicities(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        ethnicities_to_counts = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        }

        total_count = 0
        for case in case_set:
            abuser = case.abuser_id
            for ethnicity in abuser.race_ethnicity:
                try:
                    ethnicities_to_counts[ethnicity] += 1
                except:
                    ethnicities_to_counts[ethnicity] = 1
                total_count += 1

        counts = {
            'American Indian/Alaska Native': ethnicities_to_counts[1],
            'Asian': ethnicities_to_counts[2],
            'Black/African American': ethnicities_to_counts[3],
            'Hispanic or Latino': ethnicities_to_counts[4],
            'Native Hawaiian/Pacific Islander': ethnicities_to_counts[5],
            'White': ethnicities_to_counts[6],
            'Other/Unknown': ethnicities_to_counts[0] + ethnicities_to_counts[7],
            "Total Count" : total_count
        }

        return counts

class DVHRTRiskFactorCounts(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.META.get('HTTP_COMMUNITYID')
        roles = get_roles(request)
        if 'Coordinator' in roles:
            try: 
                c_id = get_site(request)
            except:
                return HttpResponse('Forbidden', status=403)

        start_date, end_date = date_range(request)
        case_set = Cases.objects.filter(community_id=c_id, date_accepted__range=[start_date, end_date]).select_related('risk_factor_id')

        rf_counts = {
            'attempted_murder' : 0,
            'attempted_choke'  : 0,
            'multiple_choked'  : 0,
            'owns_gun'         : 0,
            'total'            : 0,
        }

        for case in case_set:
            rf = case.risk_factor_id
            if rf.attempted_murder:
                rf_counts['attempted_murder'] += 1
                rf_counts['total'] += 1
            if rf.attempted_choke:
                rf_counts['attempted_choke'] += 1
                rf_counts['total'] += 1
            if rf.multiple_choked:
                rf_counts['multiple_choked'] += 1
                rf_counts['total'] += 1
            if rf.owns_gun:
                rf_counts['owns_gun'] += 1
                rf_counts['total'] += 1

        return JsonResponse(rf_counts)

class DVHRTCriminalJusticeOutcomes(generics.ListCreateAPIView):
    query_set = Cases.objects.all().select_related('outcome_id')

    def get(self, request, *args, **kwargs):
        c_id = request.META.get('HTTP_COMMUNITYID')
        roles = get_roles(request)
        if 'Coordinator' in roles:
            try: 
                c_id = get_site(request)
            except:
                return HttpResponse('Forbidden', status=403)

        outcomes_info = {}
        outcomes_info.update(self.get_charges_filed(request, c_id))
        outcomes_info.update(self.get_pretrial_hearing_outcomes(request, c_id))
        outcomes_info.update(self.get_disposition_outcomes(request, c_id))
        outcomes_info.update(self.get_sentencing_outcomes(request, c_id))

        return JsonResponse(outcomes_info)

    # Charges Filed at or after case acceptance 
    def get_charges_filed(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        total_count = 0

        outcome_counts = {
            'Police Response: Charges Filed'      : 0,
            'Police Response: No Charges Filed'   : 0,
            'No Police Response: Not Applicable'  : 0
        }

        for case in case_set:
            outcome = case.outcome_id
            charges = outcome.get_charges_filed_at_or_after_case_acceptance_display()
            outcome_counts[charges] += 1
            total_count += 1

        outcome_counts['Total Charges Filed Count'] = total_count

        return outcome_counts

    def get_pretrial_hearing_outcomes(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        total_count = 0

        outcome_counts = {
            'Undefined/Unknown'                  : 0,
            'Released on Bail'                   : 0,
            'Released on Personal Recognizance'  : 0,
            'Detained/Pretrial Detention Statute': 0,
            'Detained/Bail Unmet'                : 0,
            'Detained/Other'                     : 0,
            'Pending Pretrial Hearing'           : 0,
        }

        for case in case_set:
            outcome = case.outcome_id
            p_h_o = outcome.get_pretrial_hearing_outcome_display()
            try:
                outcome_counts[p_h_o] += 1
            except KeyError:
                outcome_counts['Undefined/Unknown'] += 1
            total_count += 1

        outcome_counts['Total Pretrial Hearing Outcomes Count'] = total_count

        return outcome_counts

    def get_disposition_outcomes(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        total_count = 0

        disposition_outcome_counts = {
            'Undefined/Unknown'     : 0,
            'Charges Dismissed'     : 0,
            'Not Guilty'            : 0,
            'Deferred Adjudication' : 0,
            'Plead/Found Guilty'    : 0,
            'Pending Disposition'   : 0,
        }

        for case in case_set:
            outcome = case.outcome_id
            d_o = outcome.get_sentencing_outcomes_disposition_display()
            try:
                disposition_outcome_counts[d_o] += 1
            except KeyError:
                disposition_outcome_counts['Undefined/Unknown'] += 1
            total_count += 1

        disposition_outcome_counts['Total Disposition Outcomes Count'] = total_count

        return disposition_outcome_counts

    def get_sentencing_outcomes(self, request, c_id):
        start_date, end_date = date_range(request)
        case_set = self.query_set.filter(community_id=c_id, date_accepted__range=[start_date, end_date])
        total_count = 0

        sentencing_outcome_counts = {
            'Undefined/Unknown'                   : 0,
            'Incarceration'                       : 0,
            'Probation'                           : 0,
            'Incarceration Followed by Probation' : 0,
        }

        for case in case_set:
            outcome = case.outcome_id
            s_o = outcome.get_sentencing_outcomes_sentence_display()
            try:
                sentencing_outcome_counts[s_o] += 1
            except KeyError:
                sentencing_outcome_counts['Undefined/Unknown'] += 1
            total_count += 1

        sentencing_outcome_counts['Total Sentencing Outcomes Count'] = total_count

        return sentencing_outcome_counts
