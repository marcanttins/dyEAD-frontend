<template>
  <div class="notification-list">
    <h3>Notificações</h3>
    <ul v-if="notifications.length > 0">
      <li v-for="(notification, index) in notifications" :key="index" class="notification-item">
        <p>{{ notification.message }}</p>
        <small>{{ formatDate(notification.date) }}</small>
      </li>
    </ul>
    <p v-else>Nenhuma notificação disponível.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  notifications: { message: string; date: string }[];
}>();

// Acessa a prop explicitamente para evitar o erro
console.log(props.notifications);


function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style scoped>
.notification-list {
  padding: 20px;
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

p {
  margin: 0;
  font-size: 1rem;
}

small {
  display: block;
  font-size: 0.8rem;
  color: #555;
  margin-top: 5px;
}
</style>