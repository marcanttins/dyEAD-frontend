<template>
    <div class="ranking-item">
      <span>{{ position }}º</span>
      <strong>{{ user.name }}</strong>
      <p>{{ user.points }} pontos</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    position: number;
    user: { name: string; points: number };
  }>();
  </script>
  
  <style scoped>
  .ranking-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  span {
    margin-right: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  strong {
    flex: 1;
  }
  
  p {
    margin-left: 10px;
    color: #555;
  }
  </style>