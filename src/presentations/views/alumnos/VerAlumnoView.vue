<script setup lang="ts">
import type { Alumno } from '@/domain/entities/Alumno'
import FormAlumnosComponent from '@/presentation/components/FormAlumnosComponent.vue'
import { alumnosStore } from '@/presentation/stores/alumnosStore'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const alumno = ref<Alumno | null>(null)

const store = alumnosStore()

onMounted(async () => {
  const id = route.params.id
  if (id) {
    alumno.value = await store.buscarAlumnoPorId(Number(id))
    console.log('alumno', alumno.value)
  }
})
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <template v-if="alumno">
      <h1 class="mb-4 text-xl font-bold">
        Datos de {{ alumno.matricula }} {{ alumno.nombres }} {{ alumno.apellidos }}
      </h1>
      <p class="mb-4">Informacion General</p>
      <hr class="mb-6" />

      <FormAlumnosComponent :disabled="true" :alumno="alumno" />
    </template>

    <p v-else>No se encontró el alumno</p>
  </div>
</template>
