<template>
  <div class="flex flex-col gap-1">
    <label
      :for="props.id"
      class="text-helper-300 text-sm font-normal"
    >
      {{ props.label }}
    </label>

    <div class="relative">
      <input
        :id="props.id"
        class="
          block w-full py-2.5 px-4 bg-neutral-300 border
          text-helper-200 text-sm rounded-md focus:outline-none
        "
        :value="props.modelValue"
        :class="[inputBorderColor]"
        :type="usedInputType"
        :placeholder="props.placeholder"
        :required="props.isRequired"
        @input="updateModelValue"
      >
      <div
        v-if="props.type === 'password'"
        class="absolute top-[50%] translate-y-[-50%] right-1"
      >
        <img
          v-if="!isPasswordVisible"
          class="cursor-pointer"
          src="@/assets/icons/general/eye-hide.svg"
          alt="Показать пароль"
          @click="() => togglePasswordVisibility('visible')"
        >
        <img
          v-else
          class="cursor-pointer"
          src="@/assets/icons/general/eye-open.svg"
          alt="Скрыть пароль"
          @click="() => togglePasswordVisibility('hide')"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type TInputType = 'text' | 'email' | 'password'

interface IProps {
  type: TInputType
  modelValue: string
  id: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  isInvalid?: boolean
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    type: 'text',
    modelValue: '',
    id: '',
    label: '',
    placeholder: 'some placeholder',
    isRequired: false,
    isInvalid: false,
  }
)
const emits = defineEmits(['update:modelValue'])
const isPasswordVisible = ref(false)

const usedInputType = computed((): TInputType => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  } else {
    return props.type
  }
})
const inputBorderColor = computed(() => {
  return props.isInvalid ? 'border-danger-100' : 'border-neutral-200'
})

const togglePasswordVisibility = (passwordState: 'hide' | 'visible') => {
  if (passwordState === 'visible') {
    isPasswordVisible.value = true
  } else {
    isPasswordVisible.value = false
  }
}
const updateModelValue = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>
