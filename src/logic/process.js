import { reactive } from 'vue'
import { auth } from '@/logic/auth'

const cache = {}

export const loadProcesses = async (courseId) => {
  processState.selected = null
  processState.lastHover = null
  if (!cache[auth.user.id]) cache[auth.user.id] = {}
  if (cache[auth.user.id][courseId]) {
    return cache[auth.user.id][courseId]
  }
  const response = await fetch(
    import.meta.env.VITE_API_URL + `/process/${auth.user.id}/${courseId}`
  )
  if (response.ok) {
    const processes = await response.json()
    cache[auth.user.id][courseId] = processes
    return processes
  }
  return []
}

export const processState = reactive({
  selected: null,
  lastHover: null
})
