import logging

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


class OutcomeList(generics.ListCreateAPIView):
    queryset = Outcomes.objects.all()
    serializer_class = OutcomesSerializer
    
    def get(self, request, *args, **kwargs):
        queryset = Outcomes.objects.all()
        serializer_class = OutcomesSerializer(queryset, many=True)
        try:
            get_outcome_id = request.GET.get("outcome_id")
            outcome = queryset.get(outcome_id=get_outcome_id)
            return JsonResponse(OutcomesSerializer(outcome).data, safe=False)
        except:
            return HttpResponse('outcome not found')
        # o_id = request.GET.get("outcome_id")
        # o_id = 1
        # OutcomeData = Outcomes.objects.filter(outcome_id=o_id)

        # queryset = Outcomes.objects.all()
        # serializer = OutcomesSerializer(queryset, many=True)

        # return Response(serializer.data)
    

    def post(self, request, *args, **kwargs):
        get_outcome_id = request.POST.get("outcome_id")
        try:
            outcomeData = Outcomes.objects.get(outcome_id=get_outcome_id)
        except:
            outcomeData = Outcomes(connection_to_domestic_violence_services = request.POST.get("connection_to_domestic_violence_services"),
                                engagement_in_ongoing_domestic_violence_services = request.POST.get("engagement_in_ongoing_domestic_violence_services"),
                                charges_filed_at_or_after_case_acceptance = request.POST.get("charges_filed_at_or_after_case_acceptance"),
                                pretrial_hearing_outcome = request.POST.get("pretrial_hearing_outcome"),
                                sentencing_outcomes_disposition = request.POST.get("sentencing_outcomes_disposition"),
                                sentencing_outcomes_sentence = request.POST.get("sentencing_outcomes_sentence"),
            )
            outcomeData.save()
        return HttpResponse('success')

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

# View 1
class GeneralCountView(generics.ListCreateAPIView):
    """Returns the number of cases accepted
    """
    # TODO: modify to return the number of cases accepted in a certain month
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_count = len(Cases.objects.filter(community_id=c_id))
        case_dict = {"case_count":case_count}
        return JsonResponse(case_dict)

# View 2
class ReferalSourceView(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
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

# View 3
class VictimGenders(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.filter(community_id=c_id).select_related('victim_id')
        genders_to_counts = {
            'Female': 0,
            'Male': 0,
            'Other': 0,
            'Total Count': 0
        }

        total_count = 0
        for case in case_set:
            victim = case.victim_id
            try:
                genders_to_counts[victim.get_gender_display()] += 1
            except:
                genders_to_counts['Other'] += 1
            genders_to_counts['Total Count'] += 1

        return JsonResponse(genders_to_counts)

class VictimEthnicities(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.filter(community_id=c_id).select_related('victim_id')
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
            'Total Count': total_count
        }

        return JsonResponse(counts)

class AbuserEthnicities(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.filter(community_id=1).select_related('abuser_id')
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

        return JsonResponse(counts)

class RiskFactorCounts(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
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

#View 9, Charges Filed Outcomes,
class CJOChargesFiled(generics.ListCreateAPIView):
    """
    show total count
    1. police response: charges filed
    2. police response: No charges filed
    3. no police response: not applicable
    """
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.all().filter(community_id=1).select_related('outcome_id')
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

        outcome_counts['Total Count'] = total_count

        return JsonResponse(outcome_counts)


# View 10, Criminal Justice Outcomes, Pretrial Hearing Outcomes
class PretrialHearingOutcome(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.all().filter(community_id=c_id).select_related('outcome_id')
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

        outcome_counts['Total Count'] = total_count

        return JsonResponse(outcome_counts)

# View 11:View 11: Criminal Justice Outcomes, Disposition Outcomes
class DispositionOutcomes(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.all().filter(community_id=c_id).select_related("outcome_id")
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

        disposition_outcome_counts['Total Count'] = total_count

        return JsonResponse(disposition_outcome_counts)

# View 12:Criminal Justice Outcomes, Sentencing Outcomes
class SentencingOutcomes(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.all().filter(community_id=c_id).select_related("outcome_id")
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

        sentencing_outcome_counts['Total Count'] = total_count

        return JsonResponse(sentencing_outcome_counts)
