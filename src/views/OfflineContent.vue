<template>
    <div class="offline-content">
      <h2>Materiais Offline</h2>
      <ul v-if="materials.length > 0">
        <li v-for="material in materials" :key="material.id">
          {{ material.name }}
        </li>
      </ul>
      <p v-else>Nenhum material baixado ainda.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  import { Material } from '@/types/interfaces';
  
  const authStore = useAuthStore();
  const materials = ref<Material[]>([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('/api/offline/materials', {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      materials.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar materiais offline:', error);
    }
  });
  </script>
  
  <style scoped>
  .offline-content {
    padding: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  </style>