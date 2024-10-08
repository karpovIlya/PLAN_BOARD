<template>
  <div>
    <h2 class="font-bold text-2xl">
      Восстановление пароля
    </h2>

    <p class="mt-[10px] font-light text-xs text-helper-400">
      Введите ваш e-mail.
      Мы вышлем код восстановления пароля
    </p>

    <form
      class="mt-[20px] flex flex-col"
      @submit.prevent="submitForm"
    >
      <InputUi
        id="recovery-mail"
        v-model="formData.mail"
        type="email"
        label="Электронная почта"
        placeholder="plan-board@mail.com"
        :is-required="true"
        :is-invalid="validations.mail.$error"
        @input="validations.mail.$touch()"
      />

      <error-label-ui
        v-for="error in validations.mail.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </error-label-ui>

      <button-ui
        class="mt-[20px]"
        type="submit"
        color="accent"
      >
        Отправить код
      </button-ui>
    </form>

    <error-label-ui v-if="responseErrorMessage">
      {{ responseErrorMessage }}
    </error-label-ui>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { customValidators } from '~/shared/const/customValidators'
import { useForgetPassword } from '~/widgets/password-recovery-form/api/useForgetPassword'
// eslint-disable-next-line max-len
import { usePasswordRecoveryStore } from '~/widgets/password-recovery-form/store/usePasswordRecoveryStore'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import InputUi from '~/shared/ui/InputUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const emits = defineEmits(['submit-mail'])
const responseErrorMessage = ref('')

const formData = ref({
  mail: '',
})

const validateRules = computed(() => {
  return {
    mail: {
      email: customValidators.email,
      required: customValidators.required,
    },
  }
})

const validations = useVuelidate(validateRules, formData)
const passwordRecoveryStore = usePasswordRecoveryStore()

const submitForm = async () => {
  const isFormValid = await validations.value.$validate()

  if (isFormValid) {
    const response = await useForgetPassword(formData.value.mail)

    if (isSuccessResponse(response)) {
      passwordRecoveryStore.recoveryEmail = formData.value.mail
      emits('submit-mail')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    formData.value.mail = ''
    validations.value.$reset()
  }
}
</script>
