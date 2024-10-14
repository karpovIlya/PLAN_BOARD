<template>
  <div>
    <transition name="fade" mode="out-in">
      <component
        :is="currentComponent"
        @submit-mail="currentComponent = SendKeyForm"
        @submit-key="currentComponent = SendNewPassword"
      />
    </transition>

    <p class="mt-[20px] text-center font-light text-sm">
      Ещё нет аккаунта?
      <nuxt-link
        class="text-primary-100"
        to="/sign-up"
      >
        Зарегистрироваться
      </nuxt-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import SendMailForm from '~/widgets/password-recovery-form/components/steps/SendMailForm.vue'
import SendKeyForm from '~/widgets/password-recovery-form/components/steps/SendKeyForm.vue'
import SendNewPassword
  from '~/widgets/password-recovery-form/components/steps/SendNewPassword.vue'

const currentComponent: Ref<Component> = shallowRef(SendMailForm)
</script>
