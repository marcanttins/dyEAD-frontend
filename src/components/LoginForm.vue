<template>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const email = ref('');
  const password = ref('');
  const emit = defineEmits(['submit']);
  
  function handleSubmit() {
    emit('submit', { email: email.value, password: password.value });
  }
  </script>
  
  <style scoped>
  input {
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