export class AlumnoDTO {
  id: number
  nombre: string
  apellido: string
  edad: number
  constructor(id: number, nombre: string, apellido: string, edad: number) {
    this.id = id
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
  }
}
