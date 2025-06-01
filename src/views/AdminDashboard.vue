<template>
  <div class="flex h-full">
    <!-- Sidebar Container -->
    <div class="bg-green-600 h-full flex flex-col justify-between">
      <aside class="w-64 p-4">
        <h2 class="text-lg font-bold mb-4">Painel do Administrador</h2>
        <nav>
          <ul>
            <li class="mb-2">
              <router-link
                to="/admin/dashboard/users"
                class="block p-2 hover:bg-green-500"
                active-class="bg-green-500"
              >
                Gerenciar Usuários
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/admin/dashboard/courses"
                class="block p-2 hover:bg-green-500"
                active-class="bg-green-500"
              >
                Gerenciar Cursos
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/admin/dashboard/reports"
                class="block p-2 hover:bg-green-500"
                active-class="bg-green-500"
              >
                Relatórios
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/admin/dashboard/configurations"
                class="block p-2 hover:bg-green-500"
                active-class="bg-green-500"
              >
                Configurações
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/admin/dashboard/notifications"
                class="block p-2 hover:bg-green-500"
                active-class="bg-green-500"
              >
                Notificações
              </router-link>
            </li>
          </ul>
        </nav>
        <button
          @click="handleLogout"
          class="w-full text-left p-2 hover:bg-green-500 focus:outline-none"
        >
          Logout
        </button>
      </aside>
    </div>

    <!-- Área principal: conteúdo renderizado via router-view -->
    <main class="flex-1 p-6 h-full overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const handleLogout = async () => {
  try {
    await authStore.logout();
  } catch (error) {
    console.error('Logout error:', error);
    // Fallback absoluto caso ocorra algum erro
    window.location.href = '/login';
  }
};
</script>

<style scoped>
.bg-green-600 {
  background-color: #42b983;
  color: white;
}

.flex {
  display: flex;
}

.h-full {
  height: 100%;
}

.p-4 {
  padding: 1rem;
}

.p-2 {
  padding: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.block {
  display: block;
}

.hover\:bg-green-500:hover {
  background-color: #36a16c;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: bold;
}

.w-64 {
  width: 16rem;
}

.flex-col {
  flex-direction: column;
}

.justify-between {
  justify-content: space-between;
}

.text-left {
  text-align: left;
}

.focus\:outline-none:focus {
  outline: none;
}

/* Regras adicionais para os elementos da sidebar */
aside {
  overflow-y: auto;
}

main {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
