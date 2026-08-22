from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import chat, conversations, auth

app = FastAPI(
    title="Shaaz AI API",
    description="Backend API for Shaaz AI",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")
app.include_router(conversations.router, prefix="/api")
app.include_router(auth.router, prefix="/api")

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "service": "Shaaz AI backend"
    }
