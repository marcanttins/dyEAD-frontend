<template>
    <div class="summary-generator">
      <h3>Geração de Resumo</h3>
      <textarea v-model="content" placeholder="Cole o texto que deseja resumir..." required></textarea>
      <Button :isLoading="loading" @click="generateSummary">Gerar Resumo</Button>
      <div v-if="summary" class="summary">
        <h4>Resumo Gerado:</h4>
        <p>{{ summary }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import Button from '@/components/Button.vue';
  
  const content = ref('');
  const summary = ref('');
  const loading = ref(false);
  
  async function generateSummary() {
    if (!content.value.trim()) return;
  
    loading.value = true;
  
    try {
      const response = await axios.post('/api/summary', { content: content.value });
      summary.value = response.data.summary;
    } catch (error) {
      alert('Erro ao gerar resumo. Tente novamente.');
    } finally {
      loading.value = false;
    }
  }
  </script>
  
  <style scoped>
  .summary-generator {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .summary {
    margin-top: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  </style>