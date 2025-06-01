<template>
  <div class="instructor-dashboard">
    <h2>Painel do Professor</h2>

    <h3>Meus Cursos</h3>
    <ul v-if="courses.length > 0">
      <li v-for="course in courses" :key="course.id">
        <router-link :to="`/course/${course.id}`">{{ course.title }}</router-link>
      </li>
    </ul>
    <p v-else>Nenhum curso criado.</p>

    <button @click="createNewCourse">Criar Novo Curso</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { Course } from '@/types/interfaces';

const authStore = useAuthStore();
const courses = ref<Course[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/teachers/courses', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    courses.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
  }
});

function createNewCourse() {
  alert('Funcionalidade de criação de curso em desenvolvimento!');
}
</script>

<style scoped>
.instructor-dashboard {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
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