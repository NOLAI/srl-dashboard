import { auth } from '@/logic/auth'
import { fetch } from '@/logic/fetch'

export const loadQuestions = async () => {
  try {
    const questions = await fetch(`/questions/${auth.user.id}`)
    return questions
  } catch (error) {
    return []
  }
}
