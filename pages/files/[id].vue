<template>
  <main>
    <projects-list />
  </main>
</template>

<script setup lang="ts">
import { ProjectsList } from '~/widgets/projects-list'

definePageMeta({
  layout: 'files-layout',
  middleware: 'auth',
})
</script>
