from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.conversation import ConversationResponse, ConversationUpdate
from schemas.message import MessageCreate, MessageResponse
from services import conversation_service, message_service

router = APIRouter(
    prefix="/conversations",
    tags=["conversations"]
)

@router.get("", response_model=List[ConversationResponse])
def get_conversations(db: Session = Depends(get_db)):
    """
    Get all conversations.
    """
    return conversation_service.get_all_conversations(db)

@router.post("", response_model=ConversationResponse)
def create_conversation(db: Session = Depends(get_db)):
    """
    Create a new conversation with a default title.
    """
    return conversation_service.create_conversation(db)

@router.patch("/{conversation_id}", response_model=ConversationResponse)
def update_conversation(conversation_id: int, conversation_update: ConversationUpdate, db: Session = Depends(get_db)):
    """
    Update a conversation's title.
    """
    conversation = conversation_service.get_conversation(db, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return conversation_service.update_conversation(db, conversation, conversation_update)

@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_conversation(conversation_id: int, db: Session = Depends(get_db)):
    """
    Delete a conversation and all its messages.
    """
    conversation = conversation_service.get_conversation(db, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    conversation_service.delete_conversation(db, conversation)
    return

@router.get("/{conversation_id}/messages", response_model=List[MessageResponse])
def get_messages(conversation_id: int, db: Session = Depends(get_db)):
    """
    Get all messages for a specific conversation.
    """
    # Verify that the conversation exists
    conversation = conversation_service.get_conversation(db, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return message_service.get_messages_for_conversation(db, conversation_id)

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
