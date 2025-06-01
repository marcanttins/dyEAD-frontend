<template>
    <div class="reset-password">
      <h2>Redefinir Senha</h2>
      <form @submit.prevent="handleResetPassword">
        <input v-model="password" type="password" placeholder="Nova senha" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirmar senha" required />
        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  const password = ref('');
  const confirmPassword = ref('');
  
  async function handleResetPassword() {
    if (password.value !== confirmPassword.value) {
      alert('As senhas não coincidem.');
      return;
    }
  
    const token = route.query.token as string;
  
    try {
      await axios.post('/api/auth/reset-password', { token, password: password.value });
      alert('Sua senha foi redefinida com sucesso!');
      router.push('/login');
    } catch (error) {
      alert('Erro ao redefinir senha. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .reset-password {
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