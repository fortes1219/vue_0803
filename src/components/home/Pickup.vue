<template>
  <div class="page el-customize">
    <h1>幕間物語：友情 10 連抽</h1>
    <p>你發現手上的貝德維爾差一張就寶五，剛好你又有 2 萬友情點</p>

    <b>Context:</b>
    <ul>
      <li>抽一次是 200 點，十連抽 2000 點</li>
      <li>每一張卡可重複隨機出現</li>
    </ul>

    <b>Force:</b>
    <ul>
      <li>抽卡介面仿照實際遊戲內容呈現，可選擇單抽或十連抽</li>
      <li>依照現有友情點數，需顯示可抽次數 (小數點無條件捨去)</li>
      <li>若友情點數不足，顯示「友情點數不足」、Button 狀態不可操作</li>
      <li>若點數不足夠抽取十次，僅顯示一個可抽取多少次的Button</li>
    </ul>
    <p>----------作答區----------</p>
    <br />
    <div class="game_panel">
      <ul class="game_info">
        <li>友情點數: {{ account.friendShip }} 可抽次數: {{ account.playableCount }}</li>
      </ul>
      <div v-if="beforePick" class="display">
        <el-button class="pickup" :disabled="buttonDisable" @click="handlePickupDisplay(button.one.count)">{{ button.one.msg }}</el-button>
        <el-button v-if="multiPickButton" class="pickup" @click="handlePickupDisplay(button.mult.count)">{{ button.mult.msg }}</el-button>
      </div>
      <div v-if="pickStart" class="pickupBlock">
        <div class="display" data-row-count="5">
          <div class="data_row card_obj">
            <span class="card">
              <p>cards</p>
            </span>
          </div>
        </div>
        <div class="btn_outer">
          <el-button class="pickup" @click="handlePickupDisplay(0)">繼續召喚</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataEvent",
  data() {
    return {
      beforePick: true,
      pickStart: false,
      account: {
        friendShip: 2100,
        playableCount: 0, // 初始值 0
      },
      cost: 200,
      buttonDisable: false,
      multiPickButton: true,
      button: {
        one: {
          msg: '',
          count: 0  
        },
        mult: {
          msg: '',
          count: 0
        }
      },

      pickPool: [],
      cardPool: [
        { class: 'saber', name: '貝德維爾', rare: 3 },
        { class: 'mystic', name: '龍脈', rare: 3 },
        { class: 'mystic', name: '奇蹟求道者', rare: 3 },
        { class: 'saber', name: '睿智的大火', rare: 3 },
        { class: 'berserker', name: '清姬', rare: 3 },
        { class: 'berserker', name: '大流士三世', rare: 3 },
        { class: 'rider', name: '美杜莎', rare: 3 },
        { class: 'rider', name: '布狄卡', rare: 3 },
        { class: 'caster', name: '睿智的大火', rare: 3 },
        { class: 'caster', name: '美狄亞', rare: 3 },
        { class: 'lancer', name: '庫夫林', rare: 3 },
        { class: 'archer', name: '阿拉什', rare: 1 },
        { class: 'caster', name: '安徒生', rare: 2 }
      ]
    }
  },

  created() {
    this.buttonMsg
  },

  methods: {
    handlePickupDisplay(val) {
      this.beforePick = !this.beforePick
      this.pickStart = !this.pickStart
      this.account.friendShip = this.account.friendShip - (this.cost * val)
      this.buttonMsg
    }
  },

  computed: {
    buttonMsg() {
      let cost = this.cost // cost固定200
      let totalPoint = this.account.friendShip
      let multCount = Math.floor((totalPoint / this.cost))
      let oneCount = 0
      this.account.playableCount = multCount
      
      // 判斷點數是否足夠抽一次 (用三元式)
      totalPoint >= cost ? oneCount = 1 : oneCount = 0
      this.button.one.count = oneCount
      this.button.one.msg = `${oneCount + ' 回召喚'}`

      // 假如右側Button不顯示且友情點數不足200則按鈕訊息顯示 "友情點數不足"
      if (totalPoint < cost && oneCount == 0) {
        this.button.one.msg = '友情點數不足'
        this.buttonDisable = true
      }

      // 判斷點數是否足夠抽十次，如果不夠十次，剩餘次數是否大於兩次? 
      
      if (multCount >= 10) {
        this.button.mult.msg = `${'10 回召喚'}`
        this.button.mult.count = 10
      } else if (multCount < 2) {
        this.multiPickButton = false
      } else {
        this.button.mult.count = multCount
        this.button.mult.msg = `${multCount + ' 回召喚'}`
      }

      // 小於兩次時右側按鈕不顯示
      if (multCount < 2) {
        this.multiPickButton = false
      }
    },

    pointListener() {
      let totalPoint = this.account.friendShip
      let pickCount = totalPoint / this.cost
      let setButtonDisabled = false
      // if (this.account.friendShip < 200) {
      //   this.msg.oneTime = '點數不足'
      //   setButtonDisabled = true
      //   console.log(setButtonDisabled, this.msg)
      // }
      
      return
    }
  },

  mounted() {
    
  }
};
</script>
