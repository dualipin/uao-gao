import logoUAO from '@/assets/img/logo-alfa-y-omega.jpg'
import logoTabscoob from '@/assets/img/logo-tabscoob.jpg'
import type jsPDF from 'jspdf'

export function headerPDF(doc: jsPDF) {
  const pageWidth = doc.internal.pageSize.width
  const pageSize = doc.internal.pageSize
  const pageHeight = pageSize.height

  const imgWidth = 40 // Ancho de la imagen
  const imgHeight = 20 // Alto de la imagen

  doc.addImage(logoUAO, 'PNG', 10, 10, imgWidth, imgHeight) // Agrega la imagen en la esquina superior izquierda
  doc.addImage(logoTabscoob, 'PNG', 170, 10, imgHeight, imgHeight)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  doc.text('Universidad Alfa y Omega', 105, 20, { align: 'center' })
  doc.setFontSize(16)
  doc.text('Extensión Jalapa', 105, 30, { align: 'center' })

  // ** Línea separadora (como border-b-2) **
  doc.setDrawColor(0, 50, 0) // Verde oscuro
  doc.line(10, 35, 200, 35)

  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')
  doc.setFont('helvetica', 'bold')
  doc.text('Generado el ', pageWidth - 35, 50, {
    align: 'right',
  })
  doc.setFont('helvetica', 'normal')
  doc.text(new Date().toLocaleDateString(), pageWidth - 35, 50, {
    align: 'left',
    baseline: 'alphabetic',
  })

  const pageCount = doc.internal.pages.length - 1
  doc.setFontSize(10)
  doc.setTextColor(150)
  doc.text(`${pageCount} de ${pageCount}`, 105, pageHeight - 10, {
    align: 'center',
  })
}
