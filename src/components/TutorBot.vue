<template>
    <div class="tutor-bot">
      <h3>Tutor Virtual</h3>
      <div class="chat-history">
        <MessageBubble 
          v-for="(message, index) in messages" 
          :key="index" 
          :sender="message.sender" 
          :text="message.text" 
        />
      </div>
      <form @submit.prevent="askQuestion">
        <textarea v-model="question" placeholder="Faça sua pergunta..." required></textarea>
        <Button :isLoading="loading" @click="askQuestion">Enviar</Button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import MessageBubble from './IA/MessageBubble.vue';
  import Button from '@/components/Button.vue';
  
  const question = ref('');
  const messages = ref<{ sender: string; text: string }[]>([]);
  const loading = ref(false);
  
  async function askQuestion() {
    if (!question.value.trim()) return;
  
    // Adiciona a pergunta do usuário
    messages.value.push({ sender: 'Você', text: question.value });
  
    // Envia a pergunta para o backend
    loading.value = true;
    try {
      const response = await axios.post('/api/tutorbot', { question: question.value });
      const botResponse = response.data.response;
      messages.value.push({ sender: 'Tutor Virtual', text: botResponse });
    } catch (error) {
      messages.value.push({ sender: 'Tutor Virtual', text: 'Não entendi sua pergunta.' });
    } finally {
      loading.value = false;
      question.value = '';
    }
  }
  </script>
  
  <style scoped>
  .tutor-bot {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .chat-history {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  </style>