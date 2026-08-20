from sqlalchemy.orm import Session
from database.models import Conversation
from schemas.conversation import ConversationUpdate

def get_conversation(db: Session, conversation_id: int) -> Conversation | None:
    """
    Get a conversation by its ID.
    """
    return db.query(Conversation).filter(Conversation.id == conversation_id).first()

def get_all_conversations(db: Session) -> list[Conversation]:
    """
    Get all conversations, ordered by the most recently updated.
    """
    return db.query(Conversation).order_by(Conversation.updated_at.desc()).all()

def create_conversation(db: Session, title: str = "New Chat") -> Conversation:
    """
    Create a new conversation in the database.
    """
    db_conversation = Conversation(title=title)
    db.add(db_conversation)
    db.commit()
    db.refresh(db_conversation)
    return db_conversation

def update_conversation(db: Session, db_conversation: Conversation, conversation_update: ConversationUpdate) -> Conversation:
    """
    Update a conversation in the database.
    """
    db_conversation.title = conversation_update.title
    db.commit()
    db.refresh(db_conversation)
    return db_conversation

def delete_conversation(db: Session, db_conversation: Conversation) -> None:
    """
    Delete a conversation from the database.
    """
    db.delete(db_conversation)
    db.commit()
