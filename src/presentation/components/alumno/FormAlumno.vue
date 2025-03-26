<script setup lang="ts">
import type { Alumno } from '@/domain/entities/Alumno'
import type { Carrera } from '@/domain/entities/Carrera'
import { useCarreraStore } from '@/presentation/stores/useCarrreraStore'
import { useDiaStore } from '@/presentation/stores/useDiaStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import type { SelectableOption } from 'vuestic-ui/dist/types/composables/useSelectableList.js'

const props = defineProps<{
  alumno: Alumno
  modo: 'editar' | 'ver' | 'registrar'
}>()

const emit = defineEmits<{
  (e: 'submit', data: Alumno): Promise<void>
  (e: 'cambiarModo', nuevoModo: 'ver' | 'editar' | 'registrar'): void
}>()

const formData = ref<Alumno>({ ...props.alumno })
const modo = ref(props.modo)
const carreraStore = useCarreraStore()
const carreraStoreRefs = storeToRefs(carreraStore)
const diaStore = useDiaStore()
const diaStoreRefs = storeToRefs(diaStore)

// const guardarCambios = () => {
//   emit('submit', formData.value)
// }

const defaultDocumentosEntregados = {
  id: 0,
  acta_nacimiento: false,
  curp: false,
  certificado_bachillerato: false,
  certificado_medico: false,
  folder: false,
}

const acta_nacimiento = computed({
  get: () => formData.value.documentos_entregados?.acta_nacimiento ?? false,
  set: (value: boolean) => {
    if (!formData.value.documentos_entregados) {
      formData.value.documentos_entregados = defaultDocumentosEntregados
    }
    formData.value.documentos_entregados!.acta_nacimiento = value
  },
})

const curp = computed({
  get: () => formData.value.documentos_entregados?.curp ?? false,
  set: (value: boolean) => {
    if (!formData.value.documentos_entregados) {
      formData.value.documentos_entregados = defaultDocumentosEntregados
    }
    formData.value.documentos_entregados!.curp = value
  },
})

const certificado_bachillerato = computed({
  get: () =>
    formData.value.documentos_entregados?.certificado_bachillerato ?? false,
  set: (value: boolean) => {
    if (!formData.value.documentos_entregados) {
      formData.value.documentos_entregados = defaultDocumentosEntregados
    }
    formData.value.documentos_entregados!.certificado_bachillerato = value
  },
})

const certificado_medico = computed({
  get: () => formData.value.documentos_entregados?.certificado_medico ?? false,
  set: (value: boolean) => {
    if (!formData.value.documentos_entregados) {
      formData.value.documentos_entregados = defaultDocumentosEntregados
    }
    formData.value.documentos_entregados!.certificado_medico = value
  },
})

const folder = computed({
  get: () => formData.value.documentos_entregados?.folder ?? false,
  set: (value: boolean) => {
    if (!formData.value.documentos_entregados) {
      formData.value.documentos_entregados = defaultDocumentosEntregados
    }
    formData.value.documentos_entregados!.folder = value
  },
})

watch(
  () => props.alumno,
  (alumno) => {
    formData.value = { ...alumno }
  },
)
watch(
  () => formData.value,
  (alumno) => {
    console.log(alumno)
  },
)

watch(modo, (value) => {
  console.log(value)
})

