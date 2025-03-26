<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { onMounted } from 'vue'
import logoUAO from '@/assets/img/logo-alfa-y-omega.jpg'
import logoTabsoop from '@/assets/img/logo-tabscoob.jpg'
// import { useAuthStore } from '../stores/authStore'

// Register the necessary components
Chart.register(...registerables)

function renderCharts() {
  const gradesChart = document.getElementById(
    'gradesChart',
  ) as HTMLCanvasElement | null
  const paymentsChart = document.getElementById(
    'paymentsChart',
  ) as HTMLCanvasElement | null
  const attendanceChart = document.getElementById(
    'attendanceChart',
  ) as HTMLCanvasElement | null

  if (gradesChart && paymentsChart && attendanceChart) {
    const gradesCtx = gradesChart.getContext('2d') as CanvasRenderingContext2D
    const paymentsCtx = paymentsChart.getContext(
      '2d',
    ) as CanvasRenderingContext2D
    const attendanceCtx = attendanceChart.getContext(
      '2d',
    ) as CanvasRenderingContext2D

    new Chart(gradesCtx, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D', 'F'],
        datasets: [
          {
            label: 'Calificaciones',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    new Chart(paymentsCtx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Pagos',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })

    new Chart(attendanceCtx, {
      type: 'pie',
      data: {
        labels: ['Presente', 'Ausente', 'Tarde'],
        datasets: [
          {
            label: 'Asistencia',
            data: [300, 50, 100],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    })
  }
}

onMounted(() => {
  renderCharts()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-gray-900">Universidad Alfa y Omega</h1>
    <h2 class="mt-3 text-2xl font-semibold text-neutral-700">
      Extension Jalapa
    </h2>
    <p class="mt-4 text-2xl text-gray-700">
      Gestión Administrativa y Academica
    </p>
  </div>
  <div
    class="mt-8 grid w-full grid-cols-1 gap-4 rounded-2xl border border-neutral-300 bg-neutral-50 p-5 lg:grid-cols-2"
  >
    <div class="grid place-content-center rounded-lg bg-white p-6 shadow-md">
      <img :src="logoTabsoop" alt="" />
      <!-- <h3 class="text-xl font-semibold text-gray-800">
        Estadísticas de Calificaciones
      </h3>
      <canvas id="gradesChart"></canvas> -->
    </div>
    <div class="grid place-content-center rounded-lg bg-white p-6 shadow-md">
      <img :src="logoUAO" alt="" />
      <!-- <h3 class="text-xl font-semibold text-gray-800">Estadísticas de Pagos</h3>
      <canvas id="paymentsChart"></canvas> -->
    </div>
  </div>
</template>
