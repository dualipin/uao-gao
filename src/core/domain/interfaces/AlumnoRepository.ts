import { Alumno } from '@/core/domain/entities/Alumno'

export interface AlumnoRepository {
  save(alumno: Alumno): Promise<void>
  findById(id: number): Promise<Alumno | null>
  findByMatricula(matricula: string): Promise<Alumno | null>
  findAll(): Promise<Alumno[]>
  findByCarreraId(carreraId: number): Promise<Alumno[]>
  findBySemestre(semestre: number): Promise<Alumno[]>
  update(id: number, alumno: Alumno): Promise<void>
  delete(id: number): Promise<void>
}
