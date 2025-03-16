<script setup lang="ts">
import { useRouter } from 'vue-router'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import logoUAO from '@/assets/img/logo-alfa-y-omega.jpg'
import BackgroundBlobs from '../components/BackgroundBlobs.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const store = useAuthStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const message = ref('')
const showPassword = ref(false)

const login = async () => {
  await store.login(username.value, password.value)

  if (store.user !== null) {
    message.value = ''
    router.push({ name: 'inicio' })
  } else {
    message.value = 'Credenciales inválidas'
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-transparent p-4 sm:p-6 lg:p-8">
    <div class="w-full max-w-md rounded-3xl border border-neutral-400 bg-white p-8 shadow-2xl">
      <img :src="logoUAO" alt="logo" class="mx-auto mb-10 w-44 sm:w-48 lg:w-auto" />
      <h2 class="text-center text-3xl font-bold text-gray-800">Iniciar sesión</h2>
      <p v-if="message" class="mt-2 text-center text-red-500">{{ message }}</p>
      <hr class="my-4 border-t border-neutral-300" />
      <form @submit.prevent="login" class="mt-6">
        <div class="mb-4">
          <label class="block text-gray-700">Nombre de usuario</label>
          <input
            v-model="username"
            type="text"
            placeholder="Nombre de usuario"
            class="mt-2 w-full rounded-2xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Contraseña</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Contraseña"
              class="mt-2 w-full rounded-2xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 grid h-full place-items-center pt-2 hover:cursor-pointer"
              type="button"
            >
              <EyeIcon v-if="showPassword" class="h-6 w-6 text-gray-500" />
              <EyeOffIcon v-else class="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
        <ButtonComponent class="w-full" color="success" type="submit">
          Iniciar Sesion
        </ButtonComponent>
      </form>
    </div>
  </div>
  <BackgroundBlobs />
</template>

<style scoped>
/* Estilos personalizados para el login */
body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}
</style>
