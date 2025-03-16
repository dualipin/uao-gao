<script setup lang="ts">
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const generarPDF = () => {
  const doc = new jsPDF()

  // Agregar título
  doc.setFontSize(16)
  doc.text('Reporte de Datos', 105, 15, { align: 'center' })

  // Datos del reporte
  const encabezados = [['ID', 'Nombre', 'Edad']]
  const datos = [
    [1, 'Juan Pérez', 30],
    [2, 'María López', 25],
    [3, 'Carlos García', 28],
  ]

  // Agregar tabla
  autoTable(doc, {
    head: encabezados,
    body: datos,
    startY: 25, // Posición en el PDF
    columnStyles: {},
  })

  // Guardar o mostrar el PDF
  doc.save('reporte.pdf')
}
</script>

<template>
  <button @click="generarPDF" class="rounded bg-blue-500 px-4 py-2 text-white">
    Descargar Reporte PDF
  </button>
</template>
