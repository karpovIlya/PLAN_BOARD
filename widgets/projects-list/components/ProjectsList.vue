<template>
  <div>
    <div class="flex flex-col gap-2 max-w-[1114px] mx-auto px-4">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-medium text-helper-200">
          Ваши проекты
        </h2>

        <button-ui
          color="accent"
          @click="toggleModal"
        >
          Создать
        </button-ui>
      </div>

      <breadcrumbs-list
        :breadcrumbs="catalogData.breadcrumbs"
        :current-directory="catalogData.currentDirectory"
      />

      <div class="flex gap-4 flex-wrap justify-center">
        <project-item
          v-for="project in catalogData.catalog"
          :key="project.createdAt"
          :project-data="project"
        />
      </div>
    </div>

    <modal-ui v-model:is-opened="isModalOpened">
      <create-project-form
        @add-project="toggleModal"
      />
    </modal-ui>
  </div>
</template>

<script setup lang="ts">
import { CreateProjectForm } from '~/widgets/create-project-form'
import { BreadcrumbsList } from '~/widgets/files-breadcrumbs'
import type { IBodyCatalog } from '~/entities/projects'
import ProjectItem from '~/widgets/projects-list/components/ProjectItem.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ModalUi from '~/shared/ui/ModalUi.vue'

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
const isModalOpened = ref(false)

const toggleModal = () => {
  isModalOpened.value = !isModalOpened.value
}
</script>
