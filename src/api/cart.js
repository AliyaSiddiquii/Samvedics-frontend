// frontend/src/api/cart.js
import axios from 'axios';
import { getStoredToken } from './auth';

const API = axios.create({ baseURL: 'http://localhost:5000' });

const getAuthHeader = () => {
    const token = getStoredToken();
    return token ? { headers: { 'x-auth-token': token } } : {};
};

export const getCart = async () => {
    try {
        const response = await API.get('/api/cart', getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateCartQuantity = async (productId, quantity) => {
    try {
        const response = await API.put('/api/cart', { productId, quantity }, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const removeFromCart = async (itemId) => {
    try {
        const response = await API.delete(`/api/cart/${itemId}`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const checkout = async () => {
    try {
        const response = await API.post('/api/cart/checkout', {}, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};