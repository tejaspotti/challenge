from pydantic import BaseModel, EmailStr, ValidationError, field_validator
from typing import List
from datetime import date
from enum import Enum

class SuspiciousActivityCode(str, Enum):
    STRUCTURING = "Structuring"
    MONEY_LAUNDERING = "Money Laundering"
    FRAUD = "Fraud"
    TERRORIST_FINANCING = "Terrorist Financing"
    INSIDER_TRADING = "Insider Trading"

class EntityModel(BaseModel):
    full_name: str
    identification_number: str
    phone_number: str
    date_of_birth: date
    email_address: EmailStr

class SARModel(BaseModel):
    filed_date: date
    amount: float
    bank_name: str
    bank_address: str
    suspicious_activity_code: SuspiciousActivityCode
    agent_narrative: str
    entities_involved: List[EntityModel]

    @field_validator('amount')
    def amount_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Amount must be positive')
        return v
