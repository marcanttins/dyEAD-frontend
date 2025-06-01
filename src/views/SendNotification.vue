<template>
    <div class="send-notification">
      <h2>Enviar Notificação</h2>
      <form @submit.prevent="handleSendNotification">
        <!-- Campo para selecionar o destinatário -->
        <SelectField 
          v-model="selectedRecipient" 
          label="Destinatário" 
          :options="recipients" 
          required 
        />
  
        <!-- Campo para o título da notificação -->
        <InputField 
          v-model="notification.title" 
          label="Título" 
          type="text" 
          placeholder="Ex.: Novo curso disponível!" 
          required 
        />
  
        <!-- Campo para a mensagem da notificação -->
        <TextareaField 
          v-model="notification.message" 
          label="Mensagem" 
          placeholder="Escreva sua mensagem..." 
          required 
        />
  
        <!-- Botão para enviar notificação -->
        <Button :isLoading="loading" @click="handleSendNotification">Enviar Notificação</Button>
      </form>
  
      <!-- Feedback ao usuário -->
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'; // Removida a importação desnecessária de defineComponent
  import axios from 'axios';
  import InputField from '@/components/InputField.vue';
  import TextareaField from '@/components/TextAreaField.vue';
  import SelectField from '@/components/SelectField.vue';
  import Button from '@/components/Button.vue';
  
  // Estado inicial do formulário
  const notification = ref({
    title: '',
    message: '',
  });
  
  // Estado para feedbacks
  const loading = ref(false);
  const successMessage = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  
  // Opções de destinatários (exemplo)
  const recipients = [
    { label: 'Todos os Alunos', value: 'aluno' },
    { label: 'Todos os Professores', value: 'professor' },
    { label: 'Administradores', value: 'admin' },
  ];
  const selectedRecipient = ref('aluno'); // Valor padrão
  
  // Função para enviar notificação
  async function handleSendNotification() {
    loading.value = true;
    successMessage.value = null;
    errorMessage.value = null;
  
    try {
      // Verifica se todos os campos estão preenchidos
      if (!notification.value.title.trim() || !notification.value.message.trim()) {
        throw new Error('Preencha todos os campos.');
      }
  
      // Envia a notificação para o backend
      const response = await axios.post('/api/notifications/send', {
        recipient_role: selectedRecipient.value,
        title: notification.value.title,
        message: notification.value.message,
      });
  
      // Sucesso ao enviar notificação
      successMessage.value = response.data.message || 'Notificação enviada com sucesso!';
    } catch (error) {
      // Erro ao enviar notificação
      errorMessage.value = (error as any).response?.data?.message || 'Erro ao enviar notificação.';
    } finally {
      // Limpa o estado de carregamento
      loading.value = false;
    }
  }
  </script>
  
  <style scoped>
  .send-notification {
    padding: 20px;
    text-align: center;
  }
  
  .success {
    color: #42b983;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .error {
    color: #d32f2f;
    font-weight: bold;
    margin-top: 10px;
  }
  </style>