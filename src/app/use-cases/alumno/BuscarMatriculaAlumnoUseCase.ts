import type { Alumno } from '@/domain/entities/Alumno'
import type { IAlumnoRepository } from '@/domain/interfaces/AlumnoRepository'

export class BuscarMatriculaAlumnoUseCase {
  constructor(private readonly alumnoRepository: IAlumnoRepository) {}
  async execute(matricula: string): Promise<Alumno | null> {
    return await this.alumnoRepository.buscarMatricula(matricula)
  }
}
