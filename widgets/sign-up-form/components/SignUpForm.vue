<template>
  <div>
    <transition name="fade" mode="out-in">
      <component
        :is="currentComponent"
        @send-main-data="currentComponent = EmailVerifyForm"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import SendMainDataForm from '~/widgets/sign-up-form/components/step/SendMainDataForm.vue'
import EmailVerifyForm from '~/widgets/sign-up-form/components/step/EmailVerifyForm.vue'

const currentComponent: Ref<Component> = shallowRef(SendMainDataForm)
</script>
