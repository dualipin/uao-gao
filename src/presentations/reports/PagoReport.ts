import jsPDF from 'jspdf'
import { autoTable, type RowInput } from 'jspdf-autotable'
import { headerPDF } from './headerPDF'
import { useStoreCarrera } from '../stores/carreraStore'
import { usePagoStore } from '../stores/pagoStore'

export async function generarReportePago(
  matricula: string,
  fechaInicio: Date,
  fechaFinal?: Date,
  carreraId?: number,
  todo: boolean = false,
) {
  const storeCarrera = useStoreCarrera()
  const storePago = usePagoStore()
  await storePago.obtenerPagos()
  await storeCarrera.fetchCarreras()

  const filterPagos = storePago.pagos.filter((pago) => {
    if (todo) {
      return true
    }

    const pagoFecha = new Date(pago.fecha)
    const isWithinDateRange = pagoFecha >= fechaInicio && (!fechaFinal || pagoFecha <= fechaFinal)

    if (pago.matricula === matricula && isWithinDateRange) {
      if (carreraId) {
        return (
          pago.carrera === storeCarrera.carreras.find((carrera) => carrera.id === carreraId)?.nombre
        )
      }
      return true
    }
    return false
  })

  const doc = new jsPDF({
    orientation: 'portrait',
    format: 'letter',
  })

  const head = [['No,', 'Folio', 'Fecha', 'Monto', 'Alumno', 'Concepto']]

  const body = [
    filterPagos.map((pago, index) => [
      index,
      pago.folio,
      pago.fecha,
      pago.monto,
      pago.alumno,
      pago.concepto,
    ]),
  ]

  autoTable(doc, {
    head,
    body: body as RowInput[],

    didDrawPage: () => {
      headerPDF(doc)
    },

    margin: { top: 40 },
  })
}
