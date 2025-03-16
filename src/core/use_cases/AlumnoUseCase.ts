import { Alumno } from '../domain/entities/Alumno'
import type { AlumnoRepository } from '../domain/interfaces/AlumnoRepository'

export class ObtenerAlumnos {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(): Promise<Alumno[]> {
    return this.alumnoRepository.findAll()
  }
}

export class ObtenerAlumnoPorId {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(id: number): Promise<Alumno | null> {
    return this.alumnoRepository.findById(id)
  }
}

export class RegistrarAlumno {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(alumno: Alumno): Promise<void> {
    console.log('Registrando alumno', alumno)
    await this.alumnoRepository.save(alumno)
  }
}

export class ActualizarAlumno {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(id: number, alumno: Alumno): Promise<void> {
    await this.alumnoRepository.update(id, alumno)
  }
}

export class EliminarAlumno {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(id: number): Promise<void> {
    await this.alumnoRepository.delete(id)
  }
}

export class ObtenerAlumnosPorCarreraId {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(id: number): Promise<Alumno[]> {
    return this.alumnoRepository.findByCarreraId(id)
  }
}

export class ObtenerAlumnosPorSemestre {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(semestre: number): Promise<Alumno[]> {
    return this.alumnoRepository.findBySemestre(semestre)
  }
}

export class ObtenerAlumnoPorMatricula {
  constructor(private readonly alumnoRepository: AlumnoRepository) {}

  async execute(matricula: string): Promise<Alumno | null> {
    return this.alumnoRepository.findByMatricula(matricula)
  }
}
