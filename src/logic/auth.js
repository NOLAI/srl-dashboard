import { computed, reactive } from 'vue'
import { fetch } from '@/logic/fetch'
import tracking from '@/logic/tracking'

export const signin = (username) => {
  return new Promise((resolve, reject) => {
    fetch(`/user/${username}`)
      .then(async (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        auth.user = user
        tracking.start()
        resolve(user)
      })
      .catch((response) => {
        if (response.status === 404) {
          reject('incorrectUsernameError')
        } else {
          reject('generalError')
        }
      })
  })
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
