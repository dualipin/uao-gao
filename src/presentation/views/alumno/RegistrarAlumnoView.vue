<script setup lang="ts">
import { RegistrarAlumno } from '@/app/use-cases/alumno/RegistrarAlumno'
import type { Alumno } from '@/domain/entities/Alumno'
import { AlumnoRepositoryAPI } from '@/infra/repositories/AlumnoRepositoryAPI'
import FormAlumno from '@/presentation/components/alumno/FormAlumno.vue'
import RegisterLayout from '@/presentation/layouts/FormLayout.vue'
import { generarReporteBienvenida } from '@/presentation/reports/BienvenidaReport'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'

const router = useRouter()

const alumno = ref<Alumno>({
  nombres: '',
  apellido_paterno: '',
  apellido_materno: '',
  carrera: { id: null, nombre: '' },
  semestre: 1,
  dias: [],
  correo: '',
  telefono: '',
  direccion: null,
  documentos_entregados: {
    id: 0,
    acta_nacimiento: false,
    curp: false,
    certificado_bachillerato: false,
    certificado_medico: false,
    folder: false,
  },
  fecha_creacion: null,
  fecha_modificacion: null,
  fecha_ingreso: new Date().toISOString().split('T')[0],
  id: 0,
  is_active: true,
  matricula: null,
  observaciones: '',
})

// const errores = ref({
//   nombres: '',
//   apellido_paterno: '',
//   apellido_materno: '',
//   carrera: '',
//   semestre: '',
// })

const toast = useToast()

// function validarFormulario(alumno: Alumno) {
//   let esValido = true

//   if (!alumno.nombres) {
//     errores.value.nombres = 'El nombre es requerido'
//     esValido = false
//   } else {
//     errores.value.nombres = ''
//   }

//   if (!alumno.apellido_paterno) {
//     errores.value.apellido_paterno = 'El apellido paterno es requerido'
//     esValido = false
//   } else {
//     errores.value.apellido_paterno = ''
//   }

//   if (!alumno.apellido_materno) {
//     errores.value.apellido_materno = 'El apellido materno es requerido'
//     esValido = false
//   } else {
//     errores.value.apellido_materno = ''
//   }

//   if (!alumno.carrera.id) {
//     errores.value.carrera = 'La carrera es requerida'
//     esValido = false
//   } else {
//     errores.value.carrera = ''
//   }

//   return esValido
// }

async function guardarCambios(formdata: Alumno) {
  console.log(formdata)
  // console.log(alumno)
  // if (validarFormulario(alumno)) {
  const alumnoRepo = new AlumnoRepositoryAPI()
  const registrarAlumno = new RegistrarAlumno(alumnoRepo)

  try {
    await registrarAlumno.execute(alumno.value)
    generarReporteBienvenida(alumno.value)
    toast.notify({
      message: 'Alumno Registrado',
    })
  } catch (error) {
    console.log(error)
    toast.notify({
      message: 'Error al registrar el alumno',
    })
  }
}
// else {
//   toast.notify({
//     title: 'Error',
//     message:
//       'Hay errores en el formulario, verifique que los datos obligatorios estén completos',
//     color: 'danger',
//     closeable: true,
//   })
//   console.log('Errores en el formulario', errores.value)
// }

function cambiarModo(nuevoModo: 'ver' | 'editar' | 'registrar') {
  console.log('Cambiando modo a', nuevoModo, 'regresando')
  router.push({ name: 'alumnos' })
}
</script>

<template>
  <RegisterLayout
    title="Registrar Alumno"
    descripcion="Formulario para crear registrar un alumno"
  >
    <FormAlumno
      :alumno="alumno"
      modo="registrar"
      @cambiar-modo="cambiarModo"
      @submit="guardarCambios"
    >
    </FormAlumno>
  </RegisterLayout>
</template>
