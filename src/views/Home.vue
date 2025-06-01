<template>
    <div>
      <!-- Cabeçalho -->
      <header class="header">
        <nav class="navbar">
          <!-- Início -->
          <div class="nav-item">
            <router-link to="/">Início</router-link>
          </div>
  
          <!-- Cursos com dropdown -->
          <div class="nav-item expandable"
               @mouseover="showCourses = true" 
               @mouseleave="showCourses = false"
               @click="toggleCourses">
            <span>Cursos</span>
            <div v-if="showCourses" class="dropdown">
              <!-- Exemplo de itens; substitua por dados dinâmicos se necessário -->
              <router-link to="/courses">Todos os Cursos</router-link>
              <router-link to="/courses/popular">Populares</router-link>
              <router-link to="/courses/new">Novos</router-link>
            </div>
          </div>
  
          <!-- Recursos com dropdown -->
          <div class="nav-item expandable"
               @mouseover="showResources = true" 
               @mouseleave="showResources = false"
               @click="toggleResources">
            <span>Recursos</span>
            <div v-if="showResources" class="dropdown">
              <router-link to="/about">Quem Somos</router-link>
              <router-link to="/faq">FAQ</router-link>
              <router-link to="/support">Suporte</router-link>
            </div>
          </div>
  
          <!-- Entrar -->
          <div class="nav-item">
            <router-link to="/login">Entrar</router-link>
          </div>
  
          <!-- Cadastrar -->
          <div class="nav-item">
            <router-link to="/register">Cadastrar</router-link>
          </div>
        </nav>
      </header>
  
      <!-- Conteúdo Principal -->
      <main class="home-content">
        <!-- Seu conteúdo principal aqui -->
        <h1>Bem-vindo à Plataforma dyEAD</h1>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const showCourses = ref(false);
  const showResources = ref(false);
  
  function toggleCourses() {
    showCourses.value = !showCourses.value;
  }
  
  function toggleResources() {
    showResources.value = !showResources.value;
  }
  </script>
  
  <style scoped>
  /* Cabeçalho e Navbar */
  .header {
    background-color: #43f309;
    padding: 1rem;
    display: flex;
    justify-content: center;
  }
  
  .navbar {
    display: flex;
    align-items: center;
    gap: 2rem; /* Espaçamento entre os itens */
    width: 70%; /* Ocupa 70% do cabeçalho */
    font-size: 1.25rem; /* Aumenta o tamanho da fonte */
    color: #fff;
  }
  
  /* Itens do menu */
  .nav-item {
    position: relative;
    cursor: pointer;
  }
  
  .nav-item a {
    color: inherit;
    text-decoration: none;
  }
  
  .nav-item a:hover {
    text-decoration: underline;
  }
  
  /* Dropdown */
  .expandable .dropdown {
    position: absolute;
    top: 110%;
    left: 0;
    background-color: #fff;
    color: #000;
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-width: 150px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .expandable .dropdown a {
    color: #000;
    text-decoration: none;
  }
  
  .expandable .dropdown a:hover {
    text-decoration: underline;
  }
  
  /* Conteúdo Principal */
  .home-content {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
    text-align: center;
  }
  </style>
  