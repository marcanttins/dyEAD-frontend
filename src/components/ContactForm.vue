<template>
    <form @submit.prevent="handleSubmit">
      <InputField 
        v-model="contact.name" 
        label="Nome Completo" 
        type="text" 
        placeholder="Digite seu nome" 
        required
      />
      <InputField 
        v-model="contact.email" 
        label="Email" 
        type="email" 
        placeholder="Digite seu email" 
        required 
      />
      <InputField 
        v-model="contact.message" 
        label="Mensagem" 
        type="textarea" 
        placeholder="Escreva sua mensagem..." 
        required 
      />
      <Button :isLoading="loading" @click="handleSubmit">Enviar</Button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import InputField from '@/components/InputField.vue';
  import Button from '@/components/Button.vue';
  
  const contact = ref({ name: '', email: '', message: '' });
  const loading = ref(false);
  
  async function handleSubmit() {
    if (!contact.value.name.trim() || !contact.value.email.trim() || !contact.value.message.trim()) return;
  
    loading.value = true;
  
    try {
      await axios.post('/api/contact', { ...contact.value });
      alert('Mensagem enviada com sucesso!');
      contact.value.name = '';
      contact.value.email = '';
      contact.value.message = '';
    } catch (error) {
      alert('Erro ao enviar mensagem. Tente novamente.');
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
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  </style>