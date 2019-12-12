import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import '@/styles/style.scss'
import axios from 'axios'
import i18n from './lang'
import api from '@/service/api'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
