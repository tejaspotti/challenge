import React, { useState } from 'react';
import { SARListProps } from '../interfaces/sarListProps.interface';

const SARList: React.FC<SARListProps> = ({ sars = [], onEdit, onDelete, onView, onSearch, onSort }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('filed_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSort = (field: string) => {
    const newSortOrder = (sortBy === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newSortOrder);
    onSort(field, newSortOrder);
  };

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('filed_date')}>
              Date Filed
              {sortBy === 'filed_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('amount')}>
              Amount
              {sortBy === 'amount' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('bank_name')}>
              Bank Name
              {sortBy === 'bank_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sars.map((sar) => (
            <tr key={sar.id}>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{sar.filed_date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{sar.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">{sar.bank_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                <div className="flex justify-center space-x-4">
                  <button onClick={() => onView(sar)} className="text-indigo-600 hover:text-indigo-900">View</button>
                  <button onClick={() => onEdit(sar)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDelete(sar.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SARList;
