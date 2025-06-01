<template>
    <div class="summary-generation">
      <h2>Geração de Resumo</h2>
      <textarea v-model="text" placeholder="Insira o texto aqui..." required></textarea>
      <button @click="generateSummary">Gerar Resumo</button>
      <p v-if="summary">{{ summary }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const text = ref('');
  const summary = ref('');
  
  async function generateSummary() {
    if (!text.value.trim()) return;
  
    try {
      const response = await axios.post('/api/summary', { text: text.value });
      summary.value = response.data.summary;
    } catch (error) {
      alert('Erro ao gerar resumo. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .summary-generation {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  textarea {
    width: 100%;
    height: 150px;
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