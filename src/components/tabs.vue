<template>
  <div>
    <!--Duration-->
    <div v-if="durationsDisplay" key="duration" class="row vertical">
      <el-radio-group
        v-model="duration.select"
        @change="durationChange"
      >
        <el-radio-button
          v-for="(item, index) in duration.items"
          :key="index"
          :label="item.label"
        >{{ item.name }}</el-radio-button>
      </el-radio-group>
      <h2 data-space="space-vertical">{{ headerText }}</h2>
    </div>

    <!--On sale-->
    <div v-if="onSaleDisplay" key="onSale" class="row vertical">
      <el-radio-group
        v-if="onSaleDisplay"
        v-model="onSale.select"
        @change="onSaleChange"
      >
        <el-radio-button
          v-for="(item, index) in onSale.items"
          :key="index"
          :label="item.label"
        >{{ item.name }}</el-radio-button>
      </el-radio-group>
      <br>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabs",
  props: {
    durationsDisplay: {
      type: Boolean,
      default: false
    },
    onSaleDisplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      duration: {
        select: 0,
        items: [
          { label: 0, name: "有效總收益" },
          { label: 1, name: "獲利率" },
        ]
      },

      onSale: {
        select: 0,
        items: [
          { label: 0, name: "推薦" },
          { label: 1, name: "人氣" },
          { label: 2, name: "最新" }
        ]
      }
    }
  },

  computed: {
    headerText() {
      let text = ''
      switch (this.duration.select) {
        case 0:
          text = '有效總收益'
          break
        case 1:
          text = '獲利率'
          break
      }
      return text
    }
  },

  methods: {
    durationChange(val) {
      this.duration.select = val
      this.$emit("tabDuration", val)
    },
    onSaleChange(val) {
      this.onSale.select = val
      this.$emit("tabOnSale", val)
    }
  },

  created() {
    this.durationChange(this.duration.select)
    this.onSaleChange(this.onSale.select)
  }
}
</script>