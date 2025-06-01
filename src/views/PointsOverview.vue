<template>
  <div class="points-overview">
    <h2>Resumo de Pontos</h2>
    <p><strong>Pontos Totais:</strong> {{ totalPoints }}</p>
    <ul v-if="activities.length > 0">
      <li v-for="activity in activities" :key="activity.id">
        {{ activity.name }}: {{ activity.points }} pontos
      </li>
    </ul>
    <p v-else>Nenhuma atividade concluída ainda.</p>
    <!-- Exemplo opcional: exibir mensagem de erro -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { Activity } from '@/types/interfaces';

// Acessa a store de autenticação para obter o token
const authStore = useAuthStore();

// Estados reativos
const totalPoints = ref<number>(0);
const activities = ref<Activity[]>([]);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  try {
    // Faz a requisição para obter os pontos e atividades do aluno
    const response = await axios.get('/api/students/points', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    // Atribui os valores recebidos da API
    totalPoints.value = response.data.totalPoints;
    activities.value = response.data.activities;
  } catch (error: any) {
    console.error('Erro ao carregar resumo de pontos:', error);
    errorMessage.value = error.response?.data?.message || 'Erro ao carregar os dados. Tente novamente.';
  }
});
</script>

<style scoped>
.points-overview {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

/* Estilo opcional para mensagem de erro */
.error {
  color: #d32f2f;
  font-weight: bold;
  margin-top: 10px;
}
</style>
