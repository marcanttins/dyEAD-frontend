<template>
  <div v-if="loading">Verificando permissões...</div>
  <div v-else-if="hasAccess">
    <slot />
  </div>
  <div v-else>
    <p>Você não tem permissão para acessar este recurso.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{
  requiredRole?: string; // Papel necessário para acessar o conteúdo
}>();

const authStore = useAuthStore();
const loading = ref(true);
const hasAccess = ref(false);

onMounted(() => {
  // Simula uma verificação de permissões com um tempo de espera de 500ms
  setTimeout(() => {
    loading.value = false;

    // Verifica se o usuário está autenticado
    if (!authStore.isLoggedIn) {
      hasAccess.value = false;
      return;
    }

    // Se o papel requerido foi especificado, verifica se o usuário possui o papel correto.
    // Considera que a store armazena os dados do usuário em authStore.user.
    if (props.requiredRole) {
      hasAccess.value = authStore.user?.role === props.requiredRole;
    } else {
      hasAccess.value = true;
    }
  }, 500);
});
</script>

<style scoped>
/* Estilização básica */
div {
  padding: 20px;
  text-align: center;
}

p {
  color: #d32f2f; /* Cor vermelha para mensagens de erro */
  font-weight: bold;
}
</style>
