<template>
    <div class="language-selector">
      <h2>Selecionar Idioma</h2>
      <select v-model="selectedLanguage" @change="handleLanguageChange">
        <option value="pt-br">Português</option>
        <option value="en-us">Inglês</option>
        <option value="es-es">Espanhol</option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const selectedLanguage = ref('pt-br');
  
  async function handleLanguageChange() {
    try {
      await axios.post('/api/settings/language', { language: selectedLanguage.value }, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      alert('Idioma alterado com sucesso!');
    } catch (error) {
      alert('Erro ao alterar idioma. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .language-selector {
    padding: 20px;
  }
  
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>