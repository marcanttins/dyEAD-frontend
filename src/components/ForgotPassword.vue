<template>
    <div class="forgot-password">
      <h2>Recuperar Senha</h2>
      <form @submit.prevent="handleSubmit">
        <InputField
          v-model="email"
          label="Email"
          type="email"
          placeholder="Seu email"
          required
        />
        <Button :isLoading="loading" @click="handleSubmit">Enviar Link de Recuperação</Button>
      </form>
      <p>
        Lembre-se da sua senha? <router-link to="/login">Faça login</router-link>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import Button from '@/components/Button.vue';
  import InputField from '@/components/InputField.vue';
  
  const email = ref('');
  const loading = ref(false);
  
  async function handleSubmit() {
    if (!email.value.trim()) return;
  
    loading.value = true;
  
    try {
      await axios.post('/api/auth/forgot-password', { email: email.value });
      alert('Link de recuperação enviado para seu email.');
      email.value = '';
    } catch (error) {
      alert('Erro ao enviar link de recuperação. Tente novamente.');
    } finally {
      loading.value = false;
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
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  p {
    margin-top: 20px;
    text-align: center;
  }
  </style>