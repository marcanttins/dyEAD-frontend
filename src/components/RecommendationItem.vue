<template>
    <div class="recommendation-item">
      <h4>{{ course.title }}</h4>
      <p>{{ course.description }}</p>
      <router-link :to="`/course/${course.id}`">Ver Detalhes</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    course: {
      id: number;
      title: string;
      description: string;
    };
  }>();
  </script>
  
  <style scoped>
  .recommendation-item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  
  h4 {
    font-size: 1rem;
    margin-bottom: 5px;
  }
  
  p {
    margin-bottom: 10px;
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