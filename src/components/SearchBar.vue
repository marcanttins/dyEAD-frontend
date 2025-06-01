<template>
    <div class="search-bar">
      <input v-model="query" type="text" placeholder="Buscar cursos..." @input="handleSearch" />
      <Button :isLoading="isLoading" @click="handleSearch">Buscar</Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Button from '@/components/Button.vue';
  
  const query = ref('');
  const isLoading = ref(false);
  const emit = defineEmits(['search']);
  
  async function handleSearch() {
    if (!query.value.trim()) return;
  
    isLoading.value = true;
  
    try {
      emit('search', query.value);
    } catch (error) {
      alert('Erro ao buscar cursos. Tente novamente.');
    } finally {
      isLoading.value = false;
    }
  }
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
  }
  </style>