<script setup lang="ts">
import { usePagoStore } from '@/presentation/stores/pagoStore'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import TablaComponent from '@/presentation/components/TablaComponent.vue'
import DataRow from '@/presentation/components/DataRow.vue'
import InputComponent from '@/presentation/components/InputComponent.vue'
import ButtonComponent from '@/presentation/components/ButtonComponent.vue'
import { Filter, Plus, Printer, Search } from 'lucide-vue-next'
import { useStoreCarrera } from '@/presentation/stores/carreraStore'
import { useRouter } from 'vue-router'
import { generarReportePago } from '@/presentation/reports/PagoReport'
// import CheckBoxComponent from '@/presentation/components/CheckBoxComponent.vue'
import type { Pago } from '@/core/domain/entities/Pago'
import api from '@/infraestructure/services/api'
import { error } from 'console'

const matricula = ref('')
const storePago = usePagoStore()
const storeCarrera = useStoreCarrera()
const storePagoRef = storeToRefs(storePago)
const storeCarreraRef = storeToRefs(storeCarrera)
const carrera = ref(0)
const router = useRouter()

const pagos = ref<Pago[]>([])
const todo = ref(true)
const fin = ref(new Date().toISOString().split('T')[0])
const inicio = ref(
  new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
)

const filtrarPagos = async () => {
  await storePago.obtenerPagos()
  let filteredPagos = storePagoRef.pagos.value

  if (carrera.value !== 0) {
    filteredPagos = filteredPagos.filter((pago) =>
      storeCarreraRef.carreras.value.some((carrera) => carrera.nombre === pago.carrera),
    )
  }

  filteredPagos = filteredPagos.filter((pago) => {
    const pagoDate = new Date(pago.fecha)
    return pagoDate >= new Date(inicio.value) && pagoDate <= new Date(fin.value)
  })

  pagos.value = filteredPagos
}

function buscarFolioMatricula() {
  const folioMatricula = matricula.value.trim().toLowerCase()
  let filter: Pago[] = []

  if (folioMatricula) {
    filter = storePagoRef.pagos.value.filter((pago) => {
      return (
        pago.folio.toLocaleLowerCase().includes(folioMatricula) ||
        pago.matricula.toLowerCase().includes(folioMatricula)
      )
    })
  } else {
    filter = storePagoRef.pagos.value
  }

  pagos.value = filter
}

onMounted(async () => {
  await storeCarrera.fetchCarreras()
  await storePago.obtenerPagos()

  pagos.value = storePagoRef.pagos.value
})

watch(todo, (value) => {
  console.log(value)
})
</script>

<template>
  <div class="mb-4">
    <div class="flex flex-col gap-5 md:flex-row md:gap-10">
      <div class="flex w-full flex-col-reverse gap-5 xl:flex-row xl:gap-5">
        <div class="flex gap-5">
          <InputComponent v-model:value="inicio" label="Fecha de Inicio" type="date" />
          <InputComponent v-model:value="fin" label="Fecha de Fin" type="date" />
        </div>

        <div class="flex gap-5">
          <!-- carreras -->
          <fieldset class="space-y-2">
            <label for="carrera" class="block text-sm font-medium text-gray-700">Carrera:</label>
            <select
              v-model="carrera"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
            >
              <option value="0">Todas las Carreras</option>
              <option
                v-for="carrera in storeCarreraRef.carreras.value"
                :key="carrera.id"
                :value="carrera.id"
              >
                {{ carrera.nombre }}
              </option>
            </select>
          </fieldset>

          <!-- <CheckBoxComponent :checked="todo" label="Todo" /> -->

          <!-- boton filtrar -->
          <ButtonComponent
            @click="filtrarPagos"
            color="warning"
            class="mt-auto flex justify-between gap-2"
          >
            Filtrar <Filter />
          </ButtonComponent>
        </div>

        <!-- opciones -->
        <div class="mt-auto ml-auto flex gap-5">
          <ButtonComponent
            @click="generarReportePago(matricula, new Date(inicio), new Date(fin), carrera, todo)"
            color="dark"
            class="flex items-center gap-3"
          >
            Reporte General <Printer />
          </ButtonComponent>
          <ButtonComponent
            @click="() => router.push({ name: 'registrar-pago' })"
            color="success"
            class="flex items-center gap-3"
          >
            Nuevo <Plus />
          </ButtonComponent>
        </div>
      </div>
    </div>

    <div class="mt-8 flex items-center gap-5">
      <InputComponent
        class="w-full md:w-1/3"
        placeholder="Matricula o Nombre a buscar"
        v-model:value="matricula"
        label="Matrícula"
      />
      <ButtonComponent
        @click="buscarFolioMatricula()"
        color="primary"
        class="mt-auto flex justify-between gap-2"
      >
        Buscar <Search />
      </ButtonComponent>
    </div>
  </div>

  <TablaComponent
    title="Pagos"
    description="Listado de los pagos realizados"
    :headers="['Folio', 'Matricula', 'Alumno', 'Monto', 'Concepto', 'Carrera', 'Acciones']"
    :length="storePagoRef.pagos.value.length"
  >
    <template #other>
      <div class="my-2 text-right">
        Recaudado: ${{ pagos.reduce((sum, pago) => Number(sum) + Number(pago.monto), 0) }}
      </div>
    </template>
    <DataRow
      v-for="(pago, index) in pagos"
      :key="index"
      :columns="[
        pago.folio,
        pago.matricula,
        pago.alumno,
        pago.monto.toString(),
        pago.concepto,
        pago.carrera,
      ]"
      :edit-link="{ name: 'actualizar-pago', params: { id: pago.folio } }"
    >
      <!-- :deleted="
        async () => {
          try {
            await api.delete(`pagos/${pago.folio}/`)
            await storePago.obtenerPagos()
          } catch (error) {
            console.log('Error al eliminar')
            console.error(error)
          }
        }
      " -->
      <button>
        <Printer />
      </button>
    </DataRow>
  </TablaComponent>
</template>
