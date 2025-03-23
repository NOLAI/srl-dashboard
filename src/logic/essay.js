import { reactive } from 'vue'
import { auth } from '@/logic/auth'
import { fetch } from '@/logic/fetch'

export const loadEssays = async () => {
  essays.selected = []
  try {
    const essays = await fetch(`/essay/list/${auth.user.id}`)
    return essays
  } catch (error) {
    return []
  }
}

export const essays = reactive({
  selected: []
})
