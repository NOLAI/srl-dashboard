import { reactive } from 'vue'
import { auth } from '@/logic/auth'
import { fetch } from '@/logic/fetch'

const cache = {}

export const loadProcesses = async (courseId) => {
  processState.selected = null
  processState.lastHover = null
  if (!cache[auth.user.id]) cache[auth.user.id] = {}
  if (cache[auth.user.id][courseId]) {
    return cache[auth.user.id][courseId]
  }
  try{
    const processes = await fetch(`/process/${auth.user.id}/${courseId}`)
    cache[auth.user.id][courseId] = processes
    return processes
  } catch (error) {
    return []
  }
}

export const processState = reactive({
  selected: null,
  lastHover: null
})
