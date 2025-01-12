<template>
  <form-base
    title="Регистрация"
    subtitle="Чтобы планировать стало ещё удобнее и увлекательнее"
    :img="{
      src: SignUpIcon,
      alt: 'Регистрация',
    }"
  >
    <template #form>
      <form
        class="mt-[20px] flex flex-col"
        @submit.prevent="submitForm"
      >
        <input-ui
          v-model="formData.name"
          type="text"
          label="Ваше имя"
          placeholder="Иван"
          :is-required="true"
          :is-invalid="validations.name.$error"
          @input="validations.name.$touch()"
        />

        <error-label-ui
          v-for="error in validations.name.$errors"
          :key="error.$uid"
        >
          {{ error.$message }}
        </error-label-ui>

        <input-ui
          v-model="formData.mail"
          class="mt-[10px]"
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

        <span class="mt-[20px] font-light text-sm">
          Отправляя форму, вы соглашаетесь с
          <nuxt-link
            class="text-primary-100"
            to="/"
          >
            политикой конфеденциальности
          </nuxt-link>
        </span>

        <button-ui
          class="mt-[20px]"
          type="submit"
          color="accent"
          :is-loading="isFormLoading"
        >
          Зарегистрироваться
        </button-ui>
      </form>

      <error-label-ui v-if="responseErrorMessage">
        {{ responseErrorMessage }}
      </error-label-ui>

      <p class="mt-[20px] text-center font-light text-sm">
        Уже есть аккаунт?
        <nuxt-link
          class="text-primary-100"
          to="/sign-in"
        >
          Авторизуйтесь
        </nuxt-link>
      </p>
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
import SignUpIcon from '~/widgets/sign-up-form/icons/media.svg'

const emits = defineEmits(['send-main-data'])

const isFormLoading = ref(false)
const responseErrorMessage = ref('')
const formData = ref({
  name: '',
  mail: '',
  password: '',
})

const validateRules = computed(() => {
  return {
    name: {
      alpha: customValidators.alphaCyrillic,
      required: customValidators.required,
    },
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

const submitForm = async () => {
  isFormLoading.value = true

  const isFormValid = await validations.value.$validate()

  if (isFormValid) {
    const response = await UserApi.postNewUser({
      userEmail: formData.value.mail,
      userPassword: formData.value.password,
      userName: formData.value.name,
    })

    if (isSuccessResponse(response)) {
      userStore.profile.email = formData.value.mail
      emits('send-main-data')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    isFormLoading.value = false

    formData.value.name = ''
    formData.value.mail = ''
    formData.value.password = ''

    validations.value.$reset()
  }
}
</script>
