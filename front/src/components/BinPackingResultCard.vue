<script setup>
defineProps({
  result: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <article class="card">
    <header>
      <h3>{{ label }}</h3>
      <p class="card__meta">Bins used: {{ result.binCount }}</p>
    </header>

    <dl>
      <div>
        <dt>Efficiency</dt>
        <dd>{{ result.efficiency }}</dd>
      </div>
      <div>
        <dt>Bin breakdown</dt>
        <dd class="bin-list">
          <span v-for="(bin, index) in result.bins" :key="index" class="bin">
            Bin {{ index + 1 }}: {{ bin.join(', ') || 'empty' }}
          </span>
        </dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
}

header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.1rem;
  margin: 0 0 0.25rem;
}

.card__meta {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
}

dl {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
}

dt {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
}

dd {
  margin: 0.25rem 0 0;
}

.bin-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bin {
  background: var(--surface-muted);
  border-radius: 4px;
  font-size: 0.9rem;
  padding: 0.4rem 0.6rem;
}
</style>

