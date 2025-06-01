<template>
  <button :class="{ loading: isLoading }" @click="handleClick">
    <span v-if="isLoading">Carregando...</span>
    <span v-else><slot /></span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'; // Removemos a importação desnecessária de `ref`

// Define as props do componente
const props = defineProps<{
  isLoading?: boolean; // Propriedade opcional para indicar estado de carregamento
}>();

// Define os eventos emitidos pelo componente
const emit = defineEmits(['click']); // Evento 'click' será emitido quando o botão for clicado

// Função para lidar com o clique no botão
function handleClick() {
  if (!props.isLoading) {
    emit('click'); // Emite o evento 'click' apenas se o botão não estiver carregando
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
  transition: background-color 0.3s ease;
}

button:hover:not(.loading) {
  background-color: #35495e;
}

button.loading {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
