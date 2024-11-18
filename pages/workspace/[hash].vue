<template>
  <main>
    {{ route.params.hash }}
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
</script>
