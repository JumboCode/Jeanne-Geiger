from django.db import models

# Create your models here.

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