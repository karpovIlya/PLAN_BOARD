<template>
  <main>
    <projects-list />
  </main>
</template>

<script setup lang="ts">
import { ProjectsList } from '~/widgets/projects-list'
import { ProjectApi } from '~/entities/projects'
import { isSuccessResponse } from '~/shared/lib/helpers/isSuccessResponse'
import type { IBodyCatalog } from '~/entities/projects'

definePageMeta({
  layout: 'files-layout',
  middleware: 'auth',
})

const catalogData: Ref<IBodyCatalog> = ref({
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
provide('catalog-data', catalogData)

onMounted(async () => {
  const route = useRoute()
  let pageHash = ''

  if (
    route.params.hash &&
    typeof route.params.hash === 'string'
  ) {
    pageHash = route.params.hash
  }

  const catalogResponse = await ProjectApi.getCatalog(pageHash)
  if (isSuccessResponse(catalogResponse) && catalogResponse.body) {
    catalogData.value = catalogResponse.body
  }
})
</script>
