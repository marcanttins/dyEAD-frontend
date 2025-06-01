<template>
  <nav class="navbar">
    <div class="logo">dyEaD</div>
    <ul class="links">
      <li v-if="isAuthenticated">
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/admin">Admin</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="isAuthenticated">
        <button @click="handleLogout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import authService from '@/services/authService';

const authStore = useAuthStore();
const router = useRouter();

// Verifica se o token está definido (usuário logado)
const isAuthenticated = computed(() => !!authStore.token);

// Verifica se o usuário tem o papel "admin" usando a propriedade "user" da store
const isAdmin = computed(() => authStore.user?.role === 'admin');

async function handleLogout() {
  try {
    await authService.logout();
  } catch (error) {
    console.error('Erro ao efetuar logout:', error);
  } finally {
    authStore.logout();
    router.push('/login');
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
}

.links {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
}

.links a,
.links button {
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}

.links button:hover {
  text-decoration: underline;
}
</style>
