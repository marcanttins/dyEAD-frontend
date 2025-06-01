<template>
  <div class="certificate">
    <h2>Certificado de Conclusão</h2>
    <div class="certificate-content" v-if="certificate">
      <img :src="certificate.image_url" alt="Certificado" />
      <p><strong>Nome:</strong> {{ certificate.name }}</p>
      <p><strong>Curso:</strong> {{ certificate.courseTitle }}</p>
      <p><strong>Data de Conclusão:</strong> {{ certificate.issue_date }}</p>
      <button @click="downloadCertificate">Baixar Certificado</button>
    </div>
    <p v-else>Nenhum certificado disponível.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { Certificate } from '@/types/interfaces';

const route = useRoute();
const courseId = parseInt(route.params.id as string);

// Tipagem corrigida: certificate agora é do tipo Certificate (objeto único)
const certificate = ref<Certificate | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/courses/${courseId}/certificate`);

    // Verifica se a resposta é um objeto único ou um array
    if (Array.isArray(response.data)) {
      if (response.data.length > 0) {
        certificate.value = response.data[0] as Certificate; // Seleciona o primeiro certificado do array
      }
    } else {
      certificate.value = response.data as Certificate; // Atribui diretamente se for um objeto único
    }
  } catch (error) {
    console.error('Erro ao carregar certificado:', error);
  }
});

function downloadCertificate() {
  if (certificate.value?.file_url) { // Corrigido para usar file_url (não file_Url)
    window.open(certificate.value.file_url, '_blank');
  } else {
    alert('Certificado não disponível para download.');
  }
}
</script>

<style scoped>
.certificate {
  padding: 20px;
  text-align: center;
}

.certificate-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}
</style>