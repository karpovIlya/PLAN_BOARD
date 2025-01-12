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
import { ProjectApi } from '~/entities/projects'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import type { IBodyCatalog } from '~/entities/projects'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ErrorLabelUi from '~/shared/ui/ErrorLabelUi.vue'

const emits = defineEmits(['add-project'])
const catalogData: Ref<IBodyCatalog> = inject(
  'catalog-data',
  ref({
    catalog: [],
    breadcrumbs: [],
    currentDirectory: {
      id: null,
      parrentID: null,
      filesID: [],
      autorHash: null,
      hash: '',
      name: '',
      isPrivate: false,
    },
  })
)

const isFormLoading = ref(false)
const responseErrorMessage = ref('')

const createWorkspace = async () => {
  isFormLoading.value = true

  const creationResponse = await ProjectApi.createWorkspace(
    catalogData.value.currentDirectory.id
  )

  if (isSuccessResponse(creationResponse)) {
    const updateCatalogResponse = await ProjectApi.getCatalog(
      catalogData.value.currentDirectory.hash
    )

    if (isSuccessResponse(updateCatalogResponse) && updateCatalogResponse.body) {
      catalogData.value = updateCatalogResponse.body
      emits('add-project')
    }
  } else {
    responseErrorMessage.value = creationResponse.exception.message
  }

  isFormLoading.value = false
}
</script>
