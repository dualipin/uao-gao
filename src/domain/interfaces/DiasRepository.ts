import type { Dia } from '../entities/Dia'

export interface IDiasRepository {
  buscarTodos(): Promise<Dia[]>
  buscarId(id: number): Promise<Dia>
}
