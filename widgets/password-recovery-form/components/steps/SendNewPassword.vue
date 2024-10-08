<template>
  <div>
    <h2 class="font-bold text-2xl">
      Придумайте новый пароль
    </h2>

    <p class="mt-[10px] font-light text-xs text-helper-400">
      Чтобы планировать стало ещё удобнее и увлекательнее
    </p>

    <form
      class="mt-[20px] flex flex-col"
      @submit.prevent="submitForm"
    >
      <InputUi
        id="recovery-password"
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
      >
        Сохранить новый пароль
      </button-ui>
    </form>

    <error-label-ui v-if="responseErrorMessage">
      {{ responseErrorMessage }}
    </error-label-ui>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useUserStore } from '~/entities/user/index'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import { useSetPassword } from '~/widgets/password-recovery-form/api/useSetPassword'
// eslint-disable-next-line max-len
import { usePasswordRecoveryStore } from '~/widgets/password-recovery-form/store/usePasswordRecoveryStore'
import { customValidators } from '~/shared/const/customValidators'
import InputUi from '~/shared/ui/InputUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const router = useRouter()
const userStore = useUserStore()
const passwordRecoveryStore = usePasswordRecoveryStore()
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
    const response = await useSetPassword(
      passwordRecoveryStore.recoveryEmail,
      formData.value.newPassword
    )

    if (isSuccessResponse(response)) {
      userStore.setAccessToken(response.body?.accessToken ?? '')
      userStore.setRefreshToken(response.body?.refreshToken ?? '')
      userStore.getProfile()

      router.push('/files')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    formData.value.newPassword = ''
    validations.value.$reset()
  }
}
</script>
