import type { Carrera } from '@/domain/entities/Carrera'
import type { ICarreraRepository } from '@/domain/interfaces/CarreraRepository'
import axios from '../services/api'

export class CarreraRepositoryAPI implements ICarreraRepository {
  private static readonly BASE_URI = '/carreras/'

  async buscarTodos(): Promise<Carrera[]> {
    try {
      const response = await axios.get(CarreraRepositoryAPI.BASE_URI)
      console.log('Carreras cargadas', response.data)
      return response.data
    } catch (error) {
      console.error('Error al cargar las carreras', error)
      throw new Error('Error al cargar las carreras')
    }
  }

  async buscarId(id: number): Promise<Carrera> {
    if (id <= 0) {
      throw new Error('El id de la carrera no es válido')
    }
    try {
      return (await axios.get(`${CarreraRepositoryAPI.BASE_URI}/${id}`)).data
    } catch (error) {
      console.error('Error al buscar la carrera', error)
      throw new Error('Error al buscar la carrera')
    }
  }
}
