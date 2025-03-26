<script setup lang="ts">
import type { Link } from '@/presentation/views/types/link'
import logoUAO from '@/assets/img/logo-alfa-y-omega.jpg'
import { MenuIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { toggleMenuItem } from '@/app/utils/toggleMenuItem'
import LogoutButton from '../auth/LogoutButton.vue'

defineProps<{ links: Link[] }>()
const indexToggle = ref(-1)
const menuVisible = ref(false)

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value
}
</script>

<template>
  <!-- vista Movil -->
  <nav
    class="sticky top-0 z-50 flex flex-col rounded-b-3xl bg-gray-950 text-gray-50 lg:hidden"
    :class="{ 'shadow-2xl': menuVisible, shadow: !menuVisible }"
  >
    <div class="flex h-16 items-center justify-between bg-gray-900 px-3 py-1">
      <RouterLink to="/" class="flex items-center gap-2">
        <img
          :src="logoUAO"
          alt="logo alfa y omega"
          class="h-14 rounded-2xl object-cover"
        />
      </RouterLink>
      <button
        class="flex h-16 items-center justify-center bg-gray-900"
        @click="toggleMenu"
      >
        <MenuIcon />
      </button>
    </div>
    <ul
      v-show="menuVisible"
      class="flex flex-col gap-2 rounded-b-2xl p-4 text-lg"
    >
      <li v-for="(link, index) in links" :key="index">
        <div class="flex items-center">
          <router-link
            :to="link.to"
            exact-active-class="bg-gray-700 font-semibold"
            class="flex w-full rounded-xl px-4 py-2 hover:bg-gray-700"
          >
            {{ link.text }}
          </router-link>
          <button
            v-if="link.links && link.links.length > 0"
            class="ml-2 flex aspect-square size-10 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
            @click="() => (indexToggle = toggleMenuItem(index, indexToggle))"
          >
            <span v-if="indexToggle === index">-</span>
            <span v-else>+</span>
          </button>
        </div>
        <ul
          v-if="link.links"
          v-show="indexToggle === index"
          class="flex flex-col gap-2 pt-2 pl-4 transition-all"
        >
          <li v-for="(sublink, index) in link.links" :key="index">
            <router-link
              :to="sublink.to"
              active-class="bg-gray-700 font-bold"
              class="flex items-center justify-between rounded-2xl px-4 py-2 hover:bg-gray-700"
            >
              {{ sublink.text }}
            </router-link>
          </li>
        </ul>
      </li>
      <div
        class="mt-auto flex flex-wrap items-center justify-center bg-gray-900 py-1"
      >
        <LogoutButton />
      </div>
    </ul>
  </nav>
</template>
