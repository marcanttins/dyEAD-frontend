<template>
    <div class="sync-status">
      <h2>Status de Sincronização</h2>
      <p v-if="syncing">Sincronizando...</p>
      <p v-else>Sincronização concluída.</p>
      <button @click="syncProgress">Forçar Sincronização</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const syncing = ref(false);
  
  async function syncProgress() {
    syncing.value = true;
    try {
      await axios.post('/api/sync', {}, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      alert('Sincronização concluída com sucesso!');
    } catch (error) {
      alert('Erro ao sincronizar. Tente novamente.');
    } finally {
      syncing.value = false;
    }
  }
  </script>
  
  <style scoped>
  .sync-status {
    padding: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #35495e;
  }
  </style>