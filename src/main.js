import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css';
import axios from 'axios'


Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
