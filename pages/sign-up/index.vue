<template>
  <main>
    <form-template :image-src="SignUpImage">
      <sign-up-form />
    </form-template>
  </main>
</template>

<script setup lang="ts">
import { FormTemplate } from '~/widgets/form-template'
import { SignUpForm } from '~/widgets/sign-up-form/index'

import SignUpImage from '~/assets/images/authentication/signup.png'
</script>
