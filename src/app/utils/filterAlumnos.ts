import type { Alumno } from '@/domain/entities/Alumno'

export function filterAlumnos(
  alumnos: Alumno[],
  fechaInicio?: string,
  fechaFin?: string,
  dias?: number[],
  carrera?: string,
): Alumno[] {
  let filteredAlumnos = [...alumnos]

  if (fechaInicio) {
    const inicio = Date.parse(fechaInicio) // Convierte la fecha a milisegundos UTC
    filteredAlumnos = filteredAlumnos.filter(
      (alumno) => Date.parse(alumno.fecha_ingreso) >= inicio,
    )
  }

  if (fechaFin) {
    const fin = Date.parse(fechaFin) + 86400000 - 1 // Sumar un día menos un milisegundo para incluir el día completo
    filteredAlumnos = filteredAlumnos.filter(
      (alumno) => Date.parse(alumno.fecha_ingreso) <= fin,
    )
  }

  if (Array.isArray(dias) && dias.length > 0) {
    filteredAlumnos = filteredAlumnos.filter((alumno) =>
      alumno.dias?.some((dia) => dias.includes(dia.id)),
    )
  }

  if (carrera?.trim()) {
    filteredAlumnos = filteredAlumnos.filter(
      (alumno) =>
        alumno.carrera?.nombre?.trim().toLowerCase() ===
        carrera.trim().toLowerCase(),
    )
  }

  return filteredAlumnos
}
