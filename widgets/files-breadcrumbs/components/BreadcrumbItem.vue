<template>
  <nuxt-link
    class="
      text-base text-helper-300
      hover:text-primary-200 transition-all
    "
    :class="[currentDirectoryClass]"
    :to="`/files/${props.hash}`"
  >
    {{ props.name }}

    <span v-if="!isCurrentDirectory">
      /
    </span>
  </nuxt-link>
</template>

<script setup lang="ts">
interface IProps {
  name: string
  hash?: string
  isCurrentDirectory?: boolean
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    name: '',
    hash: '',
    isCurrentDirectory: false,
  }
)

const currentDirectoryClass = computed(() => {
  return props.isCurrentDirectory ? 'font-medium text-accent-100' : 'font-normal'
})
</script>
