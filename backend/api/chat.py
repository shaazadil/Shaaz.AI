from fastapi import APIRouter
from schemas.chat import ChatRequest, ChatResponse
from services.ai_service import get_chat_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    reply = await get_chat_response(request.message)
    return ChatResponse(reply=reply)
