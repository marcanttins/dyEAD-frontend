<template>
    <div class="user-avatar" v-if="user">
      {{ initials }}
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const user = computed(() => authStore.user);
  
  const initials = computed(() => {
    if (!user.value?.name) return '';
    const parts = user.value.name.split(' ');
    return parts[0][0] + (parts.length > 1 ? parts[1][0] : '');
  });
  </script>
  
  <style scoped>
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #42b983;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }
  </style>