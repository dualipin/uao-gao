<script setup lang="ts">
import { generateId } from '@/app/utils/generateId'

interface Props {
  disabled?: boolean
  label: string
  value: string
  error?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>()

const updateValue = (event: Event) => {
  emit('update:value', (event.target as HTMLInputElement).value)
}

const id = generateId()
</script>

<template>
  <fieldset class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <select
      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
      :disabled="disabled"
      :id="id"
      :value="value"
      @input="updateValue"
    >
      <slot></slot>
    </select>
  </fieldset>
</template>
