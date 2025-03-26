<script setup lang="ts">
import PagoForm from '@/presentation/components/pago/PagoForm.vue'
import FormLayout from '@/presentation/layouts/FormLayout.vue'
import { ref } from 'vue'
import type { FormDataPago } from '../types/formdatapago'
import api from '@/infra/services/api'
import { useToast } from 'vuestic-ui'
import { generarRecibo } from '@/presentation/reports/ReciboPago'

const toast = useToast()

const pago = ref<FormDataPago>({
  alumno: null,
  comentarios: '',
  concepto: null,
  monto: null,
  recibe: Number(localStorage.getItem('user')) || 1,
  tipo: null,
})

function pagoValidate(formData: FormDataPago) {
  return (
    formData.alumno !== null &&
    formData.concepto !== null &&
    formData.monto !== null &&
    formData.recibe !== null &&
    formData.tipo !== null
  )
}

async function submitPago(formData: FormDataPago) {
  if (!pagoValidate(formData)) {
    console.log('Formulario incompleto')
    toast.notify({
      message: 'Formulario incompleto',
      color: 'error',
    })
    return
  }

  try {
    const response = await api.post('/pagos/', formData)
    console.log(response)
    toast.notify({
      message: 'Pago registrado',
      color: 'success',
    })

    generarRecibo({ extension: 'Jalapa', folio: response.data.folio })
    return
  } catch (error) {
    console.error(error)
  }
  console.log(formData)
}
</script>

<template>
  <FormLayout
    title="Registro de nuevo pago"
    descripcion="Formulario para el registro de pago de los estudiantes"
  >
    <PagoForm v-bind:pago="pago" modo="registrar" @submit="submitPago" />
  </FormLayout>
</template>
