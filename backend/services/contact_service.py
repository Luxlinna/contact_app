import json
from uuid import uuid4
from datetime import datetime
from sqlalchemy.orm import Session
from models.db_models import ContactDB


def _to_dict(contact: ContactDB) -> dict:
    return {
        "id": contact.id,
        "company_name": contact.company_name,
        "first_name": contact.first_name,
        "last_name": contact.last_name,
        "email": contact.email,
        "phone": contact.phone,
        "message_subject": contact.message_subject,
        "working_days": contact.working_days,
        "notes": contact.notes,
        "favorite": contact.favorite,
        "contact_info": contact.contact_info or [],
        "addresses": contact.addresses or [],
        "created_at": contact.created_at,
        "updated_at": contact.updated_at,
    }


def create_contact(db: Session, contact_data):
    db_contact = ContactDB(
        id=str(uuid4()),
        company_name=getattr(contact_data, "company_name", None),
        first_name=contact_data.first_name,
        last_name=contact_data.last_name,
        email=getattr(contact_data, "email", None),
        phone=getattr(contact_data, "phone", None),
        message_subject=getattr(contact_data, "message_subject", None),
        working_days=getattr(contact_data, "working_days", None),
        notes=contact_data.notes,
        favorite=getattr(contact_data, "favorite", False),
        contact_info=[ci.model_dump() for ci in (contact_data.contact_info or [])],
        addresses=[a.model_dump() for a in (contact_data.addresses or [])],
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return _to_dict(db_contact)


def get_contacts(db: Session):
    return [_to_dict(c) for c in db.query(ContactDB).all()]


def get_contact(db: Session, contact_id: str):
    contact = db.query(ContactDB).filter(ContactDB.id == contact_id).first()
    return _to_dict(contact) if contact else None


def update_contact(db: Session, contact_id: str, update_data: dict):
    contact = db.query(ContactDB).filter(ContactDB.id == contact_id).first()
    if not contact:
        return None

    for key, value in update_data.items():
        if key == "contact_info":
            value = [ci if isinstance(ci, dict) else ci.model_dump() for ci in value]
        elif key == "addresses":
            value = [a if isinstance(a, dict) else a.model_dump() for a in value]
        setattr(contact, key, value)

    contact.updated_at = datetime.now()
    db.commit()
    db.refresh(contact)
    return _to_dict(contact)


def delete_contact(db: Session, contact_id: str) -> bool:
    contact = db.query(ContactDB).filter(ContactDB.id == contact_id).first()
    if not contact:
        return False
    db.delete(contact)
    db.commit()
    return True
