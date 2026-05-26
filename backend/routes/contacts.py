from fastapi import APIRouter, HTTPException
from models.contact import ContactCreate, ContactUpdate, ContactResponse
from services.contact_service import (
    create_contact,
    get_contacts,
    get_contact,
    update_contact,
    delete_contact,
)

router = APIRouter()


@router.post("/contacts", response_model=ContactResponse)
def create_new_contact(contact: ContactCreate):
    return create_contact(contact)


@router.get("/contacts", response_model=list[ContactResponse])
def fetch_contacts():
    return get_contacts()


@router.get("/contacts/{contact_id}", response_model=ContactResponse)
def fetch_contact(contact_id: str):
    contact = get_contact(contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.put("/contacts/{contact_id}", response_model=ContactResponse)
def update_existing_contact(contact_id: str, updated_data: ContactUpdate):
    update_data = updated_data.model_dump(exclude_unset=True)
    contact = update_contact(contact_id, update_data)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.delete("/contacts/{contact_id}")
def remove_contact(contact_id: str):
    success = delete_contact(contact_id)
    if not success:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}
