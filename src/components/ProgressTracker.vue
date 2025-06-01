<template>
    <div class="progress-tracker">
      <h3>Progresso no Curso</h3>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      <p>{{ progress }}% concluído</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    progress: number;
  }>();
  </script>
  
  <style scoped>
  .progress-tracker {
    padding: 10px;
    text-align: center;
  }
  
  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: #f3f3f3;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #42b983;
    transition: width 0.3s ease;
  }
  </style>