<script setup lang="ts">
import { BuscarDiasUseCase } from '@/app/use-cases/alumno/BuscarDiasUseCase'
import { BuscarTodosAlumnos } from '@/app/use-cases/alumno/BuscarTodosAlumnos'
import { EliminarAlumnoUseCase } from '@/app/use-cases/alumno/EliminarAlumnoUseCase'
import { BuscarCarrerasUseCase } from '@/app/use-cases/carrera/BuscarCarrerasUseCase'
import { filterAlumnos } from '@/app/utils/filterAlumnos'
import { pageSelector } from '@/app/utils/pagesSelector'
import type { Alumno } from '@/domain/entities/Alumno'
import type { Carrera } from '@/domain/entities/Carrera'
import { Dia } from '@/domain/entities/Dia'
import type { Pago } from '@/domain/entities/Pago'
import { AlumnoRepositoryAPI } from '@/infra/repositories/AlumnoRepositoryAPI'
import { CarreraRepositoryAPI } from '@/infra/repositories/CarreraRepositoryAPI'
import { DiaRepositoryAPI } from '@/infra/repositories/DiaRepositoryApi'
import { PagoRepositoryAPI } from '@/infra/repositories/PagoRepositoryAPI'
import { generarReporteBienvenida } from '@/presentation/reports/BienvenidaReport'
import { generarReportePagos } from '@/presentation/reports/PagosReport'
import { generarRecibo } from '@/presentation/reports/ReciboPago'
import { Filter, Plus, Printer } from 'lucide-vue-next'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { VaDateInput, type DataTableColumnSource } from 'vuestic-ui'

const router = useRouter()

const pagos = ref<Pago[]>()

const dia = ref([])
const carrera = ref('')
const diaInicio = ref(
  new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .split('T')[0],
)
const diaFin = ref(new Date().toISOString().split('T')[0])
const filter = ref('')
const currentPage = ref()

const carreraRepo = new CarreraRepositoryAPI()
const buscarTodasCarrerasUseCase = new BuscarCarrerasUseCase(carreraRepo)
const diasRepo = new DiaRepositoryAPI()
const buscarTodosDiasUseCase = new BuscarDiasUseCase(diasRepo)
const alumnoRepo = new AlumnoRepositoryAPI()
const buscarAlumnosUseCase = new BuscarTodosAlumnos(alumnoRepo)

const pagosRepo = new PagoRepositoryAPI()

const carreras = reactive<Carrera[]>([])

const dias = reactive<Dia[]>([])

const columns: DataTableColumnSource[] = [
  'folio',
  'matricula',
  'alumno',
  'carrera',
  'monto',
  'semestre',
  'fecha',
  'concepto',
  'acciones',
]

watch(dia, () => {
  console.log(dia)
})

function customFilter() {
  const filtrado = filterAlumnos(
    alumnos.value,
    diaInicio.value,
    diaFin.value,
    dia.value,
    carrera.value,
  )

  alumnos.value = filtrado
}

function generarReporte() {
  generarReportePagos()
}

async function resetFilters() {
  dia.value = []
  carrera.value = ''
  diaInicio.value = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .split('T')[0]
  diaFin.value = new Date().toISOString().split('T')[0]
  filter.value = ''

  alumnos.value = await buscarAlumnosUseCase.execute()
}

const alumnos = ref<Alumno[]>([])

onMounted(async () => {
  const carrerasResponse = await buscarTodasCarrerasUseCase.execute()
  carreras.push(...(carrerasResponse ?? []))
  dias.push(...(await buscarTodosDiasUseCase.execute()))
  alumnos.value = await buscarAlumnosUseCase.execute()

  pagos.value = await pagosRepo.buscarTodos()
})
</script>

