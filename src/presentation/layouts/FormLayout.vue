<script setup lang="ts">
defineProps<{
  title: string
  descripcion?: string
}>()
</script>

<template>
  <div class="mx-auto -my-8 max-w-5xl p-6 py-3">
    <h1 class="mb-4 text-2xl font-semibold text-neutral-900">{{ title }}</h1>
    <p v-if="descripcion" class="mb-4 text-neutral-800">{{ descripcion }}</p>
    <hr class="mb-6 max-w-4xl" />
    <div>
      <slot />
    </div>
  </div>
</template>
