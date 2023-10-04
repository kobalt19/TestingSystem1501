from dotenv import load_dotenv
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
