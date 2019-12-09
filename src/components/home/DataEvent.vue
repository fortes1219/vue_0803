<template>
  <div class="page">
    <h1>1. 基礎資料綁定</h1>
    <br>
    <div class="row column">
      <el-select v-model="tempSelect.selected" clearable @change="handleSelect">
        <el-option v-for="(item, index) in tempSelect.items" :key="index" :value="item.value" :label="item.label" />
      </el-select>
      <div v-if="tempSelect.selected === '1'" class="input_inner" data-width="20rem">
        <el-input v-model="tempInput" type="text" placeholder="enter something" @change="handleInputChange" />
      </div>
      <div v-if="tempSelect.selected === '1'" class="row vertical">
        <el-checkbox :indeterminate="isInd" v-model="checkAll" @change="handleCheckAll">Select All</el-checkbox>
        <div class="input _inner">
          <el-checkbox-group v-model="checked" @change="handleChecked">
            <el-checkbox v-for="(item, index) in checkItems" :label="item.value" :name="item.label" :key="index">
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <br>
    <h2>2. 9/21小測驗以Vue改寫</h2>
    <br>
    <p>你剛完成了40AP的每日種火關卡，請依照下列需求打印出正確結果</p>
    <br>
    <b>Context:</b>
    <ul>
      <li>今天是週日，種火對象都是混階</li>
      <li>你手殘忘了把迦勒底午餐禮裝掛上去</li>
      <li>40AP 種火的絆點是660</li>
    </ul>
    <br>
    <b>Force:</b>
    <ul>
      <li>使每位參與的從者都能獲得相同點數</li>
      <li>滿絆等級的從者不再增加點數</li>
      <li>印出戰鬥後三位從者的羈絆點數</li>
      <li>羈絆4，點數達5萬的從者，印出新的絆等級且格式是"從者名+絆等級+(羈絆等級提升)+絆點數" (下示</li>
    </ul>
    <br>
    <div v-for="(item, index) in battleData" :key="index">
      {{ item.name + ' '}}
      {{ '絆LV' + item.bound.level + ' ' }}{{ handleLevelUpMsg[index] }}
      {{'點數' + item.bound.point }}
    </div>
    <br>
    <el-button type="primary" @click="battleFinish">完成一場戰鬥獲得羈絆點數</el-button>
    <br><br>
    <el-checkbox @change="codes=!codes">使用迦勒底午餐禮裝</el-checkbox>
  </div>
</template>

<script>
export default {
  name: "dataEvent",
  data() {
    return {
      tempInput: "",
      tempSelect: {
        selected: "",
        items: [
          { id: 0, value: "1", label: "option 1" },
          { id: 1, value: "2", label: "option 2" },
          { id: 2, value: "3", label: "option 3" }
        ]
      },
      checkAll: false,
      isInd: false, //isInd = isIndeterminate，是否為「不定數」的意思，沒有全部選擇僅有部分選擇時調用
      checked: [],
      checkItems: [
        { label: "check 1", value: "1" },
        { label: "check 2", value: "2" },
        { label: "check 3", value: "3" }
        // "check 1",
        // "check 2",
        // "check 3"
      ],
      // 小測驗資料內容
      battleData: [
        {
          id: 0,
          name: '巖窟王',
          class: 'Avanger',
          bound: {
            level: 4,
            point: 49700,
            levelUp: false
          }
        },
        {
          id: 1,
          name: '斯卡薩哈=斯卡蒂',
          class: 'Caster',
          bound: {
            level: 4,
            point: 49700,
            levelUp: false
          }
        },
        {
          id: 2,
          name: '諸葛孔明',
          class: 'Caster',
          bound: {
            level: 10,
            point: 1570000,
            levelUp: false
          }
        }
      ],
      tanebiExp: 660,
      codes: false
    };
  },

  created() { },

  methods: {
    handleInputChange() {
      console.log(this.tempInput);
    },
    handleSelect() {
      console.log(this.tempSelect.selected);
    },

    handleCheckAll() {
      this.checkAll ? this.checkItems.forEach(arr => { this.checked.push(arr.value) }) : this.checked = []
      this.isInd = false
      console.log(this.checked)
    },

    handleChecked(val) {
      this.checkAll = val.length === this.checkItems.length
      // 已被選取的length必須大於0、且checked length 小於原本資料來源的length才會判斷是不定數，等號後面會依據這個比較結果回傳布林
      this.isInd = val.length > 0 && val.length < this.checkItems.length
      console.log(this.checked)
    },

    // 9/21小測驗

    battleFinish() {
      let newPoint = 0
      let newLevel = 0
      this.battleData.forEach(obj => {
        // 如果絆等級滿10LV，該從者便不再增加點數和等級
        if (obj.bound.level == 10) {
          newPoint = obj.bound.point + 0
          newLevel = obj.bound.level + 0
          obj.bound.levelUp = false
        }
        // 判斷每次增加經驗時有沒有大於等於五萬門檻，且絆等級不到10的從者，資料才允許被更新
        if ((obj.bound.point + this.useMysticCodes) <= 50000 && obj.bound.level < 10) {
          newPoint = obj.bound.point + this.useMysticCodes
          newLevel = obj.bound.level + 0
          obj.bound.levelUp = false
        }
        // 假如經驗等於或者超過五萬，且絆等級10以下，就判定升級
        if ((obj.bound.point + this.useMysticCodes) >= 50000 && obj.bound.level < 10) {
          newPoint = obj.bound.point + this.useMysticCodes - 50000
          newLevel = obj.bound.level + 1
          obj.bound.levelUp = true
        }
        // 將新取得資料變更的變數寫回物件
        obj.bound.point = newPoint
        obj.bound.level = newLevel
      })
    }
  },

  computed: {
    handleLevelUpMsg() {
      let newMsg = []
      for(let i in this.battleData){
        this.battleData[i].bound.level >= 10 && this.battleData[i].bound.levelUp == false ? newMsg[i] = '(羈絆等級已達最大)' : newMsg[i] = ''
        if (this.battleData[i].bound.levelUp == true ) {
          newMsg[i] = '(羈絆等級提升)'
        }
      }
      return newMsg
    },

    useMysticCodes() {
      if (this.codes == true) {
        console.log(this.tanebiExp + (this.tanebiExp / 10))
        return this.tanebiExp + (this.tanebiExp / 10)
      } else {
        console.log(this.tanebiExp)
        return this.tanebiExp
      }

    }
  }
};
</script>
