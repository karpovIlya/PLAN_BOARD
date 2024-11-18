<template>
  <form-base
    title="Создание проекта"
    subtitle="Выберите тип проекта для его создания"
  >
    <template #form>
      <div class="flex flex-col gap-[20px] mt-[20px]">
        <tab-ui
          v-model:active-tab-id="activeTabId"
          :elements="CREATE_PROJECT_TABS"
        />

        <transition name="fade" mode="out-in">
          <component :is="currentComponent" />
        </transition>
      </div>
    </template>
  </form-base>
</template>

<script setup lang="ts">
import { FormBase } from '~/widgets/form-base'
import { CREATE_PROJECT_TABS } from '~/widgets/create-project-form/const/Tabs'
import DirectoryForm from '~/widgets/create-project-form/components/DirectoryForm.vue'
import WorkspaceForm from '~/widgets/create-project-form/components//WorkspaceForm.vue'
import TabUi from '~/shared/ui/TabUi.vue'

const activeTabId = ref(1)
const currentComponent = computed(() => {
  switch (activeTabId.value) {
  case (1):
    return DirectoryForm
  case (2):
    return WorkspaceForm
  }
})
</script>
