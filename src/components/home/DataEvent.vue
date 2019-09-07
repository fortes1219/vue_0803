<template>
  <div class="page">
    <div class="row column">
      <el-select v-model="tempSelect.selected" clearable @change="handleSelect">
        <el-option
          v-for="(item, index) in tempSelect.items"
          :key="index"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <div v-if="tempSelect.selected === '1'" class="input_inner" data-width="20rem">
        <el-input
          v-model="tempInput"
          type="text"
          placeholder="enter something"
          @change="handleInputChange"
        />
      </div>
      <div v-if="tempSelect.selected === '1'" class="row vertical">
        <el-checkbox :indeterminate="isInd" v-model="checkAll" @change="handleCheckAll">Select All</el-checkbox>
        <div class="input _inner">
          <el-checkbox-group v-model="checked" @change="handleChecked">
            <el-checkbox 
              v-for="(item, index) in checkItems" 
              :label="item.value"
              :name="item.label"
              :key="index"
            >
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
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
      tempInput: "",
      tempSelect: {
        selected: "1",
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
        {label: "check 1", value: "1"},
        {label: "check 2", value: "2"},
        {label: "check 3", value: "3"}
        // "check 1",
        // "check 2",
        // "check 3"
      ]
    };
  },

  created() {},

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
    }
  }
};
</script>
