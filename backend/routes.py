from sqlalchemy.orm import Session
from . import (
    app, engine
)
from .__all_models import *
from fastapi.responses import JSONResponse


@app.get('/api/check')
def check():
    with Session(engine) as session:
        res = session.query(User).all()
    return JSONResponse(res)
