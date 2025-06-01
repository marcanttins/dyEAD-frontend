<template>
    <div class="tutorbot-view p-4">
      <h1 class="text-2xl font-bold mb-4">Tutor Bot</h1>
      <input
        v-model="message"
        type="text"
        placeholder="Digite sua mensagem para o Tutor Bot"
        class="w-full p-2 border border-gray-300 rounded"
      />
      <button @click="getResponse" class="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Enviar
      </button>
      <div v-if="loading" class="mt-4">Carregando...</div>
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
      <div v-if="response" class="mt-4 p-4 bg-gray-100 rounded">
        <strong>Resposta:</strong>
        <p>{{ response }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  
  const message = ref('')
  const response = ref('')
  const loading = ref(false)
  const error = ref('')
  
  const getResponse = async () => {
    if (!message.value.trim()) {
      error.value = "Digite uma mensagem válida."
      return
    }
    loading.value = true
    error.value = ''
    response.value = ''
    try {
      const res = await axios.post('/api/tutorbot', { message: message.value })
      response.value = res.data.response
    } catch (err: any) {
      error.value = "Erro ao obter resposta do Tutor Bot."
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  /* Estilos customizados ou classes Tailwind */
  </style>
  