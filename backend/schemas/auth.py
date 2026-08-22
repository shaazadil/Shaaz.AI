from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict

class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class RegisterResponse(BaseModel):
    id: int
    username: Optional[str] = None
    email: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
