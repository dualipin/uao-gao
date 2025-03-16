<script setup lang="ts">
import type { Usuario } from '@/core/domain/entities/Usuario'
import { UsuarioUseCase } from '@/core/use_cases/UsuarioUseCase'
import { UsuarioRepositoryAPI } from '@/infraestructure/repositories/UsuarioRepositoryAPI'
import DataRow from '@/presentation/components/DataRow.vue'
import TablaComponent from '@/presentation/components/TablaComponent.vue'
import { onMounted, ref } from 'vue'

const usuarios = ref<Usuario[]>([])
defineExpose({ usuarios })
const repo = new UsuarioRepositoryAPI()
const useCase = new UsuarioUseCase(repo)

onMounted(async () => {
  usuarios.value = await useCase.getUsuarios()
  usuarios.value = usuarios.value.concat(
    usuarios.value,
    usuarios.value,
    usuarios.value,
    usuarios.value,
    usuarios.value,
  )
})
</script>

<template>
  <TablaComponent
    title="Usuarios"
    :length="usuarios.length"
    :headers="['Username', 'Nombre', 'Admin', 'Acciones']"
  >
    <DataRow
      v-for="usuario in usuarios"
      :columns="[
        usuario.username,
        `${usuario.nombres} ${usuario.apellidos}`,
        usuario.is_admin ? 'Si' : 'No',
      ]"
      :view-link="{ name: 'ver-usuario', params: { id: usuario.id } }"
      :key="usuario.id"
    />

    <!-- <tr class="bg-neutral-100 odd:bg-white" v-for="usuario in usuarios" :key="usuario.id">
      <td class="border border-gray-300 px-2 py-1.5">{{ usuario.username }}</td>
      <td class="border border-gray-300 px-2 py-1.5">
        {{ `${usuario.nombres} ${usuario.apellidos}` }}
      </td>
      <td class="border border-gray-300 px-2 py-1.5">
        <Check class="text-green-600" :size="25" v-if="usuario.is_admin" /> <X v-else />
      </td>
      <td class="border border-gray-300 px-2 py-1.5">
        <div class="flex justify-end gap-2">
          <RouterLink
            :to="{ name: 'ver-usuario', params: { id: usuario.id } }"
            class="text-blue-600"
          >
            <Eye />
          </RouterLink>
          <RouterLink
            :to="{ name: 'editar-usuario', params: { id: usuario.id } }"
            class="text-orange-600"
          >
            <Edit />
          </RouterLink>
          <RouterLink
            :to="{ name: 'editar-usuario', params: { id: usuario.id } }"
            class="text-red-600"
          >
            <Trash />
          </RouterLink>
        </div>
      </td>
    </tr> -->
  </TablaComponent>
</template>
