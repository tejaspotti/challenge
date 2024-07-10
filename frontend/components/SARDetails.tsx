import React from 'react';
import { SARDetailsProps } from '../interfaces/sarDetailsProps.interface';

const SARDetails: React.FC<SARDetailsProps> = ({ sar, onClose }) => {
  if (!sar) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">SAR Details</h2>
        <p><strong>Date Filed:</strong> {sar.filed_date}</p>
        <p><strong>Amount:</strong> {sar.amount}</p>
        <p><strong>Bank Name:</strong> {sar.bank_name}</p>
        <p><strong>Bank Address:</strong> {sar.bank_address}</p>
        <p><strong>Suspicious Activity Code:</strong> {sar.suspicious_activity_code}</p>
        <p><strong>Agent&apos;s Narrative:</strong> {sar.agent_narrative}</p>
        <h3 className="text-xl font-bold mt-4">Entities Involved</h3>
        {sar.entities_involved.map((entity, index) => (
          <div key={index} className="mt-2">
            <p><strong>Full Name:</strong> {entity.full_name}</p>
            <p><strong>ID Number:</strong> {entity.identification_number}</p>
            <p><strong>Phone Number:</strong> {entity.phone_number}</p>
            <p><strong>Date of Birth:</strong> {entity.date_of_birth}</p>
            <p><strong>Email Address:</strong> {entity.email_address}</p>
            {index < sar.entities_involved.length - 1 && <hr className="my-4" />} {/* Separator */}
          </div>
        ))}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Close</button>
      </div>
    </div>
  );
};

export default SARDetails;
