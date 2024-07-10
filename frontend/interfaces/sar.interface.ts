export interface SAR {
    id: number;
    filed_date: string;
    amount: number;
    bank_name: string;
    bank_address: string;
    suspicious_activity_code: string;
    agent_narrative: string;
    entities_involved: {
        full_name: string;
        identification_number: string;
        phone_number: string;
        date_of_birth: string;
        email_address: string;
    }[];
  }

export interface Entity {
    full_name: string;
    identification_number: string;
    phone_number: string;
    date_of_birth: string;
    email_address: string;
  }

export interface SARFormData {
    filed_date: string;
    amount: number;
    bank_name: string;
    bank_address: string;
    suspicious_activity_code: string;
    agent_narrative: string;
    entities_involved: Entity[];
  }