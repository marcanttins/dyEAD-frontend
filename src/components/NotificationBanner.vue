<template>
  <div v-if="show" class="notification-banner">
    <span>{{ message }}</span>
    <button @click="dismiss">Fechar</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  message: string;
}>();

// Acessa a prop explicitamente para evitar o erro
console.log(props.message);

const emit = defineEmits(['dismiss']);
const show = ref(true);

function dismiss() {
  show.value = false;
  emit('dismiss');
}
</script>

<style scoped>
.notification-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #42b983;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  text-decoration: underline;
}
</style>