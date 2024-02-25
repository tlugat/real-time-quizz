import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
// import { ThemeProvider } from 'vue3-styled-components'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa
    }
  },
  components,
  directives
})

const app = createApp(App)
const pinia = createPinia()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 /* ms */ * 60 /* sec */ * 60 /* min */ // 60 min,
    }
  }
})

app.use(Vue3Toasity, {
  position: 'bottom-right',
  autoClose: 3000
})
app.use(vuetify)
app.use(VueQueryPlugin, queryClient)
app.use(pinia)
app.use(router)

app.mount('#app')
