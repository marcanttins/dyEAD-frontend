<template>
  <div class="quiz">
    <h2>{{ quiz.title }}</h2>
    <ul v-if="questions.length > 0">
      <li v-for="(question, index) in questions" :key="question.id">
        <p>
          <strong>Pergunta {{ index + 1 }}:</strong> {{ question.text }}
        </p>
        <ul>
          <li v-for="option in question.options" :key="option.id">
            <label>
              <input type="radio" :name="`q${question.id}`" :value="option.id" v-model="answers[question.id]" />
              {{ option.text }}
            </label>
          </li>
        </ul>
      </li>
    </ul>
    <p v-else>Nenhuma pergunta disponível.</p>
    <button @click="submitQuiz">Enviar Respostas</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { QuizData, QuizQuestion } from '@/types/interfaces';
import { Answers } from '@/types/interfaces';

// Define o tipo para respostas: mapeia o ID da questão para o ID da opção selecionada
// Aqui, assumimos que cada opção é um objeto do tipo Option, conforme a interface Option

const route = useRoute();
const quizId = parseInt(route.params.id as string, 10);

// Estados reativos
const quiz = ref<QuizData>({ title: '' });
const questions = ref<QuizQuestion[]>([]);
const answers = ref<Answers>({ id: 0, texto: '', opcoes: [] });

onMounted(async () => {
  try {
    const response = await axios.get(`/api/quizzes/${quizId}`);
    // Supondo que a API retorne um objeto contendo "quiz" e "questions"
    quiz.value = response.data.quiz;
    questions.value = response.data.questions;
    // Inicializa as respostas para cada questão (opcional)
    questions.value.forEach((q) => {
      answers.value[q.id] = 0; // ou null, conforme sua lógica de validação
    });
  } catch (error: any) {
    console.error('Erro ao carregar quiz:', error);
  }
});

async function submitQuiz() {
  try {
    await axios.post('/api/quizzes/submit', {
      quiz_id: quizId,
      answers: answers.value,
    });
    alert('Quiz enviado com sucesso!');
  } catch (error) {
    alert('Erro ao enviar quiz. Tente novamente.');
  }
}
</script>

<style scoped>
.quiz {
  padding: 20px;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #35495e;
}
</style>
