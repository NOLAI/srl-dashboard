import { computed, reactive } from 'vue'
import { fetch } from '@/logic/fetch'

export const signin = (username) => {
  return new Promise((resolve, reject) => {
    fetch(`/user/${username}`).then(async (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      auth.user = user
      resolve(user)
    }).catch((response) => {
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
}

export const auth = reactive({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  authenticated: computed(() => !!auth.user),
  signin,
  signout
})
