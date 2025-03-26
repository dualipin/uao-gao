import type { Dia } from '@/domain/entities/Dia'
import type { IDiasRepository } from '@/domain/interfaces/DiasRepository'

export class BuscarDiasUseCase {
  constructor(private readonly diaRepository: IDiasRepository) {}
  async execute(): Promise<Dia[]> {
    return await this.diaRepository.buscarTodos()
  }
}
