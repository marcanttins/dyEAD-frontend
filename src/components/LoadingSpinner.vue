<template>
  <div class="spinner" v-if="show">
    <div class="circle"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
</script>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 50px;
  height: 50px;
}

.circle {
  width: 100%;
  height: 100%;
  border: 5px solid #ccc;
  border-top-color: #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>