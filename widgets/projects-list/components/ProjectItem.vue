<template>
  <div
    class="
      flex items-start justify-between
      w-[350px] min-h-[70px] p-2.5 rounded-md
      cursor-pointer shadow-md bg-background-100
    "
    @click="openProject"
  >
    <div class="flex gap-2.5">
      <img
        class="w-[50px] h-[50px]"
        alt="Иконка проекта"
        :src="convertedProjectData.icon"
      >

      <div class="flex flex-col justify-between gap-1">
        <div class="flex gap-2.5">
          <p
            v-if="projectData.type === 'directory'"
            class="text-xs font-normal text-helper-300"
          >
            {{ convertedProjectData.amountFilesInDirectory }}
          </p>

          <div class="flex items-center gap-[5px]">
            <img
              class="w-[14px] h-[14px]"
              src="@/widgets/projects-list/icons/clock.svg"
              alt="Последнее обновление"
            >

            <p class="text-xs font-normal text-helper-300">
              {{ convertedProjectData.date }}
            </p>
          </div>
        </div>

        <p class="text-xl font-normal text-helper-200">
          {{ convertedProjectData.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ICatalogWorkspace,
  ICatalogDirectory
} from '~/entities/projects'

import FolderIcon from '~/widgets/projects-list/icons/folder.svg'
import WorkspaceIcon from '~/widgets/projects-list/icons/workspace.svg'

interface IProps {
  projectData: ICatalogWorkspace | ICatalogDirectory
}

const props = defineProps<IProps>()

const convertedProjectData = ref({
  icon: computed(() => {
    switch (props.projectData.type) {
    case 'workspace':
      return WorkspaceIcon
    case 'directory':
    default:
      return FolderIcon
    }
  }),
  name: computed(() => {
    const maxLettersInProjectName = 20
    const defaultName = props.projectData.name

    if (defaultName.length > 20) {
      return defaultName.slice(0, maxLettersInProjectName) + '...'
    }

    return defaultName
  }),
  date: computed(() => {
    return new Date(props.projectData.lastUpdated).toLocaleString()
  }),
  amountFilesInDirectory: computed(() => {
    if (props.projectData.type !== 'directory') {
      return ''
    }

    return `${(props.projectData as ICatalogDirectory).filesID.length} файлов`
  }),
})

const openProject = () => {
  const router = useRouter()

  switch (props.projectData.type) {
  case 'directory':
    router.push(`/files/${props.projectData.id}`)
    break
  case 'workspace':
    router.push(`/workspace/${props.projectData.hash}`)
    break
  }
}
</script>
