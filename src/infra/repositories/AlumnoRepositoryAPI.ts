import type { Alumno } from '@/domain/entities/Alumno'
import type { IAlumnoRepository } from '@/domain/interfaces/AlumnoRepository'
import { AxiosError } from 'axios'
import api from '../services/api'

export class AlumnoRepositoryAPI implements IAlumnoRepository {
  private static readonly BASE_URI = '/alumnos'

  async registrar(alumno: Alumno): Promise<void> {
    try {
      const alumnoResponse = await api.post(
        AlumnoRepositoryAPI.BASE_URI + '/',
        {
          ...alumno,
          carrera: alumno.carrera.id,
          matricula: alumno.matricula ? alumno.matricula : '',
        },
      )
      await api.post(AlumnoRepositoryAPI.BASE_URI + '-documentos-entregados/', {
        ...alumno.documentos_entregados,
        alumno: alumnoResponse.data.id,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al guardar alumno',
          error.response?.data || error.message,
        )
      } else {
        console.error('Error desconocido al registrar el alumno', error)
      }
      console.error('Error al guardar alumno', error)
      throw new Error('Error al registrar el alumno')
    }
  }

  async buscarId(id: number): Promise<Alumno | null> {
    try {
      const response = await api.get(`${AlumnoRepositoryAPI.BASE_URI}/${id}/`)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar alumno por id',
          error.response?.data || error.message,
        )
        return null
      } else {
        console.error('Error desconocido al buscar el alumno por id', error)
        return null
      }
    }
  }
  async buscarMatricula(matricula: string): Promise<Alumno | null> {
    try {
      const response = await api.get(
        `${AlumnoRepositoryAPI.BASE_URI}?matricula=${matricula}`,
      )
      return response.data[0]
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar alumno por matrícula',
          error.response?.data || error.message,
        )
        return null
      } else {
        console.error(
          'Error desconocido al buscar el alumno por matrícula',
          error,
        )
        return null
      }
    }
  }
  async buscarPorCarreras(carreraId: number): Promise<Alumno[]> {
    try {
      const response = await api.get(
        `${AlumnoRepositoryAPI.BASE_URI}?carrera=${carreraId}`,
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar alumnos por carrera',
          error.response?.data || error.message,
        )
        return []
      } else {
        console.error('Error desconocido al buscar alumnos por carrera', error)
        return []
      }
    }
  }
  async buscarPorSemestre(semestre: number): Promise<Alumno[]> {
    try {
      const response = await api.get(
        `${AlumnoRepositoryAPI.BASE_URI}?semestre=${semestre}`,
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar alumnos por semestre',
          error.response?.data || error.message,
        )
        return []
      } else {
        console.error('Error desconocido al buscar alumnos por semestre', error)
        return []
      }
    }
  }
  async buscarTodos(): Promise<Alumno[]> {
    try {
      const response = await api.get(AlumnoRepositoryAPI.BASE_URI)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar todos los alumnos',
          error.response?.data || error.message,
        )
        return []
      } else {
        console.error('Error desconocido al buscar todos los alumnos', error)
        return []
      }
    }
  }
  async actualizar(id: number, alumno: Alumno): Promise<void> {
    try {
      await api.put(`${AlumnoRepositoryAPI.BASE_URI}/${id}/`, {
        ...alumno,
        carrera: alumno.carrera.id,
        direccion: alumno.direccion ? alumno.direccion.id : null,
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al actualizar alumno',
          error.response?.data || error.message,
        )
      } else {
        console.error('Error desconocido al actualizar el alumno', error)
      }
      throw new Error('Error al actualizar el alumno')
    }
    try {
      await api.put(
        '/alumnos-documentos-entregados/' +
          alumno.documentos_entregados?.id +
          '/',
        {
          ...alumno.documentos_entregados,
        },
      )
    } catch (error) {
      console.log(error)
    }
  }
  async eliminar(id: number): Promise<void> {
    try {
      await api.delete(`${AlumnoRepositoryAPI.BASE_URI}/${id}/`)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al eliminar alumno',
          error.response?.data || error.message,
        )
      } else {
        console.error('Error desconocido al eliminar el alumno', error)
      }
      throw new Error('Error al eliminar el alumno')
    }
  }
}
