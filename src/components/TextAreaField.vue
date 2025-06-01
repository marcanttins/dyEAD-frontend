<!-- src/components/TextareaField.vue -->
<template>
    <div class="textarea-field">
      <label>{{ label }}</label>
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        class="textarea"
      ></textarea>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  defineProps<{
    modelValue: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  }>();
  </script>
  
  <style scoped>
  .textarea-field {
    @apply mb-4;
  }
  
  label {
    @apply block mb-2 font-bold;
  }
  
  textarea {
    @apply w-full p-2 border border-gray-300 rounded-lg;
    @apply resize-none focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
  
  .textarea:focus {
    @apply ring-blue-500;
  }
  </style>