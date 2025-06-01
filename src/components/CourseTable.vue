<template>
  <div class="course-table">
    <h3>Gerenciamento de Cursos</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Categoria</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.id }}</td>
          <td>{{ course.title }}</td>
          <td>{{ course.category }}</td>
          <td>{{ course.status }}</td>
          <td>
            <button @click="approveCourse(course.id)">Aprovar</button>
            <button @click="editCourse(course.id)">Editar</button>
            <button @click="deleteCourse(course.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  courses: { id: number; title: string; category: string; status: string }[];
}>();

// Acessando as props explicitamente
const courses = props.courses;

// Função para aprovar um curso
function approveCourse(courseId: number) {
  alert(`Curso com ID ${courseId} aprovado com sucesso!`);
}

// Função para editar um curso
function editCourse(courseId: number) {
  alert(`Funcionalidade de edição de curso em desenvolvimento! ID: ${courseId}`);
}

// Função para excluir um curso
function deleteCourse(courseId: number) {
  if (confirm('Tem certeza que deseja excluir este curso?')) {
    alert(`Curso com ID ${courseId} excluído com sucesso!`);
  }
}
</script>

<style scoped>
.course-table {
padding: 20px;
}

table {
width: 100%;
border-collapse: collapse;
}

th,
td {
padding: 10px;
text-align: left;
border-bottom: 1px solid #ddd;
}

button {
margin: 0 5px;
padding: 5px 10px;
background-color: #42b983;
color: white;
border: none;
border-radius: 4px;
cursor: pointer;
}

button:hover {
background-color: #35495e;
}

button:nth-child(3) {
background-color: #d32f2f;
}

button:nth-child(3):hover {
background-color: #c62828;
}
</style>
