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
        (0, 'Incarceration'),
        (1, 'Probation'),
        (3, 'Incarceration Followed by Probation')
    )

    outcome_id = models.IntegerField(primary_key=True)
    connection_to_domestic_violence_services = models.BooleanField(default=False)
    engagement_in_ongoing_domestic_violence_services = models.BooleanField(default=False)
    charges_filed_at_or_after_case_acceptance = models.IntegerField(default=0, choices=CHARGES)
    pretrial_hearing_outcome = models.IntegerField(default=0, choices=PRETRIAL_OUTCOME)
    sentencing_outcomes_disposition = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_DISPOSITION)
    sentencing_outcomes_sentence = models.IntegerField(default=0, choices=SENTENCING_OUTCOMES_SENTENCE)
