import { createSSRApp, defineAsyncComponent } from 'vue'
import VueI18n from '@/locales'
import { Pinia } from './store'
import Interceptor from '@/interceptor'
import '@/extension'

import App from './App.vue'
import Vue2Mixin from '@/compatible/index-mixin'

export function createApp() {
  const app = createSSRApp(App).use(Pinia).use(VueI18n).use(Interceptor).mixin(Vue2Mixin)
  return {
    app
  }
}
