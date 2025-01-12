<template>
  <div class="flex gap-[6px]">
    <breadcrumb-item name="Главная" />

    <breadcrumb-item
      v-for="breadcrumb in breadcrumbsWithoutLastItem"
      :key="breadcrumb.hash"
      :name="breadcrumb.name"
      :hash="breadcrumb.hash"
    />

    <template v-if="isСurrentDirectoryMain">
      <breadcrumb-item
        :name="props.currentDirectory.name"
        :hash="props.currentDirectory.hash"
        :is-current-directory="true"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IDirectoryBase } from '~/entities/projects'
import BreadcrumbItem from '~/widgets/files-breadcrumbs/components/BreadcrumbItem.vue'

interface IProps {
  breadcrumbs: IDirectoryBase[]
  currentDirectory: IDirectoryBase
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    breadcrumbs: () => [],
    currentDirectory: () => ({
      id: null,
      parrentID: null,
      filesID: [],
      autorHash: null,
      hash: '',
      name: '',
      isPrivate: false,
    }),
  }
)

const isСurrentDirectoryMain = computed(() => {
  return !!props.currentDirectory.id
})
const breadcrumbsWithoutLastItem = computed(() => {
  return props.breadcrumbs.slice(0, -1)
})
</script>
