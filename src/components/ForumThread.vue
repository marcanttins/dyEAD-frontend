<template>
    <div class="forum-thread">
      <h3>{{ thread.title }}</h3>
      <ForumPost v-for="post in thread.posts" :key="post.id" :post="post" />
    </div>
  </template>
  
  <script setup lang="ts">
  import ForumPost from '../ForumPost.vue';
  defineProps<{
    thread: { id: number; title: string; posts: { id: number; author: string; content: string; date: string }[] };
  }>();
  </script>
  
  <style scoped>
  .forum-thread {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  h3 {
    margin-bottom: 10px;
  }
  </style>