import { createApp } from 'vue'
import App from './App.vue'
import tracking from '@/logic/tracking'

// Vuetify
import vuetify from './plugins/vuetify'

// Router
import router from './router'

// Vuei18n
import i18n from './i18n/index.js'

import './assets/main.css'

const app = createApp(App)

app.use(vuetify)
app.use(i18n)
app.use(router)
app.mount('#app')

tracking.init()
tracking.start()
