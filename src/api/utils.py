import json
import os
import jwt
import random
import string
import requests
from django.contrib.auth import authenticate
from dvhrt.settings import JWT_ACCOUNT, JWT_AUTH, COORD_ROLE_ID
from functools import wraps
from django.http import JsonResponse

# auth0 function to get username of current user 
def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username

# auth0 function to decode a token
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

# auth0 function to get the access token from the authorization header 
def get_token_auth_header(request):
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]
    return token

# determines if the required scope is present in the access token
def requires_scope(required_scope):
    # required_scope is the scope required to access the resource obtained from the token
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            role = get_role(args[0])
            if role == required_scope:
                return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope

# returns the email of the auth0 user which is encoded in the access token 
def get_email(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//email')

# returns the site ID number of the auth0 user which is encoded in the access token 
def get_site(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//appsite')

# returns the role name of the auth0 user which is encoded in the access token 
def get_role(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//role')

# returns the management token which can be used to edit the auth0 users
def get_management_token():
    payload = {
        "grant_type": "client_credentials",
        "client_id": os.environ['MANAGEMENT_CLIENT_ID'],
        "client_secret": os.environ['MANAGEMENT_CLIENT_SECRET'],
        "audience": "https://" + JWT_ACCOUNT + ".auth0.com/api/v2/"
    }
    headers = { 
        'content-type': "application/x-www-form-urlencoded"
    }
    r = requests.post('https://' + JWT_ACCOUNT + '.auth0.com/oauth/token', headers=headers, data=payload)
    return r.json()["access_token"]

# generate a random password to initialize user account (required step), 
# to be changed later though reset password email
def generate_password():
    character_set = string.ascii_letters + string.digits
    return ''.join((random.choice(character_set) for i in range(32)))

# creates a new auth0 user that represents a coordinator of a specific community  
def create_user(coordinator, community_id, management_token):
    # make request to create user 
    # set the "site" field in the user metadata to the site ID to link the user to a specific community
    # this sends an email to the new user asking to verify their email address
    password = generate_password()
    payload = {
        "email": coordinator["email"],
        "email_verified": False,
        "name": coordinator["name"],
        "connection": "Username-Password-Authentication",
        "password": password,
        "verify_email": True,
        "app_metadata": {
            "role" : "Coordinator",
            "site" : community_id
        }
    }
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }
    r = requests.post("https://" + JWT_ACCOUNT + ".auth0.com/api/v2/users", headers=headers, data=json.dumps(payload))
    user_id = r.json()['user_id']

    # make request to reset new user's password
    # this sends an email to the new user asking them to reset their password
    payload = {
        "client_id": os.environ['MANAGEMENT_CLIENT_ID'],
        "email": coordinator["email"],
        "connection": "Username-Password-Authentication",
    }

    headers = { 
        'content-type': "application/json"
    }
    r = requests.post("https://" + JWT_ACCOUNT + ".auth0.com/dbconnections/change_password", headers=headers, data=json.dumps(payload))

    return user_id

# searches the list of auth0 users given an email and returns the corresponding user id
# currently not used 
def get_user_id(user_email, management_token):
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }

    user = requests.get(f"https://" + JWT_ACCOUNT + ".auth0.com/api/v2/users?q=email%3A%22{user_email}%22&search_engine=v3", headers=headers)

    user_id = user.json()[0]["user_id"]
    return user_id

# deletes an auth0 user 
# currently not used, users can be deleted through auth0 interface 
def remove_user(user_id, management_token):
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }
    r = requests.delete(f"https://" + JWT_ACCOUNT + ".auth0.com/api/v2/users/{user_id}", headers=headers)