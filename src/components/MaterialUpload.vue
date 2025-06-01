<template>
    <div class="material-upload">
      <h3>Upload de Materiais Didáticos</h3>
      <input type="file" @change="handleFileChange" accept=".pdf,.mp4,.pptx" multiple />
      <ul v-if="materials.length > 0">
        <li v-for="(material, index) in materials" :key="index">
          {{ material.name }}
          <button @click="removeMaterial(index)">Remover</button>
        </li>
      </ul>
      <p v-else>Nenhum material selecionado.</p>
      <Button :isLoading="loading" @click="uploadMaterials">Enviar Materiais</Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Button from '@/components/Button.vue';

  const materials = ref<{ name: string; file: File }[]>([]);
  const loading = ref(false);
  
  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      Array.from(target.files).forEach((file) => {
        materials.value.push({ name: file.name, file });
      });
    }
  }
  
  function removeMaterial(index: number) {
    materials.value.splice(index, 1);
  }
  
  async function uploadMaterials() {
    if (materials.value.length === 0) return;
  
    loading.value = true;
  
    try {
      // Simulação de upload
      console.log('Materiais enviados:', materials.value.map((m) => m.name));
      alert('Materiais enviados com sucesso!');
      materials.value = [];
    } catch (error) {
      alert('Erro ao enviar materiais.');
    } finally {
      loading.value = false;
    }
  }
  </script>
  
  <style scoped>
  .material-upload {
    padding: 20px;
  }
  
  input[type="file"] {
    display: block;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  button {
    background-color: #d32f2f;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c62828;
  }
  </style>