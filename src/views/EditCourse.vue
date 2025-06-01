<template>
    <div class="edit-course">
      <h2>Editar Curso</h2>
      <form @submit.prevent="handleEditCourse">
        <input v-model="course.title" type="text" placeholder="Título do curso" required />
        <textarea v-model="course.description" placeholder="Descrição do curso" required></textarea>
        <select v-model="course.category" required>
          <option value="">Selecione uma categoria</option>
          <option value="tecnologia">Tecnologia</option>
          <option value="negocios">Negócios</option>
          <option value="arte">Arte</option>
        </select>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const route = useRoute();
  const courseId = parseInt(route.params.id as string);
  const course = ref({ title: '', description: '', category: '' });
  
  onMounted(async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      course.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar detalhes do curso:', error);
    }
  });
  
  async function handleEditCourse() {
    try {
      await axios.put(`/api/courses/${courseId}`, course.value, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      alert('Curso atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar o curso. Tente novamente.');
    }
  }
  </script>
  
  <style scoped>
  .edit-course {
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