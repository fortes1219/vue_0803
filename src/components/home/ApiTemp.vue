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
            :placeholder="$t('select_datetime')"
          />
        </el-form-item>
        <div class="row horizontal v_center end">
          <el-button @click="packagePostData">Add Data(POST)</el-button>
        </div>
      </el-form>

      <el-table :data="tableData" style="width: 100%; overflow: hidden;" height="50vh">
        <el-table-column prop="id" label="ID" align="center" width="100" />
        <el-table-column prop="name" label="Name" align="center" width="100" />
        <el-table-column prop="class" label="Class" />
        <el-table-column prop="date" label="Date" />
        <el-table-column label="Action" align="center">
          <template slot-scope="scope">
            <el-button type="danger" @click="delCheck(scope.row.id)">DELETE</el-button>
            <el-button type="warning" @click="openEditDialog(scope.row)">EDIT</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--Dialog-->
    <el-dialog title="編輯" :visible.sync="editDialog">
      <el-form label-width="8rem" data-width="20rem" data-space="space-vertical">
        <el-form-item label="ID">
          <el-input v-model="editForm.id" type="text" />
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="editForm.name" type="text" />
        </el-form-item>
        <el-form-item label="Class">
          <el-input v-model="editForm.class" type="text" />
        </el-form-item>
        <el-form-item label="Date">
          <el-date-picker
            v-model="editForm.date"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="$t('select_datetime')"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button @click="updateData" type="primary">送出</el-button>
      </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { getLanguage, setLanguage } from "../../lang"
import { stringify } from 'querystring'
export default {
  name: "apiTemp",
  data() {
    return {
      lang: 'zh_tw',
      tableData: [],
      postObj: {
        id: '',
        name: '',
        class: '',
        date: ''
      },
      editForm: {},
      editDialog: false,
    }
  },

  created() {
    getLanguage
    this.packageGetData()
  },

  methods: {
    async packageGetData() {
      const url = 'http://localhost:3000/tableData?_sort=id'
      let res = await this.$api.get(url)
      console.log(res)
      this.tableData = [...res]
      // 正式環境才有後端給來的result回應，這裡只做註解
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
      await this.$api.post(source, this.postObj)
      this.packageGetData()
      console.log(source.data)
    },

    openEditDialog(obj) {
      this.editDialog = true
      this.editForm = {...obj}
      console.log('edit obj: ', this.editForm)
    },

    async updateData() {
      let id = this.editForm.id
      const source = 'http://localhost:3000/tableData/' + `${id}`
      try {
        await this.$api.put(source, this.editForm)
        this.$message({
          message: '編輯成功',
          type: 'success'
        })
        this.editDialog = false
        console.log('ID ' + id + ' 編輯成功')
      }
      catch {
        this.$message.error('編輯失敗')
      }
      this.packageGetData()
    },

    async delCheck(id) {
      try {
        await this.$confirm(
          '將會刪除資料，是否繼續？', '刪除資料', {
          confirmButtonText: '確認刪除',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.delData(id)
        this.$message({
          message: '刪除成功',
          type: 'success'
        })
      }
      catch {
        this.$message({
          message: '已取消删除',
          type: 'info'
        })
      }
    },

    async delData(id) {
      const source = 'http://localhost:3000/tableData/' + `${id}`
      await this.$api.delete(source)
      this.packageGetData()
      console.log(this.tableData)
    },

  }
};
</script>
