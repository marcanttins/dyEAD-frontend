<template>
  <div class="notification">
    <h2>Notificações</h2>
    <ul v-if="notifications.length > 0">
      <li v-for="notification in notifications" :key="notification.id" class="notification-item">
        <p>{{ notification.message }}</p>
        <small>{{ formatDate(notification.created_at) }}</small>
      </li>
    </ul>
    <p v-else>Nenhuma notificação no momento.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { Notification } from '@/types/interfaces';

// Interface para tipagem das notificações

const authStore = useAuthStore();
const notifications = ref<Notification[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/notifications', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    // Assegura que a resposta está tipada como Notification[]
    notifications.value = response.data as Notification[];
  } catch (error) {
    console.error('Erro ao carregar notificações:', error);
  }
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>

<style scoped>
.notification {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

.notification-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

p {
  margin: 0;
  font-size: 1rem;
}

small {
  color: #555;
  font-size: 0.8rem;
}
</style>
