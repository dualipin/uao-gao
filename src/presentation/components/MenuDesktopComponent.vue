<script setup lang="ts">
import logoUAO from '@/assets/img/logo-alfa-y-omega.jpg'
import logoTabscoop from '@/assets/img/logo-tabscoob.jpg'
import { menuStore } from '../stores/menuStore'
import { storeToRefs } from 'pinia'
import ButtonLogoutComponent from './ButtonLogoutComponent.vue'

const useMenuStore = menuStore()
const ss = storeToRefs(useMenuStore)
const links = ss.getMenu

const toggle = useMenuStore.toggle

const indexToggle = ss.indexToggle
</script>

<template>
  <!-- vista Escritorio -->
  <aside class="relative hidden h-screen w-64 lg:block">
    <nav class="fixed flex h-full w-64 flex-col bg-gray-950 text-gray-50">
      <div class="mb-10 flex items-center justify-center bg-gray-900 py-4">
        <img :src="logoUAO" alt="logo alfa y omega" class="h-20 rounded-2xl object-cover" />
      </div>
      <ul class="flex flex-col gap-2 overflow-y-auto p-4">
        <li v-for="(link, index) in links" :key="index" class="flex flex-col">
          <div class="flex items-center">
            <RouterLink
              :to="link.to"
              exact-active-class="bg-gray-700 font-semibold"
              class="w-full rounded-xl px-4 py-2 hover:bg-gray-700"
            >
              {{ link.text }}
            </RouterLink>
            <button
              v-if="link.links && link.links.length > 0"
              class="ml-2 flex aspect-square size-8 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700"
              @click="toggle(index)"
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
      </ul>
      <div class="mt-auto flex flex-wrap items-center justify-center gap-4 bg-gray-900 py-3">
        <ButtonLogoutComponent />
        <!-- <RouterLink
          to="/login"
          class="mx-10 mb-4 w-full rounded-2xl border border-red-600 bg-red-600 text-center text-lg font-semibold hover:underline"
          >Cerrar Sesión</RouterLink
        > -->
        <img :src="logoTabscoop" alt="logo tabscoop" class="h-24 rounded-2xl object-cover" />
      </div>
    </nav>
  </aside>
</template>
