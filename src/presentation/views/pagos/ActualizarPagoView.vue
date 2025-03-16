<script setup lang="ts">
import type { Pago } from '@/core/domain/entities/Pago'
import FormPagoComponent from '@/presentation/components/FormPagoComponent.vue'
import { usePagoStore } from '@/presentation/stores/pagoStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const pagoStore = usePagoStore()
const pagoStoreRef = storeToRefs(pagoStore)

const pago = ref<Pago>()

onMounted(async () => {
  await pagoStore.obtenerPagos()
})
</script>

<template>
  <FormPagoComponent :pago="pago!"> </FormPagoComponent>
</template>
