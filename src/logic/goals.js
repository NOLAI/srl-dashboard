import { reactive } from 'vue'
import { auth } from '@/logic/auth'

const cache = {}

export const loadGoals = async (courseId) => {
  goalsState.selected = null
  goalsState.lastHover = null
  if (!cache[auth.user.id]) cache[auth.user.id] = {}
  if (cache[auth.user.id][courseId]) {
    return cache[auth.user.id][courseId]
  }
  const response = await fetch(import.meta.env.VITE_API_URL + `/goals/${auth.user.id}/${courseId}`)
  if (response.ok) {
    const goals = await response.json()
    cache[auth.user.id][courseId] = goals
    return goals
  }
  return []
}

export const goalsState = reactive({
  selected: null,
  lastHover: null
})
