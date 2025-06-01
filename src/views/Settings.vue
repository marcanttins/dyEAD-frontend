<template>
    <div class="settings">
      <h2>Configurações</h2>
      <form @submit.prevent="handleSaveSettings">
        <label>
          Idioma Padrão:
          <select v-model="language">
            <option value="pt-br">Português</option>
            <option value="en-us">Inglês</option>
          </select>
        </label>
        <button type="submit">Salvar Configurações</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const language = ref('pt-br');
  
  async function handleSaveSettings() {
    try {
      await axios.post('/api/settings', { language: language.value }, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .settings {
    padding: 20px;
  }
  
  select {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
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