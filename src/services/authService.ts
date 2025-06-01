// src/services/authService.ts
import apiService from './apiService';

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserPayload;
}

class AuthService {
  /**
   * Realiza o login do usuário.
   * O refresh token será armazenado em cookie HttpOnly pelo backend.
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiService.post<LoginResponse>('/auth/login', { email, password });
    // ou apenas os dados:
    const { access_token, user } = response.data;
    localStorage.setItem('access_token', access_token);
    return { access_token, user };
  }

  /**
   * Renova o access token usando o refresh token em cookie HttpOnly.
   */
  async refreshToken(): Promise<string> {
    const response = await apiService.post<{ access_token: string }>('/refresh');
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
    return access_token;
  }

  /**
   * Registra um novo usuário.
   */
  async register(
    name: string,
    email: string,
    password: string,
    role: string = 'aluno'
  ): Promise<any> {
    const response = await apiService.post('/register', { name, email, password, role });
    return response.data;
  }

  /**
   * Inicia o fluxo de recuperação de senha.
   */
  async forgotPassword(email: string): Promise<any> {
    const response = await apiService.post('/forgot-password', { email });
    return response.data;
  }

  /**
   * Redefine a senha utilizando o token de recuperação.
   */
  async resetPassword(token: string, password: string): Promise<any> {
    const response = await apiService.post('/reset-password', { token, password });
    return response.data;
  }

  /**
   * Efetua o logout:
   * - Revoga o access token no backend;
   * - Remove o cookie de refresh (feito pelo backend);
   * - Remove o access token do localStorage.
   */
async logout(): Promise<void> {
  try {
    await apiService.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed:', error);
    // Não rejeitamos para garantir a limpeza local mesmo com falha no servidor
  } finally {
    // Limpeza garantida
    localStorage.removeItem('access_token');
    // Remove o token do axios
    delete apiService.defaults.headers.common['Authorization'];
  }
}}


export default new AuthService();

