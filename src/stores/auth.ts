// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api/axios'
import router from '@/router'

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  // --- state ---
  const user  = ref<User | null>(null)
  const token = ref<string | null>(null)

  // --- getters ---
  const isLoggedIn  = computed(() => !!user.value && !!token.value)
  const currentUser = computed(() => user.value)

  // --- actions ---
  function setAuth(u: User | null, accessToken?: string) {
    user.value  = u
    token.value = accessToken ?? null
    if (accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
  }

  async function login(email: string, password: string) {
    const { data } = await api.post('/api/auth/login', { email, password })
    setAuth(data.user, data.access_token)
    router.push({ name: 'dashboard' })
  }

  async function refresh() {
    const { data } = await api.post('/auth/refresh')
    if (data.access_token) {
      token.value = data.access_token
      api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`
    }
  }

async function logout() {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Limpeza consistente
    user.value = null;
    token.value = null;
    delete api.defaults.headers.common['Authorization'];
    
    // Redirecionamento seguro
    router.push({ name: 'login' }).catch(() => {
      window.location.href = '/login'; // Fallback absoluto
    });
  }
}
  return {
    // state
    user,
    token,
    // getters
    isLoggedIn,
    currentUser,
    // actions
    setAuth,
    login,
    refresh,
    logout
  }
})
