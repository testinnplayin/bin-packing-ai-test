import { ref } from 'vue'
import { compareAlgorithms } from '../services/binPackingClient'

export function useBinPacking() {
  const results = ref(null)
  const loading = ref(false)
  const error = ref('')
  const lastUpdated = ref(null)

  const runComparison = async ({ items, binCapacity }) => {
    loading.value = true
    error.value = ''

    try {
      results.value = await compareAlgorithms({ items, binCapacity })
      lastUpdated.value = new Date().toISOString()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to run comparison'
    } finally {
      loading.value = false
    }
  }

  return {
    error,
    lastUpdated,
    loading,
    results,
    runComparison,
  }
}

