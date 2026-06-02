from sqlalchemy import Column, String, Boolean, DateTime, JSON
from sqlalchemy.sql import func
from database.db import Base


class ContactDB(Base):
    __tablename__ = "contacts"

    id = Column(String, primary_key=True, index=True)
    company_name = Column(String, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    message_subject = Column(String, nullable=True)
    working_days = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    favorite = Column(Boolean, default=False)
    contact_info = Column(JSON, default=list)
    addresses = Column(JSON, default=list)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
