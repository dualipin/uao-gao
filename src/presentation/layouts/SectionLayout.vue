<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeName = ref(route.name)

watch(route, () => {
  routeName.value = route.name
})
</script>

<template>
  <header class="rounded-3xl border border-neutral-300 bg-white px-6 py-4 shadow-md">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800">
        {{
          routeName
            ?.toString()
            .replace('-', ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase())
        }}
      </h1>
    </div>
  </header>
  <main
    class="mt-5 h-full flex-1 overflow-auto rounded-3xl border border-neutral-300 bg-white px-4 py-8 shadow-2xl md:px-10 md:py-12"
  >
    <RouterView />
    <slot />
  </main>
</template>
