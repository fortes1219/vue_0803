<template>
  <div class="page el-customize">
    <h1>Cookies的應用</h1>
    <ul>
      <li>登入表單儲存使用者資料與向server side取得的token</li>
      <li>可設定逾期時間</li>
    </ul>
    <br>
    <el-button type="primary" @click="setCookies">SET</el-button>
    <el-button type="primary" @click="getCookies">GET</el-button>
    <el-button @click="removeCookies">REMOVE</el-button>
    <div data-space="space-vertical">
      <p>
        {{'Name: ' + (stored.name == undefined ? '' : stored.name) }}<br>
        {{'Pwd: ' + (stored.pwd == undefined ? '' : stored.pwd) }}<br>
        {{'token: ' + (stored.token == undefined ? '' : stored.token) }}
      </p>
    </div>
  </div>
</template>

<script>
// 先 npm 安裝 js-cookie
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      loginForm: {
        name: 'Master',
        pwd: '123456',
        token: 'jksfhlsdafigsd1432fkgsfsdwef2q'
      },
      stored: {

      }
    }
  },

  methods: {
    setCookies() {
      Cookies.set('cookie', JSON.stringify(this.loginForm), { expires: 1 })
    },

    removeCookies() {
      Cookies.remove('cookie')
    },

    getCookies() {
      this.stored = JSON.parse(Cookies.get('cookie'))
      console.log(this.stored)
    }
  },

  created() {
    // this.getCookies()
  },

  mounted() { }
}
</script>