import type { Dia } from '@/domain/entities/Dia'
import type { IDiasRepository } from '@/domain/interfaces/DiasRepository'
import api from '../services/api'

export class DiaRepositoryAPI implements IDiasRepository {
  async buscarId(id: number): Promise<Dia> {
    try {
      const response = await api.get(DiaRepositoryAPI.BASE_URI + id)
      console.log('Dia cargado', response.data)
      return response.data
    } catch (error) {
      console.error('Error al cargar el dia', error)
      throw new Error('Error al cargar el dia')
    }
  }
  private static readonly BASE_URI = '/alumnos-dias/'
  async buscarTodos(): Promise<Dia[]> {
    try {
      const response = await api.get(DiaRepositoryAPI.BASE_URI)
      console.log('Dias cargados', response.data)
      return response.data
    } catch (error) {
      console.error('Error al cargar los dias', error)
      throw new Error('Error al cargar los dias')
    }
  }
}
