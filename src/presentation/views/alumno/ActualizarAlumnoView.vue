<script setup lang="ts">
import { ActualizarAlumno } from '@/app/use-cases/alumno/ActualizarAlumno'
import { BuscarIdAlumno } from '@/app/use-cases/alumno/BuscarIdAlumno'
import type { Alumno } from '@/domain/entities/Alumno'
import { AlumnoRepositoryAPI } from '@/infra/repositories/AlumnoRepositoryAPI'
import FormAlumno from '@/presentation/components/alumno/FormAlumno.vue'
import FormLayout from '@/presentation/layouts/FormLayout.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'

const router = useRouter()

const idAlumno = router.currentRoute.value.params.id
const toast = useToast()
const alumnoRepo = new AlumnoRepositoryAPI()
const buscarAlumnos = new BuscarIdAlumno(alumnoRepo)

const alumno = ref<Alumno | null>()

const modo = ref<'ver' | 'editar' | 'registrar'>('registrar')

const cambiarModo = (nuevoModo: 'ver' | 'editar' | 'registrar') => {
  console.log(nuevoModo)
  router.push({ name: 'alumnos' })
}

const modificaAlumno = async (formData: Alumno) => {
  console.log(formData)
  const alumnoRepo = new AlumnoRepositoryAPI()
  const acutalizarUseCase = new ActualizarAlumno(alumnoRepo)

  if (!alumno.value) {
    toast.notify({
      message: 'Verifique',
    })
  } else {
    try {
      await acutalizarUseCase.execute(alumno.value.id, alumno.value)

      router.push({ name: 'alumnos' })

      toast.notify({
        message: 'Alumno Actualizado',
      })
    } catch (error) {
      console.log(error)

      toast.notify({
        message: 'Error al actualizar el alumno',
      })
    }
  }
}

onMounted(async () => {
  alumno.value = await buscarAlumnos.execute(Number(idAlumno))
})
</script>

<template>
  <FormLayout :title="`Modificar a ${alumno?.nombres}`">
    <FormAlumno
      v-if="alumno"
      :alumno="alumno"
      :modo="modo"
      @cambiar-modo="() => cambiarModo('editar')"
      @submit="modificaAlumno"
    />
    <template v-else>
      <p>Cargando...</p>
    </template>
  </FormLayout>
</template>
