<template>
  <div>
    <header class="flex justify-between container mx-auto">
      <div
        class="
          relative flex items-center gap-2.5 w-max py-1.5 px-5
          bg-background-100 shadow-md
        "
      >
        <logo-ui
          class="before:content-[''] before:absolute before:inset-0"
          link="/files"
          :width="55"
          :height="30"
        />

        <p class="text-2xl font-bold text-accent-100">
          PlanBoard
        </p>
      </div>

      <div
        class="
          relative flex items-center gap-2.5 w-max py-1.5 px-5
          bg-background-100 shadow-md
        "
      >
        <button-ui
          color="accent"
          @click="openModal"
        >
          Создать
        </button-ui>
      </div>
    </header>

    <modal-ui v-model:is-opened="isModalOpened">
      <create-project-form />
    </modal-ui>
  </div>
</template>

<script setup lang="ts">
import LogoUi from '~/shared/ui/LogoUi.vue'
import ButtonUi from '~/shared/ui/ButtonUi.vue'
import ModalUi from '~/shared/ui/ModalUi.vue'
import { CreateProjectForm } from '~/widgets/create-project-form'

const isModalOpened = ref(false)

const openModal = () => {
  isModalOpened.value = true
}
</script>
