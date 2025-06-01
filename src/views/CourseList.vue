<template>
  <div class="course-list">
    <h2>Cursos Disponíveis</h2>
    <ul v-if="courses.length > 0">
      <li v-for="course in courses" :key="course.id" class="course-item">
        <router-link :to="`/course/${course.id}`">
          <img :src="course.image_url" :alt="course.title" class="course-image" />
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
        </router-link>image_url: string; // URL da imagem do certificado
      </li>
    </ul>
    <p v-else>Nenhum curso disponível no momento.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Course } from '@/types/interfaces'; // Importa a interface Course

// Tipa o array de cursos como Course[]
const courses = ref<Course[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/courses');
    
    // Garante que a resposta seja um array válido de objetos Course
    if (Array.isArray(response.data)) {
      courses.value = response.data as Course[];
    } else {
      console.error('Resposta da API inválida. Esperava-se um array de cursos.');
    }
  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
  }
});
</script>

<style scoped>
.course-list {
  padding: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.course-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-image {
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