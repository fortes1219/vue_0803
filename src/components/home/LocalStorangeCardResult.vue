<template>
  <div class="page el-customize">
    <h1>暫存器撈回資料</h1>
    <br>
    <!-- <el-button type="primary" @click="getLocalStorange">GET</el-button> -->
    <p>
        class:{{' ' + card.class}} <br>
        name:{{' ' +card.name}} <br>
        rare:{{' ' +card.rare}}
    </p>
    <br>
    <el-button type="primary" @click="$router.go(-1)">BACK</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      card: {

      }
    }
  },

  methods: {
    getLocalStorange() {
      let getCard = JSON.parse(localStorage.getItem('card'))
      this.card = getCard
    },

  },

  created() {
    this.getLocalStorange()
  }
}
</script>