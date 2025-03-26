<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
// import { useAuthStore } from '../stores/authStore'
import { LogOut } from 'lucide-vue-next'
import { watch } from 'vue'

// const store = useAuthStore()
// const storeRef = storeToRefs(store)

const router = useRouter()

// watch(storeRef.user, (user) => {
//   if (user === null) {
//     router.push({ name: 'login' })
//   }
// })
</script>

<template>
  <button
    class="w-full rounded-xl bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 md:mx-4"
  >
    Cerrar sesión

    <LogOut class="ml-2 inline-block h-6 w-6" />
  </button>
</template>
