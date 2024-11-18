export const useCircuitTurbinesGaz = () => {
  const circuitData = ref(null)
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data/circuit_turbines_gaz.json')
      const data = await response.json()
      console.log('Données turbines:', data)
      circuitData.value = data.circuit_turbines_gaz
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  onMounted(() => {
    fetchData()
  })

  return {
    circuitData
  }
}
