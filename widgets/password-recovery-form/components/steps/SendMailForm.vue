<template>
  <form-base
    title="Восстановление пароля"
    subtitle="Введите ваш e-mail. Мы вышлем код восстановления пароля"
  >
    <template #form>
      <form
        class="mt-[20px] flex flex-col"
        @submit.prevent="submitForm"
      >
        <input-ui
          v-model="formData.mail"
          type="email"
          label="Электронная почта"
          placeholder="planboard@yandex.ru"
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
          :is-loading="isFormLoading"
        >
          Отправить код
        </button-ui>
      </form>

      <error-label-ui v-if="responseErrorMessage">
        {{ responseErrorMessage }}
      </error-label-ui>
    </template>
  </form-base>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { customValidators } from '~/shared/const/customValidators'
import { useUserStore, UserApi } from '~/entities/user'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import { FormBase } from '~/widgets/form-base'
import InputUi from '~/shared/ui/InputUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const emits = defineEmits(['submit-mail'])

const isFormLoading = ref(false)
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
const userStore = useUserStore()

const submitForm = async () => {
  const isFormValid = await validations.value.$validate()

  if (isFormValid) {
    isFormLoading.value = true
    const response = await UserApi.forgetPassword(formData.value.mail)

    if (isSuccessResponse(response)) {
      userStore.profile.email = formData.value.mail
      emits('submit-mail')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    isFormLoading.value = false
    formData.value.mail = ''

    validations.value.$reset()
  }
}
</script>
