import { ObtenerAlumnos } from '@/core/use_cases/AlumnoUseCase'
import { CarreraUseCase } from '@/core/use_cases/CarreraUseCase'
import { AlumnoRepositoryAPI } from '@/infraestructure/repositories/AlumnoRepositoryAPI'
import { CarreraRepositoryAPI } from '@/infraestructure/repositories/CarreraRepositoryAPI'
import autoTable, { type RowInput } from 'jspdf-autotable'
import { headerPDF } from './headerPDF'
import jsPDF from 'jspdf'

export const generarReporteAlumno = async (
  fechaInicio?: string,
  fechaFinal?: string,
  carreraID?: number,
  diaReporte?: string,
) => {
  if (!fechaInicio || !fechaFinal) {
    const hoy = new Date()
    fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1).toLocaleDateString()
    fechaFinal = new Date(hoy.getFullYear(), hoy.getMonth(), 0).toLocaleDateString()
  }

  // console.log('Generando reporte de alumnos', fechaInicio, fechaFinal)

  const repoAlumno = new AlumnoRepositoryAPI()
  const repoCarrera = new CarreraRepositoryAPI()
  const useCaseAlumno = new ObtenerAlumnos(repoAlumno)
  const useCaseCarrera = new CarreraUseCase(repoCarrera)
  const alumnos = await useCaseAlumno.execute()
  const carreras = await useCaseCarrera.getAll()

  let alumnosFiltrados =
    carreraID !== 0
      ? alumnos.filter((alumno) => {
          const carreraMatch = alumno.carrera == carreraID
          let diaMatch = alumno.dia == diaReporte

          console.log('repportes', diaReporte)

          if (diaReporte == '') {
            diaMatch = true
          }

          return carreraMatch && diaMatch
        })
      : alumnos

  alumnosFiltrados = alumnosFiltrados.filter((alumno) => {
    let diaMatch = alumno.dia == diaReporte

    if (diaReporte == '') {
      diaMatch = true
    }

    console.log('reporte', diaReporte)

    return diaMatch
  })
  const encabezados = [
    'No',
    'Matrícula',
    'Nombre',
    'Carrera',
    'Semestre',
    'Teléfono',
    'Fecha Ingreso',
  ]

  console.log('Alumnos', alumnosFiltrados)

  const body = alumnosFiltrados.map(
    (alumno, index) =>
      [
        index + 1,
        alumno.matricula,
        `${alumno.nombres} ${alumno.apellidos}`,
        carreras.find((carrera) => carrera.id === alumno.carrera)?.nombre,
        alumno.semestre,
        alumno.telefono,
        alumno.fecha_ingreso,
      ] as RowInput,
  )

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
      doc.text(`Fecha final: ${fechaFinal}`, 15, marginTop + 40)

      if (diaReporte || diaReporte !== '') {
        doc.text(`Reporte para los dias ${diaReporte}`, pageWidth / 2, marginTop + 45, {
          align: 'center',
        })
      }
    },
  })

  doc.save('reporte-alumnos.pdf')
}
