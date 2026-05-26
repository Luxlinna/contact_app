from uuid import uuid4
from datetime import datetime
from database.fake_db import contacts_db, save_db


def create_contact(contact_data):
    new_contact = {
        'id': str(uuid4()),
        'company_name': getattr(contact_data, 'company_name', None),
        'first_name': contact_data.first_name,
        'last_name': contact_data.last_name,
        'email': getattr(contact_data, 'email', None),
        'phone': getattr(contact_data, 'phone', None),
        'message_subject': getattr(contact_data, 'message_subject', None),
        'working_days': getattr(contact_data, 'working_days', None),
        'notes': contact_data.notes,
        'favorite': getattr(contact_data, 'favorite', False),
        'contact_info': [ci.model_dump() for ci in (contact_data.contact_info or [])],
        'addresses': [a.model_dump() for a in (contact_data.addresses or [])],
        'created_at': datetime.now().isoformat(),
        'updated_at': datetime.now().isoformat(),
    }
    contacts_db.append(new_contact)
    save_db()
    return new_contact


def get_contacts():
    return contacts_db


def get_contact(contact_id):
    for contact in contacts_db:
        if str(contact['id']) == contact_id:
            return contact
    return None


def update_contact(contact_id, update_data: dict):
    contact = get_contact(contact_id)
    if not contact:
        return None
    for key, value in update_data.items():
        contact[key] = value
    contact['updated_at'] = datetime.now().isoformat()
    save_db()
    return contact


def delete_contact(contact_id):
    for contact in contacts_db:
        if str(contact['id']) == contact_id:
            contacts_db.remove(contact)
            save_db()
            return True
    return False
