from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.game import Game
from app.models.user import User
from app.schemas.game import GameCreate, GameResponse
from app.core.database import SessionLocal
from app.api.ws import manager

import random

router = APIRouter(prefix="/games", tags=["games"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE GAME
@router.post("/", response_model=GameResponse)
def create_game(game: GameCreate, db: Session = Depends(get_db)):
    print("Creating game by user (id): " + str(game.creator_id))
    new_game = Game(
        nombre=game.nombre,
        creator_id=game.creator_id,
        player_x_id=game.creator_id,
        state=1
    )
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game


# LIST AVAILABLE GAMES
@router.get("/available", response_model=list[GameResponse])
def get_available_games(db: Session = Depends(get_db)):
    return (
        db.query(Game)
        .filter(Game.state == 1)
        .filter(Game.player_o_id == None)
        .all()
    )

# READ ALL GAMES
@router.get("/", response_model=list[GameResponse])
def get_games(db: Session = Depends(get_db)):
    return db.query(Game).all()


# READ ONE GAME
@router.get("/{game_id}", response_model=GameResponse)
def get_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Juego no encontrado")
    return game

# DELETE GAME
@router.delete("/{game_id}")
def delete_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Juego no encontrado")

    db.delete(game)
    db.commit()
    return {"message": "Juego eliminado"}


# START GAME
@router.put("/{game_id}/start", response_model=GameResponse)
async def start_game(game_id: int, user_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Juego no encontrado")

    if game.creator_id != user_id:
        raise HTTPException(status_code=403, detail="Solo el creador puede iniciar el juego")

    if game.player_o_id is None:
        raise HTTPException(status_code=400, detail="Falta un jugador")

    if game.state != 1:
        raise HTTPException(status_code=400, detail="El juego ya ha comenzado")
    
    game.state = 2  # InGame
    turn = random.choice([0, 1])
    game.turn = turn
    db.commit()

    await manager.broadcast(game.id, {
        "type": "game_started",
        "game_id": game.id
    })

    db.refresh(game)
    return game

# JOIN GAME
@router.put("/{game_id}/join", response_model=GameResponse)
async def join_game(game_id: int, user_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()

    if not game:
        raise HTTPException(status_code=404, detail="Juego no encontrado")

    if game.state != 1:
        raise HTTPException(status_code=400, detail="El juego no está en lobby")

    if game.player_o_id is not None:
        raise HTTPException(status_code=400, detail="El juego ya tiene dos jugadores")

    if user_id == game.player_x_id:
        raise HTTPException(status_code=400, detail="El creador no puede unirse como O")

    game.player_o_id = user_id
    db.commit()

    await manager.broadcast(game.id, {
        "type": "player_joined",
        "player_o_id": user_id
    })

    db.refresh(game)
    return game

@router.get("/available", response_model=list[GameResponse])
async def get_available_games(db: Session = Depends(get_db)):

    await manager.broadcast(game.id, {
        "type": "game_started",
        "game_id": game.id
    })

    return (
        db.query(Game)
        .filter(Game.state == 1)
        .filter(Game.player_o_id == None)
        .all()
    )