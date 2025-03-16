<script setup lang="ts">
import { Edit, Eye, Trash } from 'lucide-vue-next'
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'

interface DataRowProps {
  columns: string[]
  viewLink?: RouteLocationAsRelativeGeneric | string | RouteLocationAsPathGeneric
  editLink?: RouteLocationAsRelativeGeneric | string | RouteLocationAsPathGeneric
  deleted?: () => void
}

defineProps<DataRowProps>()
</script>

<template>
  <tr class="bg-neutral-100 odd:bg-white">
    <td class="border border-gray-300 px-2 py-1.5" v-for="(item, index) in columns" :key="index">
      {{ item }}
    </td>
    <td v-if="viewLink || editLink || deleted || $slots" class="border border-gray-300 px-2 py-1.5">
      <div class="flex justify-end gap-2">
        <RouterLink v-if="viewLink" :to="viewLink" class="text-blue-600">
          <Eye />
        </RouterLink>
        <RouterLink v-if="editLink" :to="editLink" class="text-yellow-600">
          <Edit />
        </RouterLink>
        <button v-if="deleted" @click="deleted" class="text-red-600">
          <Trash />
        </button>
        <slot />
      </div>
    </td>
  </tr>
</template>
