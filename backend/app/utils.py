import datetime as dt
from string import (
    ascii_letters, ascii_lowercase, ascii_uppercase, digits
)
from fastapi import (
    Depends, status
)
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import (
    Annotated, Optional
)
from . import SECRET_KEY, ALGORITHM
from .data import (
    create_user, get_user, get_user_tests
)
from .schemas.tests import TestSchema
from .schemas.tokens import TokenData
from .schemas.users import UserRegisterSchema

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')


def check_password(password):
    try:
        assert len(password) >= 8
        assert any(c in ascii_lowercase for c in password)
        assert any(c in ascii_uppercase for c in password)
        assert any(c in digits for c in password)
        assert all(c in ascii_letters + digits for c in password)
        return True
    except AssertionError:
        return False


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(plain_password):
    return pwd_context.hash(plain_password)


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[dt.timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = dt.datetime.utcnow() + expires_delta
    else:
        expire = dt.datetime.utcnow() + dt.timedelta(hours=3)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Ошибка аутентификации!',
        headers={'WWW_Authenticate': 'Bearer'}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


def register(data: UserRegisterSchema):
    if data.password != data.password_again:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Пароли не совпадают!'
        )
    if not check_password(data.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Пароль должен быть длиннее семи символов, содержать минимум одну заглавную и '
                   'минимум одну строчную букву латинского алфавита и минимум одну цифру!'
        )
    hashed_password = get_password_hash(data.password)
    res = create_user(username=data.username, hashed_password=hashed_password)
    if res is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Пользователь с таким именем уже существует!'
        )
    return res


async def get_tests(token):
    user = await get_current_user(token)
    tests = get_user_tests(user.id)
    return [TestSchema.model_validate(test) for test in tests]
