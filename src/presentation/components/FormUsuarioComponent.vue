<script setup lang="ts">
import type { Usuario } from '@/core/domain/entities/Usuario'
import InputComponent from './InputComponent.vue'
import CheckBoxComponent from './CheckBoxComponent.vue'

const props = withDefaults(defineProps<{ usuario: Usuario; disable?: boolean }>(), {
  disable: false,
})
</script>

<template>
  <form>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <InputComponent :disabled="props.disable" :value="usuario.username" label="Username" />
      <InputComponent :disabled="props.disable" :value="usuario.nombres" label="Nombres" />
      <InputComponent :disabled="props.disable" :value="usuario.apellidos" label="Apellidos" />
      <InputComponent
        :disabled="props.disable"
        :value="usuario.correo"
        label="Correo"
        type="email"
      />
      <InputComponent
        :disabled="props.disable"
        :value="usuario.telefono"
        label="Telefono"
        type="tel"
      />
      <InputComponent
        :disabled="props.disable"
        :value="usuario.password"
        label="Password"
        type="text"
      />
      <CheckBoxComponent :checked="usuario.is_admin" label="Es admin" />
    </div>
    <slot />
  </form>
</template>
