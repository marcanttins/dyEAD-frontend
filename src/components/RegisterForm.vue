<template>
    <form @submit.prevent="handleSubmit">
      <input v-model="name" type="text" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <select v-model="role" required>
        <option value="aluno">Aluno</option>
        <option value="professor">Professor</option>
      </select>
      <button type="submit">Cadastrar</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const role = ref('aluno');
  const emit = defineEmits(['submit']);
  
  function handleSubmit() {
    emit('submit', { name: name.value, email: email.value, password: password.value, role: role.value });
  }
  </script>
  
  <style scoped>
  input,
  select {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #35495e;
  }
  </style>