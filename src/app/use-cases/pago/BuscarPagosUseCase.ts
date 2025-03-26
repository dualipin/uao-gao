import type { Pago } from '@/domain/entities/Pago'
import type { IPagoRepository } from '@/domain/interfaces/PagoRepository'

export class BuscarPagosUseCase {
  constructor(private readonly pagoRepository: IPagoRepository) {}

  async execute(): Promise<Pago[]> {
    try {
      return await this.pagoRepository.buscarTodos()
    } catch (error) {
      console.log(error)
      throw new Error('Error al buscar usecase')
    }
  }
}
