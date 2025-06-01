<template>
    <div class="app-layout">
      <header>
        <Navbar />
      </header>
      <main>
        <slot />
      </main>
      <footer>
        <p>&copy; 2023 EAD Platform. Todos os direitos reservados.</p>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import Navbar from './Navbar.vue';
  </script>
  
  <style scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background-color: #42b983;
    color: white;
    padding: 10px;
  }
  
  main {
    flex: 1;
    padding: 20px;
  }
  
  footer {
    background-color: #35495e;
    color: white;
    text-align: center;
    padding: 10px;
  }
  </style>