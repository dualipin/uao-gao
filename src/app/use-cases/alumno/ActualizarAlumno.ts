import type { Alumno } from '@/domain/entities/Alumno'
import type { IAlumnoRepository } from '@/domain/interfaces/AlumnoRepository'

export class ActualizarAlumno {
  constructor(private alumnoRepository: IAlumnoRepository) {}
  async execute(id: number, alumno: Alumno): Promise<void> {
    if (!id) throw new Error('El id es necesario para actualizar un alumno')
    if (!alumno) throw new Error('El alumno es necesario para actualizar')
    try {
      await this.alumnoRepository.actualizar(id, alumno)
    } catch (error) {
      console.error('Error al actualizar alumno', error)
      throw new Error('No se pudo actualizar el alumno')
    }
  }
}
