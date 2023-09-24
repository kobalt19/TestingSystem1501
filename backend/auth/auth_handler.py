import time
from typing import Dict

import jwt
from decouple import config

JWT_SECRET_KEY = config('SECRET_KEY')
JWT_ALGORITHM = config('ALGORITHM')


def token_response(token: str):
    return {
        'access_token': token
    }


def sign_jwt(username: str) -> Dict[str, str]:
    payload = {
        'user_id': username,
        'expires': time.time() + 900
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return token_response(token)


def decode_jwt(token: str) -> Dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET_KEY, algoritms=(JWT_ALGORITHM,))
        return decoded_token if decoded_token['expires'] >= time.time() else None
    except Exception:
        return {}
