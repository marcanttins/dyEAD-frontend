<template>
  <div class="recommendations">
    <h2>Recomendações para Você</h2>
    <ul v-if="recommendations.length > 0">
      <li v-for="rec in recommendations" :key="rec.id">
        <router-link :to="`/course/${rec.id}`">{{ rec.title }}</router-link>
      </li>
    </ul>
    <p v-else>Nenhuma recomendação disponível no momento.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { Recommendation } from '@/types/interfaces';

const authStore = useAuthStore();
const recommendations = ref<Recommendation[]>([]);;

onMounted(async () => {
  try {
    if (authStore.user) {
      const response = await axios.post('/api/recommendations', { user_id: authStore.user.id });
      recommendations.value = response.data.recommendations;
    } else {
      console.error('Usuário não autenticado');
    }
  } catch (error) {
    console.error('Erro ao carregar recomendações:', error);
  }
});
</script>

<style scoped>
.recommendations {
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