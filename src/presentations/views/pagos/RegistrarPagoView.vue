<script setup lang="ts">
import { Alumno } from '@/domain/entities/Alumno'
// import { Carrera } from '@/core/domain/entities/Carrera'
import type { Pago } from '@/domain/entities/Pago'
import api from '@/infra/services/api'
import ButtonComponent from '@/presentation/components/ButtonComponent.vue'
import FormPagoComponent from '@/presentation/components/FormPagoComponent.vue'
import FormLayout from '@/presentation/layouts/FormLayout.vue'
import { alumnosStore } from '@/presentation/stores/alumnosStore'
import { useAuthStore } from '@/presentation/stores/authStore'
import { useStoreCarrera } from '@/presentation/stores/carreraStore'
import { ref, watch } from 'vue'

const auth = useAuthStore()
const alumnoStore = alumnosStore()
const carreraStore = useStoreCarrera()

const alumnoUni = ref<Alumno>()
// const carrera = ref<Carrera>()

const pago = ref<Pago>({
  folio: '',
  monto: 500,
  alumno: '',
  concepto: '0',
  cadena: '',
  carrera: '0',
  comentario: '',
  creado: '',
  fecha: '',
  matricula: '',
  recibe: `${auth.user?.nombres} ${auth.user?.apellidos}`,
  semestre: '1',
  tipo: 'N',
})

async function getAlumno() {
  await alumnoStore.obtenerAlumnos()
  await carreraStore.fetchCarreras()
  const alumnos = alumnoStore.alumnos
  const carreras = carreraStore.carreras

  alumnos.find((alumno) => {
    if (alumno.matricula === pago.value.matricula) {
      alumnoUni.value = alumno
      pago.value.alumno = `${alumno.nombres} ${alumno.apellidos}`
      pago.value.carrera =
        carreras.find((carrera) => carrera.id === alumno.carrera)?.id.toString() || ''
      pago.value.semestre = alumno.semestre?.toString() || ''
      return true
    }
  })
}

async function registrarPago() {
  try {
    const response = await api.post('/pagos/', {
      monto: pago.value.monto,
      comentarios: pago.value.comentario,
      tipo: pago.value.tipo,
      alumno: alumnoUni.value?.id,
      concepto: pago.value.concepto,
      recibe: auth.user?.id,
    })
    console.log('Pago registrado exitosamente:', response.data)
  } catch (error) {
    console.error('Error al registrar el pago:', error)
  }
}

watch(pago, () => {
  console.log(pago)
})
</script>

<template>
  <FormLayout title="Registro de pagos">
    <FormPagoComponent
      :search="
        () => {
          getAlumno()
        }
      "
      v-model:pago="pago!"
    >
      <ButtonComponent @click="registrarPago"> Registrar </ButtonComponent>
    </FormPagoComponent>
  </FormLayout>
</template>
