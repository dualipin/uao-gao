<script setup lang="ts">
defineProps<{
  title: string
  descripcion?: string
}>()
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <h1 class="mb-4 text-2xl font-bold">{{ title }}</h1>
    <p class="mb-4">{{ descripcion }}</p>
    <hr class="mb-6" />
    <div>
      <slot />
    </div>
  </div>
</template>
