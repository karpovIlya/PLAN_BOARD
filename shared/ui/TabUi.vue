<template>
  <ul class="flex w-full p-1.5 rounded-md bg-neutral-100">
    <li
      v-for="tab in props.elements"
      :key="tab.content"
      class="
        grow py-2 rounded-md text-center text-helper-200
        text-md font-normal cursor-pointer
        transition-all ease-in-out
      "
      :class="{
        'bg-background-100 shadow-sm': props.activeTabId === tab.id
      }"
      @click="changeActiveTab(tab.id)"
    >
      {{ tab.content }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ITabElement } from '~/shared/model/TabElement.interface'

interface IProps {
  activeTabId: number
  elements: ITabElement[]
}

const emits = defineEmits(['update:activeTabId'])
const props = withDefaults(
  defineProps<IProps>(),
  { activeTabId: 0, elements: () => [], }
)

const changeActiveTab = (clickedTabId: number) => {
  emits('update:activeTabId', clickedTabId)
}
</script>
