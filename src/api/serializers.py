from rest_framework import serializers
from .models import *

class OutcomesSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Outcomes
		fields = ('__all__')

class CasesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Cases
		fields = ('__all__')

class CommunitiesSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Communities
		fields = ('__all__')

class PersonsSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Persons
		fields = ('__all__')

class RiskFactorsSerializer(serializers.ModelSerializer):
	class Meta:
		model  = RiskFactors
		fields = ('__all__')

class CasesSerializer(serializers.ModelSerializer):
	victim_id      = PersonsSerializer()
	abuser_id      = PersonsSerializer()
	outcome_id     = OutcomesSerializer()
	community_id   = CommunitiesSerializer()
	risk_factor_id = RiskFactorsSerializer()
	class Meta:
		model  = Cases
		fields = ('__all__')
