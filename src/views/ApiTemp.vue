<template>
  <div class="page api_temp">
    <div class="row column">
      <div class="row horizontal v_center">
        <div class="input_inner" data-width="20rem" data-space="space-next">
          <el-input v-model="searchObj.id" type="text" placeholder="enter id" />
        </div>
        <div class="input_inner" data-width="20rem" data-space="space-next">
          <el-input v-model="searchObj.name" type="text" placeholder="enter name" data-width="10rem" data-space="space-next" />
        </div>
        <div class="input_inner" data-width="30rem" data-space="space-next">
          <el-date-picker
            v-model="pickTime"
            type="datetimerange"
            range-separator="~"
            start-placeholder="Start Time"
            end-placeholder="End Time"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleDatePickup"
          />
        </div>
        <el-button type="primary" @click="handleSearch">Search</el-button>
      </div>
      <div class="row" data-space="space-vertical">
        <el-button @click="packagePostData">Add Data(POST)</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%; overflow: hidden;" height="76vh">
        <el-table-column prop="id" label="ID" align="center" width="100" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="date" label="Date" />
        <el-table-column label="Action" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="delData(scope.row.id)">DELETE</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "apiTemp",
  data() {
    return {
      tableData: [],
      pickTime: '',
      searchObj: {
        id: '',
        name: '',
        startTime: null,
        endTime: null
      }
    }
  },

  created() {
    this.packageGetData()
  },

  methods: {
    // async packageGetData() {
    //   const source = 'http://localhost:3000/tableData'
    //   let res = await this.$api.get(source)
    //   this.tableData = [...res]
    //   console.log(res)
    // },

    async packageGetData() {
      const url = 'tableData'
      let jwt = {
        "lang": ''
      }
      let res = await this.$api.get(url, jwt)
      if (res.result == 1)  {
        console.log(res)
        this.tableData = [...res.data]
      } else {
        console.log('API error')
      }
    },

    async packagePostData() {
      const source = 'tableData'
      const currentDate = new Date().toJSON().slice(0, 10)
      const postData = {
        id: `${this.tableData.length}`,
        name: 'data ' + `${this.tableData.length + 1}`,
        date: currentDate
      }
      await this.$api.post(source, postData)
      this.packageGetData()
      console.log(source.data)
    },

    async delData(id) {
      const source = 'tableData/' + `${id}`
      await this.$api.delete(source)
      this.packageGetData()
      console.log(this.tableData)
    },

    handleDatePickup() {
      if (this.pickTime != null)
      // 預防組件的清空按鈕按下後將資料型態改為null、造成type error，所以要先判別pickTime的內容是否為null
      [this.searchObj.startTime, this.searchObj.endTime] = [this.pickTime[0], this.pickTime[1]]
      else
      [this.searchObj.startTime, this.searchObj.endTime] = [null, null]
      console.log(this.searchObj)
    },

    async handleSearch() {
      let query = `?id=${this.searchObj.id}&q=${this.searchObj.name}&date_gte=${this.searchObj.startTime}&date_lte=${this.searchObj.endTime}`
      let queryConditions = query
      if (this.searchObj.id === '') {
        queryConditions = queryConditions.replace(`id=${this.searchObj.id}&`, '')
      }
      if (this.searchObj.name == '') {
        queryConditions = queryConditions.replace(`q=${this.searchObj.name}&`, '')
      }
      if (this.pickTime === null) {
        queryConditions = queryConditions.replace(`&date_gte=${this.searchObj.startTime}&date_lte=${this.searchObj.endTime}`, '')
      }

      console.log(queryConditions)
      let source = 'tableData' + queryConditions

      let res = await this.$api.get(source)
      this.tableData = [...res]
      console.log(source)
    }
  }
};
</script>
