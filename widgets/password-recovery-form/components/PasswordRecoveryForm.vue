<template>
  <div>
    <transition name="fade" mode="out-in">
      <component
        :is="visibleComponent"
        @submit-mail="visibleComponent = SendKeyForm"
        @submit-key="visibleComponent = SendNewPassword"
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
// eslint-disable-next-line max-len
import SendNewPassword from '~/widgets/password-recovery-form/components/steps/SendNewPassword.vue'

const visibleComponent: Ref<Component> = shallowRef(SendMailForm)
</script>
