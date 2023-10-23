from pydantic import BaseModel


class UserBaseSchema(BaseModel):
    username: str


class UserRegisterSchema(UserBaseSchema):
    password: str
    password_again: str


class UserFullSchema(UserBaseSchema):
    hashed_password: str
    id: int

