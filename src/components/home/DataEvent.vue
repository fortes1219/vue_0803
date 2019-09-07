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
      <div v-if="tempSelect.selected === '3'" class="input_inner" data-width="20rem">
        <el-input
          v-model="tempInput"
          type="text"
          placeholder="enter something"
          @change="handleInputChange"
        />
      </div>
      <div v-if="tempSelect.selected === '3'" class="input_inner">
        <el-checkbox :indeterminate="isInd" v-model="checkAll" @change="handleCheckAll">Select All</el-checkbox>
        <el-checkbox-group v-model="checked" @change="handleChecked">
          <el-checkbox 
            v-for="(item, index) in checkItems" 
            :label="item" 
            :key="index"
          >
            {{item}}
          </el-checkbox>
        </el-checkbox-group>
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
        selected: "",
        items: [
          { id: 0, value: "1", label: "option 1" },
          { id: 1, value: "2", label: "option 2" },
          { id: 2, value: "3", label: "option 3" }
        ]
      },
      checkAll: false,
      isInd: false,
      checked: [],
      checkItems: [
        // {label: "check 1", value: "1"},
        // {label: "check 2", value: "2"},
        // {label: "check 3", value: "3"}
        "check 1",
        "check 2",
        "check 3"
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

    handleCheckAll(val) {
      this.checked = val ? this.checkItems : [];
      this.isInd = false;
      console.log(this.checked);
    },

    handleChecked(val) {
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.checkItems.length;
      this.isInd = checkedCount > 0 && checkedCount < this.checkItems.length;
      console.log(this.checked);
    }
  }
};
</script>
