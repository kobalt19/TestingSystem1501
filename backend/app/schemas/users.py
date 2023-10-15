from pydantic import (
    BaseModel, Field
)


class UserBaseSchema(BaseModel):
    username: str


class UserLoginSchema(UserBaseSchema):
    password: str


class UserRegisterSchema(UserLoginSchema):
    password_again: str


class UserFullSchema(UserBaseSchema):
    id: int
    password_hash: str
