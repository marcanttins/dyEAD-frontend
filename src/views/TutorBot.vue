<template>
  <div class="tutor-bot">
    <h2>Tutor Virtual</h2>
    <div class="chat-history">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <strong>{{ message.sender }}:</strong> {{ message.content }}
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <textarea v-model="newMessage" placeholder="Escreva sua dúvida..." required></textarea>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { Message } from '@/types/interfaces'; // Importa a interface Message

// Estado reativo
const newMessage = ref('');
const messages = ref<Message[]>([]); // Tipado como array de objetos Message

let nextId = 1; // Variável para gerar IDs únicas localmente

async function sendMessage() {
  if (!newMessage.value.trim()) return;

  // Gera uma ID única para a nova mensagem do usuário
  const userMessage: Message = {
    id: nextId++, // Incrementa o contador de IDs
    sender: 'Você',
    content: newMessage.value,
    created_at: new Date().toISOString(), // Adiciona a data atual
  };

  // Adiciona a mensagem do usuário ao histórico
  messages.value.push(userMessage);

  try {
    // Envia a mensagem para o backend
    const response = await axios.post('/api/tutorbot', { message: newMessage.value });
    const botResponse = response.data.response;

    // Gera uma ID única para a resposta do Tutor Virtual
    const botMessage: Message = {
      id: nextId++, // Incrementa o contador de IDs
      sender: 'Tutor Virtual',
      content: botResponse,
      created_at: new Date().toISOString(), // Adiciona a data atual
    };

    // Adiciona a resposta do Tutor Virtual ao histórico
    messages.value.push(botMessage);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);

    // Adiciona uma mensagem padrão em caso de erro
    const errorMessage: Message = {
      id: nextId++,
      sender: 'Tutor Virtual',
      content: 'Não entendi sua pergunta.',
      created_at: new Date().toISOString(),
    };
    messages.value.push(errorMessage);
  } finally {
    newMessage.value = ''; // Limpa o campo de entrada
  }
}
</script>

<style scoped>
.tutor-bot {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.chat-history {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  height: 100px;
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