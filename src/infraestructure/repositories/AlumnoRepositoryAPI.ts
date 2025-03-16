import type { Alumno } from '@/core/domain/entities/Alumno'
import type { AlumnoRepository } from '@/core/domain/interfaces/AlumnoRepository'
import api from '../services/api'

export class AlumnoRepositoryAPI implements AlumnoRepository {
  async update(id: number, alumno: Alumno): Promise<void> {
    try {
      const newAlumno = { ...alumno, correo: alumno.email?.toLowerCase() }
      console.log('newAlumno', newAlumno)
      await api.put(`/alumnos/${id}/`, newAlumno)
      console.log('Alumno actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar alumno', error)
      return Promise.reject()
    }
  }
  async save(alumno: Alumno): Promise<void> {
    try {
      await api.post('/alumnos/', { ...alumno, correo: alumno.email?.toLowerCase() })
      console.log('Alumno registrado correctamente')
    } catch (error) {
      console.error('Error al guardar alumno', error)
      return Promise.reject(error)
    }
  }

  async findById(id: number): Promise<Alumno | null> {
    try {
      const response = await api.get(`/alumnos/${id}`)
      const data = response.data
      const alumno = data as Alumno
      return { ...alumno, email: data.correo }
    } catch (error) {
      console.error('Error al buscar alumno por id', error)
      return null
    }
  }
  async findByMatricula(matricula: string): Promise<Alumno | null> {
    try {
      const response = await api.get(`/alumnos/matricula/${matricula}`)
      return response.data
    } catch (error) {
      console.error('Error al buscar alumno por matricula', error)
      return null
    }
  }
  async findAll(): Promise<Alumno[]> {
    try {
      const response = await api.get('/alumnos')
      return response.data
    } catch (error) {
      console.error('Error al buscar todos los alumnos', error)
      return Promise.resolve([])
    }
  }
  async findByCarreraId(carreraId: number): Promise<Alumno[]> {
    try {
      const response = await api.get(`/alumnos/carrera/${carreraId}`)
      return response.data as Alumno[]
    } catch (error) {
      console.error('Error al buscar alumnos por id de carrera', error)
      return Promise.resolve([])
    }
  }
  async findBySemestre(semestre: number): Promise<Alumno[]> {
    try {
      const response = await api.get(`/alumnos/semestre/${semestre}`)
      return response.data as Alumno[]
    } catch (error) {
      console.error('Error al buscar alumnos por semestre', error)
      return Promise.resolve([])
    }
  }
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/alumnos/${id}/`)
    } catch (error) {
      console.error('Error al eliminar alumno', error)
      return Promise.resolve()
    }
  }
}
