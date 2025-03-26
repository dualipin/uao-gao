<script setup lang="ts">
import type { Usuario } from '@/domain/entities/Usuario'
import FormUsuarioComponent from '@/presentation/components/FormUsuarioComponent.vue'
import { ref } from 'vue'

const usuario = ref<Usuario>({
  nombres: '',
  apellidos: '',
  correo: '',
  password: '',
  is_admin: false,
  telefono: '',
  username: '',
})
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <h1 class="mb-4 text-2xl font-bold">Crear Usuario</h1>
    <p class="mb-4">Formulario para crear un usuario</p>
    <hr class="mb-6" />
    <FormUsuarioComponent :usuario="usuario" />
  </div>
</template>
