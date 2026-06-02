from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.contact import ContactCreate, ContactUpdate, ContactResponse
from services.contact_service import (
    create_contact,
    get_contacts,
    get_contact,
    update_contact,
    delete_contact,
)
from database.db import get_db

router = APIRouter()


@router.post("/contacts", response_model=ContactResponse)
def create_new_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    return create_contact(db, contact)


@router.get("/contacts", response_model=list[ContactResponse])
def fetch_contacts(db: Session = Depends(get_db)):
    return get_contacts(db)


@router.get("/contacts/{contact_id}", response_model=ContactResponse)
def fetch_contact(contact_id: str, db: Session = Depends(get_db)):
    contact = get_contact(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.put("/contacts/{contact_id}", response_model=ContactResponse)
def update_existing_contact(contact_id: str, updated_data: ContactUpdate, db: Session = Depends(get_db)):
    update_data = updated_data.model_dump(exclude_unset=True)
    contact = update_contact(db, contact_id, update_data)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.delete("/contacts/{contact_id}")
def remove_contact(contact_id: str, db: Session = Depends(get_db)):
    success = delete_contact(db, contact_id)
    if not success:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}
