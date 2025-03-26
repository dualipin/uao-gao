<script setup lang="ts">
import { generateId } from '@/app/utils/generateId'
import type { InputHTMLAttributes } from 'vue'
import { defineEmits, defineProps } from 'vue'

interface InputComponentProps {
  disabled?: boolean
  label: string
  value: string
  type?: InputHTMLAttributes['type']
  error?: string
  placeholder?: string
}

defineProps<InputComponentProps>()

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
    <input
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue"
      :id="id"
      :name="label.replace(/ /g, '_').toLowerCase()"
      :type="type ? type : 'text'"
      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
    />
    <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
  </fieldset>
</template>
