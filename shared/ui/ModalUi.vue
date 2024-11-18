<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="props.isOpened"
      class="
      fixed top-0 flex justify-center items-center
      w-screen h-screen bg-helper-300/25
    "
      @click.self="closeModalWindow"
    >
      <div
        class="
        w-[450px] h-max bg-background-100
        p-5 rounded-md
      "
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface IProps {
  isOpened: boolean
}

const emits = defineEmits(['update:isOpened'])
const props = withDefaults(
  defineProps<IProps>(),
  { isOpened: false, }
)

const closeModalWindow = () => {
  emits('update:isOpened', false)
}
</script>
