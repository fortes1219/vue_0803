<template>
  <div class="page api_temp">
    <div class="row column">
      <!-- <el-button @click="postTableData">POST</el-button> -->
      <div class="row" data-space="space-vertical">
        <el-button @click="packagePostData">Package POST</el-button>
      </div>

    </div>
    <el-table :data="tableData" style="width: 100%; overflow: hidden;" height="80vh">
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
</template>

<script>

export default {
  name: "apiTemp",
  data() {
    return {
      tableData: []
    }
  },

  created() {
    // this.getTableData()
    this.packageGetData()
  },

  methods: {
    // getTableData() {
    //   const source = 'http://localhost:3000/tableData'
    //   this.axios.get(source).then(res => {
    //     this.tableData = res.data
    //     console.log(this.tableData)
    //   })
    // },

    async packageGetData() {
      const source = 'http://localhost:3000/tableData'
      let data = await this.$api.get(source)
      this.tableData = data
      console.log(data)
    },

    async packagePostData() {
      const source = 'http://localhost:3000/tableData'
      const currentDate = new Date().toJSON().slice(0, 10)
      const postData = {
        id: `${this.tableData.length}`,
        name: 'data ' + `${this.tableData.length + 1}`,
        date: currentDate
      }
      await this.$api.post(source, postData)
      this.packageGetData()
      console.log(this.tableData)
    },

    // postTableData() {
    //   const source = 'http://localhost:3000/tableData'
    //   const currentDate = new Date().toJSON().slice(0, 10)
    //   const postData = {
    //     id: `${this.tableData.length}`,
    //     name: 'data ' + `${this.tableData.length + 1}`,
    //     date: currentDate
    //   }
    //   this.axios.post(source, postData).then(res => {
    //     this.getTableData()
    //     console.log(this.tableData)
    //   }, err => {
    //     console.log(err + ' post failed.')
    //   })
    // },

    // delThis(id) {
    //   const source = 'http://localhost:3000/tableData/' + `${id}`
    //   this.axios.delete(source).then(res => {
    //     this.getTableData()
    //     console.log(this.tableData)
    //   }, err => {
    //     console.log(err + ' delete failed.')
    //   })
    // },

    async delData(id) {
      const source = 'http://localhost:3000/tableData/' + `${id}`
      await this.$api.delete(source)
      this.packageGetData()
      console.log(this.tableData)
    }
  }
};
</script>
