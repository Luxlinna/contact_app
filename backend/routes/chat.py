import uuid
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.db import get_db
from models.db_models import ChatMessage

router = APIRouter()


class ChatMessageCreate(BaseModel):
    visitor_name: str | None = None
    visitor_contact: str | None = None
    message: str


@router.post("/chat/messages")
def receive_message(data: ChatMessageCreate, db: Session = Depends(get_db)):
    msg = ChatMessage(
        id=str(uuid.uuid4()),
        visitor_name=data.visitor_name,
        visitor_contact=data.visitor_contact,
        message=data.message,
    )
    db.add(msg)
    db.commit()
    return {"status": "ok"}


@router.get("/chat/messages")
def list_messages(db: Session = Depends(get_db)):
    return db.query(ChatMessage).order_by(ChatMessage.created_at.desc()).all()
