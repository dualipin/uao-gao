import type { Carrera } from '../entities/Carrera'

export interface ICarreraRepository {
  buscarTodos(): Promise<Carrera[]>
  buscarId(id: number): Promise<Carrera>
}
