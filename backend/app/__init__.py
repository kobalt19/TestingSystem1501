from fastapi import FastAPI

server = FastAPI()

from .routes import *
