<template>
  <div class="forum-post">
    <p><strong>{{ postAuthor }}:</strong> {{ postContent }}</p>
    <small>{{ formattedDate }}</small>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  post: { id: number; author: string; content: string; date: string };
}>();

// Transforma a prop "date" em uma variável local formatada
const formattedDate = computed(() => {
  const date = new Date(props.post.date);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
});

// Variáveis locais para uso no template
const postAuthor = props.post.author;
const postContent = props.post.content;
</script>


<style scoped>
.forum-post {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
}

small {
  color: #555;
  font-size: 0.8rem;
}
</style>