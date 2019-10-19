<template>
  <div class="page el-customize">
    <h1>Browser 暫存器</h1>
    <el-button type="primary" @click="setLocalStorange">SET</el-button>
    <el-button type="primary" @click="removeLocalStorange">Clear</el-button>
    <el-button type="primary" @click="$router.push({name: 'LocalStorangeCardResult'})">NEXT Page</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      card: {
        class: 'saber',
        name: 'アルトリア(リリィ)',
        rare: '4'
      }
    }
  },

  methods: {
    setLocalStorange() {
      const targetCard = this.card
      localStorage.setItem('card', JSON.stringify(targetCard))
    },

    removeLocalStorange() {
      localStorage.removeItem('card')
    }
  },

  created() {
    // this.setLocalStorange()
  }
}
</script>