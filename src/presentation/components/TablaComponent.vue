<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  headers: string[]
  length: number
}>()
</script>

<template>
  <div>
    <h2 class="mb-4 text-xl font-semibold md:text-2xl">{{ title }}</h2>
    <p v-if="description" class="mt-3 mb-4 text-gray-800">{{ description }}</p>
    <hr class="mb-6 max-w-3xl border-neutral-400" />
    <p v-if="length === 0">No hay registros</p>
    <template v-else>
      <slot name="other" />

      <div
        class="overflow-hidden overflow-x-scroll rounded-2xl border border-neutral-300 shadow-md"
      >
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-200">
              <th
                class="border border-neutral-300 p-1.5 font-semibold"
                v-for="(header, index) in headers"
                :key="index"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <slot name="default" />
          </tbody>
          <tfoot>
            <tr>
              <td colspan="100%" class="text-center text-sm text-gray-500">
                Se encontraron
                {{ length }}
                registros
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </template>
  </div>
</template>
