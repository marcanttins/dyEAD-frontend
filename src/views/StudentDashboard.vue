<template>
  <div class="student-dashboard">
    <h2>Painel do Aluno</h2>

    <h3>Meus Cursos</h3>
    <ul v-if="courses.length > 0">
      <li v-for="course in courses" :key="course.id">
        <router-link :to="`/course/${course.id}`">{{ course.title }}</router-link>
      </li>
    </ul>
    <p v-else>Nenhum curso inscrito.</p>

    <h3>Recomendações para Você</h3>
    <ul v-if="recommendations.length > 0">
      <li v-for="rec in recommendations" :key="rec.id">
        <router-link :to="`/course/${rec.id}`">{{ rec.title }}</router-link>
      </li>
    </ul>
    <p v-else>Nenhuma recomendação disponível.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import type { Course, Recommendation } from '@/types/interfaces';

const authStore = useAuthStore();

// Estado reativo tipado para cursos e recomendações
const courses = ref<Course[]>([]);
const recommendations = ref<Recommendation[]>([]);

onMounted(async () => {
  try {
    // Busca os cursos do aluno
    const responseCourses = await axios.get('/api/students/courses', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    courses.value = responseCourses.data as Course[];

    // Busca as recomendações: utiliza o ID do usuário, se estiver autenticado
    const userId = authStore.user?.id;
    if (userId) {
      const responseRecs = await axios.post('/api/recommendations', {
        user_id: userId,
      });
      recommendations.value = responseRecs.data.recommendations as Recommendation[];
    } else {
      console.error('Usuário não autenticado, recomendações não carregadas.');
    }
  } catch (error: any) {
    console.error('Erro ao carregar dados:', error);
  }
});
</script>

<style scoped>
.student-dashboard {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
