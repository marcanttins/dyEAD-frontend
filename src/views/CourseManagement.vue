<template>
  <div class="course-management">
    <h2>Gerenciamento de Cursos</h2>
    <ul v-if="courses.length > 0">
      <li v-for="course in courses" :key="course.id">
        {{ course.title }}
        <button @click="editCourse(course.id)">Editar</button>
        <button @click="deleteCourse(course.id)">Excluir</button>
      </li>
    </ul>
    <p v-else>Nenhum curso disponível.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { Course } from '@/types/interfaces';

const authStore = useAuthStore();

// Tipando os arrays com a interface Course
const courses = ref<Course[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/admin/courses', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    courses.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
  }
});

function editCourse(courseId: number) {
  alert(`Funcionalidade de edição de curso em desenvolvimento! ID: ${courseId}`);
}

function deleteCourse(courseId: number) {
  if (confirm('Tem certeza que deseja excluir este curso?')) {
    axios.delete(`/api/admin/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    }).then(() => {
      courses.value = courses.value.filter((course: any) => course.id !== courseId);
    });
  }
}
</script>

<style scoped>
.course-management {
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
  padding: 5px 10px;
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