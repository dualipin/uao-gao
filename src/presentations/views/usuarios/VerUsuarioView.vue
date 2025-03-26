<script setup lang="ts">
import type { Usuario } from '@/domain/entities/Usuario'
import { UsuarioUseCase } from '@/core/use_cases/UsuarioUseCase'
import { UsuarioRepositoryAPI } from '@/infra/repositories/UsuarioRepositoryAPI'
import FormUsuarioComponent from '@/presentation/components/FormUsuarioComponent.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = ref<number>(parseInt(route.params.id as string))

const repo = new UsuarioRepositoryAPI()
const use = new UsuarioUseCase(repo)
const usaurio = ref<Usuario | null>()

onMounted(async () => {
  usaurio.value = await use.getUsuarioById(userId.value)
  usaurio.value.password = ''
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Usuario</h1>
    <p class="mb-4">Información del usuario</p>
    <hr class="mb-6 border-neutral-400" />
    <template v-if="usaurio"> <FormUsuarioComponent :usuario="usaurio" /> </template>
    <template v-else>
      <p>No hay usuario</p>
    </template>
  </div>
</template>
