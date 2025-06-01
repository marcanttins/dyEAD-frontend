<template>
  <div class="feedback-analysis">
    <h2>Análise de Feedbacks</h2>
    <ul v-if="feedbacks.length > 0">
      <li v-for="feedback in feedbacks" :key="feedback.id">
        <strong>{{ feedback.category }}:</strong> {{ feedback.content }}
      </li>
    </ul>
    <p v-else>Nenhum feedback disponível no momento.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Feedback } from '@/types/interfaces'; // Importa a interface Course 


// Estado reativo tipado como um array de Feedback
const feedbacks = ref<Feedback[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/feedbacks');
    // Supondo que a API retorne um array de feedbacks na propriedade data
    feedbacks.value = response.data as Feedback[];
  } catch (error: any) {
    console.error('Erro ao carregar feedbacks:', error);
  }
});
</script>

<style scoped>
.feedback-analysis {
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
