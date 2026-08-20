from sqlalchemy.orm import Session
from database.models import Message
from schemas.message import MessageCreate

def get_messages_for_conversation(db: Session, conversation_id: int) -> list[Message]:
    """
    Get all messages for a specific conversation, ordered by creation time.
    """
    return db.query(Message).filter(Message.conversation_id == conversation_id).order_by(Message.created_at.asc()).all()

def create_message(db: Session, conversation_id: int, message: MessageCreate) -> Message:
    """
    Create a new message in the database for a specific conversation.
    """
    db_message = Message(
        conversation_id=conversation_id,
        role=message.role,
        content=message.content
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
