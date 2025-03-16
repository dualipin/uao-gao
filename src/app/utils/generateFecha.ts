export function generarFecha() {
  return new Date().toISOString().split('T')[0]
}
