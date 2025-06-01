<template>
  <div class="forum">
    <h2>Fórum de Discussão</h2>
    <ul v-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id" class="post">
        <strong>{{ post.author }}:</strong> {{ post.content }}
      </li>
    </ul>
    <p v-else>Nenhuma discussão iniciada.</p>

    <form @submit.prevent="addPost">
      <textarea v-model="newPostContent" placeholder="Escreva sua mensagem..." required></textarea>
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { ForumPost } from '@/types/interfaces'; // Importa a interface ForumPost

// Tipagem explícita para posts
const posts = ref<ForumPost[]>([]);
const newPostContent = ref('');

async function addPost() {
  if (!newPostContent.value.trim()) return;

  try {
    const response = await axios.post('/api/forum', { content: newPostContent.value });

    // Validação da resposta antes de adicionar ao array
    if ('id' in response.data && 'author' in response.data && 'content' in response.data) {
      posts.value.push(response.data as ForumPost); // Converte o objeto para o tipo ForumPost
      newPostContent.value = ''; // Limpa o campo após enviar
    } else {
      console.error('Resposta da API inválida:', response.data);
    }
  } catch (error) {
    console.error('Erro ao enviar post:', error);
  }
}
</script>

<style scoped>
/* Estilos permanecem os mesmos */
</style>