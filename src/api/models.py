from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import datetime

class Outcomes(models.Model):
	CHARGES = (
		(0, 'undefined'),
		(1, 'Police Response: Charges Filed'),
		(2, 'Police Response: No Charges Filed'),
		(3, 'No Police Response: Not Applicable')
	)

	PRETRIAL_OUTCOME = (
		(0, 'undefined'),
		(1, 'Released on Bail'),
		(2, 'Released on Personal Recognizance'),
		(3, 'Detained/Pretrial Detention Statute'),
		(4, 'Detained/Bail Unmet'),
		(5, 'Detained/Other'),
		(6, 'Pending Pretrial Hearing')
	)

	SENTENCING_OUTCOMES_DISPOSITION = (
		(0, 'undefined'),
		(1, 'Charges Dismissed'),
		(2, 'Not Guilty'),
		(3, 'Deferred Adjudication'),
		(4, 'Plead/Found Guilty'),
		(5, 'Pending Disposition')
	)

	SENTENCING_OUTCOMES_SENTENCE = (
		(0, 'undefined'),
		(1, 'Incarceration'),
		(2, 'Probation'),
		(3, 'Incarceration Followed by Probation')
	)

	BOOL = (
		(True, 'Yes'),
		(False, 'No')
	)

	outcome_id = models.AutoField(primary_key=True)
	connection_to_domestic_violence_services = models.BooleanField(default=1, choices=BOOL)
	engagement_in_ongoing_domestic_violence_services = models.BooleanField(default=1, choices=BOOL)
	charges_filed_at_or_after_case_acceptance = models.IntegerField(default=0, choices=CHARGES)
	pretrial_hearing_outcome = models.IntegerField(default=0, choices=PRETRIAL_OUTCOME)
	sentencing_outcomes_disposition = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_DISPOSITION)
	sentencing_outcomes_sentence = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_SENTENCE)

class Cases(models.Model):
	RELATIONSHIP_TYPE = [
		(0, 'undefined'),
		(1, 'Current Spouse/Intimate Partner'),
		(2, 'Former Spouse/Intimate Partner'),
		(3, 'Current Dating Relationship'),
		(4, 'Former Dating Relationship'),
		(5, 'Other'),
	]

	RELATIONSHIP_LENGTH = [
		(0, 'undefined'),
		(1, '<1 year'),
		(2, '1-5 years'),
		(3, '6-9 years'),
		(4, '10-14 years'),
		(5, '15-19 years'),
		(6, '20-29 years'),
		(7, '30+ years'),
	]

	case_id = models.AutoField(primary_key=True)
	community_id = models.ForeignKey('Communities', related_name='communities', on_delete=models.CASCADE)
	abuser_id = models.ForeignKey('Persons', related_name='abuser_id', on_delete=models.CASCADE)
	victim_id = models.ForeignKey('Persons', related_name='victim_id', on_delete=models.CASCADE)
	outcome_id = models.ForeignKey('Outcomes', on_delete=models.CASCADE)
	risk_factor_id = models.ForeignKey('RiskFactors', on_delete=models.CASCADE)
	relationship_type = models.IntegerField(default=0, choices=RELATIONSHIP_TYPE)
	relationship_len = models.IntegerField(default=0, choices=RELATIONSHIP_LENGTH)
	minor_in_home = models.BooleanField(default=False)
	referral_source = models.CharField(max_length=100, default="")
	date_accepted = models.DateField(null=True, blank=True)


class Communities(models.Model):
    community_id = models.AutoField(primary_key = True)
    community_name = models.CharField(max_length=100, default="")
    referral_sources = ArrayField(models.CharField(max_length=100))

class Persons(models.Model):
    gender_choices = (
        (0, 'undefined'),
        (1, 'Female'),
        (2, 'Male'),
        (3, 'Other'),
    )

    race_ethnicity_choices = (
        (0, 'undefined'),
        (1, 'American Indian/Alaska Native'),
        (2, 'Asian'),
        (3, 'Black/African American'),
        (4, 'Hispanic or Latino'),
        (5, 'Native Hawaiian/Pacific Islander'),
        (6, 'White'),
        (7, 'Other/Unknown'),
    )

    age_at_case_acceptance_choices = (
        (0, 'undefined'),
        (1, '13 or younger'),
        (2, '14-17'),
        (3, '18-19'),
        (4, '20-29'),
        (5, '30-39'),
        (6, '40-49'),
        (7, '50-59'),
        (8, '60+'),
        (9, 'Unknown'),
    )

    primary_language_choices = (
        (0, 'undefined'),
        (1, 'English'),
        (2, 'Spanish/Spanish Creole'),
        (3, 'Arabic'),
        (4, 'Cambodian/Khmer'),
        (5, 'Chinese'),
        (6, 'French/French Creole'),
        (7, 'German'),
        (8, 'Greek'),
        (9, 'Italian'),
        (10, 'Polish'),
        (11, 'Portugese/Portugese Creole'),
        (12, 'Russian'),
        (13, 'Vietnamese'),
        (14, 'Other/Unknown'),
    )

    person_id = models.AutoField(primary_key = True)
    is_victim = models.BooleanField()
    name = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    gender = models.IntegerField(default=0, choices=gender_choices)
    race_ethnicity = models.IntegerField(default=0, choices=race_ethnicity_choices)
    age_at_case_acceptance = models.IntegerField(default=0, choices=age_at_case_acceptance_choices)
    primary_language = models.IntegerField(default=0, choices=primary_language_choices)
    town = models.CharField(max_length=100)

class RiskFactors(models.Model):
    BOOL = (
        (True, 'Yes'),
        (False, 'No')
    )

    risk_factor_id = models.AutoField(primary_key=True)
    violence_increased = models.BooleanField(default=1, choices=BOOL)
    attempted_leaving = models.BooleanField(default=1, choices=BOOL)
    control_activites = models.BooleanField(default=1, choices=BOOL)
    attempted_murder = models.BooleanField(default=1, choices=BOOL)
    threatened_murder = models.BooleanField(default=1, choices=BOOL)
    weapon_threat = models.BooleanField(default=1, choices=BOOL)
    attempted_choke = models.BooleanField(default=1, choices=BOOL)
    multiple_choked = models.BooleanField(default=1, choices=BOOL)
    killing_capable = models.BooleanField(default=1, choices=BOOL)
    owns_gun = models.BooleanField(default=1, choices=BOOL)
    suicide_threat_or_attempt = models.BooleanField(default=1, choices=BOOL)
    is_unemployed = models.BooleanField(default=1, choices=BOOL)
    avoided_arrest = models.BooleanField(default=1, choices=BOOL)
    unrelated_child = models.BooleanField(default=1, choices=BOOL)
    uses_illegal_drugs = models.BooleanField(default=1, choices=BOOL)
    is_alcoholic = models.BooleanField(default=1, choices=BOOL)
    forced_sex = models.BooleanField(default=1, choices=BOOL)
    constantly_jealous = models.BooleanField(default=1, choices=BOOL)
    pregnant_abuse = models.BooleanField(default=1, choices=BOOL)
    children_threatened = models.BooleanField(default=1, choices=BOOL)
    has_spied = models.BooleanField(default=1, choices=BOOL)