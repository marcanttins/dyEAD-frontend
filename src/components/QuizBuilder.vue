<template>
  <div class="quiz-builder">
    <h3>Criar Quiz</h3>
    <div v-for="(question, index) in quiz.questions" :key="index" class="question">
      <!-- Passa o valor booleano true para required -->
      <InputField 
        v-model="question.text" 
        label="Pergunta" 
        type="text" 
        placeholder="Ex.: Qual é a capital do Brasil?" 
        :required="true" 
      />
      <div v-if="question.type === 'multiple-choice'">
        <h4>Opções:</h4>
        <InputField 
          v-for="(_option, i) in question.options" 
          :key="i" 
          v-model="question.options[i]" 
          :label="'Opção ' + (i + 1)" 
          type="text" 
          :required="true" 
        />
        <label>
          <input 
            type="radio" 
            v-model="question.correctOption" 
            :value="0" 
          /> Opção 1
        </label>
        <label>
          <input 
            type="radio" 
            v-model="question.correctOption" 
            :value="1" 
          /> Opção 2
        </label>
      </div>
      <SelectField 
        v-model="question.type" 
        label="Tipo de Questão" 
        :options="questionTypes" 
        :required="true" 
      />
      <button @click="removeQuestion(index)">Remover Pergunta</button>
    </div>
    <Button @click="addQuestion">Adicionar Pergunta</Button>
    <Button :isLoading="loading" @click="saveQuiz">Salvar Quiz</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputField from '@/components/InputField.vue';
import SelectField from '@/components/SelectField.vue';
import Button from '@/components/Button.vue';

// Define o estado do quiz
const quiz = ref({
  questions: [
    {
      text: '',
      type: 'multiple-choice',
      options: ['', ''],
      correctOption: 0,
    },
  ],
});

// Ajuste o tipo de questionTypes para ser um array de objetos { label: string, value: string }
const questionTypes = [
  { label: 'Múltipla Escolha', value: 'multiple-choice' },
  { label: 'Verdadeiro/Falso', value: 'true-false' },
];

const loading = ref(false);

function addQuestion() {
  quiz.value.questions.push({
    text: '',
    type: 'multiple-choice',
    options: ['', ''],
    correctOption: 0,
  });
}

function removeQuestion(index: number) {
  quiz.value.questions.splice(index, 1);
}

async function saveQuiz() {
  loading.value = true;

  try {
    // Simulação de envio do quiz
    console.log('Quiz enviado:', quiz.value);
    alert('Quiz criado com sucesso!');
  } catch (error) {
    alert('Erro ao criar quiz.');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.quiz-builder {
  padding: 20px;
}

.question {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}

button {
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #c62828;
}
</style>