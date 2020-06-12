from django.db import models
from django.contrib.postgres.fields import ArrayField
from datetime import datetime

# maps bool to string
BOOL = (
    (False, 'No'),
    (True, 'Yes')
)


# Outcomes represent the results of a case surrounding criminal justice
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

	outcome_id = models.AutoField(primary_key=True)
	connection_to_domestic_violence_services = models.BooleanField(default=1, choices=BOOL)
	engagement_in_ongoing_domestic_violence_services = models.BooleanField(default=1, choices=BOOL)
	charges_filed_at_or_after_case_acceptance = models.IntegerField(default=0, choices=CHARGES)
	pretrial_hearing_outcome = models.IntegerField(default=0, choices=PRETRIAL_OUTCOME)
	sentencing_outcomes_disposition = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_DISPOSITION)
	sentencing_outcomes_sentence = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_SENTENCE)


# Cases represent a singular case and uses foreign keys to refer to a specific victim, 
# abuser, outcome, risk factors, and the community the case originates from. 
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

    STATUS = [
        (0, 'Active'),
        (1, 'Inactive'),
        (2, 'Closed')
    ]
  
    case_id = models.AutoField(primary_key=True)
    community_id = models.ForeignKey('Communities', related_name='communities', on_delete=models.CASCADE)
    abuser_id = models.ForeignKey('Persons', related_name='abuser_id', on_delete=models.CASCADE)
    victim_id = models.ForeignKey('Persons', related_name='victim_id', on_delete=models.CASCADE)
    outcome_id = models.ForeignKey('Outcomes', on_delete=models.CASCADE)
    risk_factor_id = models.ForeignKey('RiskFactors', on_delete=models.CASCADE)
    relationship_type = models.IntegerField(default=0, choices=RELATIONSHIP_TYPE)
    relationship_len = models.IntegerField(default=0, choices=RELATIONSHIP_LENGTH)
    minor_in_home = models.BooleanField(default=1, choices=BOOL)
    referral_source = models.CharField(max_length=100, default="")
    date_accepted = models.DateField(null=True, blank=True)
    active_status = models.IntegerField(default=0, choices=STATUS)
    last_updated = models.DateField(null=True, blank=True)


# Communities represents a location that tracks its own case files, like a town 
class Communities(models.Model):
    community_id = models.AutoField(primary_key=True)
    community_name = models.CharField(max_length=100, default="")
    # coordinators tracks the people who have access to the data from this community including name and email address
    # this variable is not updated in the database after initial creation and is only updated through auth0
    # note: this is an array of arrays of size 2 that contains strings, arrays are not represented in built-in Django API (this is not used in this app)
    coordinators = ArrayField(ArrayField(models.CharField(max_length=100, default=""), size=2), default=list)
    # note: this is an an array of strings, arrays are not represented in built in Django API (this is not used in this app)
    referral_sources = ArrayField(models.CharField(max_length=100, default=""))
    date_created = models.DateField(null=True, blank=True)
    last_updated = models.DateField(null=True, blank=True)


# Persons represents either a victim or abuser and contains personal information
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
    is_victim = models.BooleanField()   # if false, the person is an abuser
    name = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    gender = models.IntegerField(default=0, choices=gender_choices)
    race_ethnicity = ArrayField(models.IntegerField(default=0, choices=race_ethnicity_choices))
    age_at_case_acceptance = models.IntegerField(default=0, choices=age_at_case_acceptance_choices)
    primary_language = models.IntegerField(default=0, choices=primary_language_choices)
    town = models.CharField(max_length=100)

# RiskFactors represents each of the individual factors used to assess the severity of the case
class RiskFactors(models.Model):
    BOOL_W_NA = (
        (True, 'Yes'),
        (False, 'No'),
        (None, 'Other/Not Applicable')
    )

    risk_factor_id = models.AutoField(primary_key=True)
    violence_increased = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    attempted_leaving = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    control_activites = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    attempted_murder = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    threatened_murder = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    weapon_threat = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    attempted_choke = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    multiple_choked = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    killing_capable = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    owns_gun = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    suicide_threat_or_attempt = models.BooleanField(default=None, choices=BOOL_W_NA)
    is_unemployed = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    avoided_arrest = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    unrelated_child = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    uses_illegal_drugs = models.BooleanField(default=None, choices=BOOL_W_NA)
    is_alcoholic = models.BooleanField(default=None, choices=BOOL_W_NA)
    forced_sex = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    constantly_jealous = models.BooleanField(default=None, choices=BOOL_W_NA)
    pregnant_abuse = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
    children_threatened = models.BooleanField(default=None, choices=BOOL_W_NA)
    has_spied = models.BooleanField(null=True, default=None, choices=BOOL_W_NA)
