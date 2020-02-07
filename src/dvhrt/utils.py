###### dvhrt.utils ############
# Utility functions for backend.
#
# Currently, the only utility function needed is a JWT response handler that is 
# custom made to add a new ‘user’ field with the user’s serialized data when a 
# token is generated.
#
# In settings.py, the following was added to make this overwrite:
# JWT_AUTH = {
#    'JWT_RESPONSE_PAYLOAD_HANDLER': 'dvhrt.utils.my_jwt_response_handler'
# }

from api.serializers import UserSerializer

def custom_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }