<template>
    <div class="register">
      <h1>Registro de Aluno</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label>Nome:</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const message = ref('')
  
  async function handleSubmit() {
    try {
      const response = await axios.post('/api/users/register/student', {
        name: name.value,
        email: email.value,
        password: password.value
      })
      message.value = response.data.message
    } catch (error: any) {
      message.value = error.response?.data.message || 'Erro no registro'
    }
  }
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .register form div {
    margin-bottom: 1rem;
  }
  .register label {
    display: block;
    margin-bottom: 0.25rem;
  }
  .register input {
    width: 100%;
    padding: 0.5rem;
  }
  </style>
  