<template>
  <div class="user-management">
    <h2>Gerenciamento de Usuários</h2>
    <ul v-if="users.length > 0">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.role }})
        <button @click="deleteUser(user.id)">Excluir</button>
      </li>
    </ul>
    <p v-else>Nenhum usuário encontrado.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types/interfaces'; 

const authStore = useAuthStore();
const users = ref<User[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    });
    users.value = response.data as User[];
  } catch (error: any) {
    console.error('Erro ao carregar usuários:', error);
  }
});

async function deleteUser(userId: number) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    try {
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      });
      // Atualiza o array, removendo o usuário excluído
      users.value = users.value.filter((user) => user.id !== userId);
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário. Tente novamente.');
    }
  }
}
</script>

<style scoped>
.user-management {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  padding: 5px 10px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #c62828;
}
</style>
