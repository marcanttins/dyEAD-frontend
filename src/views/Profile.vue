<template>
    <div class="profile">
      <h2>Meu Perfil</h2>
      <form @submit.prevent="handleSaveProfile">
        <input v-model="user.name" type="text" placeholder="Nome" required />
        <input v-model="user.email" type="email" placeholder="Email" required />
        <input v-model="user.password" type="password" placeholder="Nova senha (opcional)" />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const user = ref({ name: '', email: '', password: '' });
  
  onMounted(async () => {
    try {
      const response = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      user.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  });
  
  async function handleSaveProfile() {
    try {
      await axios.put('/api/profile', user.value, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .profile {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
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