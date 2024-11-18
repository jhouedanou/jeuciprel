<template>
    <!-- Structure identique à TurbineGazGame.vue -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCircuitCycleCombine } from '~/composables/useCircuitCycleCombine'

const { circuitData } = useCircuitCycleCombine()
// Reste du code identique à TurbineGazGame.vue
</script>

<style scoped>
/* Styles identiques à TurbineGazGame.vue */
</style>
