import type { Carrera } from '../domain/entities/Carrera'
import type { CarreraRepository } from '../domain/interfaces/CarreraRepository'

export class CarreraUseCase {
  constructor(private carreraRepository: CarreraRepository) {}

  async getAll(): Promise<Carrera[]> {
    return this.carreraRepository.getAll()
  }

  async getById(id: number): Promise<Carrera> {
    return this.carreraRepository.getById(id)
  }
}
