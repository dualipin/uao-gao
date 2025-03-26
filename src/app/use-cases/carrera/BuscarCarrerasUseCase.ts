import type { Carrera } from '@/domain/entities/Carrera'
import type { CarreraRepositoryAPI } from '@/infra/repositories/CarreraRepositoryAPI'

export class BuscarCarrerasUseCase {
  constructor(private readonly repository: CarreraRepositoryAPI) {}
  async execute(): Promise<Carrera[] | null> {
    return await this.repository.buscarTodos()
  }
}
