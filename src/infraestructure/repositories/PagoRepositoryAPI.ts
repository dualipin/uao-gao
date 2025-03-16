import { Pago } from '@/core/domain/entities/Pago'
import type { PagoRepository } from '@/core/domain/interfaces/PagoRepository'
import api from '../services/api'

export class PagoRepositoryAPI implements PagoRepository {
  async findById(id: number): Promise<Pago | null> {
    try {
      const response = await api.get(`/pagos/${id}`)
      return response.data as Pago
    } catch (error) {
      console.error('Error al buscar pago por id', error)
      return null
    }
  }

  async findByAlumnoId(id: number): Promise<Pago[]> {
    try {
      const response = await api.get(`/pagos/alumno/${id}`)
      // console.log(response.data)
      return response.data as Pago[]
    } catch (error) {
      console.error('Error al buscar pagos por id de alumno', error)
      return []
    }
  }

  async findByConceptoId(id: number): Promise<Pago[]> {
    try {
      const response = await api.get(`/pagos/concepto/${id}`)
      return response.data as Pago[]
    } catch (error) {
      console.error('Error al buscar pagos por id de concepto', error)
      return []
    }
  }

  async findByUsuarioId(id: string): Promise<Pago[]> {
    try {
      const response = await api.get(`/pagos/usuario/${id}`)
      return response.data
    } catch (error) {
      console.error('Error al buscar pagos por id de usuario', error)
      return []
    }
  }

  async findAll(): Promise<Pago[]> {
    try {
      const response = await api.get('/pagos')
      return response.data as Pago[]
    } catch (error) {
      console.error('Error al buscar todos los pagos', error)
      return []
    }
  }

  async delete(id: number): Promise<void> {
    try {
      api.delete(`/pagos/${id}`)
    } catch (error) {
      console.error('Error al eliminar pago', error)
      return Promise.reject(error)
    }
  }

  async update(pago: Pago): Promise<void> {
    try {
      await api.put(`/pagos/${pago.folio}`, pago)
    } catch (error) {
      console.error('Error al actualizar pago', error)
      return Promise.reject(error)
    }
  }

  async save(pago: Pago): Promise<void> {
    try {
      await api.post('/pagos', pago)
    } catch (error) {
      console.error('Error al guardar pago', error)
      return Promise.reject(error)
    }
  }
}
