# auth0authorization/utils.py
import json
import jwt
import requests
from django.contrib.auth import authenticate
from dvhrt.settings import JWT_ACCOUNT, JWT_AUTH

def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username

def jwt_decode_token(token):
    print(token)
    header = jwt.get_unverified_header(token)
    jwks = requests.get('https://{}/.well-known/jwks.json'.format(JWT_ACCOUNT + '.auth0.com')).json()
    print(json.dumps(jwks, indent=4, sort_keys=True))
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            print('jwk[kid] == header[kid]')
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))
            print(public_key)

    if public_key is None:
        raise Exception('Public key not found.')

    issuer = 'https://{}/'.format(JWT_ACCOUNT + '.auth0.com')
    jwtdecoded = jwt.decode(token, public_key, audience=JWT_AUTH["JWT_AUDIENCE"], issuer=issuer, algorithms=[JWT_AUTH["JWT_ALGORITHM"]])
    print(f"jwtdecoded: {jwtdecoded}")
    return jwtdecoded