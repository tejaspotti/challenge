// validation.ts
import { SARFormData } from '../interfaces/sar.interface';

export const validateSARForm = (formData: SARFormData) => {
  const newErrors: { [key: string]: string } = {};

  if (!formData.filed_date) newErrors.filed_date = 'Date Filed is required';
  if (!formData.amount) newErrors.amount = 'Amount is required';
  if (!formData.bank_name) newErrors.bank_name = 'Bank Name is required';
  if (!formData.bank_address) newErrors.bank_address = 'Bank Address is required';
  if (!formData.suspicious_activity_code) newErrors.suspicious_activity_code = 'Suspicious Activity Code is required';
  if (!formData.agent_narrative) newErrors.agent_narrative = 'Agent\'s Narrative is required';

  formData.entities_involved.forEach((entity, index) => {
    if (!entity.full_name) newErrors[`entities_involved.${index}.full_name`] = 'Full Name is required';
    if (!entity.identification_number) newErrors[`entities_involved.${index}.identification_number`] = 'ID Number is required';
    if (!entity.phone_number) newErrors[`entities_involved.${index}.phone_number`] = 'Phone Number is required';
    if (!entity.date_of_birth) newErrors[`entities_involved.${index}.date_of_birth`] = 'Date of Birth is required';
    if (!entity.email_address) {
      newErrors[`entities_involved.${index}.email_address`] = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(entity.email_address)) {
      newErrors[`entities_involved.${index}.email_address`] = 'Email Address is invalid';
    }
  });

  return newErrors;
};
