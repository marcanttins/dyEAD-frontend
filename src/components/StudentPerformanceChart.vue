<template>
    <div class="student-performance-chart">
      <h3>Desempenho dos Alunos</h3>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps<{
    data: { labels: string[]; values: number[] };
  }>();
  
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  let chartInstance: Chart | null = null;
  
  onMounted(() => {
    if (chartCanvas.value) {
      chartInstance = new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels: props.data.labels,
          datasets: [
            {
              label: 'Pontuação',
              data: props.data.values,
              backgroundColor: '#42b983',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  });
  
  onUnmounted(() => {
    if (chartInstance) {
      chartInstance.destroy(); // Limpeza adequada
    }
  });
  </script>  
  <style scoped>
  .student-performance-chart {
    padding: 20px;
  }
  
  canvas {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>