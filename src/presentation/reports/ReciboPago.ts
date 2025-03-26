import { jsPDF } from 'jspdf'
import logoUAO from '@/assets/img/logo-alfa-y-omega.jpg'
import logoTabscoob from '@/assets/img/logo-tabscoob.jpg'
import type { Pago } from '@/domain/entities/Pago'

function recibo(data: Pago, y: number, doc: jsPDF, extension: string) {
  const imgWidth = 40 // Ancho de la imagen
  const imgHeight = 20 // Alto de la imagen

  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()

  doc.addImage(logoUAO, 'PNG', 10, y + 10, imgWidth, imgHeight) // Agrega la imagen en la esquina superior izquierda
  doc.addImage(logoTabscoob, 'PNG', 170, y + 10, imgHeight, imgHeight)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  doc.text('Universidad Alfa y Omega', 105, y + 20, { align: 'center' })
  doc.setFontSize(16)
  doc.text(`Extensión ${extension}`, 105, y + 30, {
    align: 'center',
  })

  // ** Línea separadora (como border-b-2) **
  // doc.setDrawColor(0, 50, 0) // Verde oscuro
  // doc.line(10, 35, 200, 35)

  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'normal')
  doc.setFont('helvetica', 'bold')
  doc.text('Generado el ', width - 35, y + 50, {
    align: 'right',
  })
  doc.setFont('helvetica', 'normal')
  doc.text(new Date().toLocaleDateString(), width - 35, y + 50, {
    align: 'left',
    baseline: 'alphabetic',
  })

  // // Configuración inicial
  // doc.setFont('helvetica', 'bold')
  // doc.setFontSize(14)
  // doc.text('Universidad Alfa y Omega', 20, 20)
  // doc.text('Extensión Pichucalco', 20, 28)

  doc.setFont('helvetica', 'normal')
  doc.text('Fecha de Pago: 01/01/2025', width - 15, y + 60, { align: 'right' })
  doc.text('Folio: 001', width - 15, y + 68, { align: 'right' })

  y += 50

  doc.setFontSize(14)
  // Datos del alumno
  doc.setFont('helvetica', 'bold')
  doc.text('Matricula:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('21401893', 50, y)

  y += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Nombre del Alumno:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('Martin Sanchez', 72, y)

  y += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Carrera:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('Ingeniería de Sistemas', 45, y)

  y += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Concepto de pago:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('Reinscripción', 65, y)

  y += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Semestre:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('8', 45, y)

  y += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Cantidad:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('$1,600', 45, y)

  y += 8

  doc.setFont('helvetica', 'bold')
  doc.text('Comentarios:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('Pago de reinscripción a la materia', 20, y + 8)

  // Firma
  y += 35
  doc.setFont('helvetica', 'bold')
  doc.text('Recibe: Mtro. Benjamin Perez Perez', width - 15, y, {
    align: 'right',
  })

  y += 8
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('Sello digital:', 20, y)
  doc.setFont('helvetica', 'normal')
  doc.text('dasdad42342342mkasdsdsadad-dfsdfs-sdf-sd', 40, y)
}

export function generarRecibo(data?: {
  extension: string
  dataPago?: Pago
  folio: number
}) {
  const doc = new jsPDF()

  if (data?.dataPago) {
    recibo(data.dataPago, 0, doc, data?.extension || '')
  }

  doc.line(
    0,
    doc.internal.pageSize.getHeight() / 2,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight() / 2,
  )

  if (data?.dataPago) {
    recibo(
      data.dataPago,
      doc.internal.pageSize.getHeight() / 2,
      doc,
      data.extension || '',
    )
  }
  // const width = doc.internal.pageSize.getWidth()
  // const height = doc.internal.pageSize.getHeight()

  // const imgWidth = 40 // Ancho de la imagen
  // const imgHeight = 20 // Alto de la imagen

  // doc.addImage(logoUAO, 'PNG', 10, 10, imgWidth, imgHeight) // Agrega la imagen en la esquina superior izquierda
  // doc.addImage(logoTabscoob, 'PNG', 170, 10, imgHeight, imgHeight)

  // doc.setFont('helvetica', 'bold')
  // doc.setFontSize(20)
  // doc.setTextColor(0, 0, 0)
  // doc.text('Universidad Alfa y Omega', 105, 20, { align: 'center' })
  // doc.setFontSize(16)
  // doc.text(`Extensión ${data ? data.extension : ''}`, 105, 30, {
  //   align: 'center',
  // })

  // // ** Línea separadora (como border-b-2) **
  // // doc.setDrawColor(0, 50, 0) // Verde oscuro
  // // doc.line(10, 35, 200, 35)

  // doc.setFontSize(12)
  // doc.setTextColor(0, 0, 0)
  // doc.setFont('helvetica', 'normal')
  // doc.setFont('helvetica', 'bold')
  // doc.text('Generado el ', width - 35, 50, {
  //   align: 'right',
  // })
  // doc.setFont('helvetica', 'normal')
  // doc.text(new Date().toLocaleDateString(), width - 35, 50, {
  //   align: 'left',
  //   baseline: 'alphabetic',
  // })

  // // // Configuración inicial
  // // doc.setFont('helvetica', 'bold')
  // // doc.setFontSize(14)
  // // doc.text('Universidad Alfa y Omega', 20, 20)
  // // doc.text('Extensión Pichucalco', 20, 28)

  // doc.setFontSize(14)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Fecha de Pago: 01/01/2025', 140, 40)
  // doc.text('Folio: 001', 140, 48)

  // // Datos del alumno
  // let y = 40
  // doc.setFont('helvetica', 'bold')
  // doc.text('Matricula:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('21401893', 50, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Nombre del Alumno:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Martin Sanchez', 72, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Carrera:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Ingeniería de Sistemas', 45, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Concepto de pago:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Reinscripción', 60, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Semestre:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('8', 45, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Cantidad:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('$1,600', 45, y)

  // y += 8
  // if (
  //   !data ||
  //   !data.dataPago ||
  //   !data.dataPago.tipo ||
  //   data.dataPago.tipo.length > 0
  // ) {
  //   doc.setFont('helvetica', 'bold')
  //   doc.text('Comentarios:', 20, y)
  //   doc.setFont('helvetica', 'normal')
  //   doc.text('Pago de reinscripción a la materia', 60, y)
  // }

  // // Firma
  // y += 15
  // doc.setFont('helvetica', 'bold')
  // doc.text('Recibe: Mtro. Benjamin Perez Perez', 20, y)

  // y += 10
  // doc.setFontSize(9)
  // doc.setFont('helvetica', 'bold')
  // doc.text('Sello digital:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('dasdad42342342mkasdsdsadad-dfsdfs-sdf-sd', 45, y)

  // doc.line(0, height / 2, width, height / 2)

  // y += 15

  // doc.addImage(logoUAO, 'PNG', 10, y, imgWidth, imgHeight) // Agrega la imagen en la esquina superior izquierda
  // doc.addImage(logoTabscoob, 'PNG', 170, y, imgHeight, imgHeight)
  // y += 10
  // doc.setFont('helvetica', 'bold')
  // doc.setFontSize(20)
  // doc.setTextColor(0, 0, 0)
  // doc.text('Universidad Alfa y Omega', 105, y, { align: 'center' })
  // doc.setFontSize(16)
  // y += 10
  // doc.text(`Extensión ${data ? data.extension : ''}`, 105, y, {
  //   align: 'center',
  // })

  // // doc.setFont('helvetica', 'bold')
  // // doc.setFontSize(14)
  // // doc.text('Universidad Alfa y Omega', 20, y)
  // // doc.text('Extensión Pichucalco', 20, y + 8)

  // doc.setFontSize(14)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Fecha de Pago: 01/01/2025', 140, y + 20)
  // doc.text('Folio: 001', 140, y + 28)

  // y += 20
  // doc.setFont('helvetica', 'bold')
  // doc.text('Matricula:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('21EJN123', 45, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Nombre del Alumno:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Martin Sanchez', 65, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Carrera:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Ingeniería de Sistemas', 45, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Concepto de pago:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('Reinscripción', 60, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Semestre:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('8', 45, y)

  // y += 8
  // doc.setFont('helvetica', 'bold')
  // doc.text('Cantidad:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('$1,600', 45, y)

  // // Firma
  // y += 15
  // doc.setFont('helvetica', 'bold')
  // doc.text('Recibe: Mtro. Benjamin Perez Perez', 20, y)

  // y += 10
  // doc.setFontSize(9)
  // doc.setFont('helvetica', 'bold')
  // doc.text('Sello digital:', 20, y)
  // doc.setFont('helvetica', 'normal')
  // doc.text('dasdad42342342mkasdsdsadad-dfsdfs-sdf-sd', 45, y)

  // Guardar el PDF
  // doc.save('recibo_pago.pdf')

  // Mostrar el PDF en una nueva pestaña
  const string = doc.output('datauristring')
  const iframe =
    "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
  const x: Window | null = window.open()
  if (x) {
    x.document.open()
    x.document.write(iframe)
    x.document.close()
  } else {
    // Manejar el caso en que window.open() falla, por ejemplo, debido a un bloqueador de ventanas emergentes
    console.error(
      'No se pudo abrir la ventana emergente para mostrar el PDF. Asegúrese de que no haya un bloqueador de ventanas emergentes activo.',
    )
  }
}
