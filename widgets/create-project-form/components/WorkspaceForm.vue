<template>
  <div>
    <button-ui
      class="w-full"
      type="submit"
      color="accent"
      @click="createWorkspace"
    >
      Создать рабочую область
    </button-ui>

    <error-label-ui v-if="responseErrorMessage">
      {{ responseErrorMessage }}
    </error-label-ui>
  </div>
</template>

<script setup lang="ts">
import { ProjectApi, useProjectStore } from '~/entities/projects'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const projectStore = useProjectStore()
const responseErrorMessage = ref('')

const createWorkspace = async () => {
  const response = await ProjectApi.createWorkspace(
    projectStore.currentDirectoryId
  )

  if (isSuccessResponse(response)) {
    projectStore.updateCurrentCatalog()
  } else {
    responseErrorMessage.value = response.exception.message
  }
}
</script>
