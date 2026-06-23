import { computed, reactive } from 'vue'
import { fetch } from '@/logic/fetch'
import tracking from '@/logic/tracking'

export const signin = async (username) => {
  try {
    const user = await fetch(`/user/${username}`)
    localStorage.setItem('user', JSON.stringify(user))
    auth.user = user
    tracking.start(user)
    return user
  } catch (response) {
    if (response?.status === 404) {
      throw 'incorrectUsernameError'
    }
    throw 'generalError'
  }
}

export const signout = async () => {
  auth.user = null
  localStorage.removeItem('user')
  tracking.stop()
}

export const auth = reactive({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  authenticated: computed(() => !!auth.user),
  signin,
  signout
})
