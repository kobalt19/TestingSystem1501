import os
from fastapi import FastAPI
from sqlalchemy import (
    create_engine, MetaData
)
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI()
DATABASE_URI = 'sqlite:///app.db?check_same_thread=False'
print(DATABASE_URI)

engine = create_engine(
    DATABASE_URI
)

metadata = MetaData(bind=engine)

Base = declarative_base(metadata=metadata)

from .__all_models import *

Base.metadata.create_all(engine)

from .routes import *
