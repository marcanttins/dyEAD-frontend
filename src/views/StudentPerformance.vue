<template>
  <div class="student-performance">
    <h2>Desempenho dos Alunos</h2>
    <ul v-if="students.length > 0">
      <li v-for="student in students" :key="student.id">
        <strong>{{ student.name }}:</strong> {{ student.progress }}% concluído
      </li>
    </ul>
    <p v-else>Nenhum aluno inscrito neste curso.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Student } from '@/types/interfaces';

// Interface para tipar o objeto do aluno
const authStore = useAuthStore();
const route = useRoute();
const courseId = parseInt(route.params.id as string, 10);

// Estado reativo para armazenar os alunos
const students = ref<Student[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/courses/${courseId}/students`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    // Assegura que a resposta seja do tipo Student[]
    students.value = response.data as Student[];
  } catch (error) {
    console.error('Erro ao carregar desempenho dos alunos:', error);
  }
});
</script>

<style scoped>
.student-performance {
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
