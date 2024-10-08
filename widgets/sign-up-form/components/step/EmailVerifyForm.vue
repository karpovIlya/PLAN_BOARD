<template>
  <div>
    <h2 class="font-bold text-2xl">
      Введите код для подтверждение почты
    </h2>

    <p class="mt-[10px] font-light text-xs text-helper-400">
      На указанную почту отправлен код для ее подтверждения
    </p>

    <otp-pad-ui
      class="mt-[20px]"
      :length="6"
      @filled-otp="(otp: number) => submitForm(otp)"
    />

    <error-label-ui v-if="errorMessage">
      {{ errorMessage }}
    </error-label-ui>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/entities/user/index'
import { useEmailVerify } from '~/widgets/sign-up-form/api/useEmailVerify'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import OtpPadUi from '~/shared/ui/OtpPadUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const emits = defineEmits(['email-verify'])
const userStore = useUserStore()
const router = useRouter()

const errorMessage = ref('')

const submitForm = async (verificationCode: number) => {
  const response = await useEmailVerify(
    userStore.email,
    verificationCode
  )

  if (isSuccessResponse(response)) {
    userStore.setAccessToken(response.body?.accessToken ?? '')
    userStore.setRefreshToken(response.body?.refreshToken ?? '')

    router.push('/files')
  } else {
    errorMessage.value = response.exception.message
  }

  emits('email-verify')
}
</script>
