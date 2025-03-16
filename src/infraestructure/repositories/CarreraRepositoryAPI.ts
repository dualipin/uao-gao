import type { Carrera } from '@/core/domain/entities/Carrera'
import type { CarreraRepository } from '@/core/domain/interfaces/CarreraRepository'
import axios from '../services/api'

export class CarreraRepositoryAPI implements CarreraRepository {
  async getAll(): Promise<Carrera[]> {
    try {
      const response = await axios.get('/carreras/')
      return response.data
    } catch (error) {
      console.error('Error al cargar las carreras', error)
      return Promise.reject([])
    }
  }
  async getById(id: number): Promise<Carrera> {
    try {
      return (await axios.get(`/carreras/${id}`)).data
    } catch (error) {
      console.error('Error al buscar la carrera', error)
      return Promise.reject(null)
    }
  }
}
