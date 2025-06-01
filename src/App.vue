<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Header: usa slot "header" com conteúdo padrão -->
    <header v-if="!isLoginRoute">
      <slot name="header">
        <Navbar />
      </slot>
    </header>

    <!-- Conteúdo principal: renderizado via router-view -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer: usa slot "footer" com conteúdo padrão -->
    <footer v-if="$slots.footer || !$slots.footer">
      <slot name="footer">
        <Footer />
      </slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Verifica se a rota atual é a rota de login
//const isLoginRoute = computed(() => route.name === 'Login');
const isLoginRoute = computed(() => ['Login', 'Register', 'ForgotPassword'].includes(route.name as string));
// Lógica adicional pode ser adicionada aqui, como inicialização de serviços globais
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-bottom: 20px; /* Adiciona espaço entre o conteúdo principal e o rodapé */
}
</style>