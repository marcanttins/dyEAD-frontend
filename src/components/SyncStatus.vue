<template>
    <div class="sync-status">
      <h3>Status de Sincronização</h3>
      <p v-if="isLoading">Sincronizando...</p>
      <p v-else>Sincronização concluída.</p>
      <Button :isLoading="isLoading" @click="syncProgress">Forçar Sincronização</Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Button from '@/components/Button.vue';
  
  const isLoading = ref(false);
  
  async function syncProgress() {
    isLoading.value = true;
  
    try {
      // Simulação de chamada à API para sincronização
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Sincronização concluída com sucesso!');
    } catch (error) {
      alert('Erro ao sincronizar. Tente novamente.');
    } finally {
      isLoading.value = false;
    }
  }
  </script>
  
  <style scoped>
  .sync-status {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  p {
    margin-bottom: 10px;
  }
  </style>