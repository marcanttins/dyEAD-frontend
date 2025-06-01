<template>
    <button @click="handleLogout">Logout</button>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  function handleLogout() {
    authStore.logout(); // Chama o método logout do store
    router.push('/login'); // Redireciona para a página de login
  }
  </script>
  
  <style scoped>
  button {
    padding: 8px 16px;
    background-color: #d32f2f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c62828;
  }
  </style>