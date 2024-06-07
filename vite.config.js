import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from "vite-plugin-vuetify";

// const ASSET_URL = import.meta.env.VITE_ASSET_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/dashboard/`,
  plugins: [
      vue(),
      vuetify()
  ],
  server: {
    port: 8000,
    watch: {
      usePolling: true,
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
