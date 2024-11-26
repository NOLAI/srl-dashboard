import { computed, reactive } from 'vue'

export const signin = (username) => {
  return new Promise((resolve, reject) => {
    fetch(import.meta.env.VITE_API_URL + `/user/${username}`).then(async (response) => {
      if (response.ok) {
        const user = await response.json()
        localStorage.setItem('user', JSON.stringify(user))
        auth.user = user
        resolve(user)
      } else if (response.status === 404) {
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
