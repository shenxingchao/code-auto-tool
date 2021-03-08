import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css' // css样式重置

const app = createApp(App)
app.use(store).use(router)
//引入svg
import SvgPlugin from '@/components/SvgIcon'
app.use(SvgPlugin, {
  imports: []
})

app.mount('#app')
