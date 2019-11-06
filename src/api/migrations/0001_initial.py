# Generated by Django 2.2.5 on 2019-11-06 01:31

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Communities',
            fields=[
                ('community_id', models.IntegerField(primary_key=True, serialize=False)),
                ('referral_sources', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Outcomes',
            fields=[
                ('outcome_id', models.IntegerField(primary_key=True, serialize=False)),
                ('connection_to_domestic_violence_services', models.BooleanField(default=False)),
                ('engagement_in_ongoing_domestic_violence_services', models.BooleanField(default=False)),
                ('charges_filed_at_or_after_case_acceptance', models.IntegerField(choices=[(0, 'undefined'), (1, 'Police Response: Charges Filed'), (2, 'Police Response: No Charges Filed'), (3, 'No Police Response: Not Applicable')], default=0)),
                ('pretrial_hearing_outcome', models.IntegerField(choices=[(0, 'undefined'), (1, 'Released on Bail'), (2, 'Released on Personal Recognizance'), (3, 'Detained/Pretrial Detention Statute'), (4, 'Detained/Bail Unmet'), (5, 'Detained/Other'), (6, 'Pending Pretrial Hearing')], default=0)),
                ('sentencing_outcomes_disposition', models.IntegerField(choices=[(0, 'undefined'), (1, 'Charges Dismissed'), (2, 'Not Guilty'), (3, 'Deferred Adjudication'), (4, 'Plead/Found Guilty'), (5, 'Pending Disposition')], default=0)),
                ('sentencing_outcomes_sentence', models.IntegerField(choices=[(0, 'undefined'), (1, 'Incarceration'), (2, 'Probation'), (3, 'Incarceration Followed by Probation')], default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Persons',
            fields=[
                ('person_id', models.IntegerField(primary_key=True, serialize=False)),
                ('is_victim', models.BooleanField()),
                ('name', models.CharField(max_length=100)),
                ('dob', models.DateField()),
                ('gender', models.IntegerField(choices=[(0, 'undefined'), (1, 'Female'), (2, 'Male'), (3, 'Other')], default=0)),
                ('race_ethnicity', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(choices=[(0, 'undefined'), (1, 'American Indian/Alaska Native'), (2, 'Asian'), (3, 'Black/African American'), (4, 'Hispanic or Latino'), (5, 'Native Hawaiian/Pacific Islander'), (6, 'White'), (7, 'Other/Unknown')], default=0), size=None)),
                ('age_at_case_acceptance', models.IntegerField(choices=[(0, 'undefined'), (1, '13 or younger'), (2, '14-17'), (3, '18-19'), (4, '20-29'), (5, '30-39'), (6, '40-49'), (7, '50-59'), (8, '60+'), (9, 'Unknown')], default=0)),
                ('primary_language', models.IntegerField(choices=[(0, 'undefined'), (1, 'English'), (2, 'Spanish/Spanish Creole'), (3, 'Arabic'), (4, 'Cambodian/Khmer'), (5, 'Chinese'), (6, 'French/French Creole'), (7, 'German'), (8, 'Greek'), (9, 'Italian'), (10, 'Polish'), (11, 'Portugese/Portugese Creole'), (12, 'Russian'), (13, 'Vietnamese'), (14, 'Other/Unknown')], default=0)),
                ('town', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='RiskFactors',
            fields=[
                ('risk_factor_id', models.IntegerField(primary_key=True, serialize=False)),
                ('violence_increased', models.BooleanField(default=False)),
                ('attempted_leaving', models.BooleanField(default=False)),
                ('control_activites', models.BooleanField(default=False)),
                ('attempted_murder', models.BooleanField(default=False)),
                ('threatened_murder', models.BooleanField(default=False)),
                ('weapon_threat', models.BooleanField(default=False)),
                ('attempted_choke', models.BooleanField(default=False)),
                ('multiple_choked', models.BooleanField(default=False)),
                ('killing_capable', models.BooleanField(default=False)),
                ('owns_gun', models.BooleanField(default=False)),
                ('suicide_threat_or_attempt', models.BooleanField(default=False)),
                ('is_unemployed', models.BooleanField(default=False)),
                ('avoided_arrest', models.BooleanField(default=False)),
                ('unrelated_child', models.BooleanField(default=False)),
                ('uses_illegal_drugs', models.BooleanField(default=False)),
                ('is_alcoholic', models.BooleanField(default=False)),
                ('forced_sex', models.BooleanField(default=False)),
                ('constantly_jealous', models.BooleanField(default=False)),
                ('pregnant_abuse', models.BooleanField(default=False)),
                ('children_threatened', models.BooleanField(default=False)),
                ('has_spied', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Cases',
            fields=[
                ('case_id', models.IntegerField(primary_key=True, serialize=False)),
                ('relationship_type', models.IntegerField(choices=[(0, 'undefined'), (1, 'Current Spouse/Intimate Partner'), (2, 'Former Spouse/Intimate Partner'), (3, 'Current Dating Relationship'), (4, 'Former Dating Relationship'), (5, 'Other')], default=0)),
                ('relationship_len', models.IntegerField(choices=[(0, 'undefined'), (1, '<1 year'), (2, '1-5 years'), (3, '6-9 years'), (4, '10-14 years'), (5, '15-19 years'), (6, '20-29 years'), (7, '30+ years')], default=0)),
                ('minor_in_home', models.BooleanField(default=False)),
                ('abuser_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='abuser_id', to='api.Persons')),
                ('community_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='communities', to='api.Communities')),
                ('outcome_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Outcomes')),
                ('risk_factor_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.RiskFactors')),
                ('victim_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='victim_id', to='api.Persons')),
            ],
        ),
    ]
