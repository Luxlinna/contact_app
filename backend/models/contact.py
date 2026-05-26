from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4


class ContactInfo(BaseModel):
    type: str
    value: str


class Address(BaseModel):
    type: str
    street: str
    street_2: Optional[str] = None
    city: str
    region: Optional[str] = None
    postal_code: Optional[str] = None
    country: str


class ContactCreate(BaseModel):
    company_name: Optional[str] = None
    first_name: str
    last_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    message_subject: Optional[str] = None
    working_days: Optional[str] = None
    notes: Optional[str] = None
    favorite: bool = False
    contact_info: List[ContactInfo]
    addresses: List[Address]


class ContactUpdate(BaseModel):
    company_name: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    message_subject: Optional[str] = None
    working_days: Optional[str] = None
    notes: Optional[str] = None
    favorite: Optional[bool] = None
    contact_info: Optional[List[ContactInfo]] = None
    addresses: Optional[List[Address]] = None


class ContactResponse(BaseModel):
    id: UUID
    company_name: Optional[str]
    first_name: str
    last_name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    message_subject: Optional[str]
    working_days: Optional[str]
    notes: Optional[str]
    favorite: bool
    contact_info: List[ContactInfo]
    addresses: List[Address]
    created_at: datetime
    updated_at: datetime


class Contact(ContactResponse):
    pass
