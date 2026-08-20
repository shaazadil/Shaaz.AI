from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.conversation import ConversationResponse
from schemas.message import MessageCreate, MessageResponse
from services import conversation_service, message_service

router = APIRouter(
    prefix="/conversations",
    tags=["conversations"]
)

@router.post("", response_model=ConversationResponse)
def create_conversation(db: Session = Depends(get_db)):
    """
    Create a new conversation with a default title.
    """
    return conversation_service.create_conversation(db)

@router.post("/{conversation_id}/messages", response_model=MessageResponse)
def create_message(conversation_id: int, message: MessageCreate, db: Session = Depends(get_db)):
    """
    Create a new message in a specific conversation.
    """
    # Verify that the conversation exists
    conversation = conversation_service.get_conversation(db, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Create the message
    return message_service.create_message(db, conversation_id, message)
