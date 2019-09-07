import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import('./components/home/dashboard.vue')
        },
        {
          path: 'vuex',
          name: 'Vuex',
          component: () => import('./views/VuexTemp.vue')
        },
        {
          path: 'api',
          name: 'API',
          component: () => import('./views/ApiTemp.vue')
        },
        {
          path: 'data-event',
          name: 'DataEvent',
          component: () => import('./components/home/DataEvent.vue')
        }
      ]
    }
  ]
});
