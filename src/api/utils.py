# auth0authorization/utils.py
import json
import jwt
import requests
from django.contrib.auth import authenticate
from dvhrt.settings import JWT_ACCOUNT, JWT_AUTH
from functools import wraps
from django.http import JsonResponse

def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username

def jwt_decode_token(token):
    header = jwt.get_unverified_header(token)
    jwks = requests.get('https://{}/.well-known/jwks.json'.format(JWT_ACCOUNT + '.auth0.com')).json()
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise Exception('Public key not found.')

    issuer = 'https://{}/'.format(JWT_ACCOUNT + '.auth0.com')
    jwtdecoded = jwt.decode(token, public_key, audience=JWT_AUTH["JWT_AUDIENCE"], issuer=issuer, algorithms=[JWT_AUTH["JWT_ALGORITHM"]])
    return jwtdecoded

def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token

def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("permissions"):
                token_scopes = decoded["permissions"]
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope

def get_email(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//email')

def get_site(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//site')