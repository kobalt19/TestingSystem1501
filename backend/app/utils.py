from datetime import (
    datetime, timedelta
)
import os
from string import (
    ascii_letters, ascii_lowercase, ascii_uppercase, digits
)
import sqlite3
from typing import (
    Annotated, Optional, Union, Any
)
from dotenv import load_dotenv
from fastapi import (
    Depends, status
)
from fastapi.security import OAuth2PasswordBearer
from fastapi.exceptions import HTTPException
from jose import (
    JWTError, jwt
)
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from .models.users import User
from .schemas.tokens import TokenData

__all__ = [
    'create_user',
    'authenticate_user',
    'create_access_token',
    'verify_access_token'
]

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/token')

load_dotenv()
jwt_secret_key = os.getenv('JWT_SECRET_KEY')
algorithm = os.getenv('ALGORITHM')


def create_user(session: Session, username: str, passwd: str) -> Union[User, bool]:
    if not is_password_good(passwd):
        return False
    hashed_passwd = get_password_hash(passwd)
    user = User(
        username=username,
        password_hash=hashed_passwd
    )
    try:
        session.add(user)
    except sqlite3.OperationalError:
        return False
    return user


def authenticate_user(session: Session, username: str, passwd: str) -> Union[User, bool]:
    user: User = session.query(User).filter(User.username == username).one()
    if not user:
        return False
    if not verify_password(passwd, user.password_hash):
        return False
    return user


def get_current_user(session: Session, token: str = Depends(oauth2_scheme)) -> Union[User, bool]:
    decoded_data = verify_access_token(token)
    if not decoded_data:
        return False
    user: User = session.query(User).filter(User.username == decoded_data['sub']).one()
    if not user:
        return False
    return user


def is_password_good(password):
    try:
        assert len(password) >= 8
        assert all(c in (ascii_letters + digits) for c in password)
        assert any(c in ascii_letters for c in password)
        assert any(c in digits for c in password)
        return True
    except AssertionError:
        return False


def verify_password(plain_passwd, hashed_passwd):
    return pwd_context.verify(plain_passwd, hashed_passwd)


def get_password_hash(plain_passwd):
    return pwd_context.hash(plain_passwd)


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, jwt_secret_key, algorithm=algorithm)
    return encoded_jwt


def verify_access_token(token: str) -> Union[dict, bool]:
    try:
        decoded_data = jwt.decode(token, jwt_secret_key, algorithms=[algorithm])
        return decoded_data
    except JWTError:
        return False
