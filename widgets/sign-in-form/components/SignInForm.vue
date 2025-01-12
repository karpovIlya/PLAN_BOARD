<template>
  <form-base
    title="Авторизация"
    subtitle="Чтобы планировать стало ещё удобнее и увлекательнее"
    :img="{
      src: AuthIcon,
      alt: 'Авторизация',
    }"
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

        <input-ui
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
          :is-loading="isFormLoading"
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
    </template>
  </form-base>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { customValidators } from '~/shared/const/customValidators'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import { useUserStore, UserApi } from '~/entities/user'
import { FormBase } from '~/widgets/form-base'
import InputUi from '~/shared/ui/InputUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'
import AuthIcon from '~/widgets/sign-in-form/icons/streak-on.svg'

const responseErrorMessage = ref('')
const isFormLoading = ref(false)
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
    isFormLoading.value = true

    const response = await UserApi.auth({
      userEmail: formData.value.mail,
      userPassword: formData.value.password,
    })

    if (isSuccessResponse(response) && response.body) {
      userStore.setToken(response.body)
      userStore.getProfile()

      router.push('/files')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    isFormLoading.value = false
    formData.value.mail = ''
    formData.value.password = ''

    validations.value.$reset()
  }
}
</script>
