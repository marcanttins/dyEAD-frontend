<template>
  <div class="message-bubble" :class="{ 'user-message': isUserMessage }">
    <strong>{{ sender }}:</strong> {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // Importa computed

// Define as props recebidas pelo componente
const props = defineProps<{
  sender: string;
  text: string;
}>();

// Calcula se a mensagem é do usuário
const isUserMessage = computed(() => props.sender === 'Você'); // Acessa props corretamente
</script>

<style scoped>
.message-bubble {
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  max-width: 70%;
}

.user-message {
  background-color: #42b983;
  color: white;
  align-self: flex-end;
}

.user-message strong {
  color: white;
}

.message-bubble:not(.user-message) {
  background-color: #f9f9f9;
  color: #333;
  align-self: flex-start;
}

strong {
  font-weight: bold;
}
</style>