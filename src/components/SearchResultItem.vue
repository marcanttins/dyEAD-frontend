<template>
    <div class="search-result-item">
      <h4>{{ course.title }}</h4>
      <p>{{ course.description }}</p>
      <router-link :to="`/course/${course.id}`">Ver Detalhes</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    course: { id: number; title: string; description: string };
  }>();
  </script>
  
  <style scoped>
  .search-result-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  h4 {
    margin: 0 0 5px;
    font-size: 1rem;
  }
  
  p {
    margin: 0 0 10px;
    color: #555;
  }
  
  a {
    text-decoration: none;
    color: #42b983;
    font-weight: bold;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>