<template>
  <button
    class="font-medium rounded-md text-m px-5 py-2.5 focus:outline-none"
    :type="props.type"
    :class="[buttonColor]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IProps {
  type?: 'button' | 'submit'
  color?: 'primary' | 'accent'
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    type: 'button',
    color: 'accent',
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