onMounted(() => {
  carreraStore.buscarTodos()
  diaStore.buscarTodos()
})
</script>
<template>
  <form @submit.prevent class="grid grid-cols-1 gap-5 md:grid-cols-3">
    <div class="col-span-full">
      <VaInput
        :disabled="props.modo === 'ver'"
        v-model="props.alumno.matricula!"
        label="Matricula"
        placeholder="Escribe la matricula"
      />
    </div>
    <VaInput
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.nombres!"
      label="Nombres"
      placeholder="Escribe los nombres"
      required-mark
      :rules="[(v: string) => v.length > 0 || 'Este campo es requerido']"
    />
    <VaInput
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.apellido_paterno!"
      required-mark
      label="Apellido Paterno"
      placeholder="Escribe el apellido paterno"
      :rules="[(v: string) => v.length > 0 || 'Este campo es requerido']"
    />
    <VaInput
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.apellido_materno!"
      required-mark
      label="Apellido Materno"
      placeholder="Escribe el apellido materno"
      :rules="[(v: string) => v.length > 0 || 'Este campo es requerido']"
    />
    <VaInput
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.correo!"
      label="Correo"
      type="email"
      placeholder="Escribe el correo"
    />
    <VaInput
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.telefono!"
      label="Teléfono"
      placeholder="Escribe el teléfono"
      :rules="[
        (v: string) => v.length === 10 || 'El teléfono debe tener 10 digitos',
        (v: string) => /^\d+$/.test(v) || 'El teléfono debe ser numérico',
      ]"
    />
    <VaDateInput
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.fecha_ingreso!"
      label="Fecha de Ingreso"
      required-mark
    />
    <VaSelect
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.carrera.id!"
      required-mark
      :options="
        carreraStoreRefs.carreras.value?.map((c: Carrera) => ({
          label: c.nombre,
          value: c.id,
        })) || []
      "
      text-by="label"
      value-by="value"
      label="Carrera"
      placeholder="Selecciona una carrera"
      :rules="[
        (v: SelectableOption) => Number(v) !== 0 || 'Este campo es requerido',
      ]"
    />
    <VaSelect
      :disabled="props.modo === 'ver'"
      multiple
      v-model="props.alumno.dias!"
      required-mark
      :options="
        diaStoreRefs.dias.value?.map((d) => ({
          label: d.dia,
          value: d.id,
        })) || []
      "
      text-by="label"
      value-by="value"
      label="Dias"
      placeholder="Selecciona los dias"
      :rules="[
        (v: SelectableOption) =>
          (Array.isArray(v) && v.length > 0) || 'Este campo es requerido',
      ]"
    />

    <VaSelect
      :disabled="props.modo === 'ver'"
      v-model="props.alumno.semestre!"
      label="Semestre"
      placeholder="Selecciona el semestre"
      :options="Array.from({ length: 9 }, (_, i) => i + 1).map((i) => i)"
      required-mark
      :rules="[
        (v: SelectableOption) => Number(v) > 0 || 'Este campo es requerido',
        (v: SelectableOption) =>
          Number(v) < 8 || 'El semestre debe ser menor a 8',
      ]"
    />
    <VaTextarea
      :disabled="props.modo === 'ver'"
      class="col-auto md:col-span-3"
      v-model="props.alumno.observaciones!"
      label="Observaciones"
      placeholder="Escribe las observaciones"
    />
    <div
      class="col-span-1 rounded-2xl border border-neutral-200 bg-neutral-50 p-2 md:col-span-3"
    >
      <div
        class="col-span-1 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
      >
        <h3 class="col-span-full text-lg font-bold">Documentos Entregados</h3>
        <VaSwitch
          :disabled="props.modo === 'ver'"
          v-model="acta_nacimiento"
          label="Acta de Nacimiento"
          required-mark
        />
        <VaSwitch
          :disabled="props.modo === 'ver'"
          v-model="curp"
          label="CURP"
          required-mark
        />
        <VaSwitch
          :disabled="props.modo === 'ver'"
          v-model="certificado_bachillerato"
          label="Certificado de Bachillerato"
          required-mark
        />
        <VaSwitch
          :disabled="props.modo === 'ver'"
          v-model="certificado_medico"
          label="Certificado Médico"
          required-mark
        />
        <VaSwitch
          :disabled="props.modo === 'ver'"
          v-model="folder"
          label="Folder"
          required-mark
        />
      </div>
    </div>

    <div class="flex items-end justify-start gap-3">
      <!-- <VaButton
        v-if="modo === 'ver'"
        color="primary"
        type="button"
        @click="emit('cambiarModo', 'editar')"
      >
        Editar
      </VaButton> -->
      <VaButton v-if="modo !== 'ver'" @click="emit('submit', formData)"
        >Guardar</VaButton
      >
      <VaButton
        color="danger"
        type="button"
        @click="emit('cambiarModo', 'ver')"
      >
        {{ modo == 'ver' ? 'Salir' : 'Cancelar' }}
      </VaButton>
    </div>
  </form>
</template>
