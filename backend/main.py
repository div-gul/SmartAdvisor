import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

sys.path.append(os.path.dirname(__file__))

from database import init_db, get_all_leads
from routes import chat, leadscore, recommend, predict, followup, auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB schema
    await init_db()
    yield

app = FastAPI(
    title="SmartAdvisor Multi-Agent Platform",
    description="5 AI agents (Research, Qualification, Strategy supervisor, Sales, Follow-up) for banking customer acquisition",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware for React Vite app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(leadscore.router)
app.include_router(recommend.router)
app.include_router(predict.router)
app.include_router(followup.router)

@app.get("/")
async def root():
    return {
        "status": "SmartAdvisor Multi-Agent Platform is running",
        "agents": ["research", "qualification", "strategy", "sales", "followup"],
        "endpoints": ["/chat", "/leadscore", "/recommend", "/predict", "/followup"]
    }

@app.get("/leads")
async def get_leads_dashboard():
    leads = await get_all_leads()
    return {"leads": leads}

@app.get("/health")
async def health():
    return {"status": "healthy"}
