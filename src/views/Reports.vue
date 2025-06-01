<template>
    <div class="reports">
      <h2>Relatórios</h2>
      <p><strong>Total de Cursos:</strong> {{ report.totalCourses }}</p>
      <p><strong>Total de Alunos:</strong> {{ report.totalStudents }}</p>
      <p><strong>Taxa de Conclusão Média:</strong> {{ report.completionRate }}%</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const report = ref({
    totalCourses: 0,
    totalStudents: 0,
    completionRate: 0
  });
  
  onMounted(async () => {
    try {
      const response = await axios.get('/api/reports', {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      report.value = response.data;
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error);
    }
  });
  </script>
  
  <style scoped>
  .reports {
    padding: 20px;
  }
  
  p {
    margin-bottom: 10px;
    font-size: 1rem;
  }
  </style>