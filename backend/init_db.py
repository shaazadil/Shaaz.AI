import os
import sys

# Add the parent directory to the Python path so we can import from database
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import text
from database.connection import engine, Base
from database.models import User, Conversation, Message

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE conversations ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;"))
        conn.commit()
        
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db()
