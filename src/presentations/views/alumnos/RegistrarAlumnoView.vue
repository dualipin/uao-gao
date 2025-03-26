<script setup lang="ts">
import type { Alumno } from '@/domain/entities/Alumno'
import ButtonComponent from '@/presentation/components/ButtonComponent.vue'
import FormAlumnosComponent from '@/presentation/components/FormAlumnosComponent.vue'
import { alumnosStore } from '@/presentation/stores/alumnosStore'
import { ref, watch } from 'vue'
import confetti from 'js-confetti'
import ErrorMessage from '@/presentation/components/ErrorMessage.vue'

const alumno = ref<Alumno>({
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  fecha_ingreso: '',
  semestre: 0,
  carrera: 0,
  dia: '',
})

const error = ref('')

watch(alumno, (value) => {
  console.log('alumno', value)
})

const store = alumnosStore()

const submit = async () => {
  if (alumno.value.semestre === 0 || alumno.value.carrera === 0) {
    error.value = 'Por favor, complete todos los campos requeridos.'
    return
  }

  console.log('alumno', alumno.value)
  const save = await store.registrarAlumno(alumno.value)
  console.log('save', save)

  if (save) {
    new confetti().addConfetti()
    error.value = ''
  } else {
    error.value = 'Error al registrar el alumno'
  }
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <h1 class="mb-4 text-2xl font-bold">Registrar Alumno</h1>
    <p class="mb-4">Formulario para crear registrar un alumno</p>
    <hr class="mb-6" />
    <FormAlumnosComponent v-model:alumno="alumno">
      <div class="mt-5">
        <ButtonComponent color="primary" @click="submit">Registrar</ButtonComponent>

        <ErrorMessage v-if="error" :message="error" />
      </div>
    </FormAlumnosComponent>
  </div>
</template>
