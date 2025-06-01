// src/stores/course.ts

import { defineStore } from 'pinia';
import api from '../services/apiService'; // Importe a API aqui

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  instructorId: number;
}

interface Progress {
  courseId: number;
  percentage: number;
}

interface CourseState {
  courses: Course[]; // Lista de todos os cursos disponíveis
  enrolledCourses: Course[]; // Cursos inscritos pelo aluno
  progress: { [key: number]: Progress }; // Progresso do aluno por cursoId
}

export const useCourseStore = defineStore('course', {
  state: (): CourseState => ({
    courses: [], // Lista de todos os cursos disponíveis
    enrolledCourses: [], // Cursos inscritos pelo aluno
    progress: {}, // Progresso do aluno por cursoId
  }),
  actions: {
    async fetchCourses() {
      try {
        const response = await api.get('/courses'); // Use a API importada
        this.courses = response.data;
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    },

    async fetchEnrolledCourses(userId: number) {
      try {
        const response = await api.get(`/users/${userId}/enrolled-courses`); // Use a API importada
        this.enrolledCourses = response.data;
      } catch (error) {
        console.error('Erro ao buscar cursos inscritos:', error);
      }
    },

    async fetchProgress(userId: number) {
      try {
        const response = await api.get(`/users/${userId}/progress`); // Use a API importada
        this.progress = response.data.reduce((acc: any, item: Progress) => {
          acc[item.courseId] = item;
          return acc;
        }, {});
      } catch (error) {
        console.error('Erro ao buscar progresso:', error);
      }
    },

    async enrollInCourse(courseId: number, userId: number) {
      try {
        await api.post(`/courses/${courseId}/enroll`, { user_id: userId }); // Use a API importada
        this.enrolledCourses.push(this.courses.find((course) => course.id === courseId) || ({} as Course));
      } catch (error) {
        console.error('Erro ao se inscrever no curso:', error);
        throw error;
      }
    },

    async updateProgress(courseId: number, percentage: number) {
      try {
        await api.put(`/courses/${courseId}/progress`, { percentage }); // Use a API importada
        this.progress[courseId] = { courseId, percentage };
      } catch (error) {
        console.error('Erro ao atualizar progresso:', error);
        throw error;
      }
    },
  },
  getters: {
    getCourseProgress(state): (courseId: number) => Progress | undefined {
      return (courseId: number) => state.progress[courseId];
    },
  },
});