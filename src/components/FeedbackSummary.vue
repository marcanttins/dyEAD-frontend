<template>
    <div class="feedback-summary">
      <h3>Resumo de Feedbacks</h3>
      <ul v-if="feedbacks.length > 0">
        <li v-for="(feedback, index) in feedbacks" :key="index">
          <strong>{{ feedback.category }}:</strong> {{ feedback.content }}
        </li>
      </ul>
      <p v-else>Nenhum feedback recebido ainda.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    feedbacks: { category: string; content: string }[];
  }>();
  </script>
  
  <style scoped>
  .feedback-summary {
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