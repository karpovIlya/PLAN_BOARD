<template>
  <div>
    <div class="flex gap-1 items-center">
      <h2 class="font-bold text-2xl">
        {{ props.title }}
      </h2>

      <img
        :src="props.img.src"
        :alt="props.img.alt"
      >
    </div>

    <p class="mt-[10px] font-light text-xs text-helper-400">
      {{ props.subtitle }}
    </p>

    <slot name="form" />
  </div>
</template>

<script setup lang="ts">
interface IImage {
  src: string
  alt: string
}

interface IProps {
  title: string
  subtitle: string
  img?: IImage
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    title: '',
    subtitle: '',
    img: () => ({
      src: '',
      alt: '',
    }),
  }
)
</script>
