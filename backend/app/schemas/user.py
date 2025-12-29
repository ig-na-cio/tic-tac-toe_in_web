from pydantic import BaseModel

class UserCreate(BaseModel):
    nombre: str

class UserResponse(BaseModel):
    id: int
    nombre: str

    class Config:
        from_attributes = True