<template>
  <div class="page api_temp">
    <div class="row column">
      <el-form label-width="8rem" data-width="20rem" data-space="space-vertical">
        <el-form-item label="ID">
          <el-input v-model="postObj.id" type="text" />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="postObj.name" type="text" />
        </el-form-item>
        <el-form-item label="Class">
          <el-input v-model="postObj.class" type="text" />
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker
            v-model="postObj.date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="$t(select_datetime)"
          />
        </el-form-item>
        <div class="row horizontal v_center end">
          <el-button @click="packagePostData">Add Data(POST)</el-button>
        </div>
      </el-form>

      <el-table :data="tableData" style="width: 100%; overflow: hidden;" height="76vh">
        <el-table-column prop="id" label="ID" align="center" width="100" />
        <el-table-column prop="name" label="Name" align="center" width="100" />
        <el-table-column prop="class" label="Class" />
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
import { getLanguage, setLanguage } from "../../lang"
export default {
  name: "apiTemp",
  data() {
    return {
      lang: 'zh_tw',
      tableData: [],
      pickTime: '',
      postObj: {
        id: '',
        name: '',
        class: '',
        date: ''
      }
    }
  },

  created() {
    getLanguage
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
      const url = 'http://localhost:3000/tableData'
      let res = await this.$api.get(url)
      console.log(res)
      this.tableData = [...res]
      // if (res.result == 1)  {
      //   console.log(res)
      //   this.tableData = [...res.data]
      // } else {
      //   console.log('API error')
      // }
    },

    async packagePostData() {
      const source = 'http://localhost:3000/tableData'
      const currentDate = new Date().toJSON().slice(0, 10)
      // const postData = {
      //   id: `${this.tableData.length}`,
      //   name: 'data ' + `${this.tableData.length + 1}`,
      //   date: currentDate
      // }
      await this.$api.post(source, this.postObj)
      this.packageGetData()
      console.log(source.data)
    },

    async delData(id) {
      const source = 'http://localhost:3000/tableData/' + `${id}`
      await this.$api.delete(source)
      this.packageGetData()
      console.log(this.tableData)
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
