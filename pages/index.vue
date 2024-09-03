<template>
  <main>
    <h1>Counter - {{ counter }}</h1>
    <button @click="() => counter++">
      +
    </button>
  </main>
</template>

<script setup lang="ts">
const counter = ref(0)
</script>
