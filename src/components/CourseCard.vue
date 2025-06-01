<template>
  <div class="course-card">
    <img :src="course.image" :alt="course.title" />
    <h3>{{ course.title }}</h3>
    <p>{{ course.description }}</p>
    <router-link :to="`/course/${course.id}`">Ver Detalhes</router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  course: { id: number; title: string; description: string; image: string };
}>();
</script>

<style scoped>
.course-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
  transition: transform 0.2s ease;
}

.course-card:hover {
  transform: scale(1.05);
}

img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

h3 {
  font-size: 1rem;
  margin: 10px 0;
}

p {
  color: #555;
  margin: 0 10px 10px;
}

a {
  display: inline-block;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

a:hover {
  background-color: #35495e;
}
</style>