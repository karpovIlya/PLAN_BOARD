<template>
  <div class="max-w-[1114px] mx-auto px-4">
    <h2 class="text-2xl font-medium text-helper-200">
      Ваши проекты
    </h2>

    <div class="flex gap-4 flex-wrap justify-center mt-5">
      <project-item
        v-for="(project, index) in projectStore.catalog"
        :key="index"
        :project-data="project"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectItem from '~/widgets/projects-list/components/ProjectItem.vue'
import { useProjectStore } from '~/entities/projects'

const projectStore = useProjectStore()

onMounted(async () => {
  const route = useRoute()

  if (
    route.params.id &&
    typeof route.params.id === 'string' &&
    !isNaN(parseInt(route.params.id))
  ) {
    projectStore.currentDirectoryId = parseInt(route.params.id)
  } else {
    projectStore.currentDirectoryId = 0
  }

  await projectStore.updateCurrentCatalog()
})
</script>
