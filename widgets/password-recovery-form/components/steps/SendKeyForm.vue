<template>
  <div>
    <div class="flex gap-1 items-center">
      <h2 class="font-bold text-2xl">
        Код восстановления
      </h2>

      <img
        src="@/widgets/password-recovery-form/icons/сertificate.svg"
        alt="Код восстановления"
      >
    </div>

    <p class="mt-[10px] font-light text-xs text-helper-400">
      На указанную почту отправлен код для восстановления пароля
    </p>

    <otp-pad-ui
      class="mt-[20px]"
      :length="6"
      @filled-otp="(otp: number) => submitForm(otp)"
    />

    <error-label-ui v-if="responseErrorMessage">
      {{ responseErrorMessage }}
    </error-label-ui>
  </div>
</template>

<script setup lang="ts">
import { useVerifyCode } from '~/widgets/password-recovery-form/api/useVerifyCode'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
// eslint-disable-next-line max-len
import { usePasswordRecoveryStore } from '~/widgets/password-recovery-form/store/usePasswordRecoveryStore'
import OtpPadUi from '~/shared/ui/OtpPadUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const emits = defineEmits(['submit-key'])
const passwordRecoveryStore = usePasswordRecoveryStore()
const responseErrorMessage = ref('')

const submitForm = async (otp: number) => {
  passwordRecoveryStore.recoveryCode = otp.toString()

  const response = await useVerifyCode(
    passwordRecoveryStore.recoveryEmail,
    passwordRecoveryStore.recoveryCode
  )

  if (isSuccessResponse(response)) {
    emits('submit-key')
  } else {
    responseErrorMessage.value = response.exception.message
  }
}
</script>
