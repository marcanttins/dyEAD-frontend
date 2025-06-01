<template>
    <div class="language-selector">
      <label>Idioma Padrão:</label>
      <select v-model="language" @change="updateLanguage">
        <option value="pt-br">Português</option>
        <option value="en-us">Inglês</option>
        <option value="es-es">Espanhol</option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    modelValue: string;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  const language = ref(props.modelValue);
  
  function updateLanguage() {
    emit('update:modelValue', language.value);
  }
  </script>
  
  <style scoped>
  .language-selector {
    margin-top: 10px;
  }
  
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>