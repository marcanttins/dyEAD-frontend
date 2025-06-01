<template>
    <div v-if="loading">Carregando...</div>
    <div v-else-if="!isAuthenticated">
      <p>Você não está autorizado a acessar esta página.</p>
      <router-link to="/login">Faça login aqui</router-link>
    </div>
    <div v-else>
      <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const loading = ref(true);
  const isAuthenticated = computed(() => !!authStore.token);
  
  onMounted(async () => {
    // Simula um delay para verificar a autenticação
    await new Promise((resolve) => setTimeout(resolve, 500));
    loading.value = false;
  });
  </script>