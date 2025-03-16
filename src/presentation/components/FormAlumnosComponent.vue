<script setup lang="ts">
import type { Alumno } from '@/core/domain/entities/Alumno'
import InputComponent from './InputComponent.vue'
import { useStoreCarrera } from '../stores/carreraStore'
import { onMounted, ref, watch } from 'vue'
import type { Carrera } from '@/core/domain/entities/Carrera'
import { validateEmail, validatePhoneNumber } from '@/app/utils/validacion'
import { generarFecha } from '@/app/utils/generateFecha'
import SelectComponent from './SelectComponent.vue'

const storeCarrera = useStoreCarrera()
const carreras = ref<Carrera[]>([])

const props = defineProps<{
  alumno: Alumno
  disabled?: boolean
}>()

const emit = defineEmits<(event: 'update:alumno', value: Alumno) => void>()

onMounted(async () => {
  carreras.value = storeCarrera.carreras
})

const errores = ref<{ email: string; telefono: string }>({ email: '', telefono: '' })

const handleEmailUpdate = (email: string) => {
  if (!validateEmail(email)) {
    errores.value.email = 'Correo inválido'
  } else {
    errores.value.email = ''
  }
}

const handlePhoneUpdate = (telefono: string) => {
  if (!validatePhoneNumber(telefono)) {
    errores.value.telefono = 'Teléfono inválido'
  } else {
    errores.value.telefono = ''
  }
}

watch(
  () => props.alumno.email,
  (newEmail) => {
    handleEmailUpdate(newEmail || '')
  },
)

watch(
  () => props.alumno.telefono,
  (newTelefono) => {
    handlePhoneUpdate(newTelefono || '')
  },
)
</script>

<template>
  <form @submit.prevent>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <InputComponent
        :value="alumno.matricula!"
        label="Matrícula"
        @update:value="emit('update:alumno', { ...alumno, matricula: $event })"
      />
      <InputComponent
        :disabled="disabled"
        :value="alumno.nombres"
        @update:value="emit('update:alumno', { ...alumno, nombres: $event })"
        label="Nombres"
      />
      <InputComponent
        :disabled="disabled"
        v-model:value="alumno.apellidos!"
        @update:value="emit('update:alumno', { ...alumno, apellidos: $event })"
        label="Apellidos"
      />
      <InputComponent
        :disabled="disabled"
        :value="alumno.fecha_ingreso || generarFecha()"
        @update:value="(value) => emit('update:alumno', { ...alumno, fecha_ingreso: value })"
        label="Fecha de inicio"
        type="date"
      />
      <InputComponent
        :disabled="disabled"
        :value="alumno.email || ''"
        @update:value="
          (value) => {
            emit('update:alumno', { ...alumno, email: value })
            handleEmailUpdate(value)
          }
        "
        label="Correo Electrónico"
        type="email"
        :error="errores.email"
      />
      <InputComponent
        :disabled="disabled"
        :value="alumno.telefono || ''"
        @update:value="
          (value) => {
            emit('update:alumno', { ...alumno, telefono: value })
            handlePhoneUpdate(value)
          }
        "
        label="Teléfono"
        type="tel"
        :error="errores.telefono"
      />
      <SelectComponent
        :disabled="disabled"
        :value="alumno.semestre?.toString() || '0'"
        @update:value="emit('update:alumno', { ...alumno, semestre: Number($event) })"
        label="Semestre"
      >
        <option value="0" disabled selected>Seleccione un semestre</option>
        <option v-for="semestre in 9" :key="semestre" :value="semestre">{{ semestre }}</option>
      </SelectComponent>
      <SelectComponent
        :disabled="disabled"
        :value="alumno.carrera?.toString() || '0'"
        @update:value="emit('update:alumno', { ...alumno, carrera: Number($event) })"
        label="Carrera"
      >
        <option value="0" disabled selected>Seleccione una carrera</option>
        <option v-for="carrera in carreras" :key="carrera.id" :value="carrera.id">
          {{ carrera.nombre }}
        </option>
      </SelectComponent>

      <SelectComponent
        :value="alumno.dia!"
        @update:value="emit('update:alumno', { ...alumno, dia: $event })"
        label="Dia"
      >
        <option value="" selected disabled>Seleccione</option>
        <!-- <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miercoles">Miercoles</option> -->
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sabado">Sabado</option>
        <option value="Domingo">Domingo</option>
      </SelectComponent>

      <div>
        Documentacion entregada
        <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div class="flex w-full justify-between gap-1 rounded-lg bg-neutral-100 p-1">
            <label for="">Acta de nacimiento</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div class="flex w-full justify-between gap-1 rounded-lg bg-neutral-100 p-1">
            <label for="">Certificado Bachiller</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div class="flex w-full justify-between gap-1 rounded-lg bg-neutral-100 p-1">
            <label for="">Oficiio de certificacion o validacion</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div class="flex w-full justify-between gap-1 rounded-lg bg-neutral-100 p-1">
            <label for="">CURP</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div class="flex w-full justify-between gap-1 rounded-lg bg-neutral-100 p-1">
            <label for="">Certificado Medico</label>
            <input type="checkbox" name="" id="" />
          </div>
          <div class="flex w-full justify-between gap-1 rounded-lg bg-neutral-100 p-1">
            <label for="">Folder</label>
            <input type="checkbox" name="" id="" />
          </div>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <slot />
    </div>
  </form>
</template>
