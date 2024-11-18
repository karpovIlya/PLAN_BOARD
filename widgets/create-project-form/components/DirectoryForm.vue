<template>
  <div>
    <form
      class="flex flex-col"
      @submit.prevent="createDirectory"
    >
      <input-ui
        v-model="formData.directoryName"
        type="text"
        label="Название директории"
        placeholder="Название"
        :is-required="true"
        :is-invalid="validations.directoryName.$error"
        @input="validations.directoryName.$touch()"
      />

      <error-label-ui
        v-for="error in validations.directoryName.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </error-label-ui>

      <button-ui
        class="mt-[20px]"
        type="submit"
        color="accent"
      >
        Создать директорию
      </button-ui>
    </form>

    <error-label-ui v-if="responseErrorMessage">
      {{ responseErrorMessage }}
    </error-label-ui>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { customValidators } from '~/shared/const/customValidators'
import { ProjectApi, useProjectStore } from '~/entities/projects'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import InputUi from '~/shared/ui/InputUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const projectStore = useProjectStore()
const responseErrorMessage = ref('')
const formData = ref({
  directoryName: '',
})

const validateRules = computed(() => {
  return {
    directoryName: {
      minLength: customValidators.minLength,
      maxLength: customValidators.maxLength,
    },
  }
})

const validations = useVuelidate(validateRules, formData)

const createDirectory = async () => {
  const isFormValid = await validations.value.$validate()

  if (isFormValid) {
    const response = await ProjectApi.createDirectory(
      formData.value.directoryName,
      projectStore.currentDirectoryId
    )

    if (isSuccessResponse(response)) {
      projectStore.updateCurrentCatalog()
    } else {
      responseErrorMessage.value = response.exception.message
    }

    formData.value.directoryName = ''
    validations.value.$reset()
  }
}
</script>
