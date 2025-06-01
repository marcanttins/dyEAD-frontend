<template>

  <form @submit.prevent="handleSubmit">
    <InputField v-model="courseData.title" label="Título do Curso" type="text"
      placeholder="Ex.: Introdução à Programação" required />
    <TextareaField v-model="courseData.description" label="Descrição do Curso" placeholder="Descreva o curso..."
      required />
    <SelectField v-model="courseData.category" label="Categoria" :options="categories" required />
    <Button :isLoading="loading" @click="handleSubmit">{{ isEdit ? 'Salvar Alterações' : 'Criar Curso' }}</Button>
  </form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import InputField from '@/components/InputField.vue';
import TextareaField from '@/components/TextAreaField.vue';
import SelectField from '@/components/SelectField.vue';
import Button from '@/components/Button.vue';

interface Course {
  title: string;
  description: string;
  category: string;
}

const props = defineProps<{
  course?: Course;
  isEdit?: boolean;
}>();

const emit = defineEmits(['submit']);
const loading = ref(false);

// Variável local para dados do curso
const courseData = ref<Course>({
  title: props.course?.title || '',
  description: props.course?.description || '',
  category: props.course?.category || ''
});

// Opções formatadas para SelectField
const categories = [
  { label: 'Tecnologia', value: 'tecnologia' },
  { label: 'Negócios', value: 'negocios' },
  { label: 'Arte', value: 'arte' },
  { label: 'Ciência', value: 'ciencia' }
];

function handleSubmit() {
  loading.value = true;

  // Emite os dados locais
  emit('submit', courseData.value);

  setTimeout(() => {
    loading.value = false;
  }, 1000);
}
</script>

<style scoped>
form {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
</style>