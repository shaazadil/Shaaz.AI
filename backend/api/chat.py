from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.chat import ChatRequest, ChatResponse
from schemas.message import MessageCreate
from services.ai_service import generate_ai_response
from services.conversation_service import get_conversation
from services.message_service import get_messages_for_conversation, create_message
from database.connection import get_db

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    # 1. Verify conversation exists
    conversation = get_conversation(db, request.conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
        
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
        
    # 2. Save user message to PostgreSQL
    user_message = MessageCreate(role="user", content=request.message)
    create_message(db, request.conversation_id, user_message)
    
    # 3. Retrieve conversation message history
    history = get_messages_for_conversation(db, request.conversation_id)
    
    # 4 & 5. Call AI Service to get Llama response
    assistant_reply = await generate_ai_response(history)
    
    # 6. Save assistant response to PostgreSQL
    assistant_message = MessageCreate(role="assistant", content=assistant_reply)
    create_message(db, request.conversation_id, assistant_message)
    
    # 7. Return response
    return ChatResponse(reply=assistant_reply)
