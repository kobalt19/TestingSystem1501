from string import (
    ascii_letters, ascii_lowercase, ascii_uppercase, digits
)
from sqlalchemy.orm import Session
from .models.users import User
from .schemas.users import CreateUserSchema


def create_user(session: Session, user: CreateUserSchema) -> User:
    db_user = User(**user.model_dump())
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def is_password_correct(password):
    try:
        assert len(password) >= 8
        assert all(c in (ascii_letters + digits) for c in password)
        assert any(c in ascii_letters for c in password)
        assert any(c in digits for c in password)
        return True
    except AssertionError:
        return False
