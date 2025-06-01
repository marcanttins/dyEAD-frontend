<template>
    <div class="point-badge">
      <strong>Pontuação:</strong> {{ points }} pontos
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    points: number;
  }>();
  </script>
  
  <style scoped>
  .point-badge {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    display: inline-block;
  }
  </style>