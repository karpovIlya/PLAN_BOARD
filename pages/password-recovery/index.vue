<template>
  <main>
    <form-template :image-src="VerifyPasswordImage">
      <password-recovery-form />
    </form-template>
  </main>
</template>

<script setup lang="ts">
import { FormTemplate } from '~/widgets/form-template'
import { PasswordRecoveryForm } from '~/widgets/password-recovery-form/index'

import VerifyPasswordImage from '~/assets/images/authentication/verify-password.png'

definePageMeta({
  middleware: 'not-auth',
})
</script>
