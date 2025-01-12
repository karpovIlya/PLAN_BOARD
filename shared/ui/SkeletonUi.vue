<template>
  <transition name="fade">
    <slot v-if="props.isLoading" name="skeleton" />
    <slot v-else name="content" />
  </transition>
</template>

<script setup lang="ts">
interface IProps {
  isLoading: boolean
}

const props = withDefaults(
  defineProps<IProps>(),
  { isLoading: false, }
)
</script>
