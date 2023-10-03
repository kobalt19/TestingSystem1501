from fastapi import (
    Body, Depends, status
)
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import server
from .db_initializer import get_db
from .models.users import User
from .schemas.users import (
    CreateUserSchema, UserSchema
)
from .utils import (
    create_user, is_password_correct
)

__all__ = (
    'register',
)


@server.post('/register')
def register(
        payload: CreateUserSchema = Body(),
        session: Session = Depends(get_db)
):
    password = payload.password_hash
    if not is_password_correct(password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST
        )
    payload.password_hash = User.get_password_hash(password)
    return JSONResponse(create_user(session, payload).to_dict())
