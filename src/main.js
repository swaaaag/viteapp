import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);


import router from './router';
app.use(router);

import pinia from './store';
app.use(pinia)

import installElementPlus from './plugins/element'
installElementPlus(app);

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
//全局属性
import globalProperties from '@/util/global.properties'
globalProperties(app)

// 全局样式
import '@/assets/styles/globals.scss'
// iconfont
import '@/util/iconfont.js'
// //全局组件
// import globalComponents from '@/components'
// app.use(globalComponents)

app.mount('#app');