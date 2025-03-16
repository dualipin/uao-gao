import { defineStore } from 'pinia'
import type { Alumno } from '@/core/domain/entities/Alumno'
import { AlumnoRepositoryAPI } from '@/infraestructure/repositories/AlumnoRepositoryAPI'
import {
  ActualizarAlumno,
  EliminarAlumno,
  ObtenerAlumnoPorId,
  ObtenerAlumnos,
  RegistrarAlumno,
} from '@/core/use_cases/AlumnoUseCase'

export const alumnosStore = defineStore('alumnosStore', {
  state: () => ({
    alumnos: [] as Alumno[],
    cargando: false,
  }),

  actions: {
    async obtenerAlumnos() {
      this.cargando = true
      const repo = new AlumnoRepositoryAPI()
      const useCase = new ObtenerAlumnos(repo)
      this.alumnos = await useCase.execute()
      this.cargando = false
    },

    async registrarAlumno(alumno: Alumno) {
      try {
        const repo = new AlumnoRepositoryAPI()
        const useCase = new RegistrarAlumno(repo)
        await useCase.execute(alumno)

        console.log('Alumno registrado correctamente')

        return true
      } catch (error) {
        console.error('Error al guardar alumno', error)
        return false
      }
    },

    async acutalizarAlumno(id: number, alumno: Alumno) {
      const repo = new AlumnoRepositoryAPI()
      const useCase = new ActualizarAlumno(repo)
      await useCase.execute(id, alumno)
    },

    async eliminarAlumno(id: number) {
      const repo = new AlumnoRepositoryAPI()
      const useCase = new EliminarAlumno(repo)
      await useCase.execute(id)
    },

    async buscarAlumnoPorId(id: number) {
      const repo = new AlumnoRepositoryAPI()
      const useCase = new ObtenerAlumnoPorId(repo)
      return await useCase.execute(id)
    },
  },
})
