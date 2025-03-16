<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import { defineProps } from 'vue'

interface Props {
  onClick?: () => void
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  type?: ButtonHTMLAttributes['type']
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  onClick: () => {},
})
</script>

<template>
  <button
    @click="onClick"
    :class="[
      'rounded-xl px-4 py-2',
      {
        'border border-blue-900 bg-blue-700 text-white hover:brightness-110':
          props.color === 'primary',
        'border border-gray-900 bg-gray-500 text-white hover:brightness-110':
          props.color === 'secondary',
        'border border-green-900 bg-green-800 text-white hover:brightness-110':
          props.color === 'success',
        'border border-red-900 bg-red-500 text-white hover:brightness-110':
          props.color === 'danger',
        'border border-yellow-900 bg-orange-700 text-white hover:brightness-110':
          props.color === 'warning',
        'border border-blue-900 bg-blue-200 text-gray-700 hover:brightness-110':
          props.color === 'info',
        'border border-gray-900 bg-gray-200 text-gray-700 hover:brightness-110':
          props.color === 'light',
        'border border-gray-900 bg-gray-800 text-white hover:brightness-150':
          props.color === 'dark',
        'text-xs': props.size === 'xs',
        'text-sm': props.size === 'sm',
        'text-md': props.size === 'md',
        'text-lg': props.size === 'lg',
        'text-xl': props.size === 'xl',
        'cursor-not-allowed opacity-50': props.disabled,
        'cursor-wait': props.loading,
      },
    ]"
    :disabled="props.disabled || props.loading"
  >
    <slot></slot>
  </button>
</template>
