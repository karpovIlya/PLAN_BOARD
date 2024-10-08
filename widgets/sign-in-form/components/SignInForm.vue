<template>
  <div>
    <div class="flex gap-1 items-center">
      <h2 class="font-bold text-2xl">
        Авторизация
      </h2>

      <img
        src="@/widgets/sign-in-form/icons/streak-on.svg"
        alt="Авторизация"
      >
    </div>

    <p class="mt-[10px] font-light text-xs text-helper-400">
      Чтобы планировать стало ещё удобнее и увлекательнее
    </p>

    <form
      class="mt-[20px] flex flex-col"
      @submit.prevent="submitForm"
    >
      <input-ui
        id="auth-mail"
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

      <input-ui
        id="auth-password"
        v-model="formData.password"
        class="mt-[10px]"
        type="password"
        label="Пароль"
        placeholder="*******"
        :is-invalid="validations.password.$error"
        @input="validations.password.$touch()"
      />

      <error-label-ui
        v-for="error in validations.password.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </error-label-ui>

      <button-ui
        class="mt-[20px]"
        type="submit"
        color="accent"
      >
        Войти
      </button-ui>
    </form>

    <error-label-ui v-if="responseErrorMessage">
      {{ responseErrorMessage }}
    </error-label-ui>

    <p class="mt-[20px] text-center font-light text-sm">
      Ещё нет аккаунта?
      <nuxt-link
        class="text-primary-100"
        to="/sign-up"
      >
        Зарегистрироваться
      </nuxt-link>
    </p>

    <nuxt-link
      class="block mt-[10px] text-center font-light text-sm text-primary-100"
      to="/password-recovery"
    >
      Забыли пароль?
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { customValidators } from '~/shared/const/customValidators'
import { useAuth } from '~/widgets/sign-in-form/api/useAuth'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import { useUserStore } from '~/entities/user/index'
import InputUi from '~/shared/ui/InputUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const responseErrorMessage = ref('')
const formData = ref({
  mail: '',
  password: '',
})

const validateRules = computed(() => {
  return {
    mail: {
      email: customValidators.email,
      required: customValidators.required,
    },
    password: {
      minLength: customValidators.minLength,
      alphaNum: customValidators.alphaNum,
      required: customValidators.required,
    },
  }
})

const validations = useVuelidate(validateRules, formData)
const userStore = useUserStore()
const router = useRouter()

const submitForm = async () => {
  const isFormValid = await validations.value.$validate()

  if (isFormValid) {
    const response = await useAuth(
      formData.value.mail,
      formData.value.password
    )

    if (isSuccessResponse(response)) {
      userStore.email = formData.value.mail
      userStore.setAccessToken(response.body?.accessToken ?? '')
      userStore.setRefreshToken(response.body?.refreshToken ?? '')
      userStore.getProfile()

      router.push('/files')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    formData.value.mail = ''
    formData.value.password = ''

    validations.value.$reset()
  }
}
</script>
