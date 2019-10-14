from django.db import models

# Create your models here.
class Risk_Factors(models.Models):
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
