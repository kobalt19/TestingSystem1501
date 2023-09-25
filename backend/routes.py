from fastapi import (
    Body, status
)
from fastapi.responses import JSONResponse
from . import (
    app, engine, session
)
from .__all_models import *


@app.get('/api/user')
def get_all_users():
    res = [user.to_dict() for user in session.query(User).all()]
    return JSONResponse(res)


@app.post('/api/user')
def add_user(body=Body()):
    new_user = User(
        surname=body['surname'],
        name=body['name'],
    )
    session.add(new_user)
    session.commit()
    return JSONResponse(new_user.to_dict())


@app.put('/api/user')
def edit_user(body=Body()):
    user = session.get(User, body['id'])
    if not user:
        return JSONResponse({'error': 'User not found'}, status_code=status.HTTP_404_NOT_FOUND)
    if 'surname' in body:
        user.surname = body['surname']
    if 'name' in body:
        user.name = body['name']
    session.commit()
    return user.to_dict()


@app.delete('/api/user')
def remove_user(body=Body()):
    user = session.get(User, body['id'])
    if not user:
        return JSONResponse({'error': 'User not found'}, status_code=status.HTTP_404_NOT_FOUND)
    session.delete(user)
    session.commit()
    return user.to_dict()
