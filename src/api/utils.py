import json
import os
import jwt
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

# returns the email of the auth0 user which is encoded in the access token 
def get_email(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//email')

# returns the site ID number of the auth0 user which is encoded in the access token 
def get_site(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//site')

# returns the role name of the auth0 user which is encoded in the access token 
def get_roles(request):
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, verify=False)
    return decoded.get('https://jeanne-geiger-api//roles')

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

# returns the available roles of the application, including each role name and ID
def get_role_info(management_token):
    headers = {
    'content-type': "application/json",
    'authorization': f"Bearer {management_token}",
    'cache-control': "no-cache"
    }
    r = requests.get('https://' + JWT_ACCOUNT + '.auth0.com/api/v2/roles', headers=headers)
    return r.json()

# creates a new auth0 user that represents a coordinator of a specific community  
def create_user(coordinator, community_id, management_token):
    # make request to create user 
    # set the "site" field in the user metadata to the site ID to link the user to a specific community
    # this sends an email to the new user asking to verify their email address
    payload = {
        "email": coordinator["email"],
        "email_verified": False,
        "name": coordinator["name"],
        "connection": "Username-Password-Authentication",
        "password": os.environ["DEFAULT_PASSWORD"],
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

# sets the role of an auth0 user to Coordinator 
def set_user_roles(user_id, management_token):
    payload = {
        'roles': [COORD_ROLE_ID]
    }
    headers = {
        'content-type': "application/json",
        'authorization': f"Bearer {management_token}",
        'cache-control': "no-cache"
    }
    r = requests.post(f"https://" + JWT_ACCOUNT + ".auth0.com/api/v2/users/{user_id}/roles", headers=headers, data=json.dumps(payload))
    return r

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