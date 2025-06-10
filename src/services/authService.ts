// src/services/authService.ts
import { AxiosResponse } from 'axios'
import apiService from './apiService'

export interface UserPayload {
  id: number
  name: string
  email: string
  role: string
  created_at?: string
  updated_at?: string
}

export interface LoginResponse {
  access_token: string
  user: UserPayload
}

class AuthService {
  /**
   * Faz login e armazena o access_token
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await apiService.post(
      '/auth/login',
      { email, password }
    )
    const { access_token, user } = response.data
    localStorage.setItem('access_token', access_token)
    return { access_token, user }
  }

  /**
   * Renova o access token via HttpOnly refresh token
   */
  async refreshToken(): Promise<string> {
    const response: AxiosResponse<{ access_token: string }> =
      await apiService.post('/refresh')
    const { access_token } = response.data
    localStorage.setItem('access_token', access_token)
    return access_token
  }

  /**
   * Registra novo usuário (Admin painel)
   */
  async register(
    name: string,
    email: string,
    password: string,
    role: string = 'aluno'
  ): Promise<void> {
    await apiService.post('/register', { name, email, password, role })
  }

  /**
   * Inicia fluxo de "esqueci a senha"
   */
  async forgotPassword(email: string): Promise<void> {
    await apiService.post('/forgot-password', { email })
  }

  /**
   * Redefine senha via token de recuperação
   */
  async resetPassword(token: string, password: string): Promise<void> {
    await apiService.post('/reset-password', { token, password })
  }

  /**
   * Logout: revoga no backend e limpa localStorage
   */
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      localStorage.removeItem('access_token')
      delete apiService.defaults.headers.common['Authorization']
    }
  }
}

export default new AuthService()
