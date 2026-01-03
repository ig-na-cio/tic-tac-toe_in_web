from pydantic import BaseModel
from typing import Optional

class GameCreate(BaseModel):
    nombre: str
    creator_id: int

class GameResponse(BaseModel):
    id: int
    nombre: str
    state: int
    #players: list[int]
    #board: list[list[int]]
    player_x_id: int | None
    player_o_id: int | None
    creator_id: int
    turn: Optional[int]

    class Config:
        from_attributes = True
