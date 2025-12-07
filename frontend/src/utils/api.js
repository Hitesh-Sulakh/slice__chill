import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'slice_chill_api_key_change_in_production';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (username, email, password) =>
    api.post('/auth/signup', { username, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  // Email verification
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerification: (email) => api.post('/auth/resend-verification', { email }),
  // Password reset
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

export const menuAPI = {
  getAllProducts: () => api.get('/menu'),
  getProductsByCategory: (category) =>
    api.get(`/menu/category/${category}`),
  getProductById: (productId) => api.get(`/menu/${productId}`),
};

export const cartAPI = {
  validateItems: (items) => api.post('/cart', { items }),
};

export const orderAPI = {
  placeOrder: (items, delivery_address) =>
    api.post('/order', { items, delivery_address }),
  getOrderHistory: () => api.get('/order/history'),
  getOrderById: (orderId) => api.get(`/order/${orderId}`),
  updateOrderStatus: (orderId, status) =>
    api.put(`/order/${orderId}`, { status }),
};

export default api;
