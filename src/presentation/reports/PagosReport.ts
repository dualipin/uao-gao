import jsPDF from 'jspdf'
import { headerPDF } from './headerPDF'

export function generarReportePagos() {
  const doc = new jsPDF()

  headerPDF(doc)

  doc.save('reporte de pagos.pdf')
}
