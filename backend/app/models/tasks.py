import sqlalchemy as sa
from sqlalchemy_serializer import SerializerMixin

from ..db_initializer import Base


class Task(Base, SerializerMixin):
    __tablename__ = 'tasks'
    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    question = sa.Column(sa.String, nullable=False)
    right_answer = sa.Column(sa.String, nullable=False)
    type = sa.Column(sa.String, nullable=False)
