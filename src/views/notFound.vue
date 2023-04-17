<script setup lang="ts">
import { onMounted } from 'vue'

const goBack = () => {
  window.history.length > 1 ? window.history.go(-1) : (location.href = '/')
}

onMounted(() => {
  document.title = 'Page Not Found | My Website'
})
</script>

<template>
  <div class="error-page">
    <h1>404</h1>
    <p>Oops! Something went wrong.</p>
    <button @click="goBack">
      Go Back
    </button>
  </div>
</template>

<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
  text-align: center;
}

h1 {
  font-size: 6rem;
  margin-bottom: 0;
}

p {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

button {
  background-color: #fbd38d;
  color: #000;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
