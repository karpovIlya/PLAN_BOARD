<template>
  <form-base
    title="Введите код для подтверждение почты"
    subtitle="На указанную почту отправлен код для ее подтверждения"
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

const emits = defineEmits(['email-verify'])
const userStore = useUserStore()
const router = useRouter()

const responseErrorMessage = ref('')

const submitForm = async (verificationCode: number) => {
  const response = await UserApi.emailVerify({
    userEmail: userStore.profile.email,
    verifyCode: verificationCode,
  })

  if (isSuccessResponse(response) && response.body) {
    userStore.setToken(response.body)
    userStore.getProfile()

    router.push('/files')
  } else {
    responseErrorMessage.value = response.exception.message
  }

  emits('email-verify')
}
</script>
