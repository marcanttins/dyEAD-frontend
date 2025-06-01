<template>
  <div class="course-details">
    <h2>{{ course.title }}</h2>
    <p><strong>Instrutor:</strong> {{ course.instructor }}</p>
    <p><strong>Descrição:</strong> {{ course.description }}</p>
    <MaterialList :materials="course.materials" />
  </div>
</template>

<script setup lang="ts">
import MaterialList from './MaterialList.vue';
defineProps<{
  course: {
    id: number;
    title: string;
    instructor: string;
    description: string;
    materials: { id: number; name: string; url: string }[];
  };
}>();
</script>

<style scoped>
.course-details {
  padding: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 10px;
}
</style>