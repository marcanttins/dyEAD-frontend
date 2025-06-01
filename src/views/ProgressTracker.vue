<template>
  <div class="progress-tracker">
    <h2>Progresso no Curso</h2>
    <div class="progress-bar">
      <div class="bar-fill" :style="{ width: `${progress}%` }"></div>
    </div>
    <p>{{ progress }}% concluído</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  progress: number; // Progresso em porcentagem (0-100)
}>();

// Usa as props explicitamente para evitar o aviso
console.log(`Progresso recebido: ${props.progress}%`);
</script>

<style scoped>
.progress-tracker {
  padding: 20px;
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

.bar-fill {
  height: 100%;
  background-color: #42b983;
  transition: width 0.3s ease;
}

p {
  font-size: 1rem;
  color: #555;
}
</style>