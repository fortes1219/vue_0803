import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cookies from 'js-cookie'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: () => import('./components/home/dashboard.vue'),
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
        },
        {
          path: 'localstorange',
          name: 'LocalStorange',
          component: () => import('./components/home/LocalStorange.vue'),
        },
        {
          path: 'localstorange_card_result',
          name: 'LocalStorangeCardResult',
          component: () => import('./components/home/LocalStorangeCardResult.vue')
        },
        {
          path: 'cookies',
          name: 'Cookies',
          component: () => import('./components/home/Cookies.vue'),
          meta: { requireAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log(to, from)
  if (to.meta.requireAuth) {
    // const info = Cookies.get('cookie')
    const info = true
    // const token = JSON.parse(Cookies.get('cookie')).token
    // if (info && JSON.parse(info).token.length > 0) {
    if (info) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
})

// router.afterEach((to) => {
//   console.log(to)
//   document.title = to.meta.title
// })

export default router