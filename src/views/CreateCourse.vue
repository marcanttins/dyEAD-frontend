<template>
    <div class="create-course">
      <h2>Criar Novo Curso</h2>
      <form @submit.prevent="handleCreateCourse">
        <input v-model="title" type="text" placeholder="Título do curso" required />
        <textarea v-model="description" placeholder="Descrição do curso" required></textarea>
        <select v-model="category" required>
          <option value="">Selecione uma categoria</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="negocios">Negócios</option>
          <option value="arte">Arte</option>
        </select>
        <button type="submit">Criar Curso</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const title = ref('');
  const description = ref('');
  const category = ref('');
  
  async function handleCreateCourse() {
    try {
      await axios.post('/api/courses', {
        title: title.value,
        description: description.value,
        category: category.value,
      }, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert('Curso criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar o curso. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .create-course {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  input,
  textarea,
  select {
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