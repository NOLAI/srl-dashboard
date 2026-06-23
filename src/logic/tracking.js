import { tracker } from '@openreplay/tracker'

const enabled = !!(
  import.meta.env.VITE_OPENREPLAY_PROJECT_KEY && import.meta.env.VITE_OPENREPLAY_INGEST_POINT
)

export const init = () => {
  if (!enabled) return
  tracker.configure({
    projectKey: import.meta.env.VITE_OPENREPLAY_PROJECT_KEY,
    ingestPoint: import.meta.env.VITE_OPENREPLAY_INGEST_POINT
  })
}

export const start = (user) => {
  if (!enabled || !user || tracker.isActive()) return
  tracker.start({
    userID: user.username,
    metadata: { user_id: user.id.toString() },
    forceNew: true
  })
}

export const stop = () => {
  if (!enabled || !tracker.isActive()) return
  tracker.stop()
}

export const track = (key, payload) => {
  if (!enabled || !tracker.isActive()) return
  tracker.event(key, payload)
}

export default {
  init,
  start,
  stop,
  track
}
