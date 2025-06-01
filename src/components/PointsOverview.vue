<template>
    <div class="points-overview">
      <h3>Pontuação</h3>
      <p><strong>Pontos Totais:</strong> {{ totalPoints }}</p>
      <ul v-if="activities.length > 0">
        <li v-for="activity in activities" :key="activity.id">
          {{ activity.name }}: {{ activity.points }} pontos
        </li>
      </ul>
      <p v-else>Nenhuma atividade concluída.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    totalPoints: number;
    activities: { id: number; name: string; points: number }[];
  }>();
  </script>
  
  <style scoped>
  .points-overview {
    padding: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>