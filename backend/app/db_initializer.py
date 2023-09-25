import os
from typing import Optional
from sqlalchemy import create_engine
from sqlalchemy.orm import (
    sessionmaker, declarative_base
)

DATABASE_URL = (f'sqlite:///{os.path.join(os.path.abspath(os.path.dirname(os.path.dirname(__file__))), "database", "app.db")}'
                '?check_same_thread=False')

engine = create_engine(DATABASE_URL, echo=True, future=True)
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

try:
    from .models import __all_models
except ImportError:
    from models import __all_models

Base.metadata.create_all(engine)


def get_db() -> Optional[SessionLocal]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
