import type { Alumno } from '@/domain/entities/Alumno'
import type { IAlumnoRepository } from '@/domain/interfaces/AlumnoRepository'

export class BuscarIdAlumno {
  constructor(private alumnoRepository: IAlumnoRepository) {}
  async execute(id: number): Promise<Alumno | null> {
    if (!id) throw new Error('El id es necesario para buscar un alumno')

    try {
      const alumno = await this.alumnoRepository.buscarId(id)

      if (!alumno) throw new Error('No se encontró el alumno')
      return alumno
    } catch (error) {
      console.error('Error al buscar el alumno:', error)
      throw error
    }
  }
}
