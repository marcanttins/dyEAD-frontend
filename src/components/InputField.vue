<template>
  <div class="input-field">
    <label>{{ label }}</label>
    <input 
      :type="type" 
      :placeholder="placeholder" 
      :value="modelValue" 
      @input="updateValue" 
      :required="isRequired"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  modelValue: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}>();

// Transforma a prop "required" em uma variável local para uso no template
const isRequired = props.required ?? false; // Usa o valor da prop "required" ou fallback para false

// Define os eventos emitidos pelo componente
const emit = defineEmits(['update:modelValue']);

// Função para atualizar o valor do input
function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<style scoped>
.input-field {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>