import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const setStoredToken = (token) => localStorage.setItem('token', token);
export const getStoredToken = () => localStorage.getItem('token');
export const removeStoredToken = () => localStorage.removeItem('token');

export const registerUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await API.post('/api/auth/login', userData);
    const { token, user } = response.data;
    setStoredToken(token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};