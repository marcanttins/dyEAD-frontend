<template>
  <div class="leaderboard">
    <h2>Ranking Global</h2>
    <ul v-if="students.length > 0">
      <li v-for="(student, index) in students" :key="student.id">
        {{ index + 1 }}. {{ student.name }} - {{ student.progress }} pontos
      </li>
    </ul>
    <p v-else>Nenhum aluno no ranking no momento.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Student } from '@/types/interfaces';


const students = ref<Student[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/leaderboard');
    students.value = response.data as Student[];
  } catch (error: any) {
    console.error('Erro ao carregar ranking:', error);
  }
});
</script>

<style scoped>
.leaderboard {
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
