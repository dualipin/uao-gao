<script setup lang="ts">
import type { Link } from '@/presentation/views/types/link'
import DesktopMenu from './DesktopMenu.vue'
import MobileMenu from './MobileMenu.vue'

const menuLinks: Link[] = [
  {
    text: 'Inicio',
    to: { name: 'principal' },
  },
  {
    text: 'Alumnos',
    to: { name: 'alumnos' },
    links: [
      {
        text: 'Nuevo Alumno',
        to: { name: 'registro-alumno' },
      },
    ],
  },
  {
    text: 'Pagos',
    to: { name: 'pagos' },
    links: [
      {
        text: 'Registrar Pago',
        to: { name: 'registrar-pago' },
      },
    ],
  },
]
</script>

<template>
  <DesktopMenu :links="menuLinks" />
  <MobileMenu :links="menuLinks" />
</template>
