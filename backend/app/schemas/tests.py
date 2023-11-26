from typing import (
    Dict, List
)
from pydantic import BaseModel


class TestSchema(BaseModel):
    users: List[int]
    questions: List[Dict]
    id: int
    desc: str
