import { Pago } from '@/core/domain/entities/Pago'

export interface PagoRepository {
  save(pago: Pago): Promise<void>
  findById(id: number): Promise<Pago | null>
  findByAlumnoId(id: number): Promise<Pago[]>
  findByConceptoId(id: number): Promise<Pago[]>
  findByUsuarioId(id: string): Promise<Pago[]>
  findAll(): Promise<Pago[]>
  update(pago: Pago): Promise<void>
  delete(id: number): Promise<void>
}
