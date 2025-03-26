import { Pago } from '@/domain/entities/Pago'

export interface IPagoRepository {
  registrar(pago: Pago): Promise<void>
  buscarFolio(id: number): Promise<Pago | null>
  buscarIdAlumno(id: number): Promise<Pago[]>
  buscarIdConcepto(id: number): Promise<Pago[]>
  buscarIdUsuario(id: number): Promise<Pago[]>
  buscarTodos(): Promise<Pago[]>
  actualizar(pago: Pago): Promise<void>
  eliminar(id: number): Promise<void>
}
