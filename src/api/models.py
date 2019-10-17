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

class Community(models.Model):
    community_id = models.IntegerField(primary_key = True)
    referral_sources = models.ArrayField(models.CharField())

class Person(models.Model):
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
    race_ethnicity = models.IntegerField(default=0, choices=race_ethnicity_choices)
    age_at_case_acceptance = models.IntegerField(default=0, choices=age_at_case_acceptance_choices)
    primary_language = models.CharField()
    town = models.CharField()

