from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import *

class OutcomesSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Outcomes
		fields = ('__all__')

class CasesSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Cases
		fields = ('__all__')

class CommunitiesSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Communities
		fields = ('__all__')

class PersonsSerializer(serializers.ModelSerializer):
	class Meta:
		model  = Persons
		fields = ('__all__')

class RiskFactorsSerializer(serializers.ModelSerializer):
	class Meta:
		model  = RiskFactors
		fields = ('__all__')

class CasesSerializer(serializers.ModelSerializer):
	victim     = PersonsSerializer()
	abuser     = PersonsSerializer()
	outcome    = OutcomesSerializer()
	community  = CommunitiesSerializer()
	riskfactor = RiskFactorsSerializer()
	class Meta:
		model  = Cases
		fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'is_admin', 'community_id')