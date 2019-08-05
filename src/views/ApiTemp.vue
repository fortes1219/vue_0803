<template>
  <div class="api_temp">
		<h1 data-inset="1rem">API Template</h1>
    <div class="row column" data-inset="1rem">
      <!-- <el-button @click="postTableData">POST</el-button> -->
      <el-button @click="packagePostData">Package POST</el-button>
      <el-table :data="tableData" height="50vh">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="date" label="Date" />
        <el-table-column label="Action">
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
