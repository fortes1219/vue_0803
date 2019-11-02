<template>
  <div class="main home">
    <div class="side">
      <div class="logo">Fate/Admin Order</div>
      <nav>
        <label>Home</label>
        <ul>
          <li @click="$router.push({name: 'Dashboard'})">Dashboard</li>
          <li @click="$router.push({name: 'Dashboard'})">Component</li>
          <li @click="$router.push({name: 'DataEvent'})">Data Event</li>
          <li @click="$router.push({name: 'Pickup'})">Pickup</li>
          <li @click="$router.push({name: 'Dashboard'})">圖表</li>
          <li @click="$router.push({name: 'API'})">API</li>
          <li @click="$router.push({name: 'LocalStorange'})">Local Storange</li>
          <li @click="$router.push({name: 'Cookies'})">Cookies</li>
          <li @click="$router.push({name: 'Regexp'})">RegExp 正則表達式</li>
        </ul>
        <label>狀態管理</label>
        <ul>
          <li @click="$router.push({name: 'Vuex'})">Vuex</li>
        </ul>
        <label>多語系處理</label>
        <ul>
          <li @click="$router.push({name: 'Dashboard'})">i18n</li>
        </ul>
        <label>圖表</label>
        <ul>
          <li @click="$router.push({name: 'Dashboard'})">v-charts</li>
        </ul>
      </nav>
      <div class="footer"></div>
    </div>
    <div class="primary">
      <div class="header">
        <p>{{ getRouterName }}</p>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "home",

  data() {
    return {
      pathName: ''
    }
  },

  mounted() {
    console.log(this.$route.name)
  },

  computed: {
    getRouterName(){
      return this.$route.name
    }
  },

  methods: {

  }
};
</script>
