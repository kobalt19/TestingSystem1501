import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin
from .. import Base


class User(Base, SerializerMixin):
    __tablename__ = 'users'
    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    surname = sa.Column(sa.String, nullable=False)
    name = sa.Column(sa.String, nullable=False)
