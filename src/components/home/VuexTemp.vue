<template>
  <div class="page vuex_temp">
    <h1>冬木市で聖杯戦争の痕跡を探し出せ！</h1>
    <br />
    <div class="row vertical">
      <!-- <p data-space-next="1rem">{{ mapGetMsg }}</p><el-button @click="setMsg">Get State</el-button> -->
      <p>いつ頃</p>
      <br />
      <el-radio-group v-model="flagItem.selectA" @change="onRadioChange">
        <el-radio-button
          v-for="(item, index) in flagItem.partA"
          :key="index"
          :label="item.label"
        >{{ item.name }}</el-radio-button>
      </el-radio-group>
      <br />
      <p>どこへ</p>
      <br />
      <el-radio-group v-model="flagItem.selectB" @change="onRadioChange">
        <el-radio-button
          v-for="(item, index) in flagItem.partB"
          :key="index"
          :label="item.label"
        >{{ item.name }}</el-radio-button>
      </el-radio-group>
      <br />
      <p>誰と</p>
      <br />
      <el-radio-group v-model="flagItem.selectC" @change="onRadioChange">
        <el-radio-button
          v-for="(item, index) in flagItem.partC"
          :key="index"
          :label="item.label"
        >{{ item.name }}</el-radio-button>
      </el-radio-group>
    </div>
    <br />
    <el-button @click="$router.push({name: 'VuexDetail'})">結果へ</el-button>
    <div class="row vertical v_center" data-space="space-vertical">
      <p>スコア：{{ mapGetTotal }}</p><br>
      <p>フラグ：{{ mapGetFlag }}</p><br>
      <p>可能なエンディング：{{ mapGetEpilogue }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex"
export default {
  name: "VuexTemp",
  data() {
    return {
      flagItem: {
        selectA: "",
        selectB: "",
        selectC: "",
        partA: [
          { label: 0, name: "朝で" },
          { label: 1, name: "昼で" },
          { label: 2, name: "夜で" }
        ],

        partB: [
          { label: 1, name: "衛宮家" },
          { label: 8, name: "私立穂群原学園" },
          { label: 3, name: "柳洞寺" },
          { label: 5, name: "聖堂教会" },
          { label: 2, name: "アインツベルン城" }
        ],

        partC: [
          { label: 1, name: "セイバー" },
          { label: 6, name: "大河先生" },
          { label: 2, name: "遠坂 凛" },
          { label: 3, name: "間桐 桜" },
          { label: 0, name: "イリヤスフィール" }
        ]
      }
    };
  },

  computed: {
    ...mapGetters(["mapGetTotal", "mapGetFlag", "mapGetEpilogue"]),

    getTotalScore() {
      let result = this.flagItem.selectA + this.flagItem.selectB + this.flagItem.selectC
      return result
    }
  },

  methods: {
    ...mapActions(["setFlag"]),
    ...mapMutations(["changeTotal", "changeFlag", "changeEpilogue"]),
    onRadioChange() {
      this.changeTotal(this.getTotalScore)
      this.setFlag()
      this.changeEpilogue()
    }
  }
};
</script>
