<template>
  <div class="home">
    <h1>Bem-vindo à Plataforma dyEAD</h1>
    <p>Explore nossos cursos e comece sua jornada de aprendizado hoje!</p>

    <h2>Cursos Destacados</h2>
    <ul v-if="featuredCourses.length > 0">
      <li v-for="course in featuredCourses" :key="course.id">
        <router-link :to="`/course/${course.id}`">{{ course.title }}</router-link>
      </li>
    </ul>
    <p v-else class="no-courses">Nenhum curso destacado no momento.</p>

    <router-link to="/login" class="btn">Entrar</router-link>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Course } from '@/types/interfaces';

//const featuredCourses = ref([]);  
const featuredCourses = ref<Course[]>([]);


onMounted(async () => {
  try {
    const response = await axios.get('/courses/featured');
    featuredCourses.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar cursos destacados:', error);
  }
});
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.btn:hover {
  background-color: #35495e;
}

.no-courses {
  margin-bottom: 20px;
  /* Ajuste conforme necessário */
}
</style>