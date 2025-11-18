<script setup>
import { computed } from 'vue'
import BinPackingForm from '../components/BinPackingForm.vue'
import BinPackingResults from '../components/BinPackingResults.vue'
import { useBinPacking } from '../composables/useBinPacking'

const { error, lastUpdated, loading, results, runComparison } = useBinPacking()

const hasResults = computed(() => Boolean(results.value))

const defaultItems = [4, 8, 1, 4, 2, 1]
</script>

<template>
  <section class="page">
    <header class="hero">
      <div>
        <p class="eyebrow">Bin packing playground</p>
        <h1>Compare bin-packing algorithms and inspect the bins they create.</h1>
        <p class="subhead">
          Provide a bin capacity and a list of numbers as item sizes. We will return a bin-packing result and its efficiency!
        </p>
      </div>
    </header>

    <BinPackingForm
      :initial-items="defaultItems"
      :loading="loading"
      @submit="runComparison"
    />

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <BinPackingResults
      v-if="hasResults"
      :last-updated="lastUpdated"
      :results="results"
    />

    <p v-else class="placeholder">
      Ready when you are! Enter some sample data and we’ll fetch the results.
    </p>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0;
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.eyebrow {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(2rem, 5vw, 2.75rem);
  margin: 0;
}

.subhead {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin: 0;
  max-width: 60ch;
}

.error {
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  color: #92400e;
  margin: 0;
  padding: 0.75rem 1rem;
}

.placeholder {
  color: var(--text-muted);
  font-style: italic;
  margin: 0;
}
</style>


