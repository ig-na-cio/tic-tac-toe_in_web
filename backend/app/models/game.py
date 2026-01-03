from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base

class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True, index=True)

    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    player_x_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    player_o_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    state = Column(Integer, default=1)  # 1=Lobby, 2=InGame, 3=Finished
    turn = Column(Integer, nullable=True)  # 0=X, 1=O
