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
class CJOChargesFiled(self, request, community):
    """
    show total count
    1. police response: charges filed
    2. police response: No charges filed
    3. no police response: not applicable

    *One option per case total count should equal total cases*
    """
    caselist = (Cases.objects.filter(community_id=community))
    result_tuple = (0, 0, 0)
    for i in caselist:
        if i.outcome_id.charges_filed_at_or_after_case_acceptance == 0:
            result_tuple[0] += 1
        else if i.outcome_id.charges_filed_at_or_after_case_acceptance == 1:
            result_tuple[1] += 1
        else:
            result_tuple[2] += 1
