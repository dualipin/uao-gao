import type { Alumno } from '@/domain/entities/Alumno'
import jsPDF from 'jspdf'
import { headerPDF } from './headerPDF'

export function generarReporteBienvenida(alumno: Alumno) {
  const doc = new jsPDF()

  headerPDF(doc)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)

  // // Agregar el encabezado
  // doc.text('Universidad Alfa y Omega', 105, 20, { align: 'center' })
  // doc.text('19/03/2025', 105, 30, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.text('Datos del Estudiante:', 20, 45)

  doc.setFont('helvetica', 'normal')
  doc.text(
    `Nombre: ${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno}`,
    20,
    55,
  )
  doc.text(`Carrera: ${alumno.carrera.nombre}`, 20, 65)

  // Saludo inicial
  doc.setFont('helvetica', 'bold')
  doc.text(
    `Estimado/a ${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno},`,
    20,
    90,
  )
  doc.setFont('helvetica', 'normal')

  // Cuerpo del mensaje
  const mensaje = `¡Es un placer darte la bienvenida a la Universidad Alfa y Omega extensión Pichucalco!
Nos llena de alegría recibirte como parte de nuestra comunidad académica y acompañarte en
este emocionante camino hacia tu desarrollo profesional y personal.

Sabemos que ingresar a la universidad representa un gran paso en tu vida, y queremos que
sepas que aquí encontrarás un entorno de aprendizaje enriquecedor, profesores comprometidos
y una comunidad estudiantil que te apoyará en cada desafío.

En la Universidad Alfa y Omega, valoramos la excelencia, la curiosidad y el espíritu de
superación. Estamos seguros de que en la carrera de ${alumno.carrera.nombre}, desarrollarás
habilidades clave y adquirirás conocimientos que te prepararán para un futuro brillante.

¡Bienvenido/a a esta gran familia universitaria, ${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno}! Te deseamos mucho éxito
en esta nueva etapa.`

  doc.setFontSize(11)
  doc.text(mensaje, 20, 100, { maxWidth: 170, align: 'justify' })

  // Firma
  doc.setFont('helvetica', 'bold')
  doc.text('Con entusiasmo y los mejores deseos,', 20, 210)
  doc.text('Universidad Alfa y Omega', 20, 220)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Documentos entregados:', 20, 255)
  doc.setFont('helvetica', 'normal')
  doc.text(
    `Acta de Nacimiento: ${alumno.documentos_entregados?.acta_nacimiento ? 'SI' : 'NO'} | CURP: ${alumno.documentos_entregados?.curp ? 'SI' : 'NO'} | Certificado de Bachillerato: ${alumno.documentos_entregados?.certificado_bachillerato ? 'SI' : 'NO'} | Certificado Médico: ${alumno.documentos_entregados?.certificado_medico ? 'SI' : 'NO'} | Folder: ${alumno.documentos_entregados?.folder ? 'SI' : 'NO  '}`,
    20,
    260,
    { maxWidth: 170 },
  )

  doc.save(`bienvenida-${alumno.nombres}-${alumno.apellido_paterno}.pdf`)
}
