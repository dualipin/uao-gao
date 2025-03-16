<script setup lang="ts">
import { Pago } from '@/core/domain/entities/Pago'
import InputComponent from './InputComponent.vue'
import SelectComponent from './SelectComponent.vue'
import { useStoreCarrera } from '../stores/carreraStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import ButtonComponent from './ButtonComponent.vue'
import { Search } from 'lucide-vue-next'
// import { alumnosStore } from '../stores/alumnosStore'
import api from '@/infraestructure/services/api'

const carreraStore = useStoreCarrera()
const carreraRef = storeToRefs(carreraStore)

// const alumno = alumnosStore()
const conceptos = ref<{ nombre: string; id: number }[]>([])

const getConceptos = async () => {
  const { data } = await api.get<
    {
      nombre: string
      id: number
    }[]
  >('/conceptos')
  return data
}

defineProps<{
  pago: Pago
  search(): void
}>()

const emit = defineEmits<{
  (event: 'update:pago', value: Pago): void
}>()

onMounted(async () => {
  await carreraStore.fetchCarreras()
  const cc = await getConceptos()

  conceptos.value = cc
})
</script>

<template>
  <form @submit.prevent>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div class="flex items-end gap-5">
        <InputComponent
          class="w-full"
          label="Matricula"
          :value="pago.matricula"
          @update:value="emit('update:pago', { ...pago, matricula: $event })"
        />
        <ButtonComponent @click="search"><Search /> </ButtonComponent>
      </div>
      <InputComponent
        label="Alumno"
        :value="pago.alumno"
        :disabled="true"
        @update:value="emit('update:pago', { ...pago, alumno: $event })"
      />
      <SelectComponent
        label="Carrera"
        :value="pago.carrera"
        @update:value="emit('update:pago', { ...pago, carrera: $event })"
      >
        <option value="0" selected disabled>Seleccione</option>
        <option v-for="carrera in carreraRef.carreras.value" :key="carrera.id" :value="carrera.id">
          {{ carrera.nombre }}
        </option>
      </SelectComponent>
      <InputComponent
        label="Semestre"
        :value="pago.semestre"
        @update:value="emit('update:pago', { ...pago, semestre: $event })"
      />
      <!-- <InputComponent
        label="Monto"
        :value="pago.monto.toString()"
        @update:value="emit('update:pago', { ...pago, monto: Number($event) })"
      /> -->

      <SelectComponent
        label="Monto"
        :value="pago.monto.toString()"
        @update:value="emit('update:pago', { ...pago, monto: Number($event) })"
      >
        <option value="0" selected disabled>Seleccione</option>
        <!-- <option value="500">500</option> -->
        <!-- <option value="100">100</option>
         <option value="200">200</option>
         <option value="300">300</option>
         <option value="400">400</option> -->
        <option value="500">500</option>
        <option value="600">600</option>
        <option value="700">700</option>
        <option value="800">800</option>
        <option value="900">900</option>
        <option value="1000">1000</option>
        <option value="1100">1100</option>
        <option value="1200">1200</option>
        <option value="1300">1300</option>
        <option value="1400">1400</option>
        <option value="1500">1500</option>
        >
      </SelectComponent>

      <SelectComponent
        label="Concepto"
        :value="pago.concepto"
        @update:value="emit('update:pago', { ...pago, concepto: $event })"
      >
        <option value="0" selected disabled>Seleccione</option>
        <option v-for="concepto in conceptos" :key="concepto.id" :value="concepto.id">
          {{ concepto.nombre }}
        </option>
      </SelectComponent>

      <SelectComponent
        label="Tipo de Pago"
        :value="pago.tipo!"
        @update:value="emit('update:pago', { ...pago, tipo: $event })"
      >
        <option value="N" selected disabled>Seleccione</option>
        <option value="E">Efectivo</option>
        <option value="T">Transferencia</option>
      </SelectComponent>

      <!-- <InputComponent
        label="Concepto"
        :value="pago.concepto"
        @update:value="emit('update:pago', { ...pago, concepto: $event })"
      /> -->
      <InputComponent
        label="Recibe"
        :disabled="true"
        :value="pago.recibe"
        @update:value="emit('update:pago', { ...pago, recibe: $event })"
      />
      <fieldset class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Comentario</label>
        <textarea
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
          :value="pago.comentario"
          @input="
            emit('update:pago', { ...pago, comentario: ($event.target as HTMLInputElement).value })
          "
        ></textarea>
      </fieldset>
    </div>

    <slot />
  </form>
</template>
