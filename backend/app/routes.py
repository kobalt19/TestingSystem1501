from datetime import timedelta
from typing import Annotated
from fastapi import (
    Depends, HTTPException, status
)
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from . import server
from .db_initializer import get_db
from .schemas.users import (
    UserRegisterSchema
)
from .schemas.tokens import Token
from .utils import (
    authenticate_user, create_access_token, create_user, is_password_correct
)

__all__ = (
    'register',
    'login_for_access_token'
)

TOKEN_EXPIRE_MINUTES = 180


@server.post('/register', response_model=Token)
def register(form_data: UserRegisterSchema, session=get_db()):
    if form_data.password != form_data.password_again:
        print('banan')
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Passwords does not match',
            headers={'WWW_Authenticate': 'Bearer'}
        )
    user = create_user(session, form_data.username, form_data.password)
    if not user:
        print('banan4ik')
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Bad password',
            headers={'WWW_Authenticate': 'Bearer'}
        )
    access_token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'sub': user.username}, expires_delta=access_token_expires
    )
    return JSONResponse({'access-token': access_token, 'token-type': 'bearer'})


@server.post('/token', response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session=get_db()):
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token_expires = timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'sub': user.username}, expires_delta=access_token_expires
    )
    return JSONResponse({'access_token': access_token, 'token-type': 'bearer'})
