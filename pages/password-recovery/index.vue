<template>
  <main class="flex justify-center items-center h-[100vh]">
    <div class="md:w-[450px] sm:w-[60%] p-[20px]">
      <password-recovery-form />
    </div>
  </main>
</template>

<script setup lang="ts">
import { PasswordRecoveryForm } from '~/widgets/password-recovery-form/index'
</script>
