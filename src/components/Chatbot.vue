<template>
    <div class="chatbot">
      <h3>Chat de Suporte</h3>
      <div class="chat-history">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <strong>{{ message.sender }}:</strong> {{ message.text }}
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="newMessage" type="text" placeholder="Escreva sua mensagem..." required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const newMessage = ref('');
  const messages = ref<{ sender: string; text: string }[]>([]);
  
  async function sendMessage() {
    if (!newMessage.value.trim()) return;
  
    // Adiciona a mensagem do usuário
    messages.value.push({ sender: 'Você', text: newMessage.value });
  
    // Envia a mensagem para o backend
    try {
      const response = await axios.post('/api/chatbot', { message: newMessage.value });
      const botResponse = response.data.response;
  
      // Adiciona a resposta do chatbot
      messages.value.push({ sender: 'Chatbot', text: botResponse });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      messages.value.push({ sender: 'Chatbot', text: 'Desculpe, não consigo entender isso.' });
    }
  
    newMessage.value = '';
  }
  </script>
  
  <style scoped>
  .chatbot {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .chat-history {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 16px;
  }
  
  .message {
    margin-bottom: 8px;
  }
  
  form {
    display: flex;
    gap: 8px;
  }
  
  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 16px;
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