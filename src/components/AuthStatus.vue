<template>
    <div class="auth-status">
      <template v-if="isAuthenticated">
        <span>Bem-vindo, {{ user?.name }}!</span>
        <LogoutButton />
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Registrar</router-link>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import LogoutButton from './LogoutButton.vue';
  
  const authStore = useAuthStore();
  const isAuthenticated = computed(() => !!authStore.token);
  const user = computed(() => authStore.user);
  </script>
  
  <style scoped>
  .auth-status {
    text-align: right;
    padding: 10px;
  }
  
  a {
    margin-left: 10px;
    text-decoration: none;
    color: #42b983;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>