// src/composables/useApi.ts

import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL base do backend
  timeout: 10000, // Timeout de 10 segundos
});

// Interceptador de requisições: adiciona token JWT ao header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Ou usePinia para acessar o estado global
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptador de respostas: trata erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('Sessão expirada. Faça login novamente.');
      localStorage.removeItem('token'); // Limpa o token
    } else if (error.response?.status === 403) {
      alert('Você não tem permissão para acessar este recurso.');
    }
    return Promise.reject(error);
  }
);

// Função para fazer chamadas genéricas à API
export async function fetchApi<T>(url: string, options: object = {}): Promise<T | null> {
  try {
    const response = await api(url, options);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer requisição à API:', error);
    return null;
  }
}

// Função específica para recomendações
export async function fetchRecommendations(userId: number): Promise<string[] | null> {
  return fetchApi<string[]>(`/recommendations`, { method: 'POST', data: { user_id: userId } });
}

// Função específica para buscar cursos
export async function fetchCourses(): Promise<any[] | null> {
  return fetchApi<any[]>('/courses');
}

// Função específica para buscar detalhes de um curso
export async function fetchCourseDetails(courseId: number): Promise<any | null> {
  return fetchApi<any>(`/courses/${courseId}`);
}