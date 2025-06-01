<template>
  <div class="course-player">
    <h2>{{ course.title }}</h2>
    <!-- Exibe o player somente se houver um vídeo selecionado -->
    <video v-if="currentVideo.url" controls width="100%">
      <source :src="currentVideo.url" type="video/mp4" />
      Seu navegador não suporta a reprodução de vídeo.
    </video>
    <p v-else>Nenhum vídeo disponível para reprodução.</p>

    <h3>Vídeos Disponíveis</h3>
    <ul v-if="course.videos && course.videos.length > 0">
      <li
        v-for="(video, index) in course.videos"
        :key="video.id"
        @click="selectVideo(index)"
        :class="{ selected: currentVideo.id === video.id }"
      >
        {{ video.name }}
      </li>
    </ul>
    <p v-else>Nenhum vídeo disponível neste curso.</p>
  </div>
</template>

<script setup lang="ts">
// Caso você já possua as interfaces definidas, substitua os blocos a seguir pela importação apropriada, exemplo:
// import { Course, Video } from '@/types/interfaces';

interface Video {
  id: number;
  url: string;
  name: string;
}

interface CourseData {
  title: string;
  videos: Video[];
}

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// Estados reativos com tipagem
const course = ref<CourseData>({ title: '', videos: [] });
const currentVideo = ref<Video>({ id: 0, url: '', name: '' });

const route = useRoute();
const courseId = parseInt(route.params.id as string, 10);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/courses/${courseId}`);
    // Supõe que a API retorna o objeto do curso diretamente
    course.value = response.data as CourseData;
    
    // Seleciona o primeiro vídeo se houver disponíveis
    if (course.value.videos && course.value.videos.length > 0) {
      selectVideo(0);
    } else {
      // Se não houver vídeos, zera o currentVideo
      currentVideo.value = { id: 0, url: '', name: '' };
    }
  } catch (error: any) {
    console.error('Erro ao carregar curso:', error);
    alert('Não foi possível carregar os detalhes do curso. Tente novamente.');
  }
});

function selectVideo(index: number): void {
  if (course.value.videos && course.value.videos.length > index) {
    currentVideo.value = course.value.videos[index];
  }
}
</script>

<style scoped>
.course-player {
  padding: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

video {
  margin-bottom: 20px;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: background-color 0.2s;
}

li:hover {
  background-color: #eaeaea;
}

.selected {
  background-color: #dcdcdc;
}
</style>
