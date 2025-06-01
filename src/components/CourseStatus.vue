<template>
    <div class="course-status">
      <h3>Status do Curso</h3>
      <select v-model="status" @change="updateStatus">
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
        <option value="pendente">Pendente</option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const props = defineProps<{
    initialStatus: string;
  }>();
  
  const emit = defineEmits(['update:status']);
  const status = ref(props.initialStatus);
  
  function updateStatus() {
    emit('update:status', status.value);
  }
  </script>
  
  <style scoped>
  .course-status {
    padding: 10px;
  }
  
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>