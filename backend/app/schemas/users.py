from pydantic import (
    BaseModel, Field
)


class UserBaseSchema(BaseModel):
    username: str


class CreateUserSchema(UserBaseSchema):
    password_hash: str = Field(alias='password')


class UserSchema(UserBaseSchema):
    id: int
    is_active: bool = Field(default=False)

    class Config:
        from_attributes = True


class UserRegisterSchema(UserBaseSchema):
    password: str
    password_again: str
