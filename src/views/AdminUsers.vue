<template>
  <div class="admin-users p-6">
    <h2 class="text-2xl mb-4">Gerenciamento de Usuários</h2>
    <button
      class="new-user-btn mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      @click="openCreateModal"
    >
      Novo Usuário
    </button>

    <!-- Carregando -->
    <p v-if="loading">Carregando usuários...</p>

    <!-- Sem usuários -->
    <p v-else-if="!users.length">Nenhum usuário encontrado.</p>

    <!-- Tabela -->
    <table v-else class="min-w-full bg-white border-collapse mb-4">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Nome</th>
          <th class="px-4 py-2 border">Email</th>
          <th class="px-4 py-2 border">Papel</th>
          <th class="px-4 py-2 border">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="u in users"
          :key="u.id"
          class="hover:bg-gray-50"
        >
          <td class="px-4 py-2 border">{{ u.id }}</td>
          <td class="px-4 py-2 border">{{ u.name }}</td>
          <td class="px-4 py-2 border">{{ u.email }}</td>
          <td class="px-4 py-2 border">{{ u.role }}</td>
          <td class="px-4 py-2 border space-x-2">
            <button
              class="edit-btn px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              @click="openEditModal(u)"
            >
              Editar
            </button>
            <button
              class="delete-btn px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              @click="deleteUser(u.id)"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginação -->
    <div v-if="totalPages > 1" class="flex items-center space-x-4">
      <button
        :disabled="page === 1"
        @click="prevPage"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>Página {{ page }} de {{ totalPages }} — Total: {{ totalItems }}</span>
      <button
        :disabled="page === totalPages"
        @click="nextPage"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>

    <!-- Modal de criação/edição -->
    <div v-if="showModal" class="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div class="modal bg-white p-6 rounded shadow-lg w-80">
        <h3 class="text-xl mb-4">{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group mb-3">
            <label class="block mb-1" for="name">Nome:</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full px-2 py-1 border rounded"
            />
          </div>
          <div class="form-group mb-3">
            <label class="block mb-1" for="email">Email:</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-2 py-1 border rounded"
            />
          </div>
          <div class="form-group mb-4">
            <label class="block mb-1" for="role">Papel:</label>
            <select
              id="role"
              v-model="formData.role"
              required
              class="w-full px-2 py-1 border rounded"
            >
              <option value="aluno">Aluno</option>
              <option value="instrutor">Instrutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="modal-actions text-right">
            <button
              type="button"
              class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 mr-2"
              @click="closeModal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {{ isEditing ? 'Salvar' : 'Criar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'
import { useAuthStore, User } from '@/stores/auth'

const router    = useRouter()
const auth      = useAuthStore()

const users      = ref<User[]>([])
const loading    = ref(false)
const page       = ref(1)
const perPage    = ref(10)
const totalPages = ref(1)
const totalItems = ref(0)

const showModal  = ref(false)
const isEditing  = ref(false)
const formData   = reactive<Partial<User>>({
  id: 0,
  name: '',
  email: '',
  role: 'aluno'
})

async function fetchUsers() {
  if (!auth.isLoggedIn) {
    return router.push({ name: 'login' })
  }
  loading.value = true
  try {
    const response = await api.get('/users', {
      params: { page: page.value, per_page: perPage.value }
    })
    const data = response.data
    users.value      = data.items
    page.value       = data.page
    totalPages.value = data.pages
    totalItems.value = data.total
  } catch (err: any) {
    const status = err.response?.status ?? 'Sem resposta'
    const msg    = err.response?.data?.message ?? err.message
    console.error(`Erro de servidor: [${status}] ${msg}`)
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  isEditing.value = false
  Object.assign(formData, { id: 0, name: '', email: '', role: 'aluno' })
  showModal.value = true
}

function openEditModal(u: User) {
  isEditing.value = true
  Object.assign(formData, {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role
  })
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function submitForm() {
  try {
    if (isEditing.value && formData.id) {
      await api.put(`/users/${formData.id}`, {
        name: formData.name,
        email: formData.email,
        role: formData.role
      })
    } else {
      await api.post('/users', {
        name: formData.name,
        email: formData.email,
        role: formData.role
      })
    }
    closeModal()
    fetchUsers()
  } catch (err: any) {
    const status = err.response?.status ?? 'Sem resposta'
    const msg    = err.response?.data?.message ?? err.message
    console.error(`Falha ao salvar usuário: [${status}] ${msg}`)
  }
}

async function deleteUser(id: number) {
  if (!confirm('Confirma a exclusão deste usuário?')) return
  try {
    await api.delete(`/users/${id}`)
    fetchUsers()
  } catch (err: any) {
    const status = err.response?.status ?? 'Sem resposta'
    const msg    = err.response?.data?.message ?? err.message
    console.error(`Falha ao deletar usuário: [${status}] ${msg}`)
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    fetchUsers()
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
    fetchUsers()
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.admin-users {
    padding: 20px;
}

h2 {
    margin-bottom: 1rem;
    font-size: 1.75rem;
}

.new-user-btn {
    margin-bottom: 1rem;
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.new-user-btn:hover {
    background-color: #36a16c;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
}

th,
td {
    padding: 12px;
    border: 1px solid #ccc;
    text-align: left;
}

button {
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
    transition: background-color 0.2s;
}

.edit-btn {
    background-color: #2196f3;
    color: white;
}

.edit-btn:hover {
    background-color: #1976d2;
}

.delete-btn {
    background-color: #d32f2f;
    color: white;
}

.delete-btn:hover {
    background-color: #c62828;
}

/* Modal styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.3rem;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-actions {
    margin-top: 1rem;
    text-align: right;
}
</style>
