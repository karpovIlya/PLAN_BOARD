<template>
  <div>
    <div class="flex gap-1 items-center">
      <h2 class="font-bold text-2xl">
        Регистрация
      </h2>

      <img
        src="@/widgets/sign-up-form/icons/media.svg"
        alt="Регистрация"
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
        id="sign-up-name"
        v-model="formData.name"
        type="text"
        label="Ваше имя"
        placeholder="Ivan"
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
        id="sign-up-mail"
        v-model="formData.mail"
        class="mt-[10px]"
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
        id="sign-up-password"
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
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { customValidators } from '~/shared/const/customValidators'
import { usePostNewUser } from '~/widgets/sign-up-form/api/usePostNewUser'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import { useUserStore } from '~/entities/user/index'
import InputUi from '~/shared/ui/InputUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const emits = defineEmits(['send-main-data'])

const responseErrorMessage = ref('')
const formData = ref({
  name: '',
  mail: '',
  password: '',
})

const validateRules = computed(() => {
  return {
    name: {
      alpha: customValidators.alpha,
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
  const isFormValid = await validations.value.$validate()

  if (isFormValid) {
    responseErrorMessage.value = ''

    const response = await usePostNewUser(
      formData.value.mail,
      formData.value.password,
      formData.value.name
    )

    if (isSuccessResponse(response)) {
      userStore.id = response.body?.userId ?? 0
      userStore.email = formData.value.mail
      userStore.firstname = formData.value.name

      emits('send-main-data')
    } else {
      responseErrorMessage.value = response.exception.message
    }

    formData.value.name = ''
    formData.value.mail = ''
    formData.value.password = ''

    validations.value.$reset()
  }
}
</script>
