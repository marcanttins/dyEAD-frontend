<template>
  <aside class="sidebar">
    <ul>
      <li v-if="isStudent">
        <router-link to="/student">Painel do Aluno</router-link>
      </li>
      <li v-if="isTeacher">
        <router-link to="/teacher">Painel do Professor</router-link>
      </li>
      <li v-if="isAdmin">
        <router-link to="/admin">Painel de Administração</router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Verifica o papel do usuário, utilizando o objeto 'user' da store
const isStudent = computed(() => authStore.user?.role === 'aluno');
const isTeacher = computed(() => authStore.user?.role === 'professor');
const isAdmin = computed(() => authStore.user?.role === 'admin');
</script>

<style scoped>
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #35495e;
  color: white;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
