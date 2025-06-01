<template>
  <form @submit.prevent="handleSubmit">
    <InputField 
      v-model="user.name" 
      label="Nome Completo" 
      type="text" 
      placeholder="Digite o nome" 
      required 
    />
    <InputField 
      v-model="user.email" 
      label="Email" 
      type="email" 
      placeholder="Digite o email" 
      required 
    />
    <InputField 
      v-model="user.password" 
      label="Senha (opcional)" 
      type="password" 
      placeholder="Digite a senha" 
    />
    <SelectField 
      v-model="user.role" 
      label="Papel" 
      :options="formattedRoles" 
      required 
    />
    <Button :isLoading="loading" @click="handleSubmit">{{ isEdit ? 'Salvar Alterações' : 'Criar Usuário' }}</Button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import InputField from '@/components/InputField.vue';
import SelectField from '@/components/SelectField.vue';
import Button from '@/components/Button.vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  user?: Partial<{ id: number; name: string; email: string; password?: string; role: string }>;
  isEdit?: boolean;
}>();

// Cria uma variável reativa com valores padrão para evitar undefined
const user = computed(() => ({
  ...props.user,
  name: props.user?.name || '',
  email: props.user?.email || '',
  password: props.user?.password || '',
  role: props.user?.role || 'aluno',
}));

// Formata o array de papéis para o formato esperado pelo SelectField
const formattedRoles = computed(() => [
  { label: 'Aluno', value: 'aluno' },
  { label: 'Professor', value: 'professor' },
  { label: 'Administrador', value: 'admin' },
]);

const emit = defineEmits(['submit']);
const loading = ref(false);

async function handleSubmit() {
  if (!props.user) {
    alert('Dados do usuário não foram fornecidos.');
    return;
  }

  loading.value = true;

  try {
    // Emite os dados atualizados do usuário
    emit('submit', { ...user.value });
    alert(`${props.isEdit ? 'Alterações salvas' : 'Novo usuário criado'} com sucesso!`);
  } catch (error) {
    alert('Erro ao salvar usuário. Tente novamente.');
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