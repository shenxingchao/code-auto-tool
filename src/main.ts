import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// css样式重置
import 'normalize.css/normalize.css'
//引入svg
import SvgPlugin from '@/components/SvgIcon'

const app = createApp(App)
//使用状态
app.use(store)
//使用路由
app.use(router)
//使用element plus
app.use(ElementPlus)
//使用svg
app.use(SvgPlugin, {
  imports: []
})

app.mount('#app')
