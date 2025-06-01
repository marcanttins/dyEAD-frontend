<template>
    <div class="contact-us">
      <h2>Fale Conosco</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="name" type="text" placeholder="Seu nome" required />
        <input v-model="email" type="email" placeholder="Seu email" required />
        <textarea v-model="message" placeholder="Sua mensagem" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const name = ref('');
  const email = ref('');
  const message = ref('');
  
  async function handleSubmit() {
    try {
      await axios.post('/api/contact', { name: name.value, email: email.value, message: message.value });
      alert('Mensagem enviada com sucesso!');
      name.value = '';
      email.value = '';
      message.value = '';
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .contact-us {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  input,
  textarea {
    display: block;
    width: 100%;
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