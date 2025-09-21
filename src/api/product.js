import axios from 'axios';
import { getStoredToken } from './auth.js';

const API = axios.create({ baseURL: 'http://localhost:5000' });

const getAuthHeader = () => {
  const token = getStoredToken();
  return token ? { headers: { 'x-auth-token': token } } : {};
};

export const getAllProducts = async () => {
  try {
    const response = await API.get('/api/products');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await API.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error('Failed to fetch product.');
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await API.post('/api/products', productData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await API.put(`/api/products/${id}`, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await API.delete(`/api/products/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await API.post('/api/cart', { productId, quantity }, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};