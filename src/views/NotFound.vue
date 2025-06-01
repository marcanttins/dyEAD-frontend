<template>
    <div class="not-found">
      <h1>Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <router-link to="/">Voltar para a página inicial</router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  // Nenhum script necessário para esta view
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 50px;
  }
  </style>