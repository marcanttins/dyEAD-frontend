// src/services/apiService.ts
import axios from 'axios';
import AuthService from './authService';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Envia cookies HttpOnly (refresh_token) em todas as requisições
api.defaults.withCredentials = true;

// Interceptor de request para injetar access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de response para retry com refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Tratamento específico para erro 401 (não autorizado)
    if (error.response?.status === 401) {
      if (!originalRequest._retry && originalRequest.url !== '/auth/logout') {
        originalRequest._retry = true;
        try {
          const newToken = await AuthService.refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Logout forçado em caso de falha no refresh
          await AuthService.logout();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // Se já tentamos refresh ou é uma requisição de logout
        await AuthService.logout();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
