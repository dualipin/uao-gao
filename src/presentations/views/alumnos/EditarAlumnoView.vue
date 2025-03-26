<script setup lang="ts">
import { Alumno } from '@/domain/entities/Alumno'
import ButtonComponent from '@/presentation/components/ButtonComponent.vue'
import FormAlumnosComponent from '@/presentation/components/FormAlumnosComponent.vue'
import { alumnosStore } from '@/presentation/stores/alumnosStore'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const store = alumnosStore()
const alumno = ref<Alumno | null>()

const error = ref('')

const router = useRouter()
const id = router.currentRoute.value.params['id']

const actualizar = () => {
  try {
    store.acutalizarAlumno(Number(id), alumno.value!)
  } catch (e) {
    error.value = e as string
  }
}

watch(alumno, () => {
  console.log(alumno.value)
})

onMounted(async () => {
  alumno.value = await store.buscarAlumnoPorId(Number(id))
})
</script>

<template>
  <div v-if="alumno">
    <FormAlumnosComponent v-model:alumno="alumno">
      <ButtonComponent @click="actualizar" color="primary">Actualizar</ButtonComponent>
    </FormAlumnosComponent>
  </div>

  <!-- <pre>{{ alumno }}</pre> -->
</template>
