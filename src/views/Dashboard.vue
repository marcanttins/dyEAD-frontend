<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <h1 class="text-3xl font-bold mb-6">Bem-vindo, {{ userName }}</h1>
    <!-- Informações do dashboard podem ser inseridas aqui -->
    <div class="w-full max-w-4xl bg-white p-6 rounded shadow">
      <p class="text-gray-700">
        Aqui você pode ver seu progresso, cursos, notificações e outras informações.
      </p>
    </div>
    <button
      @click="handleLogout"
      class="mt-8 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import authService from '@/services/authService';

const router = useRouter();
const authStore = useAuthStore();

const userName = computed(() => authStore.user?.name || 'Visitante');

const handleLogout = async () => {
  try {
    // Aguarda a execução do logout (se retornar uma Promise)
    await authService.logout();
    // Limpa os dados de autenticação usando o método logout da store
    authStore.logout();
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>
