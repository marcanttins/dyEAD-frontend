<template>
  <div class="course-list">
    <h3 v-if="courses.length > 0">Cursos Inscritos</h3>
    <ul v-if="courses.length > 0">
      <li v-for="course in courses" :key="course.id">
        <router-link :to="`/course/${course.id}`">{{ course.title }}</router-link>
      </li>
    </ul>
    <p v-else>Nenhum curso inscrito.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  courses: { id: number; title: string }[];
}>();
</script>

<style scoped>
.course-list {
  padding: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>