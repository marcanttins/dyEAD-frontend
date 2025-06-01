<template>
    <div class="forgot-password">
      <h2>Recuperar Senha</h2>
      <form @submit.prevent="handleForgotPassword">
        <input v-model="email" type="email" placeholder="Seu email" required />
        <button type="submit">Enviar Link de Recuperação</button>
      </form>
      <p>
        Lembre-se da sua senha? <router-link to="/login">Faça login</router-link>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  
  async function handleForgotPassword() {
    try {
      await axios.post('/api/auth/forgot-password', { email: email.value });
      alert('Link de recuperação enviado para seu email.');
    } catch (error) {
      alert('Erro ao enviar link de recuperação. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .forgot-password {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  input {
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