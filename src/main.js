import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
// vant组价库
import './plugins/vant.js'
// rem 动态加载基准值
import 'amfe-flexible'
// axios拦截器
import './utils/request'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
