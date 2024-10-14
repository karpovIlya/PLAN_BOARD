<template>
  <main class="flex justify-center items-center h-[100vh]">
    <div class="md:w-[450px] sm:w-[60%] p-[20px]">
      <sign-in-form />
    </div>
  </main>
</template>

<script setup lang="ts">
import { SignInForm } from '~/widgets/sign-in-form/index'
</script>
