<template>
  <div class="user-table">
    <h3>Gerenciamento de Usuários</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Papel</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user.id)">Editar</button>
            <button @click="deleteUser(user.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
/* import { ref, defineProps } from 'vue'; */
import { defineProps } from 'vue';

// Define as props recebidas pelo componente
const props = defineProps<{
  users: { id: number; name: string; email: string; role: string }[];
}>();
// Acessando as props explicitamente
const users = props.users;


function editUser(userId: number) {
  alert(`Funcionalidade de edição de usuário em desenvolvimento! ID: ${userId}`);
}

function deleteUser(userId: number) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    alert(`Usuário com ID ${userId} excluído com sucesso!`);
  }
}
</script>

<style scoped>
.user-table {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}

button:nth-child(2) {
  background-color: #d32f2f;
}

button:nth-child(2):hover {
  background-color: #c62828;
}
</style>