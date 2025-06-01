<template>
  <div class="offline-content-list">
    <h3>Materiais Baixados</h3>
    <ul v-if="materials.length > 0">
      <li v-for="(material, index) in materials" :key="index" class="material-item">
        {{ material.name }}
        <button @click="removeMaterial(index)">Excluir</button>
      </li>
    </ul>
    <p v-else>Nenhum material baixado ainda.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  materials: { name: string; url: string }[];
}>();

// Acessa a prop explicitamente para evitar o erro
console.log(props.materials);


// Emite eventos para remover materiais
const emit = defineEmits(['remove-material']);

function removeMaterial(index: number) {
  if (confirm('Tem certeza que deseja excluir este material?')) {
    // Emite o evento com o índice do material a ser removido
    emit('remove-material', index);
    alert('Material removido com sucesso!');
  }
}
</script>

<style scoped>
.offline-content-list {
  padding: 20px;
}

.material-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
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