from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    conversation_id: int

class ChatResponse(BaseModel):
    reply: str
