import datetime as dt
from typing import Annotated
from fastapi import (
    Body, Depends, status
)
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from . import (
    server, ACCESS_TOKEN_EXPIRE_MINUTES
)
from .data import *
from .schemas.users import UserRegisterSchema
from .utils import (
    authenticate_user, create_access_token, get_current_user, register
)

__all__ = [
    'all_tests',
    'login_for_access_token',
    'register_user'
]


@server.get('/all_tests')
def all_tests():
    tests = get_all_tests()
    return JSONResponse(tests)


@server.post('/token')
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Неправильное имя пользователя или пароль!',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token_expires = dt.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={'sub': user.username}, expires_delta=access_token_expires)
    return JSONResponse({'access_token': access_token, 'token_type': 'bearer'})


@server.post('/register')
def register_user(form_data: UserRegisterSchema):
    user = register(form_data)
    return JSONResponse(user)


@server.get('/current_user')
async def current_user(token: str = ''):
    if not str:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='No token parameter!'
        )
    res = await get_current_user(token)
    return JSONResponse(res.model_dump())
