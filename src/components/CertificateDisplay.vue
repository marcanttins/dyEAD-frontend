<template>
  <div class="certificate-display">
    <h3>Certificado de Conclusão</h3>
    <img :src="certificate.image" :alt="certificate.courseTitle" />
    <p><strong>Nome:</strong> {{ certificate.name }}</p>
    <p><strong>Curso:</strong> {{ certificate.courseTitle }}</p>
    <p><strong>Data de Conclusão:</strong> {{ formatDate(certificate.date) }}</p>
    <DownloadButton :url="certificate.pdfUrl" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import DownloadButton from './DownloadButton.vue';

// Definição das props com base no tipo correto de certificate
const props = defineProps<{
  certificate: {
    id: number;
    name: string;
    courseTitle: string; // Substituímos 'title' por 'courseTitle'
    date: string;
    image: string;
    pdfUrl: string;
  };
}>();

// Função para formatar a data
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// Usamos as props explicitamente aqui para evitar o erro "props is declared but its value is never read"
console.log(props.certificate); // Exemplo de uso das props (não remova se precisar de validação ou processamento adicional)
</script>

<style scoped>
.certificate-display {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

p {
  margin-bottom: 5px;
}
</style>