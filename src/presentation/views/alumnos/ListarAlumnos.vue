<script setup lang="ts">
import type { Alumno } from '@/core/domain/entities/Alumno'
import type { Carrera } from '@/core/domain/entities/Carrera'
import { generarFecha } from '@/app/utils/generateFecha'
import ButtonComponent from '@/presentation/components/ButtonComponent.vue'
import DataRow from '@/presentation/components/DataRow.vue'
import InputComponent from '@/presentation/components/InputComponent.vue'
import TablaComponent from '@/presentation/components/TablaComponent.vue'
import { generarReporteAlumno } from '@/presentation/reports/AlumnoReport'
import { alumnosStore } from '@/presentation/stores/alumnosStore'
import { useStoreCarrera } from '@/presentation/stores/carreraStore'
import { Filter, Plus, Printer, Search } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SelectComponent from '@/presentation/components/SelectComponent.vue'

const router = useRouter()
const storeAlumno = alumnosStore()
const date = generarFecha()
const alumnos = ref<Alumno[]>([])
const storeCarrera = useStoreCarrera()
const carreras = ref<Carrera[]>([])
const inicio = ref(
  new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
)
const fin = ref(date)
const matricula = ref('')
const carrera = ref(0)
const dia = ref('')

onMounted(async () => {
  await storeCarrera.fetchCarreras()
  await storeAlumno.obtenerAlumnos()

  alumnos.value = storeAlumno.alumnos
  carreras.value = storeCarrera.carreras

  console.log('alumnos', alumnos.value)
})

const filtrarAlumnos = () => {
  const inicioDate = new Date(inicio.value)
  const finDate = new Date(fin.value)

  alumnos.value = storeAlumno.alumnos.filter((alumno) => {
    const fechaIngreso = new Date(alumno.fecha_ingreso!)
    const carreraMatch = carrera.value === 0 || alumno.carrera === carrera.value
    const fechaMatch = fechaIngreso >= inicioDate && fechaIngreso <= finDate

    let diaMatch = dia.value === alumno.dia

    if (dia.value == '') {
      diaMatch = true
    }

    console.log('Dia', dia.value, diaMatch)

    return carreraMatch && fechaMatch && diaMatch
  })
}

const buscarAlumno = () => {
  const searchTerm = matricula.value.toLowerCase()
  alumnos.value = storeAlumno.alumnos.filter((alumno) => {
    const fullName = `${alumno.nombres} ${alumno.apellidos}`.toLowerCase()
    return alumno.matricula?.toLowerCase().includes(searchTerm) || fullName.includes(searchTerm)
  })
}

watch(inicio, () => {
  console.log('matricula', inicio.value)
})

watch(dia, () => {
  console.log('dia', dia.value)
})

// onMounted(() => generarReporteAlumno())
</script>

<template>
  <div class="mb-8">
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
              <option v-for="carrera in carreras" :key="carrera.id" :value="carrera.id">
                {{ carrera.nombre }}
              </option>
            </select>
          </fieldset>

          <SelectComponent v-model:value="dia" label="Dia">
            <option value="" selected>Todos los dias</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
            <option value="Sabado">Sabado</option>
            <option value="Domingo">Domingo</option>
          </SelectComponent>

          <!-- boton filtrar -->
          <ButtonComponent
            @click="filtrarAlumnos"
            color="warning"
            class="mt-auto flex justify-between gap-2"
          >
            Filtrar <Filter />
          </ButtonComponent>
        </div>

        <!-- opciones -->
        <div class="mt-auto ml-auto flex gap-5">
          <ButtonComponent
            @click="generarReporteAlumno(inicio, fin, carrera, dia)"
            color="dark"
            class="flex items-center gap-3"
          >
            Reporte General <Printer />
          </ButtonComponent>
          <ButtonComponent
            @click="() => router.push({ name: 'registrar-alumno' })"
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
        @click="buscarAlumno"
        color="primary"
        class="mt-auto flex justify-between gap-2"
      >
        Buscar <Search />
      </ButtonComponent>
    </div>
  </div>

  <TablaComponent
    title="Alumnos"
    description="Listado de alumnos registrados"
    :length="storeAlumno.alumnos.length"
    :headers="[
      'Matricula',
      'Estudiante',
      'Carrera',
      'Fecha de Registro',
      'Semestre',
      'Dia',
      'Acciones',
    ]"
  >
    <DataRow
      v-for="(alumno, index) in alumnos"
      :key="index"
      :columns="[
        alumno.matricula || '',

        `${alumno.nombres} ${alumno.apellidos}`,

        alumno.carrera
          ? carreras.find((carrera) => carrera.id === alumno.carrera!)?.nombre!
          : 'no encontrado',

        alumno.fecha_ingreso || 'no encontrado',

        alumno.semestre ? alumno.semestre?.toString() : 'no encontrado',
        alumno.dia || 'na',
      ]"
      :view-link="{ name: 'ver-alumno', params: { id: alumno.id } }"
      :edit-link="{ name: 'editar-alumno', params: { id: alumno.id } }"
      :deleted="
        async () => {
          storeAlumno.eliminarAlumno(alumno.id!)
          await storeAlumno.obtenerAlumnos()
          alumnos = storeAlumno.alumnos
        }
      "
    >
      <!-- {{ carreras.find((carrera) => carrera.id === alumno.idCarrera!)?.nombre! }} -->
    </DataRow>
  </TablaComponent>
</template>
