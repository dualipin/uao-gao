import autoTable, { type RowInput } from 'jspdf-autotable'
import { headerPDF } from './headerPDF'
import jsPDF from 'jspdf'
import { AlumnoRepositoryAPI } from '@/infra/repositories/AlumnoRepositoryAPI'
import { BuscarTodosAlumnos } from '@/app/use-cases/alumno/BuscarTodosAlumnos'
import { filterAlumnos } from '@/app/utils/filterAlumnos'

export const generarReporteAlumno = async (
  fechaInicio?: string,
  fechaFin?: string,
  dias?: number[],
  carrera?: string,
) => {
  const alumnoRepo = new AlumnoRepositoryAPI()
  const buscarTodosAlumnosUseCase = new BuscarTodosAlumnos(alumnoRepo)
  const alumnos = await buscarTodosAlumnosUseCase.execute()
  const filteredAlumnos = filterAlumnos(
    alumnos,
    fechaInicio,
    fechaFin,
    dias,
    carrera,
  )

  const encabezados = [
    'No',
    'Matrícula',
    'Nombre',
    'Carrera',
    'Semestre',
    'Fecha Ingreso',
    'Dias',
  ]

  console.log('Alumnos', filteredAlumnos)

  const body = filteredAlumnos.map(
    (alumno, index) =>
      [
        index + 1,
        alumno.matricula,
        `${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno}`,
        alumno.carrera.nombre,
        alumno.semestre,
        alumno.fecha_ingreso,
        alumno.dias?.map((d) => d.dia).join(', '),
      ] as RowInput,
  )

  const diaReporte = dias?.map((d) => d.toString()).join(', ') || ''

  //settings for the pdf
  const doc = new jsPDF({
    format: 'letter',
    orientation: 'portrait',
  })

  const marginTop = 15 // Margen superior

  // ** Agregar un Logo **

  // ** Estilos de la tabla (como Tailwind bg-gray-100 y text-gray-900) **
  autoTable(doc, {
    head: [encabezados],
    body: body,
    startY: marginTop + 50, // Espacio debajo del título
    theme: 'grid',
    headStyles: {
      fillColor: [0, 50, 0], // Azul
      textColor: [255, 255, 255], // Blanco
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [240, 240, 240] }, // Gris claro
    styles: { fontSize: 10, cellPadding: 5 },
    margin: { top: marginTop + 40 },

    didDrawPage: () => {
      headerPDF(doc)
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      // doc.text('Generado el ', pageWidth - 35, 50, {
      //   align: 'right',
      // })
      const pageWidth = doc.internal.pageSize.getWidth()
      doc.setFontSize(16)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'bold')
      doc.text(`Reporte de alumnos`, pageWidth / 2, 43, { align: 'center' })
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.text(`Fecha de inicio: ${fechaInicio}`, 15, marginTop + 35)
      doc.text(`Fecha final: ${fechaFin}`, 15, marginTop + 40)

      if (diaReporte || diaReporte !== '') {
        doc.text(
          `Reporte para los dias ${diaReporte}`,
          pageWidth / 2,
          marginTop + 45,
          {
            align: 'center',
          },
        )
      }
    },
  })

  doc.save('reporte-alumnos.pdf')
}
