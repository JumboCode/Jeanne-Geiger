from django.contrib import admin
from api.models import Outcomes, Cases, Communities, Persons, RiskFactors

admin.site.register(Outcomes)
admin.site.register(Cases)
admin.site.register(Communities)
admin.site.register(Persons)
admin.site.register(RiskFactors)
