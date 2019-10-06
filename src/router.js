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
          component: () => import('./components/home/VuexTemp.vue')
        },
        {
          path: 'api',
          name: 'API',
          component: () => import('./components/home/ApiTemp.vue')
        },
        {
          path: 'data-event',
          name: 'DataEvent',
          component: () => import('./components/home/DataEvent.vue')
        },
        {
          path: 'pickup',
          name: 'Pickup',
          component: () => import('./components/home/Pickup.vue')
        }
      ]
    }
  ]
});
