import os
from groq import Groq
from database.models import Message
from fastapi import HTTPException

# Configuration
MODEL_NAME = "openai/gpt-oss-20b"

def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is missing from environment variables.")
    try:
        return Groq(api_key=api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to initialize Groq client: {str(e)}")

async def generate_ai_response(system_prompt: str, conversation_history: list[Message]) -> str:
    """
    Sends the conversation history to the Llama model via Groq API.
    """
    client = get_groq_client()
    
    messages = [{"role": "system", "content": system_prompt}]
    
    # Add history
    for msg in conversation_history:
        messages.append({
            "role": msg.role,
            "content": msg.content
        })
        
    try:
        chat_completion = client.chat.completions.create(
            messages=messages,
            model=MODEL_NAME,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")
