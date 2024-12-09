import { reactive } from 'vue'
import { auth } from '@/logic/auth'

export const loadEssays = async () => {
  const response = await fetch(import.meta.env.VITE_API_URL + `/essay/list/${auth.user.id}`)
  if (response.ok) {
    const essays = await response.json()
    return essays
  }
  return []
}

export const essays = reactive({
  selected: []
})
