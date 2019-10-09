from django.db import models


class Case(models.Model):

	RELATIONSHIP_TYPE = [
		(1, 'Current Spouse/Intimate Partner'),
		(2, 'Former Spouse/Intimate Partner'),
		(3, 'Current Dating Relationship'),
		(4, 'Former Dating Relationship'),
		(5, 'Other'),
	]

	RELATIONSHIP_LENGTH = [
		(1, '<1 year'),
		(2, '1-5 years'),
		(3, '6-9 years'),
		(4, '10-14 years'),
		(5, '15-19 years'),
		(6, '20-29 years'),
		(7, '30+ years'),
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