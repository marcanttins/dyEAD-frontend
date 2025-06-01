<template>
    <div class="notification-composer">
      <h3>Enviar Notificação</h3>
      <InputField v-model="notification.subject" label="Assunto" type="text" required />
      <TextareaField v-model="notification.body" label="Mensagem" placeholder="Escreva sua mensagem..." required />
      <Button :isLoading="loading" @click="sendNotification">Enviar</Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import InputField from '@/components/InputField.vue';
  import TextareaField from '@/components/TextAreaField.vue';
  import Button from '@/components/Button.vue';
  
  const notification = ref({
    subject: '',
    body: '',
  });
  
  const loading = ref(false);
  
  async function sendNotification() {
    if (!notification.value.subject.trim() || !notification.value.body.trim()) return;
  
    loading.value = true;
  
    try {
      await axios.post('/api/notifications', notification.value);
      alert('Notificação enviada com sucesso!');
      notification.value.subject = '';
      notification.value.body = '';
    } catch (error) {
      alert('Erro ao enviar notificação.');
    } finally {
      loading.value = false;
    }
  }
  </script>
  
  <style scoped>
  .notification-composer {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  h3 {
    margin-bottom: 20px;
  }
  </style>