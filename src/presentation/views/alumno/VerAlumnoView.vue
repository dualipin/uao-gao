<script setup lang="ts">
import { BuscarIdAlumno } from '@/app/use-cases/alumno/BuscarIdAlumno'
import type { Alumno } from '@/domain/entities/Alumno'
import { AlumnoRepositoryAPI } from '@/infra/repositories/AlumnoRepositoryAPI'
import FormAlumno from '@/presentation/components/alumno/FormAlumno.vue'
import FormLayout from '@/presentation/layouts/FormLayout.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const $route = useRouter()
const idAlumno = $route.currentRoute.value.params.id
const alumno = ref<Alumno | null>(null)
const alumnoRepo = new AlumnoRepositoryAPI()
const buscarAlumnos = new BuscarIdAlumno(alumnoRepo)

function cambiarModo(nuevoModo: 'ver' | 'editar' | 'registrar') {
  console.log('cambiando modo a', nuevoModo)
  $route.push({ name: 'alumnos' })
}

onMounted(async () => {
  alumno.value = await buscarAlumnos.execute(Number(idAlumno))
})
</script>

<template>
  <FormLayout title="Ver Alumno">
    <FormAlumno
      v-if="alumno"
      :alumno="alumno"
      modo="ver"
      @cambiar-modo="cambiarModo"
    />
  </FormLayout>
</template>
