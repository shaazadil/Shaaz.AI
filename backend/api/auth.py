from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas.auth import RegisterRequest, RegisterResponse, LoginRequest, TokenResponse
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

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate user and return a JWT token.
    """
    user = auth_service.authenticate_user(db, request.email, request.password)
    access_token = auth_service.create_access_token(data={"sub": str(user.id)})
    return TokenResponse(access_token=access_token, token_type="bearer")
