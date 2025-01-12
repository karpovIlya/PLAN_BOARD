<template>
  <button
    class="
      flex gap-1 justify-center font-medium ease-in-out
      rounded-md text-m px-5 py-2.5 focus:outline-none
    "
    :type="props.type"
    :class="[buttonColor]"
    :disabled="props.isLoading"
  >
    <slot />

    <transition name="fade" mode="out-in">
      <img
        v-if="isLoading"
        class="w-6"
        src="~/assets/icons/general/tube-spinner.svg"
        alt="Loading..."
      >
    </transition>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  type?: 'button' | 'submit'
  color?: 'primary' | 'accent'
  isLoading?: boolean
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    type: 'button',
    color: 'accent',
    isLoading: false,
  }
)

const buttonColor = computed(() => {
  switch (props.color) {
  case 'primary':
    return 'text-white bg-primary-100 hover:bg-primary-200'
  case 'accent':
    return 'text-white bg-accent-100 hover:bg-accent-200'
  }
})
</script>
