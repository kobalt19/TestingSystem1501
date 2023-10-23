from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

server = FastAPI()

SECRET_KEY = 'abefc33302dbc17df7a0e8854f122ceb1ee887b6d4a025e149b9883dcdc02055'
ALGORITHM = 'HS512'
ACCESS_TOKEN_EXPIRE_MINUTES = 180

server.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

from .routes import *
