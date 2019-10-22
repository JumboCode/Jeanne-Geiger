from django.db import models

class Outcomes(models.Model):

    CHARGES = (
        (0, 'Police Response: Charges Filed'),
        (1, 'Police Response: No Charges Filed'),
        (2, 'No Police Response: Not Applicable')
    )

    PRETRIAL_OUTCOME = (
        (0, 'Released on Bail'),
        (1, 'Released on Personal Recognizance'),
        (2, 'Detained/Pretrial Detention Statute'),
        (3, 'Detained/Bail Unmet'),
        (4, 'Detained/Other'),
        (5, 'Pending Pretrial Hearing')
    )

    SENTENCING_OUTCOMES_DISPOSITION = (
        (0, 'Charges Dismissed'),
        (1, 'Not Guilty'),
        (2, 'Deferred Adjudication'),
        (3, 'Plead/Found Guilty'),
        (4, 'Pending Disposition')
    )

    SENTENCING_OUTCOMES_SENTENCE = (
        (0, 'undefined'),
        (1, 'Incarceration'),
        (2, 'Probation'),
        (3, 'Incarceration Followed by Probation')
    )

    outcome_id = models.IntegerField(primary_key=True)
    connection_to_domestic_violence_services = models.BooleanField(default=False)
    engagement_in_ongoing_domestic_violence_services = models.BooleanField(default=False)
    charges_filed_at_or_after_case_acceptance = models.IntegerField(default=0, choices=CHARGES)
    pretrial_hearing_outcome = models.IntegerField(default=0, choices=PRETRIAL_OUTCOME)
    sentencing_outcomes_disposition = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_DISPOSITION)
    sentencing_outcomes_sentence = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_SENTENCE)

class Cases(models.Model):
	RELATIONSHIP_TYPE = [
		(0, 'Current Spouse/Intimate Partner'),
		(1, 'Former Spouse/Intimate Partner'),
		(2, 'Current Dating Relationship'),
		(3, 'Former Dating Relationship'),
		(4, 'Other'),
	]

	RELATIONSHIP_LENGTH = [
		(0, '<1 year'),
		(1, '1-5 years'),
		(2, '6-9 years'),
		(3, '10-14 years'),
		(4, '15-19 years'),
		(5, '20-29 years'),
		(6, '30+ years'),
	]

	case_id = models.IntegerField(primary_key=True)

	community_id = models.ForeignKey('Community', on_delete=models.CASCADE)
	abuser_id = models.ForeignKey('Person', on_delete=models.CASCADE)
	victim_id = models.ForeignKey('Person', on_delete=models.CASCADE)
	outcome_id = models.ForeignKey('Outcomes', on_delete=models.CASCADE)
	risk_factor_id = models.ForeignKey('Risk_Factors', on_delete=models.CASCADE)

	relationship_type = models.IntegerField(max_length=1, choices=RELATIONSHIP_TYPE)
	relationship_len = models.IntegerField(max_length=1, choices=RELATIONSHIP_LENGTH)

	minor_in_home = models.BooleanField(default=False)


class Communities(models.Model):
    community_id = models.IntegerField(primary_key = True)
    referral_sources = models.ArrayField(models.CharField())

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

    person_id = models.IntegerField(primary_key = True)
    is_victim = models.BooleanField()
    name = models.CharField()
    dob = models.DateField()
    gender = models.IntegerField(default=0, choices=gender_choices)
    race_ethnicity = models.ArrayField(models.IntegerField(default=0, choices=race_ethnicity_choices))
    age_at_case_acceptance = models.IntegerField(default=0, choices=age_at_case_acceptance_choices)
    primary_language = models.CharField()
    town = models.CharField()
    
class RiskFactors(models.Models):
    risk_factor_id = models.IntegerField(primary_key=True)
    violence_increased = models.BooleanField(default=False)
    attempted_leaving = models.BooleanField(default=False)
    control_activites = models.BooleanField(default=False)
    attempted_murder = models.BooleanField(default=False)
    threatened_murder = models.BooleanField(default=False)
    weapon_threat = models.BooleanField(default=False)
    attempted_choke = models.BooleanField(default=False)
    multiple_choked = models.BooleanField(default=False)
    killing_capable = models.BooleanField(default=False)
    owns_gun = models.BooleanField(default=False)
    suicide_threat_or_attempt = models.BooleanField(default=False)
    is_unemployed = models.BooleanField(default=False)
    avoided_arrest = models.BooleanField(default=False)
    unrelated_child = models.BooleanField(default=False)
    uses_illegal_drugs = models.BooleanField(default=False)
    is_alcoholic = models.BooleanField(default=False)
    forced_sex = models.BooleanField(default=False)
    constantly_jealous = models.BooleanField(default=False)
    pregnant_abuse = models.BooleanField(default=False)
    children_threatened = models.BooleanField(default=False)
    has_spied = models.BooleanField(default=False)

