// src/services/apiService.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router'
import AuthService from './authService'

interface RetryRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  withCredentials: true, // envia HttpOnly cookies (refresh token)
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig
    const status = error.response?.status
    // caminho sem query string
    const path = originalRequest.url?.split('?')[0] || ''
    // rotas que não devem tentar refresh
    const nonRetry = ['/auth/logout', '/refresh']

    if (status === 401 && !originalRequest._retry && !nonRetry.includes(path)) {
      originalRequest._retry = true
      try {
        const newToken = await AuthService.refreshToken()
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }
        return api(originalRequest)
      } catch {
        await AuthService.logout()
        router.push({ name: 'Login' })
        return Promise.reject(error)
      }
    }

    // Caso já tenha tentado refresh ou seja logout/refresh
    if (status === 401) {
      await AuthService.logout()
      router.push({ name: 'Login' })
    }

    return Promise.reject(error)
  }
)

export default api
