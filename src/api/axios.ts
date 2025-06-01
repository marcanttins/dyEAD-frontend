// src/api/axios.ts

import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

/**
 * Cria uma instância do Axios apontando para sua API Flask.
 * Usa VITE_API_URL definido em .env (ou assume fallback).
 * withCredentials=true para enviar o cookie HttpOnly do refresh token.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// --- Interceptor de requisição ---
// Injeta o Bearer token direto da store, sem split()
api.interceptors.request.use(config => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers!['Authorization'] = `Bearer ${auth.token}`
  }
  return config
})

// --- Interceptor de resposta ---
// Tenta refresh em 401; se falhar, faz logout
api.interceptors.response.use(
  response => response,
  async error => {
    const auth = useAuthStore()
    const status = error.response?.status

    if (status === 401) {
      try {
        // renova access_token via cookie HttpOnly
        await auth.refresh()
        // repete a requisição original
        return api.request(error.config)
      } catch {
        // se refresh falhar, limpa estado e redireciona
        await auth.logout()
      }
    }
    return Promise.reject(error)
  }
)

export default api
