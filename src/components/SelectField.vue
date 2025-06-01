<template>
    <div class="select-field">
      <label>{{ label }}</label>
      <select :value="modelValue" @change="updateValue">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  <template>
    <div class="select-field">
      <label>{{ label }}</label>
      <select :value="modelValue" @input="updateValue">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    modelValue: string;
    label: string;
    options: { label: string; value: string }[];
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  function updateValue(event: Event) {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
  }
  </script>
  
  <style scoped>
  .select-field {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    modelValue: string;
    label: string;
    options: { label: string; value: string }[];
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  function updateValue(event: Event) {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
  }
  </script>
  
  <style scoped>
  .select-field {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>