import { tracker } from '@openreplay/tracker'
import { auth } from './auth'

const enabled = !!(
  import.meta.env.VITE_OPENREPLAY_PROJECT_KEY && import.meta.env.VITE_OPENREPLAY_INGEST_POINT
)

export const init = () => {
  if (!enabled) return
  tracker.configure({
    projectKey: import.meta.env.VITE_OPENREPLAY_PROJECT_KEY,
    ingestPoint: import.meta.env.VITE_OPENREPLAY_INGEST_POINT
  })
  console.log('Tracking initialised')
}

export const start = () => {
  if (!enabled || !auth.authenticated || tracker.isActive()) return
  tracker.start({
    userID: auth.user.username,
    metadata: { user_id: auth.user.id.toString() },
    forceNew: true
  })
  console.log('Tracking started for user:', auth.user.username)
}

export const stop = () => {
  if (!enabled || !tracker.isActive()) return
  tracker.stop()
  console.log('Tracking stopped')
}

export const track = (key, payload) => {
  if (!enabled || !tracker.isActive()) return
  tracker.event(key, payload)
  console.log('Tracking event:', key, payload)
}

export default {
  init,
  start,
  stop,
  track
}
