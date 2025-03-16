<script setup lang="ts">
import { generateId } from '@/infraestructure/utils/generateId'
interface InputComponentProps {
  disabled?: boolean
  label: string
  checked: boolean
  error?: string
}

const id = generateId()

const emit = defineEmits<{
  (event: 'update:checked', value: boolean): void
}>()

function updateChecked(e: Event) {
  emit('update:checked', Boolean((e.target as HTMLInputElement).value))
}

defineProps<InputComponentProps>()
</script>

<template>
  <fieldset class="flex items-center space-x-2">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :disabled="disabled"
      :checked="checked"
      :value="checked"
      :id="id"
      type="checkbox"
      @input="updateChecked"
    />
    <span v-if="error" class="text-sm text-red-600">{{ error }}</span>
  </fieldset>
</template>
