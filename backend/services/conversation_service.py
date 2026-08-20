from sqlalchemy.orm import Session
from database.models import Conversation

def get_conversation(db: Session, conversation_id: int) -> Conversation | None:
    """
    Get a conversation by its ID.
    """
    return db.query(Conversation).filter(Conversation.id == conversation_id).first()

def create_conversation(db: Session, title: str = "New Chat") -> Conversation:
    """
    Create a new conversation in the database.
    """
    db_conversation = Conversation(title=title)
    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)
    return db_conversation
