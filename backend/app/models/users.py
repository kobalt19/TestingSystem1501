from typing import (
    Optional
)
from dotenv import load_dotenv
import jwt
from passlib.hash import sha256_crypt
import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin

try:
    from ..db_initializer import Base
except ImportError:
    import os
    import sys
    sys.path.append(os.path.abspath(os.path.dirname(os.path.dirname(__file__))))
    from db_initializer import Base


class User(Base, SerializerMixin):
    __tablename__ = 'users'
    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    username = sa.Column(sa.String, unique=True, nullable=False)
    password_hash = sa.Column(sa.String, nullable=False)
    is_active = sa.Column(sa.Boolean, default=False)

    @staticmethod
    def get_password_hash(password: str) -> str:
        return sha256_crypt.hash(password)

    def validate_password(self, password: str) -> Optional[dict]:
        if not sha256_crypt.verify(password, self.password_hash):
            return None
        return {
            'access_token': jwt.encode(
                {'username': self.username}, load_dotenv('APP_SECRET_KEY')
            )
        }

    def generate_token(self) -> dict:
        return {
            'access_token': jwt.encode(
                {'username': self.username}, load_dotenv('JWT_SECRET_KEY')
            )
        }
