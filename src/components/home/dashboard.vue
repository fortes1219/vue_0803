<template>
  <div class="page">
    <div class="row column" data-inset="1rem">
      <div class="row" data-space="space-vertical">
        <temp-counter :color.sync="counterColor" :text.sync="counterText" :counter.sync="counter" />
      </div>
    </div>
  </div>
</template>
<script>
import tempCounter from '@/components/counter.vue'
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

  },

  methods: {

  }
};
</script>

