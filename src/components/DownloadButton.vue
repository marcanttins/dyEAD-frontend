<template>
  <button @click="handleDownload">Baixar Certificado</button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  url: string;
}>();

// Função para lidar com o download do certificado
function handleDownload() {
  if (props.url) {
    window.open(props.url, '_blank'); // Usa props.url corretamente
  } else {
    alert('URL do certificado não disponível.');
  }
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}
</style>