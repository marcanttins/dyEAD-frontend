<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <header class="bg-green-500 text-white p-4 flex justify-between items-center w-full max-w-4xl">
      <h1 class="text-3xl font-bold">Login</h1>
      <router-link to="/" class="voltar-home">Voltar ao Home</router-link>
    </header>
    <div class="flex-1 flex items-center justify-center bg-gray-100 w-full max-w-4xl">
      <div class="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 class="text-2xl font-bold text-center mb-6">Entre com sua conta</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 mb-1">Email</label>
            <input id="email" v-model="email" type="email" placeholder="Digite seu email" required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-700 mb-1">Senha</label>
            <input id="password" v-model="password" type="password" placeholder="Digite sua senha" required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <button type="submit" :disabled="loading"
            class="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition-colors">
            Entrar
          </button>
        </form>
        <p v-if="errorMessage" class="text-red-500 text-center mt-4">
          {{ errorMessage }}
        </p>
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService, { LoginResponse } from '@/services/authService';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string | null>(null);
const loading = ref<boolean>(false);

const handleLogin = async (): Promise<void> => {
  loading.value = true;
  try {
    // Realiza a requisição de login
    const response: LoginResponse = await authService.login(email.value, password.value);
    // Salva o token no localStorage (opcional)
    localStorage.setItem('access_token', response.access_token);
    // Usa setUser para armazenar dados do usuário e token na store
    authStore.setAuth(response.user, response.access_token);
    // Redireciona conforme o papel do usuário
    const roleToPageMap: { [key: string]: string } = {
      admin: 'AdminDashboard',
      instrutor: 'InstructorDashboard',
      aluno: 'StudentDashboard',
    };
    router.push({ name: roleToPageMap[response.user.role] });
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.voltar-home {
  color: white;
  text-decoration: none;
}

.voltar-home:hover {
  text-decoration: underline;
}
</style>
