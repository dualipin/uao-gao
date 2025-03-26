<script setup lang="ts">
import { BuscarMatriculaAlumnoUseCase } from '@/app/use-cases/alumno/BuscarMatriculaAlumnoUseCase'
import type { Alumno } from '@/domain/entities/Alumno'
// import { Pago } from '@/domain/entities/Pago'
import { AlumnoRepositoryAPI } from '@/infra/repositories/AlumnoRepositoryAPI'
import api from '@/infra/services/api'
import type { FormDataPago } from '@/presentation/views/types/formdatapago'
import { onMounted, ref } from 'vue'
import { VaInput, VaSelect, VaButton } from 'vuestic-ui' // Import Vuestic components

const props = defineProps<{
  pago: FormDataPago
  modo: 'editar' | 'ver' | 'registrar'
}>()

const alumno = ref<Alumno | null>(null)

// const pago = ref(props.pago)

const alumnoRepo = new AlumnoRepositoryAPI()
const buscarMatriculaUseCase = new BuscarMatriculaAlumnoUseCase(alumnoRepo)

const conceptos = ref<{ id: number; nombre: string }[] | null>(null)

const matricula = ref('')

const formData = ref<FormDataPago>(props.pago)

const emit = defineEmits<{
  (e: 'submit', formData: FormDataPago): Promise<void>
}>()

async function enviarFormulario() {
  formData.value.alumno = alumno.value?.id || null
  emit('submit', formData.value)
}

async function buscarAlumno() {
  alumno.value = await buscarMatriculaUseCase.execute(matricula.value)
  if (alumno.value) {
    formData.value.alumno = alumno.value.id
  }
}

onMounted(async () => {
  const response = await api.get('/conceptos/')
  conceptos.value = response.data
})
</script>

<template>
  <form
    class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
    @submit.prevent="enviarFormulario"
  >
    <div class="col-span-full flex gap-4">
      <VaInput
        v-model="matricula"
        label="Matricula"
        placeholder="matricula a buscar"
      />
      <VaButton @click="buscarAlumno" class="mt-auto" icon="search"
        >Buscar</VaButton
      >
    </div>
    <div
      v-if="alumno"
      class="col-span-full rounded-2xl border border-neutral-300 bg-neutral-50 p-2"
    >
      <div class="p-4">
        <h3 class="mb-2 text-lg font-semibold">Información del Alumno</h3>
        <ul class="list-inside list-disc">
          <li>
            <strong>Nombre:</strong>
            {{
              `${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno}`
            }}
          </li>
          <li><strong>Carrera:</strong> {{ alumno.carrera.nombre }}</li>
          <li><strong>Semestre:</strong> {{ alumno.semestre }}</li>
        </ul>
      </div>
    </div>

    <VaSelect
      v-model="formData.monto"
      label="Monto"
      placeholder="Seleccione el monto"
      :options="[
        400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600,
        1700, 1800,
      ]"
    />
    <VaSelect
      v-model="formData.tipo"
      label="Tipo de pago"
      placeholder="seleccione el tipo de pago"
      :options="[
        {
          text: 'Efectivo',
          value: 'E',
        },
        {
          text: 'Transparencia',
          value: 'T',
        },
      ]"
      value-by="value"
    />

    <VaSelect
      v-model="formData.concepto"
      label="Concepto"
      placeholder="seleccione el concepto"
      :options="
        conceptos?.map((c) => ({
          text: c.nombre,
          value: c.id,
        }))
      "
      value-by="value"
    />
    <VaTextarea
      v-model="formData.comentarios"
      label="Comentarios"
      placeholder="Ingrese comentarios"
      type="textarea"
      rows="3"
      class="col-span-full"
    />

    <div class="col-span-full flex gap-4">
      <VaButton type="submit">Registrar pago</VaButton>
      <VaButton @click="() => {}" color="danger">Cancelar</VaButton>
    </div>
  </form>
</template>
