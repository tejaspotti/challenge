import { useState, useEffect } from 'react';
import { SARFormData } from '../interfaces/sar.interface';
import { SARFormProps } from '../interfaces/sarFormProps.interface';
import { validateSARForm } from '../components/validation';

const SARForm: React.FC<SARFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<SARFormData>({
    filed_date: '',
    amount: 0,
    bank_name: '',
    bank_address: '',
    suspicious_activity_code: '',
    agent_narrative: '',
    entities_involved: [
      { full_name: '', identification_number: '', phone_number: '', date_of_birth: '', email_address: '' },
    ],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEntityChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEntities = [...formData.entities_involved];
    updatedEntities[index] = { ...updatedEntities[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, entities_involved: updatedEntities });
  };

  const addEntity = () => {
    setFormData({
      ...formData,
      entities_involved: [
        ...formData.entities_involved,
        { full_name: '', identification_number: '', phone_number: '', date_of_birth: '', email_address: '' },
      ],
    });
  };

  const removeEntity = (index: number) => {
    if (formData.entities_involved.length > 1) {
      const updatedEntities = formData.entities_involved.filter((_, i) => i !== index);
      setFormData({ ...formData, entities_involved: updatedEntities });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSARForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        filed_date: '',
        amount: 0,
        bank_name: '',
        bank_address: '',
        suspicious_activity_code: '',
        agent_narrative: '',
        entities_involved: [
          { full_name: '', identification_number: '', phone_number: '', date_of_birth: '', email_address: '' },
        ],
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    setFormData({
      filed_date: '',
      amount: 0,
      bank_name: '',
      bank_address: '',
      suspicious_activity_code: '',
      agent_narrative: '',
      entities_involved: [
        { full_name: '', identification_number: '', phone_number: '', date_of_birth: '', email_address: '' },
      ],
    });
    setErrors({});
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-lg font-bold text-gray-700">Date Filed</label>
          <input required={true}
            type="date"
            name="filed_date"
            onChange={handleChange}
            value={formData.filed_date}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.filed_date && <p className="text-red-500 text-sm">{errors.filed_date}</p>}
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">Amount</label>
          <input
            type="tel"
            name="amount"
            onChange={handleChange}
            value={formData.amount}
            placeholder="Please enter the amount in USD with no commas or symbols"
            pattern="[0-9]*"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">Bank Name</label>
          <input
            type="text"
            name="bank_name"
            onChange={handleChange}
            value={formData.bank_name}
            placeholder="Bank Name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.bank_name && <p className="text-red-500 text-sm">{errors.bank_name}</p>}
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">Bank Address</label>
          <input
            type="text"
            name="bank_address"
            onChange={handleChange}
            value={formData.bank_address}
            placeholder="Bank Address"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.bank_address && <p className="text-red-500 text-sm">{errors.bank_address}</p>}
        </div>
        <div>
          <label className="block text-lg font-bold text-gray-700">Suspicious Activity Code</label>
          <select
            name="suspicious_activity_code"
            onChange={handleChange}
            value={formData.suspicious_activity_code}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Activity</option>
            <option value="Structuring">Structuring</option>
            <option value="Money Laundering">Money Laundering</option>
            <option value="Fraud">Fraud</option>
            <option value="Terrorist Financing">Terrorist Financing</option>
            <option value="Insider Trading">Insider Trading</option>
          </select>
          {errors.suspicious_activity_code && <p className="text-red-500 text-sm">{errors.suspicious_activity_code}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-lg font-bold text-gray-700">Agent&apos;s Narrative</label>
          <textarea
            name="agent_narrative"
            onChange={handleChange}
            value={formData.agent_narrative}
            placeholder="Please write in detail about the report you are submitting"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-24"
          ></textarea>
          {errors.agent_narrative && <p className="text-red-500 text-sm">{errors.agent_narrative}</p>}
        </div>
      </div>
      <div>
        <label className="block text-lg font-bold text-gray-700">Entities Involved</label>
        {formData.entities_involved.map((entity, index) => (
          <div key={index} className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter full name of the entity involved"
                  value={entity.full_name}
                  onChange={(e) => handleEntityChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[`entities_involved.${index}.full_name`] && <p className="text-red-500 text-sm">{errors[`entities_involved.${index}.full_name`]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Number</label>
                <input
                  type="text"
                  name="identification_number"
                  placeholder="ID Number"
                  value={entity.identification_number}
                  onChange={(e) => handleEntityChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[`entities_involved.${index}.identification_number`] && <p className="text-red-500 text-sm">{errors[`entities_involved.${index}.identification_number`]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  placeholder="Enter phone number without spaces or symbols"
                  value={entity.phone_number}
                  onChange={(e) => handleEntityChange(index, e)}
                  pattern="[0-9]*"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[`entities_involved.${index}.phone_number`] && (
                  <p className="text-red-500 text-sm">{errors[`entities_involved.${index}.phone_number`]}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  placeholder="Date of Birth"
                  value={entity.date_of_birth}
                  onChange={(e) => handleEntityChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[`entities_involved.${index}.date_of_birth`] && <p className="text-red-500 text-sm">{errors[`entities_involved.${index}.date_of_birth`]}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email_address"
                  placeholder="Enter a valid email address with the format - xyz@example.com"
                  value={entity.email_address}
                  onChange={(e) => handleEntityChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors[`entities_involved.${index}.email_address`] && <p className="text-red-500 text-sm">{errors[`entities_involved.${index}.email_address`]}</p>}
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeEntity(index)}
              className="text-red-600 hover:text-red-900"
            >
              Remove Entity
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addEntity}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        >
          Add Entity
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SARForm;