<template>
  <form-base
    title="Код восстановления"
    subtitle="На указанную почту отправлен код для восстановления пароля"
    :img="{
      src: VerifyCodeIcon,
      alt: 'Код восстановления',
    }"
  >
    <template #form>
      <otp-pad-ui
        class="mt-[20px]"
        :length="6"
        @filled-otp="(otp: number) => submitForm(otp)"
      />

      <error-label-ui v-if="responseErrorMessage">
        {{ responseErrorMessage }}
      </error-label-ui>
    </template>
  </form-base>
</template>

<script setup lang="ts">
import { useUserStore, UserApi } from '~/entities/user'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import { FormBase } from '~/widgets/form-base'
import OtpPadUi from '~/shared/ui/OtpPadUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'
import VerifyCodeIcon from '~/widgets/password-recovery-form/icons/сertificate.svg'

const emits = defineEmits(['submit-key'])

const userStore = useUserStore()
const responseErrorMessage = ref('')

const submitForm = async (otp: number) => {
  const response = await UserApi.verifyCode({
    recoveryEmail: userStore.profile.email,
    recoveryCode: otp.toString(),
  })

  if (isSuccessResponse(response)) {
    emits('submit-key')
  } else {
    responseErrorMessage.value = response.exception.message
  }
}
</script>
