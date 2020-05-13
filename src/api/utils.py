# auth0authorization/utils.py
import json
import os
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

def get_token_2(request):
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

def get_management_token():
    payload = {
        "grant_type": "client_credentials",
        "client_id": os.environ['MANAGEMENT_CLIENT_ID'],
        "client_secret": os.environ['MANAGEMENT_CLIENT_SECRET'],
        "audience": "https://agross09.auth0.com/api/v2/"
    }
    headers = { 
        'content-type': "application/x-www-form-urlencoded"
    }
    r = requests.post('https://agross09.auth0.com/oauth/token', headers=headers, data=payload)
    return r.json()["access_token"]

#unsure if coordinator id will change over time
def get_role_id():
    headers = {
    'content-type': "application/json",
    'authorization': f"Bearer {management_token}",
    'cache-control': "no-cache"
    }
    r = requests.get('https://agross09.auth0.com/api/v2/roles', headers=headers)
    return r.json()

def create_user(coordinator, community_id, management_token):
    payload = {
        "email": coordinator["email"],
        "email_verified": False,
        "name": coordinator["name"],
        "connection": "Username-Password-Authentication",
        "password": "DVHRT2020??",
        "verify_email": True,
        "user_metadata": {
            "site" : community_id
        }
    }
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }
    r = requests.post("https://agross09.auth0.com/api/v2/users", headers=headers, data=json.dumps(payload))
    return r.json()['user_id']

def set_user_roles(user_id, management_token):
    payload = {
        'roles': ['rol_FrafLuFFTewJsSMM']
    }
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }
    r = requests.post(f"https://agross09.auth0.com/api/v2/users/{user_id}/roles", headers=headers, data=json.dumps(payload))
    return r

def get_user_id(user_email, management_token):
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }

    user = requests.get(f"https://agross09.auth0.com/api/v2/users?q=email%3A%22{user_email}%22&search_engine=v3", headers=headers)

    user_id = user.json()[0]["user_id"]
    return user_id

def remove_user(user_id, management_token):
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }
    r = requests.delete(f"https://agross09.auth0.com/api/v2/users/{user_id}", headers=headers)