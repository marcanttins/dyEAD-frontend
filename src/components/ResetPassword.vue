<template>
    <div class="reset-password">
      <h2>Redefinir Senha</h2>
      <form @submit.prevent="handleSubmit">
        <InputField
          v-model="password"
          label="Nova Senha"
          type="password"
          placeholder="Digite sua nova senha"
          required
        />
        <InputField
          v-model="confirmPassword"
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua nova senha"
          required
        />
        <Button :isLoading="loading" @click="handleSubmit">Redefinir Senha</Button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import Button from '@/components/Button.vue';
  import InputField from '@/components/InputField.vue';
  
  const route = useRoute();
  const router = useRouter();
  
  const password = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  
  async function handleSubmit() {
    if (!password.value.trim() || !confirmPassword.value.trim()) {
      alert('Preencha todos os campos.');
      return;
    }
  
    if (password.value !== confirmPassword.value) {
      alert('As senhas não coincidem.');
      return;
    }
  
    const token = route.query.token as string;
  
    if (!token) {
      alert('Token de redefinição inválido.');
      return;
    }
  
    loading.value = true;
  
    try {
      await axios.post('/api/auth/reset-password', { token, password: password.value });
      alert('Sua senha foi redefinida com sucesso!');
      router.push('/login');
    } catch (error) {
      alert('Erro ao redefinir senha. Tente novamente.');
    } finally {
      loading.value = false;
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
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  </style>