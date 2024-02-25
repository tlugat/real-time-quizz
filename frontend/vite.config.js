import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      composables: fileURLToPath(new URL('./src/composables', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      queries: fileURLToPath(new URL('./src/queries', import.meta.url)),
      views: fileURLToPath(new URL('./src/views', import.meta.url)),
      utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
      public: fileURLToPath(new URL('./public', import.meta.url)),
      api: fileURLToPath(new URL('./src/api', import.meta.url)),
      stores: fileURLToPath(new URL('./src/stores', import.meta.url))
    }
  },
  build: {
    target: 'esnext'
  }
})
