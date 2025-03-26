<script setup lang="ts">
import { Pago } from '@/domain/entities/Pago'
import api from '@/infra/services/api'
import FormLayout from '@/presentation/layouts/FormLayout.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pago = ref<Pago | null>(null)

onMounted(async () => {
  const id = router.currentRoute.value.params.id

  if (!id) {
    router.push({ name: 'pagos' })
  }

  try {
    const response = await api.get('/pagos/' + id)

    pago.value = response.data

    console.log(response.data)
  } catch (error) {
    console.error(error)
    await router.push({ name: 'pagos' })
  }
})
</script>

<template>
  <FormLayout :title="`Pago de ${pago?.alumno} por $${pago?.monto}`">
    <ul class="divide-y divide-gray-200">
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Alumno:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.alumno }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Matrícula:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.matricula }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Carrera:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.carrera }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Semestre:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.semestre }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Concepto:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.concepto }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Monto:</strong>
        <span class="mt-1 block text-gray-900">${{ pago?.monto }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Fecha:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.fecha }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Tipo:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.tipo }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Recibe:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.recibe }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Cadena:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.cadena }}</span>
      </li>
      <li class="py-4">
        <strong class="block font-medium text-gray-700">Comentario:</strong>
        <span class="mt-1 block text-gray-900">{{ pago?.comentario }}</span>
      </li>
    </ul>

    <div>
      <VaButton @click="router.push({ name: 'pagos' })">Regresar</VaButton>
    </div>
  </FormLayout>
</template>
