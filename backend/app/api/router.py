from fastapi import APIRouter
from app.api.users import router as users_router
from app.api.games import router as games_router

router = APIRouter()
router.include_router(users_router)
router.include_router(games_router)
