<template>
    <div class="card">
      <img :src="image" :alt="title" />
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    image: string;
    title: string;
    description: string;
  }>();
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  h3 {
    font-size: 1rem;
    margin: 10px 0;
  }
  
  p {
    color: #555;
    margin: 0 10px 10px;
  }
  </style>