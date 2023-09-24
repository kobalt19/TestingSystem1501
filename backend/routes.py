from fastapi import (
    Body, status
)
from fastapi.responses import (
    JSONResponse, RedirectResponse
)
from passlib.hash import sha256_crypt
from backend import (
    app, current_user, session
)
from backend.__all_models import *
from backend.auth.auth_handler import sign_jwt
from backend.utils import is_password_correct

current_user = current_user


@app.get('/api/user')
def get_all_users():
    res = [user.to_dict() for user in session.query(User).all()]
    return JSONResponse(res)


@app.post('/api/user')
def add_user(data=Body()):
    new_user = User(
        username=data['username'],
        password_hash=data['password'],
        admin=data['admin'],
    )
    session.add(new_user)
    session.commit()
    return JSONResponse(new_user.to_dict())


@app.put('/api/user')
def edit_user(data=Body()):
    user = session.get(User, data['id'])
    if not user:
        return JSONResponse({'error': 'User not found'}, status_code=status.HTTP_404_NOT_FOUND)
    if 'username' in data:
        user.username = data['username']
    session.commit()
    return user.to_dict()


@app.delete('/api/user')
def remove_user(data=Body()):
    user = session.get(User, data['id'])
    if not user:
        return JSONResponse({'error': 'User not found'}, status_code=status.HTTP_404_NOT_FOUND)
    session.delete(user)
    session.commit()
    return user.to_dict()


@app.post('/signup')
def signup(data=Body()):
    global current_user
    username = data['username']
    password = data['password']
    if not is_password_correct(password):
        return JSONResponse({'message': 'Bad password'}, status_code=status.HTTP_400_BAD_REQUEST)
    hashed_password = sha256_crypt.hash(password)
    new_user = User(
        username=username,
        password_hash=hashed_password,
        admin=False,
    )
    session.add(new_user)
    session.commit()
    current_user = new_user
    return sign_jwt(new_user.username)
