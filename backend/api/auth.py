from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas.auth import RegisterRequest, RegisterResponse
from services import auth_service

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """
    Register a new user account with username, email, and password.
    """
    return auth_service.register_user(db, request)