<template>
  <div class="mb-8">
    <div
      class="flex flex-col-reverse items-start gap-5 lg:justify-between lg:gap-10 xl:flex-row"
    >
      <div class="flex w-full flex-col items-center gap-5 lg:flex-row">
        <div class="flex w-full flex-col gap-5 lg:gap-5">
          <VaDateInput v-model="diaInicio" label="Fecha de Inicio" />
          <VaDateInput v-model="diaFin" label="Fecha Final" />
        </div>
        <div class="flex w-full flex-col gap-5 lg:gap-5">
          <VaSelect
            v-model="carrera"
            :options="
              [{ nombre: 'Todos' }].concat(carreras).map((c) => c.nombre)
            "
            placeholder="Seleccione una opción"
            label="Carrera"
          />

          <!-- <VaSelect
              multiple
              v-model="dia"
              :options="
                dias.map((d) => ({
                  label: d.dia,
                  value: d.id,
                }))
              "
              text-by="label"
              value-by="value"
              placeholder="Seleccione una opción"
              label="Dia/s"
            /> -->
        </div>
        <div class="mt-auto flex flex-col gap-3">
          <VaButton @click="customFilter">
            Filtrar <Filter class="ml-2" />
          </VaButton>
          <VaButton @click="resetFilters"> Remover </VaButton>
        </div>
      </div>
      <!-- boton filtrar -->

      <!-- opciones -->
      <div class="ml-auto flex gap-5 xl:ml-0">
        <VaButtonGroup>
          <VaButton @click="generarReporte" color="#000">
            Reporte General <Printer class="ml-2" />
          </VaButton>
          <VaButton
            @click="
              async () => {
                await router.push({ name: 'registrar-pago' })
              }
            "
            color="success"
            >Nuevo <Plus class="ml-2" />
          </VaButton>
        </VaButtonGroup>
      </div>
    </div>

    <div class="mt-8 flex items-center gap-5">
      <VaInput
        v-model="filter"
        label="Buscar Alumno"
        placeholder="Ingrese la palabra a buscar"
      />
    </div>
  </div>

  <div>
    <VaDataTable
      :filter="filter"
      :items="
        pagos?.map((p) => ({
          folio: p.folio,
          matricula: p.matricula,
          alumno: p.alumno,
          carrera: p.carrera,
          monto: p.monto,
          semestre: p.semestre,
          fecha: p.fecha,
          concepto: p.concepto,
        }))
      "
      :columns="columns"
      :per-page="10"
      :current-page="currentPage"
    >
      <template #cell(activo)="{ value }">
        <VaChip :color="value == 'true' ? 'primary' : 'danger'">
          <template v-if="value == 'true'">
            <VaIcon name="check" />
          </template>
          <template v-else>
            <VaIcon name="close" />
          </template>
        </VaChip>
      </template>

      <template #cell(acciones)="{ rowIndex }">
        <VaButtonGroup>
          <VaButton
            title="ver"
            color="success"
            icon="visibility"
            @click="
              async () => {
                if (pagos && pagos[rowIndex]) {
                  await router.push({
                    name: 'ver-pago',
                    params: { id: pagos[rowIndex].folio },
                  })
                }
              }
            "
          />
          <VaButton
            icon="edit"
            title="editar"
            @click="
              async () => {
                if (pagos && pagos[rowIndex]) {
                  await router.push({
                    name: 'editar-alumno',
                    params: { id: pagos[rowIndex].folio },
                  })
                }
              }
            "
            color="warning"
          />
          <VaButton
            @click="
              async () => {
                const alumnoRepo = new AlumnoRepositoryAPI()
                const elimanrAlumnoUseCase = new EliminarAlumnoUseCase(
                  alumnoRepo,
                )

                await elimanrAlumnoUseCase.execute(alumnos[rowIndex].id)

                alumnos = await buscarAlumnosUseCase.execute()
              }
            "
            title="eliminar"
            color="error"
            icon="delete"
          />
          <VaButton
            @click="
              () => {
                generarRecibo({
                  extension: 'Jalapa',
                  folio: 0,
                  dataPago: {
                    alumno: '',
                    carrera: '',
                    monto: 0,
                    semestre: 0,
                    fecha: '',
                    concepto: '',
                    cadena: '',
                    comentario: '',
                    creado: '',
                    folio: '',
                    matricula: '',
                    recibe: '',
                    tipo: 'E',
                  },
                })
              }
            "
            title="imprimir"
            color="secondary"
            icon="print"
          />
        </VaButtonGroup>
      </template>
      <template #bodyAppend>
        <tr>
          <td colspan="100%" class="text-center">
            <div class="flex justify-center">
              <VaPagination
                v-model="currentPage"
                :pages="pageSelector(10, alumnos.length)"
              />
            </div>
          </td>
        </tr>
      </template>
    </VaDataTable>
  </div>
</template>
