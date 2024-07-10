import { useEffect, useState } from 'react';
import SARList from '../components/SARList';
import SARForm from '../components/SARForm';
import SARDetails from '../components/SARDetails';
import { getSARs, addSAR, updateSAR, deleteSAR, searchSARs } from '../services/sarService';
import { SAR, SARFormData } from '../interfaces/sar.interface';
import ToastNotificationContainer from '../components/ToastNotificationContainer';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';

const Home = () => {
  const [sars, setSars] = useState<SAR[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSar, setEditingSar] = useState<SAR | null>(null);
  const [viewingSar, setViewingSar] = useState<SAR | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [limit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('filed_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchSARs = async (limit: number, offset: number, sortBy: string, sortOrder: 'asc' | 'desc') => {
    console.log('fetching SARs');
    try {
      const response = await getSARs(limit, offset, sortBy, sortOrder);
      setSars(response.data);
      setTotal(response.total);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      fetchSARs(limit, offset, sortBy, sortOrder);
    } else {
      const fetchSearchResults = async (query: string, limit: number, offset: number, sortBy: string, sortOrder: 'asc' | 'desc') => {
        try {
          const response = await searchSARs(query, limit, offset, sortBy, sortOrder);
          setSars(response.data);
          setTotal(response.total);
          setLoading(false);
        } catch (error) {
          setError('Error searching SARs');
          setLoading(false);
        }
      };

      fetchSearchResults(searchQuery, limit, offset, sortBy, sortOrder);
    }
  }, [searchQuery, limit, offset, sortBy, sortOrder]);

  const handleAddSAR = async (newSAR: SARFormData) => {
    try {
      const addedSAR = await addSAR(newSAR);
      setSars([...sars, addedSAR]);
      toast.success('SAR added successfully');
    } catch (error) {
      setError('Error adding SAR');
      toast.error('Failed to add SAR');
    }
  };

  const handleEditSAR = async (updatedSAR: SARFormData) => {
    try {
      if (editingSar) {
        const sarToUpdate: SAR = { ...updatedSAR, id: editingSar.id };
        const updated = await updateSAR(sarToUpdate);
        setSars(sars.map(sar => (sar.id === updated.id ? updated : sar)));
        setEditingSar(null);
        toast.success('SAR updated successfully');
      }
    } catch (error) {
      setError('Error updating SAR');
      toast.error('Failed to update SAR');
    }
  };

  const handleDeleteSAR = async (id: number) => {
    try {
      await deleteSAR(id);
      setSars(sars.filter(sar => sar.id !== id));
      toast.success('SAR deleted successfully');
    } catch (error) {
      setError('Error deleting SAR');
      toast.error('Failed to delete SAR');
    }
  };

  const handleEditButtonClick = (sar: SAR) => {
    setEditingSar(sar);
  };

  const handleViewButtonClick = (sar: SAR) => {
    setViewingSar(sar);
  };

  const handleCloseDetails = () => {
    setViewingSar(null);
  };

  const handleCancelEdit = () => {
    setEditingSar(null);
  };

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <ToastNotificationContainer />
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <img src="/images/an_logo.png" alt="Logo" className="h-10 w-auto mr-4" />
          <h1 className="text-2xl font-bold text-gray-700">Suspicious Activity Reports</h1>
        </div>
        <SARForm onSubmit={editingSar ? handleEditSAR : handleAddSAR} initialData={editingSar} onCancel={handleCancelEdit} />
        <SARList sars={sars} onEdit={handleEditButtonClick} onDelete={handleDeleteSAR} onView={handleViewButtonClick} onSearch={handleSearch} onSort={handleSort} />
        {viewingSar && <SARDetails sar={viewingSar} onClose={handleCloseDetails} />}
        <Pagination total={total} limit={limit} offset={offset} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Home;
