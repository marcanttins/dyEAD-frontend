<template>
  <div class="admin-courses p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Gerenciamento de Cursos</h2>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Novo Curso
      </button>
    </div>

    <p v-if="loading" class="mb-4">Carregando cursos...</p>
    <p v-else-if="!courses.length" class="mb-4">Nenhum curso encontrado.</p>

    <table v-else class="min-w-full bg-white border-collapse mb-4">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Título</th>
          <th class="px-4 py-2 border">Descrição</th>
          <th class="px-4 py-2 border">Status</th>
          <th class="px-4 py-2 border">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="course in courses"
          :key="course.id"
          class="hover:bg-gray-50"
        >
          <td class="px-4 py-2 border">{{ course.id }}</td>
          <td class="px-4 py-2 border">{{ course.title }}</td>
          <td class="px-4 py-2 border">{{ course.description }}</td>
          <td class="px-4 py-2 border capitalize">{{ course.status }}</td>
          <td class="px-4 py-2 border space-x-2">
            <button
              @click="openEditModal(course)"
              class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Editar
            </button>
            <button
              @click="deleteCourse(course.id)"
              class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="pages > 1" class="flex items-center space-x-4">
      <button
        :disabled="page === 1"
        @click="fetchCourses(page - 1)"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>Página {{ page }} de {{ pages }}</span>
      <button
        :disabled="page === pages"
        @click="fetchCourses(page + 1)"
        class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>

    <!-- Modal de criação/edição -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg w-full max-w-md p-6 relative">
        <h3 class="text-xl font-semibold mb-4">
          {{ isEditing ? 'Editar Curso' : 'Novo Curso' }}
        </h3>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block mb-1">Título</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label class="block mb-1">Descrição</label>
            <textarea
              v-model="form.description"
              rows="3"
              required
              class="w-full border px-3 py-2 rounded"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1">Status</label>
            <select
              v-model="form.status"
              required
              class="w-full border px-3 py-2 rounded"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </div>
          <div class="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {{ isEditing ? 'Salvar' : 'Criar' }}
            </button>
          </div>
        </form>
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

interface Course {
  id: number
  title: string
  description: string
  status: string
}

const courses = ref<Course[]>([])
const loading = ref(false)
const page    = ref(1)
const pages   = ref(1)

const showModal = ref(false)
const isEditing = ref(false)
const form = reactive<Partial<Course>>({
  title: '',
  description: '',
  status: 'draft',
})

const perPage = 10

async function fetchCourses(p = 1) {
  loading.value = true
  try {
    const res = await axios.get('/courses', {
      params: { page: p, per_page: perPage }
    })
    courses.value = res.data.items
    page.value    = res.data.page
    pages.value   = res.data.pages
  } catch (err) {
    console.error('Erro ao buscar cursos:', err)
    alert('Erro ao buscar cursos.')
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  isEditing.value = false
  form.title      = ''
  form.description= ''
  form.status     = 'draft'
  showModal.value = true
}

function openEditModal(course: Course) {
  isEditing.value = true
  form.id         = course.id
  form.title      = course.title
  form.description= course.description
  form.status     = course.status
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function submitForm() {
  try {
    if (isEditing.value && form.id != null) {
      await axios.put(`/courses/${form.id}`, {
        title: form.title,
        description: form.description,
        status: form.status
      })
    } else {
      await axios.post('/courses', {
        title: form.title,
        description: form.description,
        status: form.status
      })
    }
    fetchCourses(page.value)
    closeModal()
  } catch (err) {
    console.error('Erro ao salvar curso:', err)
    alert('Erro ao salvar curso.')
  }
}

async function deleteCourse(id: number) {
  if (!confirm('Confirma exclusão deste curso?')) return
  try {
    await axios.delete(`/courses/${id}`)
    fetchCourses(page.value)
  } catch (err) {
    console.error('Erro ao excluir curso:', err)
    alert('Erro ao excluir curso.')
  }
}

onMounted(() => {
  fetchCourses()
})
</script>

<style scoped>
.admin-courses h2 {
  margin-bottom: 1rem;
}
.user-table th,
.user-table td {
  text-align: left;
}
.modal-overlay {
  z-index: 50;
}
</style>
