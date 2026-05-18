import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeRegistrationForm from '../components/EmployeeRegistrationForm';
import EmployeeListPage from '../components/EmployeeListPage';
import SearchFilter from '../components/SearchFilter';
import AIRecommendationPage from '../components/AIRecommendationPage';
import { addEmployee, deleteEmployee, fetchEmployees, getAIRecommendation, searchEmployees } from '../api';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [recommendation, setRecommendation] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadEmployees();
  }, [user]);

  const loadEmployees = async () => {
    try {
      const { data } = await fetchEmployees();
      setEmployees(data);
    } catch (err) {
      setStatus('Unable to fetch employees');
    }
  };

  const handleAdd = async (payload) => {
    try {
      setStatus('Adding employee...');
      const { data } = await addEmployee(payload);
      setEmployees((prev) => [data, ...prev]);
      setStatus('Employee added successfully');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Add failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      setStatus('Employee deleted');
    } catch (err) {
      setStatus('Delete failed');
    }
  };

  const handleSearch = async (filters) => {
    try {
      const { data } = await searchEmployees(filters);
      setEmployees(data);
    } catch (err) {
      setStatus('Search failed');
    }
  };

  const handleAI = async () => {
    try {
      setStatus('Generating AI recommendation...');
      const { data } = await getAIRecommendation(employees);
      setRecommendation(data.recommendation);
      setStatus('AI recommendation ready');
    } catch (err) {
      setStatus(err.response?.data?.message || 'AI request failed');
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="wide-col">
        <EmployeeRegistrationForm onSubmit={handleAdd} />
        <SearchFilter onSearch={handleSearch} />
      </div>
      <div className="wide-col">
        <EmployeeListPage employees={employees} onDelete={handleDelete} />
        <button className="button full" onClick={handleAI} disabled={employees.length === 0}>
          Generate AI Recommendation
        </button>
        <AIRecommendationPage recommendation={recommendation} />
      </div>
      {status && <div className="status-banner">{status}</div>}
    </div>
  );
}
