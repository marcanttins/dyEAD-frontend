<template>
    <div class="progress-bar">
      <div class="label">{{ label }}</div>
      <div class="bar-container">
        <div class="bar" :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="percentage">{{ progress }}%</div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    label: string;
    progress: number;
  }>();
  </script>
  
  <style scoped>
  .progress-bar {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .label {
    flex: 1;
    font-weight: bold;
  }
  
  .bar-container {
    flex: 3;
    height: 16px;
    background-color: #f3f3f3;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 16px;
  }
  
  .bar {
    height: 100%;
    background-color: #42b983;
    transition: width 0.3s ease;
  }
  
  .percentage {
    flex: 1;
    text-align: right;
  }
  </style>