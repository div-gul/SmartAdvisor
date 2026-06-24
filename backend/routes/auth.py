import sys
import os
import uuid
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import database
from models import UserInfo

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str = "user"  # "user" | "admin"

class LoginRequest(BaseModel):
    email: str
    password: str

class ProfileUpdateRequest(BaseModel):
    user_id: str
    phone: Optional[str] = None
    age: Optional[str] = None
    occupation: Optional[str] = None
    income: Optional[str] = None
    goals: Optional[str] = None
    risk_tolerance: Optional[str] = None
    address: Optional[str] = None
    pan: Optional[str] = None
    name: Optional[str] = None

class AuthResponse(BaseModel):
    user_id: str
    name: str
    email: str
    role: str
    phone: str
    age: str
    occupation: str
    income: str
    goals: str
    risk_tolerance: str
    address: str
    pan: str

@router.post("/register", response_model=AuthResponse)
async def register(request: RegisterRequest):
    # Check if email exists
    existing = await database.get_user_by_email(request.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    user_id = str(uuid.uuid4())
    await database.save_user(
        user_id=user_id,
        name=request.name,
        email=request.email,
        password=request.password,
        role=request.role
    )
    
    user = await database.get_user(user_id)
    user_dict = dict(user)
    user_dict["user_id"] = user_dict["id"]
    return AuthResponse(**user_dict)

@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest):
    user = await database.get_user_by_email(request.email)
    if not user or user.get("password") != request.password:
        raise HTTPException(status_code=400, detail="Invalid email or password")
        
    user_dict = dict(user)
    user_dict["user_id"] = user_dict["id"]
    return AuthResponse(**user_dict)

@router.post("/profile", response_model=AuthResponse)
async def update_profile(request: ProfileUpdateRequest):
    user = await database.get_user(request.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # Build fields to update
    updates = {}
    for field in ('name', 'phone', 'age', 'occupation', 'income', 'goals', 'risk_tolerance', 'address', 'pan'):
        val = getattr(request, field, None)
        if val is not None:
            updates[field] = val
            
    if updates:
        await database.update_user_profile(request.user_id, **updates)
        
    updated_user = await database.get_user(request.user_id)
    user_dict = dict(updated_user)
    user_dict["user_id"] = user_dict["id"]
    return AuthResponse(**user_dict)
