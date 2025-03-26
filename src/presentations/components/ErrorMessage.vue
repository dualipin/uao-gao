<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div
    class="my-3 rounded border border-red-700 bg-red-500 p-4 text-white shadow-lg transition-opacity duration-500 hover:bg-red-600"
    role="alert"
  >
    {{ message }}
  </div>
</template>
