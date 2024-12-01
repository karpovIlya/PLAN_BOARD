<template>
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
  </header>
</template>

<script setup lang="ts">
import LogoUi from '~/shared/ui/LogoUi.vue'
</script>
