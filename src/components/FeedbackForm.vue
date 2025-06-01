<template>
    <form @submit.prevent="handleSubmit">
      <InputField 
        v-model="feedback.text" 
        label="Mensagem" 
        type="textarea" 
        placeholder="Escreva seu feedback..." 
        required
      />
      <Button :isLoading="loading" @click="handleSubmit">Enviar Feedback</Button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import InputField from '@/components/InputField.vue';
  import Button from '@/components/Button.vue';
  
  const feedback = ref({ text: '' });
  const loading = ref(false);
  
  async function handleSubmit() {
    if (!feedback.value.text.trim()) return;
  
    loading.value = true;
  
    try {
      await axios.post('/api/feedback', { text: feedback.value.text });
      alert('Feedback enviado com sucesso!');
      feedback.value.text = '';
    } catch (error) {
      alert('Erro ao enviar feedback. Tente novamente.');
    } finally {
      loading.value = false;
    }
  }
  </script>
  
  <style scoped>
  form {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  </style>