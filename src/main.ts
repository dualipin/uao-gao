import './assets/main.css'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import '@fontsource/source-sans-pro'
import 'material-icons/iconfont/material-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { createVuestic } from 'vuestic-ui'

import App from './App.vue'
import router from './presentation/router'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(
  createVuestic({
    config: {
      colors: {
        variables: {
          primary: '#082D37',
          secondary: '#8C9DA5',
          success: '#6FA013',
          info: '#158DE3',
          error: '#8B0000',
          danger: '#E42222',
          warning: '#FFD43A',
          backgroundPrimary: '#FFFFFF',
          backgroundSecondary: '#F8FAFB',
          backgroundElement: '#E3EDEE',
          backgroundBorder: '#BFD4DA',
          textPrimary: '#082D37',
          textInverted: '#FFFFFF',
          shadow: 'rgba(0, 0, 0, 0.12)',
          focus: '#3C75AA',
          transparent: 'rgba(0, 0, 0, 0)',
          backgroundLanding: '#F4F9FC',
          backgroundLandingBorder: 'rgba(155, 179, 206, 0.8)',
          backgroundSidebar: '#ECF0F1',
        },
      },
    },
  }),
)

app.mount('#app')
