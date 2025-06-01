<template>
    <div class="token-display">
      <h3>Token JWT</h3>
      <pre>{{ token }}</pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const token = computed(() => authStore.token || 'Nenhum token disponível');
  </script>
  
  <style scoped>
  .token-display {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-top: 20px;
  }
  
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: #f9f9f9;
    padding: 8px;
    border-radius: 4px;
  }
  </style>