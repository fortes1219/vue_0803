import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requireAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('./components/home/dashboard.vue'),
          meta: { requireAuth: true }
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
          component: () => import('./components/home/LocalStorange.vue')
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
        },
        {
          path: 'regexp',
          name: 'Regexp',
          component: () => import('./components/home/Regexp.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'vuei18n',
          name: 'VueI18n',
          component: () => import('./components/home/VueI18n.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'uploader',
          name: 'Uploader',
          component: () => import('./components/home/Uploader.vue'),
          meta: { requireAuth: true }
        },
      ]
    }
  ]
})

router.beforeEach(async(to, from, next) => {
  // console.log(to, from)
  if (to.meta.requireAuth) {
    const info = Cookies.get('login')
    const token = JSON.parse(info).token
    console.log(token)
    if (info) {
      if (token.length > 0 || token === undefined) {
        next()
      } else {
        next({ name: 'Login' })
      }
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

// router.afterEach((to) => {
//   console.log(to)
//   document.title = to.meta.title
// })

export default router
