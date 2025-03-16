import type { Carrera } from '../entities/Carrera'

export interface CarreraRepository {
  getAll(): Promise<Carrera[]>
  getById(id: number): Promise<Carrera>
  // getByName(name: string): Promise<Carrera>
}
