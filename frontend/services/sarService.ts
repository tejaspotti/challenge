import axios from 'axios';
import { SAR, SARFormData } from '../interfaces/sar.interface';

const BASE_URL = 'http://localhost:5001/api/v1';

interface SARResponse {
  data: SAR[];
  total: number;
}

export const getSARs = async (limit: number, offset: number, sortBy: string, sortOrder: 'asc' | 'desc'): Promise<SARResponse> => {
  try {
    const response = await axios.get<SARResponse>(`${BASE_URL}/sar`, {
      params: { limit, offset, sort_by: sortBy, sort_order: sortOrder }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching SARs');
  }
};

export const addSAR = async (newSAR: SARFormData): Promise<SAR> => {
  try {
    const response = await axios.post(`${BASE_URL}/sar`, newSAR);
    return response.data;
  } catch (error) {
    throw new Error('Error adding SAR');
  }
};

export const updateSAR = async (updatedSAR: SAR): Promise<SAR> => {
  try {
    const response = await axios.put(`${BASE_URL}/sar/${updatedSAR.id}`, updatedSAR);
    return response.data;
  } catch (error) {
    throw new Error('Error updating SAR');
  }
};

export const deleteSAR = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/sar/${id}`);
  } catch (error) {
    throw new Error('Error deleting SAR');
  }
};

export const searchSARs = async (query: string, limit: number, offset: number, sortBy: string, sortOrder: 'asc' | 'desc'): Promise<SARResponse> => {
  try {
    const response = await axios.get<SARResponse>(`${BASE_URL}/sar/search`, {
      params: { query, limit, offset, sort_by: sortBy, sort_order: sortOrder }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error searching SARs');
  }
};