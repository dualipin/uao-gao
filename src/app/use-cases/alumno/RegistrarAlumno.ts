import type { Alumno } from '@/domain/entities/Alumno'
import type { IAlumnoRepository } from '@/domain/interfaces/AlumnoRepository'

export class RegistrarAlumno {
  constructor(private alumnoRepository: IAlumnoRepository) {}
  async execute(alumno: Alumno): Promise<void> {
    try {
      await this.alumnoRepository.registrar(alumno)
    } catch (error) {
      console.error('Error al registrar alumno', error)
      throw new Error('No se pudo registrar el alumno')
    }
  }
}
