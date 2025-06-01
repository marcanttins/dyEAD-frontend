// src/composables/useAuth.ts

import axios from 'axios';
import { useRouter } from 'vue-router';

// Função para realizar o login
export async function handleLogin(email: string, password: string): Promise<{ token: string; role: string; userId: number } | null> {
  try {
    const response = await axios.post('/auth/login', { email, password });
    return {
      token: response.data.access_token,
      role: response.data.role,
      userId: response.data.user_id,
    };
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    alert('Credenciais inválidas. Tente novamente.');
    return null;
  }
}

// Função para realizar o cadastro
export async function handleRegister(name: string, email: string, password: string, role: string): Promise<boolean> {
  try {
    await axios.post('/auth/register', { name, email, password, role });
    alert('Cadastro realizado com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao realizar cadastro:', error);
    alert('Erro ao realizar cadastro. Tente novamente.');
    return false;
  }
}

// Função para solicitar recuperação de senha
export async function handleForgotPassword(email: string): Promise<boolean> {
  try {
    await axios.post('/auth/forgot-password', { email });
    alert('Link de recuperação enviado para seu email.');
    return true;
  } catch (error) {
    console.error('Erro ao solicitar recuperação de senha:', error);
    alert('Erro ao enviar link de recuperação. Tente novamente.');
    return false;
  }
}

// Função para redefinir senha
export async function handleResetPassword(token: string, password: string): Promise<boolean> {
  try {
    await axios.post('/auth/reset-password', { token, password });
    alert('Senha redefinida com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    alert('Erro ao redefinir senha. Tente novamente.');
    return false;
  }
}

// Função para realizar logout
export function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  alert('Logout realizado com sucesso!');
  useRouter().push('/login'); // Redireciona para a página de login
}