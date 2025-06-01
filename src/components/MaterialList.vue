<template>
    <div class="material-list">
      <h3>Materiais Didáticos</h3>
      <ul v-if="materials.length > 0">
        <li v-for="material in materials" :key="material.id">
          <a :href="material.url" target="_blank">{{ material.name }}</a>
        </li>
      </ul>
      <p v-else>Nenhum material disponível.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    materials: { id: number; name: string; url: string }[];
  }>();
  </script>
  
  <style scoped>
  .material-list {
    padding: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  a {
    color: #42b983;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>