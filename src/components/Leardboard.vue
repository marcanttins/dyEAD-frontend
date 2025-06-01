<template>
    <div class="leaderboard">
      <h3>Raking Global</h3>
      <ul v-if="students.length > 0">
        <li v-for="(student, index) in students" :key="student.id">
          {{ index + 1 }}. {{ student.name }} - {{ student.points }} pontos
        </li>
      </ul>
      <p v-else>Nenhum aluno no ranking.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    students: { id: number; name: string; points: number }[];
  }>();
  </script>
  
  <style scoped>
  .leaderboard {
    padding: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>