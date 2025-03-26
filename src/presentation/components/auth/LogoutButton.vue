<script setup lang="ts">
import { LogOut } from 'lucide-vue-next'
import { VaButton } from 'vuestic-ui'
</script>

<template>
  <VaButton color="danger">
    Cerrar sesión
    <LogOut class="ml-2 inline-block h-6 w-6" />
  </VaButton>
</template>
