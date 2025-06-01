<template>
    <div class="report-chart">
      <h3>Métricas Gerais</h3>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  
  const props = defineProps<{
    data: { labels: string[]; values: number[] };
  }>();
  
  const chartCanvas = ref<HTMLCanvasElement | null>(null);
  
  onMounted(() => {
    if (chartCanvas.value) {
      new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels: props.data.labels,
          datasets: [
            {
              label: 'Métricas',
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
  </script>
  
  <style scoped>
  .report-chart {
    padding: 20px;
  }
  
  canvas {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>