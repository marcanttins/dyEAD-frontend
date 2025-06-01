<template>
  <div class="user-role-badge" :class="roleClass">{{ userRole }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
// Utiliza authStore.user?.role (caso o usuário esteja definido); se não, exibe 'Visitante'
const userRole = computed(() => authStore.user?.role || 'Visitante');

const roleClass = computed(() => {
  switch (userRole.value) {
    case 'admin':
      return 'admin';
    case 'professor':
      return 'teacher';
    case 'aluno':
      return 'student';
    default:
      return 'guest';
  }
});
</script>

<style scoped>
.user-role-badge {
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
}

.admin {
  background-color: #42b983;
}

.teacher {
  background-color: #2196f3;
}

.student {
  background-color: #ff9800;
}

.guest {
  background-color: #9e9e9e;
}
</style>
