const BASE_URL = import.meta.env.VITE_BACKEND_URL || ''

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export async function compareAlgorithms(payload) {
  const response = await fetch(`${BASE_URL}/api/compare-algorithms`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await extractError(response)
    throw new Error(message)
  }

  return response.json()
}

async function extractError(response) {
  try {
    const data = await response.json()
    return data?.error || response.statusText || 'Unexpected error'
  } catch {
    return response.statusText || 'Unexpected error'
  }
}

export default {
  compareAlgorithms,
}

