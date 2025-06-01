<template>
    <div class="generate-text-view p-4">
      <h1 class="text-2xl font-bold mb-4">Geração de Texto</h1>
      <textarea
        v-model="prompt"
        placeholder="Digite seu prompt para gerar texto..."
        class="w-full p-2 border border-gray-300 rounded h-40"
      ></textarea>
      <button @click="generateText" class="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Gerar Texto
      </button>
      <div v-if="loading" class="mt-4">Carregando...</div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
      <div v-if="generatedText" class="mt-4 p-4 bg-gray-100 rounded">
        <strong>Texto Gerado:</strong>
        <p>{{ generatedText }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  
  const prompt = ref('')
  const generatedText = ref('')
  const loading = ref(false)
  const error = ref('')
  
  const generateText = async () => {
    if (!prompt.value.trim()) {
      error.value = "Por favor, digite um prompt válido."
      return
    }
    loading.value = true
    error.value = ''
    generatedText.value = ''
    try {
      const response = await axios.post('/api/ai/generate-text', { prompt: prompt.value, max_tokens: 150 })
      // Supõe que a resposta contenha um objeto { text: "..." }
      generatedText.value = response.data.text
    } catch (err: any) {
      error.value = "Erro ao gerar texto."
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  /* Ajuste os estilos conforme sua necessidade (Tailwind CSS ou CSS customizado) */
  </style>
  