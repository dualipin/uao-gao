import { Pago } from '@/domain/entities/Pago'
import type { IPagoRepository } from '@/domain/interfaces/PagoRepository'
import api from '../services/api'
import { AxiosError } from 'axios'

export class PagoRepositoryAPI implements IPagoRepository {
  private static readonly BASE_URI = '/pagos/'

  async registrar(pago: Pago): Promise<void> {
    try {
      await api.post(PagoRepositoryAPI.BASE_URI, pago)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al guardar el pago',
          error.response?.data || error.message,
        )
      } else {
        console.error('Error desconocido al guardar el pago', error)
      }
      console.error('Error desconocido al guardar el pago', error)
      throw new Error('Error desconocido al guardar el pago')
    }
  }

  async buscarFolio(id: number): Promise<Pago | null> {
    try {
      const response = await api.get(`${PagoRepositoryAPI.BASE_URI}${id}/`)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar pago por folio',
          error.response?.data || error.message,
        )
        return null
      } else {
        console.error('Error desconocido al buscar el pago por folio', error)
        return null
      }
    }
  }

  async buscarIdAlumno(id: number): Promise<Pago[]> {
    try {
      const response = await api.get(
        `${PagoRepositoryAPI.BASE_URI}/alumno/${id}/`,
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar pagos por ID de alumno',
          error.response?.data || error.message,
        )
        return []
      } else {
        console.error(
          'Error desconocido al buscar pagos por ID de alumno',
          error,
        )
        return []
      }
    }
  }

  async buscarIdConcepto(id: number): Promise<Pago[]> {
    try {
      const response = await api.get(
        `${PagoRepositoryAPI.BASE_URI}/concepto/${id}/`,
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar pagos por ID de concepto',
          error.response?.data || error.message,
        )
        return []
      } else {
        console.error(
          'Error desconocido al buscar pagos por ID de concepto',
          error,
        )
        return []
      }
    }
  }

  async buscarIdUsuario(id: number): Promise<Pago[]> {
    try {
      const response = await api.get(
        `${PagoRepositoryAPI.BASE_URI}/usuario/${id}/`,
      )
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar pagos por ID de usuario',
          error.response?.data || error.message,
        )
        return []
      } else {
        console.error(
          'Error desconocido al buscar pagos por ID de usuario',
          error,
        )
        return []
      }
    }
  }

  async buscarTodos(): Promise<Pago[]> {
    try {
      const response = await api.get(PagoRepositoryAPI.BASE_URI)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al buscar todos los pagos',
          error.response?.data || error.message,
        )
        return []
      } else {
        console.error('Error desconocido al buscar todos los pagos', error)
        return []
      }
    }
  }

  async actualizar(pago: Pago): Promise<void> {
    try {
      await api.put(`${PagoRepositoryAPI.BASE_URI}/${pago.folio}/`, pago)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al actualizar el pago',
          error.response?.data || error.message,
        )
      } else {
        console.error('Error desconocido al actualizar el pago', error)
      }
      throw new Error('Error al actualizar el pago')
    }
  }

  async eliminar(id: number): Promise<void> {
    try {
      await api.delete(`${PagoRepositoryAPI.BASE_URI}/${id}/`)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          'Error al eliminar el pago',
          error.response?.data || error.message,
        )
      } else {
        console.error('Error desconocido al eliminar el pago', error)
      }
      throw new Error('Error al eliminar el pago')
    }
  }
}
