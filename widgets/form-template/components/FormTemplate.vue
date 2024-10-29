<template>
  <div
    class="
      grid lg:grid-cols-[3fr_1fr] md:grid-cols-[2fr_1fr] grid-cols-1
      min-h-screen bg-background-200
    "
  >
    <div class="flex justify-center items-center">
      <img
        class="block sm:w-6/12 w-full"
        alt="Изображение формы"
        :src="props.imageSrc"
      >
    </div>

    <div
      class="
        flex items-center justify-center
        p-5 shadow-md bg-background-100
      "
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  imageSrc: string
}

const props = withDefaults(
  defineProps<IProps>(),
  { imageSrc: '', }
)
</script>
