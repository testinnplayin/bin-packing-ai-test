<script setup>
import { computed, ref, watchEffect } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  initialItems: {
    type: Array,
    default: () => [],
  },
  initialCapacity: {
    type: Number,
    default: 10,
  },
})

const itemsInput = ref('')
const binCapacity = ref(props.initialCapacity)
const validationMessage = ref('')

watchEffect(() => {
  itemsInput.value = props.initialItems.join(', ')
})

const parsedItems = computed(() => {
  const raw = itemsInput.value.trim()
  if (!raw) {
    return []
  }

  return raw
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((value) => !Number.isNaN(value) && value > 0)
})

const isSubmitDisabled = computed(() => props.loading || parsedItems.value.length === 0 || binCapacity.value <= 0)

function handleSubmit(event) {
  event.preventDefault()
  validationMessage.value = ''

  if (parsedItems.value.length === 0) {
    validationMessage.value = 'Enter at least one positive number.'
    return
  }

  if (!binCapacity.value || binCapacity.value <= 0) {
    validationMessage.value = 'Bin capacity must be greater than zero.'
    return
  }

  emit('submit', {
    items: parsedItems.value,
    binCapacity: Number(binCapacity.value),
  })
}
</script>

<template>
  <form class="form" @submit="handleSubmit">
    <fieldset>
      <label for="items">Items (comma separated)</label>
      <textarea
        id="items"
        v-model="itemsInput"
        rows="4"
        placeholder="e.g. 4, 8, 1, 4, 2, 1"
      />
    </fieldset>

    <fieldset>
      <label for="capacity">Bin capacity</label>
      <input id="capacity" v-model.number="binCapacity" min="1" type="number" />
    </fieldset>

    <p v-if="validationMessage" class="form__validation">
      {{ validationMessage }}
    </p>

    <button :disabled="isSubmitDisabled" type="submit">
      {{ loading ? 'Running comparison...' : 'Compare algorithms' }}
    </button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
}

label {
  font-size: 0.95rem;
  font-weight: 600;
}

textarea,
input {
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.75rem;
  width: 100%;
}

button {
  align-self: flex-start;
  background: #1f2937;
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  transition: opacity 0.2s ease-in-out;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.form__validation {
  color: #b45309;
  font-size: 0.9rem;
  margin: 0;
}
</style>

