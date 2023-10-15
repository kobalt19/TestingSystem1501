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
    UserFullSchema, UserLoginSchema, UserRegisterSchema
)
from .schemas.tokens import Token
from .utils import *

__all__ = (
    'register',
)

TOKEN_EXPIRE_MINUTES = 180


@server.post('/register', response_model=UserFullSchema)
def register(form_data: UserRegisterSchema):
    session = get_db()
    user = create_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Bad password',
            headers={'WWW_Authenticate': 'Bearer'}
        )
    return JSONResponse(user.to_dict())


@server.post('/token', response_model=Token)
def route_authenticate_user(form_data: UserLoginSchema):
    session = get_db()
    user = authenticate_user(session, form_data.username, form_data.password)
    inc_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail='Incorrect username or password'
    )
    if not user:
        raise inc_exception
    jwt_token = create_access_token({'sub': user.username})
    return JSONResponse({'access_token': jwt_token, 'token-type': 'bearer'})
