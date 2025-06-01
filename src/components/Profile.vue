<template>
  <div class="profile">
    <h2>Meu Perfil</h2>

    <!-- Formulário para edição de perfil -->
    <form @submit.prevent="handleSubmit">
      <InputField 
        v-model="localUser.name" 
        label="Nome Completo" 
        type="text" 
        placeholder="Digite seu nome" 
        required 
      />
      <InputField 
        v-model="localUser.email" 
        label="Email" 
        type="email" 
        placeholder="Digite seu email" 
        required 
      />
      <InputField 
        v-model="localUser.password" 
        label="Nova Senha (opcional)" 
        type="password" 
        placeholder="Digite sua nova senha" 
      />
      <Button :isLoading="loading" @click="handleSubmit">Salvar Alterações</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';

// Propriedades recebidas pelo componente
const props = defineProps<{
  user: {
    name: string;
    email: string;
    password?: string; // Campo opcional
  };
}>();

// Estado local reativo para evitar problemas com v-model
const localUser = ref({
  name: props.user.name,
  email: props.user.email,
  password: props.user.password || '', // Fallback para password undefined
});

// Eventos emitidos pelo componente
const emit = defineEmits(['update:user']);

// Estado local para controle de carregamento
const loading = ref(false);

// Função para lidar com o envio do formulário
async function handleSubmit() {
  loading.value = true;

  try {
    // Emite os dados atualizados do usuário
    emit('update:user', { ...localUser.value });
    alert('Perfil atualizado com sucesso!');
  } catch (error) {
    alert('Erro ao atualizar perfil. Tente novamente.');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Estilos permanecem os mesmos */
</style>