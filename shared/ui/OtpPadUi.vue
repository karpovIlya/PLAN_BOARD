<template>
  <div ref="container" class="flex justify-center gap-[10px] w-full">
    <input
      v-for="(id, index) in props.length"
      :key="id"
      v-model="values[index]"
      class="
        w-[40px] h-[50px] text-center bg-neutral-300 border border-neutral-200
        text-helper-200 text-md rounded-md focus:outline-none
      "
      type="text"
      maxlength="1"
      placeholder="0"
      @keyup="handlePressedKey($event, index)"
      @paste.prevent="handlePaste"
    >
  </div>
</template>

<script setup lang="ts">
import { useNumericCheck } from '~/shared/lib/hooks/useNumericCheck'

interface IProps {
  length?: number
}

const emits = defineEmits(['filled-otp'])
const props = withDefaults(
  defineProps<IProps>(),
  {
    length: 4,
  }
)

const container: Ref<HTMLDivElement | null> = ref(null)
const values: Ref<string[]> = ref(new Array(props.length).fill(''))

const clearValues = () => {
  for (let i = 0; i < props.length; i++) {
    values.value[i] = ''
  }
}

const handlePressedKey = (event: KeyboardEvent, index: number) => {
  if (!container.value) { return }

  const { children: containerChildren, } = container.value as HTMLDivElement
  const { key: pressedKey, } = event

  if (['Backspace', 'Delete'].includes(pressedKey)) {
    values.value[index] = ''

    if (index > 0) {
      if (containerChildren[index - 1] instanceof HTMLInputElement) {
        const previousInput = containerChildren[index - 1] as HTMLInputElement
        previousInput.focus()
      }
    }

    return
  }

  if (useNumericCheck(pressedKey)) {
    if (index < props.length - 1) {
      values.value[index] = pressedKey

      if (containerChildren[index + 1] instanceof HTMLInputElement) {
        const nextInput = containerChildren[index + 1] as HTMLInputElement
        nextInput.focus()
      }
    }
  } else {
    values.value[index] = ''
  }
}

const handlePaste = (event: ClipboardEvent) => {
  const pastedData = event.clipboardData?.getData('text')

  if (pastedData && pastedData.length === props.length) {
    for (let i = 0; i < props.length; i++) {
      if (useNumericCheck(pastedData[i])) {
        values.value[i] = pastedData[i]
        continue
      }

      clearValues()
      break
    }
  }
}

watch(values.value, () => {
  const result = values.value.join('')

  if (result.length === props.length && useNumericCheck(result[props.length - 1])) {
    emits('filled-otp', parseInt(result))
    clearValues()
  }
})
</script>
