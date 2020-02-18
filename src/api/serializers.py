from rest_framework import serializers
from .models import *

class OutcomesSerializer(serializers.ModelSerializer):
	connection_to_domestic_violence_services = serializers.CharField(source='get_connection_to_domestic_violence_services_display')
	engagement_in_ongoing_domestic_violence_services = serializers.CharField(source='get_engagement_in_ongoing_domestic_violence_services_display')
	charges_filed_at_or_after_case_acceptance = serializers.CharField(source='get_charges_filed_at_or_after_case_acceptance_display')
	pretrial_hearing_outcome = serializers.CharField(source='get_pretrial_hearing_outcome_display')
	sentencing_outcomes_disposition = serializers.CharField(source='get_sentencing_outcomes_disposition_display')
	sentencing_outcomes_sentence = serializers.CharField(source='get_sentencing_outcomes_sentence_display')

	class Meta:
		model  = Outcomes
		fields = ('__all__')

class CommunitiesSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Communities
		fields = ('__all__')

class PersonsSerializer(serializers.ModelSerializer):
	gender = serializers.CharField(source='get_gender_display')
	race_ethnicity = serializers.ListField(child=serializers.CharField())
	age_at_case_acceptance = serializers.CharField(source='get_age_at_case_acceptance_display')
	primary_language = serializers.CharField(source='get_primary_language_display')

	class Meta:
		model  = Persons
		fields = ('__all__')

class RiskFactorsSerializer(serializers.ModelSerializer):
	violence_increased = serializers.CharField(source='get_violence_increased_display')
	attempted_leaving = serializers.CharField(source='get_attempted_leaving_display')
	control_activites = serializers.CharField(source='get_control_activites_display')
	attempted_murder = serializers.CharField(source='get_attempted_murder_display')
	threatened_murder = serializers.CharField(source='get_threatened_murder_display')
	weapon_threat = serializers.CharField(source='get_weapon_threat_display')
	attempted_choke = serializers.CharField(source='get_attempted_choke_display')
	multiple_choked = serializers.CharField(source='get_multiple_choked_display')
	killing_capable = serializers.CharField(source='get_killing_capable_display')
	owns_gun = serializers.CharField(source='get_owns_gun_display')
	suicide_threat_or_attempt = serializers.CharField(source='get_suicide_threat_or_attempt_display')
	is_unemployed = serializers.CharField(source='get_is_unemployed_display')
	avoided_arrest = serializers.CharField(source='get_avoided_arrest_display')
	unrelated_child = serializers.CharField(source='get_unrelated_child_display')
	uses_illegal_drugs = serializers.CharField(source='get_uses_illegal_drugs_display')
	is_alcoholic = serializers.CharField(source='get_is_alcoholic_display')
	forced_sex = serializers.CharField(source='get_forced_sex_display')
	constantly_jealous = serializers.CharField(source='get_constantly_jealous_display')
	pregnant_abuse = serializers.CharField(source='get_pregnant_abuse_display')
	children_threatened = serializers.CharField(source='get_children_threatened_display')
	has_spied = serializers.CharField(source='get_has_spied_display')
	class Meta:
		model  = RiskFactors
		fields = ('__all__')

class CasesSerializer(serializers.ModelSerializer):
	relationship_type = serializers.CharField(source='get_relationship_type_display')
	relationship_len = serializers.CharField(source='get_relationship_len_display')
	minor_in_home = serializers.CharField(source='get_minor_in_home_display')

	victim_id      = PersonsSerializer()
	abuser_id      = PersonsSerializer()
	outcome_id     = OutcomesSerializer()
	community_id   = CommunitiesSerializer()
	risk_factor_id = RiskFactorsSerializer()
	class Meta:
		model  = Cases
		fields = ('__all__')
