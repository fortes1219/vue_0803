<template>
  <div class="page vuex_temp">
    <h1>Vuex: Actions, Mutations</h1>
		<br>
    <div class="row horizontal v_center">
      <p data-space-next="1rem">{{ mapGetMsg }}</p><el-button @click="setMsg">Get State</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: "VuexTemp",
  data() {
    return {

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
