import sqlalchemy as sa
from .. import Base


class Task(Base):
    __tablename__ = 'tasks'
    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    text = sa.Column(sa.String, nullable=False)
    right_answer = sa.Column(sa.String, nullable=False)
