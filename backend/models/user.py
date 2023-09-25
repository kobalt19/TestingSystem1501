import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin
from .. import Base


class User(Base, SerializerMixin):
    __tablename__ = 'users'
    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    username = sa.Column(sa.String, nullable=False)
    password_hash = sa.Column(sa.String, nullable=False)
    admin = sa.Column(sa.Boolean)
