import { reactive } from 'vue'
import { auth } from '@/logic/auth'
import { fetch } from '@/logic/fetch'

const cache = {}

export const loadGoals = async (courseId) => {
  goalsState.selected = null
  goalsState.selectedEvents = []
  if (!cache[auth.user.id]) cache[auth.user.id] = {}
  if (cache[auth.user.id][courseId]) {
    return cache[auth.user.id][courseId]
  }

  try {
    const goals = await fetch(`/goals/${auth.user.id}/${courseId}`)
    cache[auth.user.id][courseId] = goals
    return goals
  } catch (error) {
    return []
  }
}

export const goalsState = reactive({
  selected: null,
  selectedEvents: []
})
