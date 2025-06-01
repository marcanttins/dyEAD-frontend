<template>
  <div class="recommendation-list">
    <h3>Sugestões de Cursos</h3>
    <div v-if="recommendations.length > 0">
      <RecommendationItem 
        v-for="course in recommendations" 
        :key="course.id" 
        :course="course" 
      />
    </div>
    <p v-else>Nenhuma recomendação disponível no momento.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import RecommendationItem from './RecommendationItem.vue';

defineProps<{
  recommendations: {
    id: number;
    title: string;
    description: string;
  }[];
}>();
</script>

<style scoped>
.recommendation-list {
  padding: 20px;
}

h3 {
  margin-bottom: 20px;
}
</style>