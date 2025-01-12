<template>
  <form-base
    title="Придумайте новый пароль"
    subtitle="Чтобы планировать стало ещё удобнее и увлекательнее"
  >
    <template #form>
      <form
        class="mt-[20px] flex flex-col"
        @submit.prevent="submitForm"
      >
        <input-ui
          v-model="formData.newPassword"
          type="password"
          label="Новый пароль"
          placeholder="*******"
          :is-required="true"
          :is-invalid="validations.newPassword.$error"
          @input="validations.newPassword.$touch()"
        />

        <error-label-ui
          v-for="error in validations.newPassword.$errors"
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
          Сохранить новый пароль
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

const router = useRouter()
const userStore = useUserStore()

const isFormLoading = ref(false)
const responseErrorMessage = ref('')
const formData = ref({
  newPassword: '',
})

const validateRules = computed(() => {
  return {
    newPassword: {
      minLength: customValidators.minLength,
      alphaNum: customValidators.alphaNum,
      required: customValidators.required,
    },
  }
})

const validations = useVuelidate(validateRules, formData)

const submitForm = async () => {
  const isFormValid = await validations.value.$validate()

  if (isFormValid) {
    isFormLoading.value = true

    const response = await UserApi.setPassword({
      recoveryEmail: userStore.profile.email,
      password: formData.value.newPassword,
    })

    if (isSuccessResponse(response) && response.body) {
      userStore.setToken(response.body)
      userStore.getProfile()

      router.push('/files')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    isFormLoading.value = false
    formData.value.newPassword = ''
    validations.value.$reset()
  }
}
</script>
