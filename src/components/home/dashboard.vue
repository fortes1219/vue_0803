<template>
  <div class="page">
    <div class="row column" data-inset="1rem">
      <div class="row" data-space="space-vertical">
        <temp-counter :color.sync="counterColor" :text.sync="counterText" :counter.sync="counter" />
      </div>
    </div>
    <h1 data-inset="1rem">Vuex: Actions, Mutations</h1>
    <div class="row horizontal v_center" data-inset="1rem">
      <p data-space-next="1rem">{{ mapGetMsg }}</p>
      <el-button @click="setMsg">Get State</el-button>
    </div>
  </div>
</template>
<script>
import tempCounter from '@/components/counter.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "home",
  components: {
    tempCounter
  },
  data() {
    return {
      counterColor: 'blue',
      counter: 0,
      counterText: 'temp counter',
      message: ''
    }
  },

  computed: {
    ...mapGetters([
      'mapGetMsg'
    ])
  },

  methods: {
    ...mapActions([
      'setMsg'
    ]),
    ...mapMutations([
      'changeMsg'
    ])
  }
};
</script>

