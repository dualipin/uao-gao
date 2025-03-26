import { Alumno } from '@/domain/entities/Alumno'

export interface IAlumnoRepository {
  registrar(alumno: Alumno): Promise<void>
  buscarId(id: number): Promise<Alumno | null>
  buscarMatricula(matricula: string): Promise<Alumno | null>
  buscarPorCarreras(carreraId: number): Promise<Alumno[]>
  buscarPorSemestre(semestre: number): Promise<Alumno[]>
  buscarTodos(): Promise<Alumno[]>
  actualizar(id: number, alumno: Alumno): Promise<void>
  eliminar(id: number): Promise<void>
}
