<template>
  <div class="feedback-display">
    <h3>Feedbacks Recebidos</h3>
    <ul v-if="feedbacks.length > 0">
      <li v-for="(feedback, index) in feedbacks" :key="index" class="feedback-item">
        <p>{{ feedback.text }}</p>
        <small>{{ formatDate(feedback.date) }}</small>
      </li>
    </ul>
    <p v-else>Nenhum feedback recebido ainda.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  feedbacks: { text: string; date: string }[];
}>();

// Função para formatar a data
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Exemplo de uso explícito das props (não necessário se forem usadas apenas no template)
console.log(props.feedbacks.length); // Acessa as props para verificar quantidade de feedbacks
</script>

<style scoped>
.feedback-display {
  padding: 20px;
}

.feedback-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

p {
  margin: 0;
  font-size: 1rem;
}

small {
  display: block;
  font-size: 0.8rem;
  color: #555;
  margin-top: 5px;
}
</style>