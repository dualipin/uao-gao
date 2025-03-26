<script setup lang="ts">
import type { Alumno } from '@/domain/entities/Alumno'
import type { Carrera } from '@/domain/entities/Carrera'
import { useCarreraStore } from '@/presentation/stores/useCarrreraStore'
import { useDiaStore } from '@/presentation/stores/useDiaStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
// import type { SelectableOption } from 'vuestic-ui/dist/types/composables/useSelectableList.js'

const props = defineProps<{
  alumno: Alumno
  modo: 'editar' | 'ver' | 'registrar'
}>()

const emit = defineEmits<{
  (e: 'submit', data: Alumno): void
  (e: 'cambiarModo', nuevoModo: 'ver' | 'editar' | 'registrar'): void
}>()

// Copia reactiva del alumno recibido en props
const formData = ref<Alumno>({ ...props.alumno })
const modo = ref(props.modo)

const carreraStore = useCarreraStore()
const carreraStoreRefs = storeToRefs(carreraStore)
const diaStore = useDiaStore()
const diaStoreRefs = storeToRefs(diaStore)

// Función para garantizar que `documentos_entregados` siempre tenga un valor predeterminado
const getOrCreateDocumentosEntregados = () => {
  return (formData.value.documentos_entregados ??= {
    id: 0,
    acta_nacimiento: false,
    curp: false,
    certificado_bachillerato: false,
    certificado_medico: false,
    folder: false,
  })
}

// Computed para cada documento, usando la función `getOrCreateDocumentosEntregados()`
const acta_nacimiento = computed({
  get: () => getOrCreateDocumentosEntregados().acta_nacimiento,
  set: (value: boolean) =>
    (getOrCreateDocumentosEntregados().acta_nacimiento = value),
})

const curp = computed({
  get: () => getOrCreateDocumentosEntregados().curp,
  set: (value: boolean) => (getOrCreateDocumentosEntregados().curp = value),
})

const certificado_bachillerato = computed({
  get: () => getOrCreateDocumentosEntregados().certificado_bachillerato,
  set: (value: boolean) =>
    (getOrCreateDocumentosEntregados().certificado_bachillerato = value),
})

const certificado_medico = computed({
  get: () => getOrCreateDocumentosEntregados().certificado_medico,
  set: (value: boolean) =>
    (getOrCreateDocumentosEntregados().certificado_medico = value),
})

const folder = computed({
  get: () => getOrCreateDocumentosEntregados().folder,
  set: (value: boolean) => (getOrCreateDocumentosEntregados().folder = value),
})

// Guardar cambios y volver a modo "ver"
const guardarCambios = () => {
  emit('submit', formData.value)
  emit('cambiarModo', 'ver')
}

// Actualizar `formData` cuando `props.alumno` cambia
watch(
  () => props.alumno,
  (nuevoAlumno) => {
    formData.value = { ...nuevoAlumno }
  },
)

// Depuración en consola
watch(modo, (nuevoModo) => {
  console.log('Modo cambiado a:', nuevoModo)
})

onMounted(() => {
  carreraStore.buscarTodos()
  diaStore.buscarTodos()
})
</script>

<template>
  <form
    class="grid grid-cols-1 gap-5 md:grid-cols-3"
    @submit.prevent="guardarCambios"
  >
    <div class="col-span-full">
      <VaInput
        :disabled="modo === 'ver'"
        v-model="formData.matricula"
        label="Matricula"
        placeholder="Escribe la matrícula"
        required-mark
      />
    </div>

    <VaInput
      :disabled="modo === 'ver'"
      v-model="formData.nombres"
      label="Nombres"
      placeholder="Escribe los nombres"
      required-mark
    />
    <VaInput
      :disabled="modo === 'ver'"
      v-model="formData.apellido_paterno"
      label="Apellido Paterno"
      required-mark
    />
    <VaInput
      :disabled="modo === 'ver'"
      v-model="formData.apellido_materno"
      label="Apellido Materno"
      required-mark
    />
    <VaInput
      :disabled="modo === 'ver'"
      v-model="formData.correo"
      label="Correo"
      type="email"
    />
    <VaInput
      :disabled="modo === 'ver'"
      v-model="formData.telefono"
      label="Teléfono"
    />
    <VaDateInput
      :disabled="modo === 'ver'"
      v-model="formData.fecha_ingreso"
      label="Fecha de Ingreso"
      required-mark
    />

    <VaSelect
      :disabled="modo === 'ver'"
      v-model="formData.carrera.id"
      required-mark
      :options="
        carreraStoreRefs.carreras.value?.map((c: Carrera) => ({
          label: c.nombre,
          value: c.id,
        })) || []
      "
      label="Carrera"
    />

    <VaSelect
      :disabled="modo === 'ver'"
      multiple
      v-model="formData.dias"
      required-mark
      :options="
        diaStoreRefs.dias.value?.map((d) => ({ label: d.dia, value: d.id })) ||
        []
      "
      label="Días"
    />

    <VaSelect
      :disabled="modo === 'ver'"
      v-model="formData.semestre"
      label="Semestre"
      required-mark
      :options="Array.from({ length: 9 }, (_, i) => i + 1)"
    />

    <VaTextarea
      :disabled="modo === 'ver'"
      v-model="formData.observaciones!"
      label="Observaciones"
    />

    <div class="col-span-1 rounded-2xl border p-2 md:col-span-3">
      <h3 class="col-span-2 text-lg font-bold xl:col-span-3">
        Documentos Entregados
      </h3>
      <VaSwitch v-model="acta_nacimiento" label="Acta de Nacimiento" />
      <VaSwitch v-model="curp" label="CURP" />
      <VaSwitch
        v-model="certificado_bachillerato"
        label="Certificado de Bachillerato"
      />
      <VaSwitch v-model="certificado_medico" label="Certificado Médico" />
      <VaSwitch v-model="folder" label="Folder" />
    </div>

    <div class="flex items-end justify-start gap-3">
      <VaButton v-if="modo === 'ver'" @click="emit('cambiarModo', 'editar')"
        >Editar</VaButton
      >
      <VaButton v-if="modo === 'editar'" type="submit">Guardar</VaButton>
      <VaButton
        v-if="modo === 'editar'"
        color="danger"
        @click="emit('cambiarModo', 'ver')"
        >Cancelar</VaButton
      >
    </div>
  </form>
</template>
