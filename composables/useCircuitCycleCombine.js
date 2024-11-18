export const useCircuitCycleCombine = () => {
  const circuitData = ref(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data/circuit_cycle_combine.json')
      const data = await response.json()
      circuitData.value = data.circuit_cycle_combine
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    }
  }

  onMounted(() => {
    fetchData()
  })

  return {
    circuitData
  }
}
