import { Pago } from '../domain/entities/Pago'
import type { PagoRepository } from '../domain/interfaces/PagoRepository'

export class ObtenerPagos {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(): Promise<Pago[]> {
    return this.pagoRepository.findAll()
  }
}

export class ObtenerPagoPorId {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(id: number): Promise<Pago | null> {
    return this.pagoRepository.findById(id)
  }
}

export class RegistrarPago {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(pago: Pago): Promise<void> {
    await this.pagoRepository.save(pago)
  }
}

export class ActualizarPago {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(pago: Pago): Promise<void> {
    await this.pagoRepository.save(pago)
  }
}

export class EliminarPago {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(id: number): Promise<void> {
    await this.pagoRepository.delete(id)
  }
}

export class ObtenerPagosPorAlumnoId {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(id: number): Promise<Pago[]> {
    return this.pagoRepository.findByAlumnoId(id)
  }
}

export class ObtenerPagosPorConceptoId {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(id: number): Promise<Pago[]> {
    return this.pagoRepository.findByConceptoId(id)
  }
}

export class ObtenerPagosPorUsuarioId {
  constructor(private readonly pagoRepository: PagoRepository) {}

  async execute(id: string): Promise<Pago[]> {
    return this.pagoRepository.findByUsuarioId(id)
  }
}
