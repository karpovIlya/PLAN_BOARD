<template>
  <main>
    <div
      v-if="error.statusCode !== 401"
      class="
        flex flex-col justify-center items-center
        gap-5 w-full min-h-screen p-5
      "
    >
      <img
        class="block sm:w-6/12 w-full"
        alt="Изображение ошибки"
        :src="errorImageSrc"
      >

      <p class="text-base text-center text-helper-200 font-medium">
        {{ error.statusMessage }}
      </p>

      <button-ui
        color="primary"
        @click="handleError"
      >
        На главную
      </button-ui>
    </div>

    <form-template
      v-else
      :image-src="errorImageSrc"
    >
      <sign-in-form />
    </form-template>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { FormTemplate } from '~/widgets/form-template'
import { SignInForm } from '~/widgets/sign-in-form'
import ButtonUi from '~/shared/ui/ButtonUi.vue'

import NotFoundImage from '~/assets/images/errors/error-404.png'
import UnexpectedImage from '~/assets/images/errors/error-500.png'
import PermissionDeniedImage from '~/assets/images/errors/error-403.png'
import UnauthorizedImage from '~/assets/images/errors/error-401.png'

const props = defineProps<{ error: NuxtError }>()

const errorImageSrc = computed(() => {
  switch (props.error.statusCode) {
  case 404:
    return NotFoundImage
  case 500:
    return UnexpectedImage
  case 403:
    return PermissionDeniedImage
  case 401:
    return UnauthorizedImage
  }

  return ''
})

const handleError = () => clearError({ redirect: '/', })
</script>
