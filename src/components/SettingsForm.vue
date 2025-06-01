<template>
    <form @submit.prevent="handleSubmit">
      <InputField 
        v-model="settings.layout" 
        label="Layout Padrão" 
        type="text" 
        placeholder="Ex.: light" 
        required
      />
      <LanguageSelector v-model="settings.language" />
      <TextareaField 
        v-model="settings.privacyPolicy" 
        label="Política de Privacidade" 
        placeholder="Insira a política de privacidade..." 
        required
      />
      <Button :isLoading="loading" @click="handleSubmit">Salvar Configurações</Button>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  import InputField from '@/components/InputField.vue';
  import LanguageSelector from '@/components/LanguageSelector.vue';
  import TextareaField from '@/components/TextAreaField.vue';
  import Button from '@/components/Button.vue';
  
  const props = defineProps<{
    settings: { layout: string; language: string; privacyPolicy: string };
  }>();
  
  const emit = defineEmits(['submit']);
  const loading = ref(false);
  
  async function handleSubmit() {
    loading.value = true;
  
    try {
      emit('submit', { ...props.settings });
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações. Tente novamente.');
    } finally {
      loading.value = false;
    }
  }
  </script>
  
  <style scoped>
  form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>