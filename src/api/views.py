from django.shortcuts import render

import logging

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

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

class ListCasesRaw(APIView):

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        queryset = Case.objects.all()
        serializer = CaseSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        How might a post request work?
        """
        queryset = Case.objects.all()
        serializer = CaseSerializer(queryset, many=True)
        caseData = Case(relationship_type = request.POST.get("relationship_type"),
                        relationship_len = request.POST.get("relationship_len"),
                        minor_in_home = request.POST.get("minor_in_home"))
        caseData.save()

        community_id = request.POST.get("community_id")
        queryset = Community.objects.all()
        communityData = queryset.filter(community_id = community_id)
        communityData["referral_sources"] = request.POST.get("referral_sources")

        person_id = request.POST.get("person_id")
        queryset = Person.objects.all()
        personData = queryset.filter(person_id = person_id)
        personData["is_victim"] = request.POST.get("is_victim")
        personData["name"] = request.POST.get("name")
        personData["dob"] = request.POST.get("dob")
        personData["gender"] = request.POST.get("gender")
        personData["race_ethnicity"] = request.POST.get("race_ethnicity")
        personData["age_at_case_acceptance"] = request.POST.get("age_at_case_acceptance")
        personData["primary_language"] = request.POST.get("primary_language")
        personData["town"] = request.POST.get("town")

        outcome_id = request.POST.get("outcome_id")
        queryset = Outcome.objects.all()
        outcomeData = queryset.filter(outcome_id = outcome_id)
        outcomeData["connection_to_domestic_violence_services"] = request.POST.get("connection_to_domestic_violence_services")
        outcomeData["engagement_in_ongoing_domestic_violence_services"] = request.POST.get("engagement_in_ongoing_domestic_violence_services")
        outcomeData["charges_filed_at_or_after_case_acceptance"] = request.POST.get("charges_filed_at_or_after_case_acceptance")
        outcomeData["pretrial_hearing_outcome"] = request.POST.get("pretrial_hearing_outcome")
        outcomeData["sentencing_outcomes_disposition"] = request.POST.get("sentencing_outcomes_disposition")
        outcomeData["sentencing_outcomes_sentence"] = request.POST.get("sentencing_outcomes_sentence")

        risk_factor_id = request.POST.get("risk_factor_id")
        queryset = Risk_Factors.objects.all()
        riskData = queryset.filter(risk_factor_id = risk_factor_id)
        riskData["violence_increased"] = request.POST.get("violence_increased")
        riskData["attempted_leaving"] = request.POST.get("attempted_leaving")
        riskData["control_activites"] = request.POST.get("control_activites")
        riskData["attempted_murder"] = request.POST.get("attempted_murder")
        riskData["threatened_murder"] = request.POST.get("threatened_murder")
        riskData["weapon_threat"] = request.POST.get("weapon_threat")
        riskData["attempted_choke"] = request.POST.get("attempted_choke")
        riskData["multiple_choked"] = request.POST.get("multiple_choked")
        riskData["killing_capable"] = request.POST.get("killing_capable")
        riskData["owns_gun"] = request.POST.get("owns_gun")
        riskData["suicide_threat_or_attempt"] = request.POST.get("suicide_threat_or_attempt")
        riskData["is_unemployed"] = request.POST.get("is_unemployed")
        riskData["avoided_arrest"] = request.POST.get("avoided_arrest")
        riskData["unrelated_child"] = request.POST.get("unrelated_child")
        riskData["uses_illegal_drugs"] = request.POST.get("uses_illegal_drugs")
        riskData["is_alcoholic"] = request.POST.get("is_alcoholic")
        riskData["forced_sex"] = request.POST.get("forced_sex")
        riskData["constantly_jealous"] = request.POST.get("constantly_jealous")
        riskData["pregnant_abuse"] = request.POST.get("pregnant_abuse")
        riskData["children_threatened"] = request.POST.get("children_threatened")
        riskData["has_spied"] = request.POST.get("has_spied")

        return HttpResponse('success')



class abuser_ethnicities(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        community_id = request.community_id
        queryset = Case.objects.all()
        people = Person.objects.all()
        case_set = queryset.filter(community_id = community_id)
        tallies = [0] * 8
        total_count = 0
        for case in case_set:
            abuser = people[case['abuser_id']]
            for ethnicity in abuser['race_ethnicity']:
                tallies[ethnicity] += 1
                total_count += 1

        ethnic_counts = {
            'undefined': tallies[0],
            'American Indian/Alaska Native': tallies[1],
            'Asian': tallies[2],
            'Black/African American': tallies[3],
            'Hispanic or Latino': tallies[4],
            'Native Hawaiian/Pacific Islander': tallies[5],
            'White': tallies[6],
            'Other/Unknown': tallies[7],
        }
        return HttpResponse(ethnic_counts, total_count)

# View 8: Risk Factors
# Show the count associated with each risk factor below
# Has he/she tried to kill you?
# Has he/she ever tried to choke (strangle) you?
# Has he/she choked (strangled) you multiple times?
# Does he/she own a gun?

class risk_factors(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        community_id = request.community_id
        queryset = Case.objects.all()
        case_set = queryset.filter(community_id = community_id)
        risks = Risk_Factors.objects.all()
        tallies = [0] * 4
        for case in case_set:
            risk_factors = risks[case['risk_factor_id']]
            if(risk_factors['attempted_murder']):
                tallies[0] += 1
            if(risk_factors['attempted_choke']):
                tallies[1] += 1
            if(risk_factors['multiple_choked']):
                tallies[2] += 1
            if(risk_factors['owns_gun']):
                tallies[3] += 1

        risk_counts = {
            'attempted_murder': tallies[0],
            'attempted_choke': tallies[1],
            'multiple_choked': tallies[2],
            'owns_gun': tallies[3],
        }
        return HttpResponse(risk_counts)

class pretrial_outcome(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        outcome_id = request.outcome_id
        queryset = Case.objects.all()
        case_set = queryset.filter(community_id = community_id)
        outcomes = Outcomes.objects.all()
        tallies = [0] * 7
        for case in case_set:
            outcome = outcomes[case['outcome_id']]
            tallies[outcome['pretrial_outcome'] += 1
        risk_counts = {
            'undefined': tallies[0],
            'Released on Bail': tallies[1],
            'Released on Personal Recognizance': tallies[2],
            'Detained/Pretrial Detention Statute': tallies[3],
            'Detained/Bail Unmet': tallies[4],
            'Detained/Other': tallies[5],
            'Pending Pretrial Hearing': tallies[6],
        }
        return HttpResponse(outcome_counts)

class sentencing_outcomes_sentence(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        outcome_id = request.outcome_id
        queryset = Case.objects.all()
        case_set = queryset.filter(community_id = community_id)
        outcomes = Outcomes.objects.all()
        tallies = [0] * 3
        for case in case_set:
            outcome = outcomes[case['outcome_id']]
            tallies[outcome['sentencing_outcomes_sentence'] += 1
        outcome_counts = {
            'undefined': tallies[0],
            'Incarceration': tallies[1],
            'Probation': tallies[2],
            'Incarceration Followed by Probation': tallies[2],
        }
        return HttpResponse(outcome_counts)
