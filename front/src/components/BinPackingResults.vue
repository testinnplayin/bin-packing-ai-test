<script setup>
import BinPackingResultCard from './BinPackingResultCard.vue'

const props = defineProps({
  results: {
    type: Object,
    required: true,
  },
  lastUpdated: {
    type: String,
    default: '',
  },
})

const labels = {
  firstFit: 'First Fit',
  nextFit: 'Next Fit',
  firstFitDecreasing: 'First Fit Decreasing',
}
</script>

<template>
  <section class="results">
    <header>
      <h2>Results</h2>
      <p v-if="props.lastUpdated" class="results__meta">
        Last updated {{ new Date(props.lastUpdated).toLocaleTimeString() }}
      </p>
    </header>

    <div class="results__grid">
      <BinPackingResultCard
        v-for="(result, key) in props.results"
        :key="key"
        :label="labels[key] || key"
        :result="result"
      />
    </div>
  </section>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

h2 {
  margin: 0;
}

.results__meta {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
}

.results__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
</style>

