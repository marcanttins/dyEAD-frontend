<template>
    <div class="chatbot-panel">
      <h3>Chatbot de Suporte</h3>
      <div class="chat-history">
        <MessageBubble 
          v-for="(message, index) in messages" 
          :key="index" 
          :sender="message.sender" 
          :text="message.text" 
        />
      </div>
      <form @submit.prevent="sendMessage">
        <textarea v-model="newMessage" placeholder="Escreva sua mensagem..." required></textarea>
        <Button :isLoading="loading" @click="sendMessage">Enviar</Button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import MessageBubble from '@/components/Auth/MessageBubble.vue';
  import Button from '@/components/Button.vue';
  
  const newMessage = ref('');
  const messages = ref<{ sender: string; text: string }[]>([]);
  const loading = ref(false);
  
  async function sendMessage() {
    if (!newMessage.value.trim()) return;
  
    // Adiciona a mensagem do usuário à lista
    messages.value.push({ sender: 'Você', text: newMessage.value });
  
    // Envia a mensagem para o backend
    loading.value = true;
    try {
      const response = await axios.post('/api/chatbot', { message: newMessage.value });
      const botResponse = response.data.response;
      messages.value.push({ sender: 'Chatbot', text: botResponse });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      messages.value.push({ sender: 'Chatbot', text: 'Desculpe, não consigo entender isso.' });
    } finally {
      loading.value = false;
      newMessage.value = '';
    }
  }
  </script>
  
  <style scoped>
  .chatbot-panel {
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