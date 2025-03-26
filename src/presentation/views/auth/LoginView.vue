<script setup lang="ts">
import { onMounted, ref } from 'vue'
import logoUAO from '@/assets/img/logo-alfa-y-omega.jpg'
import { useAuthStore } from '@/presentation/stores/useAuthStore'

const authStore = useAuthStore()

// const router = useRouter()
const username = ref('')
const password = ref('')
const message = ref('')
const showPassword = ref(false)

async function login() {
  try {
    await authStore.login(username.value, password.value)
    message.value = ''
    console.log(authStore.auth)
    // router.push({ name: 'inicio' })
  } catch (error) {
    console.log(error)
    message.value = 'Credenciales inválidas'
  }
}

// const login = async () => {
//   await store.login(username.value, password.value)

//   if (store.user !== null) {
//     message.value = ''
//     router.push({ name: 'inicio' })
//   } else {
//     message.value = 'Credenciales inválidas'
//   }
// }
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-transparent p-4 sm:p-6 lg:p-8"
  >
    <div
      class="w-full max-w-md rounded-3xl border border-neutral-400 bg-white p-8 shadow-2xl"
    >
      <img
        :src="logoUAO"
        alt="logo"
        class="mx-auto mb-10 w-44 sm:w-48 lg:w-auto"
      />
      <h2 class="text-center text-3xl font-bold text-gray-800">
        Iniciar sesión
      </h2>
      <p v-if="message" class="mt-2 text-center text-red-500">{{ message }}</p>
      <hr class="my-4 border-t border-neutral-300" />
      <form class="mt-6" @submit.prevent="login">
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
              class="absolute inset-y-0 right-3 grid h-full place-items-center pt-2 hover:cursor-pointer"
              type="button"
              @click="showPassword = !showPassword"
            >
              <EyeIcon v-if="showPassword" class="h-6 w-6 text-gray-500" />
              <EyeOffIcon v-else class="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Iniciar sesión
        </button>
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
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
}
</style>
