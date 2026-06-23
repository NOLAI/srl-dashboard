const activeRequests = new Map()

export const fetch = (endpoint) => {
  if (activeRequests.has(endpoint)) {
    return activeRequests.get(endpoint)
  }

  const request = window
    .fetch(import.meta.env.VITE_API_URL + endpoint)
    .then(async (response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .finally(() => {
      activeRequests.delete(endpoint)
    })

  activeRequests.set(endpoint, request)
  return request
}
