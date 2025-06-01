<template>
    <div class="course-player">
      <video controls width="100%">
        <source :src="currentVideo.url" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      <ul v-if="course.videos.length > 0">
        <li v-for="(video, index) in course.videos" :key="video.id" @click="selectVideo(index)">
          {{ video.name }}
        </li>
      </ul>
      <p v-else>Nenhum vídeo disponível.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  
  const props = defineProps<{
    course: { id: number; title: string; videos: { id: number; name: string; url: string }[] };
  }>();
  
  const currentVideo = ref(props.course.videos[0]);
  
  function selectVideo(index: number) {
    currentVideo.value = props.course.videos[index];
  }
  </script>
  
  <style scoped>
  .course-player {
    padding: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    cursor: pointer;
    padding: 5px;
    background-color: #f9f9f9;
    border-radius: 4px;
    margin-bottom: 5px;
  }
  
  li:hover {
    background-color: #eaeaea;
  }
  </style>