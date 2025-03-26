<script setup lang="ts">
// import MenuDesktopComponent from '../components/MenuDesktopComponent.vue'
import ResponsiveMenu from '../components/menu/ResponsiveMenu.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col lg:flex-row">
    <!-- navegación -->
    <ResponsiveMenu />

    <!-- contenido -->
    <div class="flex flex-1 flex-col p-4">
      <RouterView />
    </div>
  </div>
</template>
