import logging
import os

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

# auth0authorization/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from functools import wraps
import jwt

def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token

def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope

@api_view(['GET'])
@permission_classes([AllowAny])
def public(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})

@api_view(['GET'])
def private(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})

@api_view(['GET'])
@requires_scope('read:messages')
def private_scoped(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'})


class OutcomeList(generics.ListCreateAPIView):
    queryset = Outcomes.objects.all()
    serializer_class = OutcomesSerializer

    def get(self, request, *args, **kwargs):
        queryset = Outcomes.objects.all()
        serializer_class = OutcomesSerializer(queryset, many=True)

        return Response(serializer_class.data)
      
    def post(self, request, *args, **kwargs):
        get_outcome_id = request.POST.get("outcome_id")
        try:
            outcomeData = Outcomes.objects.get(outcome_id=get_outcome_id)
        except Outcomes.DoesNotExist:
            outcomeData = Outcomes(
                connection_to_domestic_violence_services = request.POST.get("connection_to_domestic_violence_services"),
                engagement_in_ongoing_domestic_violence_services = request.POST.get("engagement_in_ongoing_domestic_violence_services"),
                charges_filed_at_or_after_case_acceptance = request.POST.get("charges_filed_at_or_after_case_acceptance"),
                pretrial_hearing_outcome = request.POST.get("pretrial_hearing_outcome"),
                sentencing_outcomes_disposition = request.POST.get("sentencing_outcomes_disposition"),
                sentencing_outcomes_sentence = request.POST.get("sentencing_outcomes_sentence"),
            )
            outcomeData.save()
        return JsonResponse({'outcome_id' : outcomeData.outcome_id})

class CommunitiesList(generics.ListCreateAPIView):
    queryset = Communities.objects.all()
    serializer_class = CommunitiesSerializer

    def get(self, request, *args, **kwargs):
        queryset = Communities.objects.all()
        serializer_class = CommunitiesSerializer(queryset, many=True)

        return Response(serializer_class.data)

    # def post(self, request, *args, **kwargs):
    #     get_community_id = request.POST.get("community_id")
    #     try:
    #         communityData = Communities.objects.get(community_id=get_community_id)
    #     except:
    #         communityData = Communities(referral_sources = request.POST.get("referral_sources"))
    #         communityData.save()
    #     return HttpResponse('success')

class OneCase(generics.ListCreateAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer
    
    def get(self, request, *args, **kwargs):
        get_case_id = request.META.get('HTTP_CASEID')     
        case = Cases.objects.get(case_id=get_case_id)
        serializer_class = CasesSerializer(case)

        return Response(serializer_class.data)

class CasesByCommunity(generics.ListCreateAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer

    def get(self, request, *args, **kwargs):
        test_community_id = 1        # hard-coded test_community_id for now        
        cases = Cases.objects.filter(community_id=test_community_id)
        serializer_class = CasesSerializer(cases, many=True)

        return Response(serializer_class.data)

class CasesList(generics.ListCreateAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer
    
    def get(self, request, *args, **kwargs):
        queryset = Cases.objects.all()
        serializer_class = CasesSerializer(queryset, many=True)

        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        get_case_id = request.POST.get("case_id")
        try:
            caseData = Cases.objects.get(case_id=get_case_id)
        except Cases.DoesNotExist:
            community = Communities.objects.get(community_id=request.POST.get("community_id"))
            
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
                relationship_type = request.POST.get("relationship_type"),
                relationship_len = request.POST.get("relationship_len"),
                minor_in_home = request.POST.get("minor_in_home"),
                referral_source = request.POST.get("referral_source"),
                date_accepted = request.POST.get("date_accepted"),
            )
            caseData.save()

        return JsonResponse({'case_id' : caseData.case_id})

class RiskFactorsList(generics.ListCreateAPIView):
    queryset = RiskFactors.objects.all()
    serializer_class = RiskFactorsSerializer

    def get(self, request, *args, **kwargs):
        queryset = RiskFactors.objects.all()
        serializer_class = RiskFactorsSerializer(queryset, many=True)

        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        get_rf_id = request.POST.get("risk_factor_id")
        try:
            rfData = RiskFactors.objects.get(risk_factor_id=get_rf_id)
        except:
            rfData = RiskFactors(
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
                has_spied = request.POST.get("has_spied"),
            )
            rfData.save()
        return JsonResponse({'risk_factor_id' : rfData.risk_factor_id})

class AbuserList(generics.ListCreateAPIView):
    queryset = Persons.objects.filter(is_victim=False)
    serializer_class = PersonsSerializer

    def get(self, request, *args, **kwargs):
        queryset = Persons.objects.filter(is_victim=False)
        serializer_class = PersonsSerializer(queryset, many=True)

        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        print(request.POST)
        print(request.POST.get("person_id"))
        get_person_id = request.POST.get("person_id")
        try:
            personData = Persons.objects.get(person_id=get_person_id)
        except Persons.DoesNotExist:
            personData = Persons(
                is_victim = request.POST.get("is_victim"),
                name = request.POST.get("name"),
                dob = request.POST.get("dob"),
                gender = request.POST.get("gender"),
                race_ethnicity = request.POST.get("race_ethnicity"),
                age_at_case_acceptance = request.POST.get("age_at_case_acceptance"),
                primary_language = request.POST.get("primary_language"),
                town = request.POST.get("town"),
            )
            personData.save()
        return JsonResponse({'person_id' : personData.person_id})

class VictimList(generics.ListCreateAPIView):
    queryset = Persons.objects.filter(is_victim=True)
    serializer_class = PersonsSerializer

    def get(self, request, *args, **kwargs):
        queryset = Persons.objects.filter(is_victim=True)
        serializer_class = PersonsSerializer(queryset, many=True)

        return Response(serializer_class.data)

    def post(self, request, *args, **kwargs):
        get_person_id = request.POST.get("person_id")
        try:
            personData = Persons.objects.get(person_id=get_person_id)
        except:
            personData = Persons(
                is_victim = request.POST.get("is_victim"),
                name = request.POST.get("name"),
                dob = request.POST.get("dob"),
                gender = request.POST.get("gender"),
                race_ethnicity = request.POST.get("race_ethnicity"),
                age_at_case_acceptance = request.POST.get("age_at_case_acceptance"),
                primary_language = request.POST.get("primary_language"),
                town = request.POST.get("town"),
            )
            personData.save()

        return JsonResponse({'person_id' : personData.person_id})
      
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

class DVHRTGeneralCountView(generics.ListCreateAPIView):
    """Returns the number of cases accepted
    """
    def get(self, request, *args, **kwargs):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_count = len(Cases.objects.filter(community_id=c_id))
        case_dict = {"case_count":case_count}
        return JsonResponse(case_dict)

class DVHRTReferalSourceView(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.META.get('HTTP_COMMUNITYID')
        r_dict = {}
        referral_sources = []
        community_q_set = Communities.objects.filter(community_id=0)
        for community in community_q_set:
            referral_sources = community.referral_sources
        for referral_source in referral_sources:
            r_dict[referral_source] = 0
        case_set = Cases.objects.filter(community_id=c_id)
        for case in case_set:
            r_dict[case.referral_source] += 1
        return JsonResponse(r_dict)

class DVHRTHighRiskVictimInfo(generics.ListCreateAPIView):
    query_set = Cases.objects.all().select_related('victim_id')

    def get(self, request, *args, **kwargs):
        victim_info = {}
        victim_info.update(self.get_vicitm_genders(request))
        victim_info.update(self.get_victim_ethnicities(request))
        victim_info.update(self.get_domestic_violence_service_utilization(request))

        return JsonResponse(victim_info)

    def get_vicitm_genders(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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

    def get_victim_ethnicities(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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

    def get_domestic_violence_service_utilization(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = Cases.objects.filter(community_id=c_id).select_related('outcome_id')
        dvsu = {
            "connection_to_domestic_violence_services" : 0,
            "engagement_in_ongoing_domestic_violence_services" : 0,
        }

        for case in case_set:
            outcome = case.outcome_id
            if outcome.engagement_in_ongoing_domestic_violence_services:
                dvsu["engagement_in_ongoing_domestic_violence_services"] += 1
            if outcome.connection_to_domestic_violence_services:
                dvsu["connection_to_domestic_violence_services"] += 1

        return dvsu

class DVHRTHighRiskAbuserInfo(generics.ListCreateAPIView):
    query_set = Cases.objects.all().select_related('abuser_id')

    def get(self, request, *args, **kwargs):
        abuser_info = {}
        genders = self.get_abuser_genders(request)
        ethnicities = self.get_abuser_ethnicities(request)
        abuser_info.update(genders)
        abuser_info.update(ethnicities)

        return JsonResponse(abuser_info)

    def get_abuser_genders(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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

    def get_abuser_ethnicities(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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
        case_set = Cases.objects.all().filter(community_id=c_id).select_related('risk_factor_id')

        rf_counts = {
            'attempted_murder' : 0,
            'attempted_choke'  : 0,
            'multiple_choked'  : 0,
            'owns_gun'         : 0,
        }

        for case in case_set:
            rf = case.risk_factor_id
            if rf.attempted_murder:
                rf_counts['attempted_murder'] += 1
            if rf.attempted_choke:
                rf_counts['attempted_choke'] += 1
            if rf.multiple_choked:
                rf_counts['multiple_choked'] += 1
            if rf.owns_gun:
                rf_counts['owns_gun'] += 1


        return JsonResponse(rf_counts)

class DVHRTCriminalJusticeOutcomes(generics.ListCreateAPIView):
    query_set = Cases.objects.all().select_related('outcome_id')

    def get(self, request, *args, **kwargs):
        outcomes_info = {}
        outcomes_info.update(self.get_charges_filed(request))
        outcomes_info.update(self.get_pretrial_hearing_outcomes(request))
        outcomes_info.update(self.get_disposition_outcomes(request))
        outcomes_info.update(self.get_sentencing_outcomes(request))

        return JsonResponse(outcomes_info)

    # Charges Filed at or after case acceptance 
    def get_charges_filed(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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

    def get_pretrial_hearing_outcomes(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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

    def get_disposition_outcomes(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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

    def get_sentencing_outcomes(self, request):
        c_id = request.META.get('HTTP_COMMUNITYID')
        case_set = self.query_set.filter(community_id=c_id)
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

class CaseUpdateView(generics.UpdateAPIView):
    queryset = Cases.objects.all()
    serializer_class = CasesSerializer

    def patch(self, request, *args, **kwargs):
        # case_id = request.PATCH.get("case_id")
        case_id = 1
        caseData = Cases.objects.get(case_id=case_id)
        serializer_class = CasesSerializer(caseData, data=caseData, partial=True)
        if serializer_class.is_valid():
            serializer_class.save()
            caseData.save()
            return Response(serializer_class.data)
        return JsonResponse(code=400, data="wrong parameters")

    def get_object(self):
        return Cases.objects.get(pk=1)
        # return Cases.objects.get(pk=request.GET.get("pk"))



class OutcomesUpdateView(generics.UpdateAPIView):
    queryset = Outcomes.objects.all()
    serializer_class = OutcomesSerializer

    def patch(self, request, *args, **kwargs):
        # outcome_id = request.PATCH.get("outcome_id")
        outcome_id = 1
        outcomeData = Outcomes.objects.get(outcome_id=outcome_id)
        serializer_class = OutcomesSerializer(outcomeData, data=outcomeData, partial=True)
        if serializer_class.is_valid():
            serializer_class.save()
            outcomeData.save()
            return Response(serializer_class.data)
        return JsonResponse(code=400, data="wrong parameters")

    def get_object(self):
        return Outcomes.objects.get(pk=1)
        # return Outcomes.objects.get(pk=self.request.GET.get('pk'))