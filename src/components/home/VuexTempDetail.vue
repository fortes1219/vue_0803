<template>
  <div class="page vuex_temp">
    <h1>Vuex Detail</h1>
    <br>
    <el-button @click="$router.go(-1)">Go Back</el-button>
		<br>
    <div class="row vertical" data-space="space-vertical">
      <b>{{ endding }}</b><br>
      <div v-if="flag == 'a'">
        <img src="img/end_1.jpg" style="width: 100%;">
      </div>
      <div v-if="flag == 'b'">
        <img src="img/end_2.jpg" style="width: 100%;">
      </div>
      <div v-if="flag == 'c'">
        <img src="img/end_3.jpg" style="width: 100%;">
      </div>
      <div v-if="flag == 'd'">
        <img src="img/end_4.jpg" style="width: 100%;">
      </div>
      <!-- <p data-space-next="1rem">{{ mapGetMsg }}</p><el-button @click="setMsg">Get State</el-button> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "VuexTemp",
  data() {
    return {
      total: 0,
      flag: '',
      endding: ''
    }
  },

  computed: {
    ...mapGetters([
      'mapGetTotal',
      'mapGetFlag',
      'mapGetEpilogue'
    ])
  },

  methods: {
    ...mapActions([
      'setMsg'
    ]),
    ...mapMutations([
      'changeMsg'
    ])
  },

  created() {
    this.mapGetTotal
    this.total = this.$store.state.temp.total
    this.flag = this.$store.state.temp.flag
    this.endding = this.$store.state.temp.epilogue
    console.log('total: ', this.total)
    console.log('flag: ', this.flag)
  }
};
</script>
