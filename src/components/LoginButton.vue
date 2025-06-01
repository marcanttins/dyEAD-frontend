<template>
  <button @click="handleClick">{{ isAuthenticated ? 'Logout' : 'Login' }}</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // Importa a função computed
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// Usa computed para verificar se o usuário está autenticado
const isAuthenticated = computed(() => !!authStore.token);

function handleClick() {
  if (isAuthenticated.value) {
    authStore.logout(); // Desloga o usuário
    router.push('/login'); // Redireciona para a página de login
  } else {
    router.push('/login'); // Redireciona para a página de login
  }
}
</script>

<style scoped>
button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #35495e;
}
</style>