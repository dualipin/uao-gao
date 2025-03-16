<script setup lang="ts">
import MenuDesktopComponent from '../components/MenuDesktopComponent.vue'
import MenuMobileComponent from '../components/MenuMobileComponent.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col lg:flex-row">
    <!-- Sidebar -->
    <MenuDesktopComponent />
    <MenuMobileComponent />

    <!-- Main content -->
    <div class="flex flex-1 flex-col p-4">
      <RouterView />
    </div>
  </div>
</template>
