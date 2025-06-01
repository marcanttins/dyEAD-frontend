<template>
  <div class="course-details" v-if="!loading">
    <template v-if="course">
      <h2>{{ course.title }}</h2>
      <p>
        <strong>Instrutor:</strong>
        {{ course.instructor_id || course.instructor_name || 'Não informado' }}
      </p>
      <p>
        <strong>Descrição:</strong> {{ course.description }}
      </p>

      <h3>Materiais Didáticos</h3>
      <ul v-if="materials.length > 0">
        <li v-for="material in materials" :key="material.id">
          <a :href="material.url" target="_blank">{{ material.name }}</a>
        </li>
      </ul>
      <p v-else>Nenhum material disponível.</p>
    </template>
    <template v-else>
      <p>Nenhum curso encontrado.</p>
    </template>
  </div>
  
  <div v-else>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-else>Carregando detalhes do curso...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { Course, Material } from '@/types/interfaces';

// Obtém o ID do curso da rota
const route = useRoute();
const courseId = parseInt(route.params.id as string, 10);

// Estados reativos
const course = ref<Course | null>(null);
const materials = ref<Material[]>([]);
const loading = ref(true);
const error = ref('');

// Função para buscar os detalhes do curso e materiais
onMounted(async () => {
  try {
    // Requisição para obter os detalhes do curso
    const courseResponse = await axios.get(`/api/courses/${courseId}`);
    // A resposta pode vir diretamente ou embutida em uma chave "data"
    course.value = courseResponse.data;

    // Requisição para obter os materiais associados
    const materialsResponse = await axios.get(`/api/courses/${courseId}/materials`);
    materials.value = materialsResponse.data;
  } catch (err: any) {
    console.error('Erro ao carregar detalhes do curso:', err);
    error.value = err.message || 'Não foi possível carregar os detalhes do curso. Tente novamente.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.course-details {
  padding: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
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
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.error {
  color: #d32f2f;
  font-weight: bold;
  text-align: center;
}
</style>
