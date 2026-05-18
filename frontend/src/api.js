import axios from 'axios';

const rawBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const normalizedBase = rawBase.replace(/\/+$/'g, '');
const API_URL = normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('employee_perf_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const signup = (payload) => axios.post(`${API_URL}/auth/signup`, payload);
export const login = (payload) => axios.post(`${API_URL}/auth/login`, payload);
export const fetchEmployees = () => axios.get(`${API_URL}/employees`, { headers: getAuthHeaders() });
export const searchEmployees = (params) => axios.get(`${API_URL}/employees/search`, { params, headers: getAuthHeaders() });
export const addEmployee = (payload) => axios.post(`${API_URL}/employees`, payload, { headers: getAuthHeaders() });
export const updateEmployee = (id, payload) => axios.put(`${API_URL}/employees/${id}`, payload, { headers: getAuthHeaders() });
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}`, { headers: getAuthHeaders() });
export const getAIRecommendation = (employees) => axios.post(`${API_URL}/ai/recommend`, { employees }, { headers: getAuthHeaders() });
