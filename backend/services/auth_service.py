import os
# pyrefly: ignore [missing-import]
import bcrypt
from datetime import datetime, timedelta
from jose import jwt
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from database.models import User
from schemas.auth import RegisterRequest

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_secret")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
def hash_password(password: str) -> str:
    """
    Hashes a plain-text password using bcrypt.
    """
    password_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_bytes = bcrypt.hashpw(password_bytes, salt)
    return hashed_bytes.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plain-text password against a hashed bcrypt password string.
    """
    password_bytes = plain_password.encode('utf-8')
    hashed_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_bytes)

def register_user(db: Session, request: RegisterRequest) -> User:
    """
    Registers a new user after verifying that the email does not already exist.
    Stores only the hashed password in PostgreSQL.
    """
    # 1. Check if email already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
    
    # 2. Hash the password
    password_hash = hash_password(request.password)
    
    # 3. Create user instance (storing ONLY the password hash)
    user = User(
        username=request.username,
        email=request.email,
        hashed_password=password_hash
    )
    
    # 4. Save to PostgreSQL
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return user

def authenticate_user(db: Session, email: str, password: str) -> User:
    """
    Authenticates a user by email and password.
    Returns the user if valid, otherwise raises a generic 401 HTTP exception.
    """
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Inactive user",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

def create_access_token(data: dict) -> str:
    """
    Creates a JWT access token containing the provided claims.
    Automatically sets the expiration timestamp (exp).
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
