from sqlalchemy.orm import Session
from database.models import Message
from schemas.message import MessageCreate

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
