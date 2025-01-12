<template>
  <main>
    <form-template :image-src="SignInImage">
      <sign-in-form />
    </form-template>
  </main>
</template>

<script setup lang="ts">
import { FormTemplate } from '~/widgets/form-template'
import { SignInForm } from '~/widgets/sign-in-form'

import SignInImage from '~/assets/images/authentication/signin.png'

definePageMeta({
  middleware: 'not-auth',
})
</script>
