from database.connection import engine
from sqlalchemy import text

def test_connection():
    try:
        # Try to establish a connection and run a simple query
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 'PostgreSQL connection successful!'"))
            print(result.scalar())
    except Exception as e:
        print(f"Failed to connect to the database. Error: {e}")

if __name__ == "__main__":
    test_connection()
